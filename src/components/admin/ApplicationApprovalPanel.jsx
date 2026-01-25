import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle2, XCircle, AlertCircle, Loader } from 'lucide-react';
import { toast } from 'sonner';

export default function ApplicationApprovalPanel({ application, onStatusChange }) {
  const [showApproveForm, setShowApproveForm] = useState(false);
  const [showRejectForm, setShowRejectForm] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleApprove = async () => {
    setIsProcessing(true);
    try {
      await base44.functions.invoke('approveApplication', {
        applicationId: application.id,
        approvalNotes: ''
      });
      toast.success('Application approved and credentials are being issued');
      setShowApproveForm(false);
      onStatusChange();
    } catch (error) {
      toast.error('Failed to approve application');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReject = async () => {
    if (!rejectionReason.trim()) {
      toast.error('Please provide a rejection reason');
      return;
    }
    setIsProcessing(true);
    try {
      await base44.functions.invoke('rejectApplication', {
        applicationId: application.id,
        rejectionReason: rejectionReason
      });
      toast.success('Application rejected and user has been notified');
      setShowRejectForm(false);
      setRejectionReason('');
      onStatusChange();
    } catch (error) {
      toast.error('Failed to reject application');
    } finally {
      setIsProcessing(false);
    }
  };

  if (application.status === 'approved' || application.status === 'rejected') {
    return (
      <Card className="border-2 border-blue-100 bg-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {application.status === 'approved' ? (
              <>
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                Application Approved
              </>
            ) : (
              <>
                <XCircle className="h-5 w-5 text-red-600" />
                Application Rejected
              </>
            )}
          </CardTitle>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="border-2 border-amber-200 bg-amber-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-amber-600" />
          Application Review Required
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600 mb-1">Legal Name</p>
            <p className="font-semibold">{application.legal_name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Entity Category</p>
            <Badge>{application.entity_category}</Badge>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Email</p>
            <p className="text-sm">{application.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Status</p>
            <Badge variant="outline">{application.status}</Badge>
          </div>
        </div>

        {!showApproveForm && !showRejectForm && (
          <div className="flex gap-2 pt-4">
            <Button
              onClick={() => setShowApproveForm(true)}
              className="flex-1 bg-green-600 hover:bg-green-700"
              disabled={isProcessing}
            >
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Approve Application
            </Button>
            <Button
              onClick={() => setShowRejectForm(true)}
              variant="outline"
              className="flex-1 text-red-600 hover:bg-red-50"
              disabled={isProcessing}
            >
              <XCircle className="mr-2 h-4 w-4" />
              Reject Application
            </Button>
          </div>
        )}

        {showApproveForm && (
          <div className="space-y-3 p-4 bg-white rounded-lg border border-green-200">
            <p className="text-sm font-semibold">Confirm Approval</p>
            <p className="text-sm text-gray-600">
              This will approve the application and automatically issue LEI and vLEI credentials.
            </p>
            <div className="flex gap-2">
              <Button
                onClick={handleApprove}
                className="flex-1 bg-green-600 hover:bg-green-700"
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Confirm Approval'
                )}
              </Button>
              <Button
                onClick={() => setShowApproveForm(false)}
                variant="outline"
                disabled={isProcessing}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}

        {showRejectForm && (
          <div className="space-y-3 p-4 bg-white rounded-lg border border-red-200">
            <p className="text-sm font-semibold">Reject Application</p>
            <Textarea
              placeholder="Please provide a reason for rejection..."
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              className="min-h-24"
            />
            <div className="flex gap-2">
              <Button
                onClick={handleReject}
                className="flex-1 bg-red-600 hover:bg-red-700"
                disabled={isProcessing || !rejectionReason.trim()}
              >
                {isProcessing ? (
                  <>
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Reject Application'
                )}
              </Button>
              <Button
                onClick={() => {
                  setShowRejectForm(false);
                  setRejectionReason('');
                }}
                variant="outline"
                disabled={isProcessing}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}