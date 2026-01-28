import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

/**
 * Enrich transaction with external data sources
 * Geo-IP, domain reputation, device fingerprinting, velocity history
 */
Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const payload = await req.json();
    const { transaction_id, ip_address, counterparty_name, from_account } = payload;

    const enrichedData = {
      geo_ip: null,
      domain_reputation: null,
      velocity_history: null,
      device_profile: null
    };

    // 1. GEO-IP ENRICHMENT
    if (ip_address) {
      try {
        const geoIpResponse = await fetch('https://ip-api.com/json/' + ip_address, {
          method: 'GET'
        });

        if (geoIpResponse.ok) {
          const geoData = await geoIpResponse.json();
          enrichedData.geo_ip = {
            country: geoData.country,
            country_code: geoData.countryCode,
            city: geoData.city,
            isp: geoData.isp,
            is_vpn: geoData.isVPN || false,
            is_proxy: geoData.isProxy || false,
            risk_score: geoData.isVPN || geoData.isProxy ? 30 : 5
          };
        }
      } catch (error) {
        console.error('Geo-IP enrichment error:', error);
      }
    }

    // 2. DOMAIN REPUTATION ENRICHMENT
    if (counterparty_name) {
      try {
        const domainRepResponse = await fetch('https://api.abuseipdb.com/api/v2/check', {
          method: 'POST',
          headers: {
            'Key': Deno.env.get('ABUSEIPDB_API_KEY') || '',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            ipAddress: ip_address,
            maxAgeInDays: 90
          })
        });

        if (domainRepResponse.ok) {
          const repData = await domainRepResponse.json();
          enrichedData.domain_reputation = {
            abuse_score: repData.data?.abuseConfidenceScore || 0,
            total_reports: repData.data?.totalReports || 0,
            is_blacklisted: (repData.data?.abuseConfidenceScore || 0) > 50,
            risk_level: (repData.data?.abuseConfidenceScore || 0) > 75 ? 'critical' :
                       (repData.data?.abuseConfidenceScore || 0) > 50 ? 'high' :
                       (repData.data?.abuseConfidenceScore || 0) > 25 ? 'medium' : 'low'
          };
        }
      } catch (error) {
        console.error('Domain reputation enrichment error:', error);
      }
    }

    // 3. VELOCITY HISTORY
    if (from_account) {
      try {
        const now = new Date();
        const last24h = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        const last7d = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

        const txs24h = await base44.asServiceRole.entities.Transaction.filter({
          from_account,
          created_date: { $gte: last24h.toISOString() }
        });

        const txs7d = await base44.asServiceRole.entities.Transaction.filter({
          from_account,
          created_date: { $gte: last7d.toISOString() }
        });

        enrichedData.velocity_history = {
          transactions_24h: txs24h?.length || 0,
          transactions_7d: txs7d?.length || 0,
          volume_24h: txs24h?.reduce((sum, tx) => sum + (tx.amount || 0), 0) || 0,
          volume_7d: txs7d?.reduce((sum, tx) => sum + (tx.amount || 0), 0) || 0,
          flagged_24h: txs24h?.filter(tx => tx.status === 'flagged').length || 0,
          blocked_24h: txs24h?.filter(tx => tx.status === 'blocked').length || 0,
          velocity_risk: {
            high_frequency: (txs24h?.length || 0) > 10,
            high_volume: (txs24h?.reduce((sum, tx) => sum + (tx.amount || 0), 0) || 0) > 100000,
            repeat_flagging: (txs7d?.filter(tx => tx.status === 'flagged').length || 0) > 3
          }
        };
      } catch (error) {
        console.error('Velocity history error:', error);
      }
    }

    return Response.json({
      success: true,
      enriched_data: enrichedData
    });
  } catch (error) {
    console.error('Data enrichment error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});