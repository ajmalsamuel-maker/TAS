import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { transaction_id } = await req.json();

    if (!transaction_id) {
      return Response.json({ error: 'transaction_id is required' }, { status: 400 });
    }

    // Fetch transaction
    const transactions = await base44.entities.Transaction.filter({ id: transaction_id });
    const transaction = transactions[0];

    if (!transaction) {
      return Response.json({ error: 'Transaction not found' }, { status: 404 });
    }

    // Fetch active fraud models
    const models = await base44.entities.FraudModel.filter({ is_active: true });

    const fraudAlerts = [];

    for (const model of models) {
      const detection = await runFraudModel(base44, model, transaction);
      
      if (detection.isFraud && detection.confidence >= model.confidence_threshold) {
        // Create fraud alert
        const alert = await base44.asServiceRole.entities.FraudAlert.create({
          transaction_id: transaction.id,
          user_id: transaction.user_id,
          fraud_type: detection.fraudType,
          confidence_score: detection.confidence,
          risk_score: detection.riskScore,
          severity: model.severity,
          status: 'new',
          detection_method: model.name,
          model_id: model.id,
          indicators: detection.indicators,
          device_data: detection.deviceData,
          behavioral_data: detection.behavioralData
        });

        fraudAlerts.push(alert);

        // Update model stats
        await base44.asServiceRole.entities.FraudModel.update(model.id, {
          detection_count: (model.detection_count || 0) + 1
        });

        // Auto-block if configured
        if (model.auto_block) {
          await base44.asServiceRole.entities.Transaction.update(transaction_id, {
            status: 'blocked'
          });
        }

        // Auto-create case for critical alerts
        if (model.severity === 'critical') {
          await base44.functions.invoke('createCaseFromAlert', {
            type: 'fraud_alert',
            priority: 'critical',
            subject: `Critical Fraud: ${detection.fraudType}`,
            description: `High-confidence fraud detected\n\nModel: ${model.name}\nConfidence: ${(detection.confidence * 100).toFixed(1)}%\nIndicators: ${detection.indicators.join(', ')}`,
            sla_hours: 1
          });
        }
      }
    }

    return Response.json({
      success: true,
      alerts_created: fraudAlerts.length,
      fraud_detected: fraudAlerts.length > 0,
      alerts: fraudAlerts
    });

  } catch (error) {
    console.error('Fraud detection error:', error);
    return Response.json({ 
      error: 'Fraud detection failed', 
      details: error.message 
    }, { status: 500 });
  }
});

async function runFraudModel(base44, model, transaction) {
  const result = {
    isFraud: false,
    confidence: 0,
    riskScore: 0,
    fraudType: 'unknown',
    indicators: [],
    deviceData: {},
    behavioralData: {}
  };

  switch (model.model_type) {
    case 'device_fingerprint':
      return await deviceFingerprintCheck(base44, transaction);
    
    case 'behavioral_analysis':
      return await behavioralAnalysis(base44, transaction);
    
    case 'anomaly_detection':
      return await anomalyDetection(base44, transaction);
    
    case 'velocity_check':
      return await velocityCheck(base44, transaction);
    
    case 'pattern_recognition':
      return await patternRecognition(base44, transaction);
    
    default:
      return result;
  }
}

async function deviceFingerprintCheck(base44, transaction) {
  const result = {
    isFraud: false,
    confidence: 0,
    riskScore: 0,
    fraudType: 'device_spoofing',
    indicators: [],
    deviceData: {
      fingerprint: transaction.device_fingerprint,
      ip: transaction.ip_address
    }
  };

  // Check if device fingerprint is associated with multiple IPs
  const deviceTransactions = await base44.entities.Transaction.filter({
    device_fingerprint: transaction.device_fingerprint
  });

  const uniqueIPs = new Set(deviceTransactions.map(t => t.ip_address).filter(Boolean));
  
  if (uniqueIPs.size > 5) {
    result.isFraud = true;
    result.confidence = 0.85;
    result.riskScore = 75;
    result.indicators.push(`Device used from ${uniqueIPs.size} different IPs`);
  }

  // Check for impossible travel
  const recentTx = deviceTransactions
    .filter(t => new Date(t.created_date) > new Date(Date.now() - 3600000))
    .filter(t => t.counterparty_country && t.counterparty_country !== transaction.counterparty_country);
  
  if (recentTx.length > 0) {
    result.isFraud = true;
    result.confidence = 0.9;
    result.riskScore = 85;
    result.indicators.push('Impossible travel detected');
  }

  return result;
}

async function behavioralAnalysis(base44, transaction) {
  const result = {
    isFraud: false,
    confidence: 0,
    riskScore: 0,
    fraudType: 'behavioral_anomaly',
    indicators: [],
    behavioralData: {}
  };

  // Get user's transaction history
  const userTransactions = await base44.entities.Transaction.filter({
    user_id: transaction.user_id
  });

  if (userTransactions.length < 3) {
    return result; // Not enough data
  }

  // Calculate average transaction amount
  const avgAmount = userTransactions.reduce((sum, t) => sum + (t.amount || 0), 0) / userTransactions.length;
  const stdDev = Math.sqrt(
    userTransactions.reduce((sum, t) => sum + Math.pow((t.amount || 0) - avgAmount, 2), 0) / userTransactions.length
  );

  result.behavioralData = {
    avgAmount,
    stdDev,
    transactionCount: userTransactions.length
  };

  // Check if transaction is significantly different
  if (transaction.amount > avgAmount + (3 * stdDev)) {
    result.isFraud = true;
    result.confidence = 0.75;
    result.riskScore = 70;
    result.indicators.push(`Amount ${((transaction.amount / avgAmount - 1) * 100).toFixed(0)}% above user average`);
  }

  return result;
}

async function anomalyDetection(base44, transaction) {
  const result = {
    isFraud: false,
    confidence: 0,
    riskScore: 0,
    fraudType: 'anomaly',
    indicators: []
  };

  // AI-based anomaly detection using LLM
  const analysisResult = await base44.integrations.Core.InvokeLLM({
    prompt: `Analyze this transaction for fraud indicators:
    
Amount: $${transaction.amount}
Type: ${transaction.type}
Counterparty: ${transaction.counterparty_name || 'Unknown'}
Country: ${transaction.counterparty_country || 'Unknown'}
Time: ${transaction.created_date}

Provide fraud analysis including:
- Is this suspicious?
- Confidence score (0-1)
- Key indicators
- Recommended action`,
    response_json_schema: {
      type: 'object',
      properties: {
        is_suspicious: { type: 'boolean' },
        confidence: { type: 'number' },
        indicators: { type: 'array', items: { type: 'string' } },
        risk_score: { type: 'number' }
      }
    }
  });

  if (analysisResult.is_suspicious) {
    result.isFraud = true;
    result.confidence = analysisResult.confidence;
    result.riskScore = analysisResult.risk_score;
    result.indicators = analysisResult.indicators;
  }

  return result;
}

async function velocityCheck(base44, transaction) {
  const result = {
    isFraud: false,
    confidence: 0,
    riskScore: 0,
    fraudType: 'velocity_abuse',
    indicators: []
  };

  // Check transaction velocity (last hour)
  const oneHourAgo = new Date(Date.now() - 3600000).toISOString();
  const recentTransactions = await base44.entities.Transaction.filter({
    user_id: transaction.user_id,
    created_date: { $gte: oneHourAgo }
  });

  if (recentTransactions.length > 10) {
    result.isFraud = true;
    result.confidence = 0.8;
    result.riskScore = 75;
    result.indicators.push(`${recentTransactions.length} transactions in past hour`);
  }

  return result;
}

async function patternRecognition(base44, transaction) {
  const result = {
    isFraud: false,
    confidence = 0,
    riskScore: 0,
    fraudType: 'pattern_fraud',
    indicators: []
  };

  // Round amount pattern (structuring)
  if (transaction.amount && transaction.amount % 100 === 0 && transaction.amount > 9000 && transaction.amount < 10000) {
    result.isFraud = true;
    result.confidence = 0.7;
    result.riskScore = 65;
    result.indicators.push('Possible structuring pattern (just below reporting threshold)');
  }

  return result;
}