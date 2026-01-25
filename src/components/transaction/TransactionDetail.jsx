import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';

export default function TransactionDetail({ transaction, onClose }) {
  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={onClose}>
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Monitoring
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Transaction Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm font-medium text-gray-500">Transaction ID</p>
              <p className="font-mono text-sm mt-1">{transaction.transaction_id || transaction.id}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Status</p>
              <Badge className="mt-1">{transaction.status}</Badge>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Amount</p>
              <p className="text-2xl font-bold mt-1">${transaction.amount?.toLocaleString()} {transaction.currency}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Risk Score</p>
              <p className="text-2xl font-bold mt-1">{transaction.risk_score || 0}/100</p>
            </div>
          </div>

          {transaction.flags && transaction.flags.length > 0 && (
            <div>
              <p className="text-sm font-medium text-gray-500 mb-2">Flags</p>
              <div className="flex flex-wrap gap-2">
                {transaction.flags.map((flag, idx) => (
                  <Badge key={idx} className="bg-red-100 text-red-800">{flag}</Badge>
                ))}
              </div>
            </div>
          )}

          {transaction.screening_results && (
            <div>
              <p className="text-sm font-medium text-gray-500 mb-2">Screening Results</p>
              <pre className="bg-gray-50 p-4 rounded text-xs overflow-auto">
                {JSON.stringify(transaction.screening_results, null, 2)}
              </pre>
            </div>
          )}

          <div>
            <p className="text-sm font-medium text-gray-500 mb-2">Timeline</p>
            <div className="text-sm">
              <p>Created: {format(new Date(transaction.created_date), 'PPpp')}</p>
              {transaction.reviewed_at && (
                <p>Reviewed: {format(new Date(transaction.reviewed_at), 'PPpp')} by {transaction.reviewed_by}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}