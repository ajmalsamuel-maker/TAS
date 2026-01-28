import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, CheckCircle2, XCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function RuleFeedbackPanel({ alert, onClose }) {
  const [feedback, setFeedback] = useState('');
  const [outcome, setOutcome] = useState('');
  const [confidence, setConfidence] = useState(80);
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const handleSubmit = async () => {
    if (!outcome) {
      toast.error('Please select an outcome');
      return;
    }

    setIsLoading(true);
    try {
      // Submit feedback
      await base44.functions.invoke('processFeedbackAndOptimize', {
        rule_id: alert.triggered_rules?.[0] || '',
        transaction_id: alert.transaction_id,
        alert_id: alert.id,
        actual_outcome: outcome,
        review_notes: feedback,
        confidence_score: confidence
      });

      toast.success('Feedback submitted. Rules will be optimized.');
      queryClient.invalidateQueries({ queryKey: ['tmaas-alerts'] });
      queryClient.invalidateQueries({ queryKey: ['transaction-rules'] });
      onClose?.();
    } catch (error) {
      toast.error('Failed to submit feedback');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-y-auto p-4">
      <Card className="w-full max-w-2xl border-2 border-blue-100 my-8">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50">
          <CardTitle>Feedback on Alert Decision</CardTitle>
          <p className="text-sm text-gray-600 mt-2">Help us improve screening rules with your review</p>
        </CardHeader>

        <CardContent className="pt-6 space-y-6">
          {/* Alert Summary */}
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-600 mb-2">Transaction Amount</p>
            <p className="text-2xl font-bold">{alert?.transaction_amount} {alert?.transaction_currency}</p>
            <div className="mt-3 flex gap-2">
              <Badge>{alert.alert_type}</Badge>
              <Badge variant="outline">Risk: {alert.severity}</Badge>
            </div>
          </div>

          {/* Outcome Selection */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Was the Alert Correct?</h3>
            <div className="grid md:grid-cols-2 gap-3">
              <button
                onClick={() => setOutcome('true_positive')}
                className={`p-4 border-2 rounded-lg transition-all ${
                  outcome === 'true_positive'
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-green-300'
                }`}
              >
                <CheckCircle2 className="h-6 w-6 text-green-600 mx-auto mb-2" />
                <p className="font-semibold">Correct ✓</p>
                <p className="text-xs text-gray-600">Legitimate alert, action was right</p>
              </button>

              <button
                onClick={() => setOutcome('false_positive')}
                className={`p-4 border-2 rounded-lg transition-all ${
                  outcome === 'false_positive'
                    ? 'border-red-500 bg-red-50'
                    : 'border-gray-200 hover:border-red-300'
                }`}
              >
                <XCircle className="h-6 w-6 text-red-600 mx-auto mb-2" />
                <p className="font-semibold">False Alert ✗</p>
                <p className="text-xs text-gray-600">Shouldn't have been flagged</p>
              </button>
            </div>
          </div>

          {/* Confidence */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Your Confidence in this Decision: {confidence}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={confidence}
              onChange={(e) => setConfidence(parseInt(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Not sure</span>
              <span>Very confident</span>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium mb-2">Additional Notes (optional)</label>
            <Textarea
              placeholder="Why do you think this decision was correct or incorrect? Any context that would help improve our rules?"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              rows={4}
            />
          </div>

          {/* Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex gap-3">
            <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0" />
            <div className="text-sm text-blue-800">
              <p className="font-semibold mb-1">How Feedback Helps</p>
              <ul className="text-xs space-y-1">
                <li>• Improves rule precision by tracking true/false positives</li>
                <li>• Identifies rules that need adjustment</li>
                <li>• Reduces false alerts over time</li>
                <li>• Provides data for automated rule optimization</li>
              </ul>
            </div>
          </div>
        </CardContent>

        {/* Actions */}
        <div className="border-t p-6 bg-gray-50 flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            className="bg-[#0044CC] hover:bg-[#002D66]"
            disabled={isLoading || !outcome}
          >
            {isLoading ? 'Submitting...' : 'Submit Feedback'}
          </Button>
        </div>
      </Card>
    </div>
  );
}