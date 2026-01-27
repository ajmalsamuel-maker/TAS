import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertCircle, Shield, Activity } from 'lucide-react';
import { toast } from 'sonner';

export default function PriceChangeAlerts() {
  const queryClient = useQueryClient();

  const { data: priceChanges = [], isLoading } = useQuery({
    queryKey: ['price-change-requests'],
    queryFn: () => base44.entities.PriceChangeRequest.filter({ status: 'pending_review' }, '-detected_at', 100)
  });

  const approveMutation = useMutation({
    mutationFn: async ({ id, changeData }) => {
      // Update price change request
      await base44.entities.PriceChangeRequest.update(id, {
        status: 'approved',
        reviewed_by: (await base44.auth.me()).email,
        reviewed_at: new Date().toISOString()
      });
      
      // Update provider service cost
      if (changeData.provider_service_cost_id) {
        await base44.entities.ProviderServiceCost.update(changeData.provider_service_cost_id, {
          cost_per_unit: changeData.new_cost,
          effective_from: changeData.effective_date || new Date().toISOString()
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['price-change-requests'] });
      queryClient.invalidateQueries({ queryKey: ['provider-service-costs'] });
      toast.success('Price change approved and applied');
    }
  });

  const rejectMutation = useMutation({
    mutationFn: async ({ id }) => {
      await base44.entities.PriceChangeRequest.update(id, {
        status: 'rejected',
        reviewed_by: (await base44.auth.me()).email,
        reviewed_at: new Date().toISOString(),
        rejection_reason: 'Rejected by administrator'
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['price-change-requests'] });
      toast.success('Price change rejected');
    }
  });

  if (isLoading) {
    return <div className="flex justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div></div>;
  }

  const serviceLabels = {
    lei_issuance: 'LEI Issuance',
    vlei_issuance: 'vLEI Issuance',
    kyb_verification: 'KYB Verification',
    aml_screening: 'AML Screening',
    facial_verification: 'Facial Verification'
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-amber-600" />
          Pending Price Change Approvals
          {priceChanges.length > 0 && (
            <Badge className="bg-amber-600">{priceChanges.length} Pending</Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {priceChanges.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Shield className="h-12 w-12 mx-auto mb-3 text-blue-500" />
            <p>No pending price changes</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Detected</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Provider</TableHead>
                <TableHead>Current</TableHead>
                <TableHead>New Price</TableHead>
                <TableHead>Change</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {priceChanges.map((change) => {
                const isIncrease = change.new_cost > change.current_cost;
                const changePercent = ((change.new_cost - change.current_cost) / change.current_cost * 100).toFixed(1);
                
                return (
                  <TableRow key={change.id}>
                    <TableCell className="text-sm">
                      {new Date(change.detected_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{serviceLabels[change.service_type]}</Badge>
                    </TableCell>
                    <TableCell className="font-medium">{change.provider_name}</TableCell>
                    <TableCell className="font-mono">${change.current_cost.toFixed(2)}</TableCell>
                    <TableCell className="font-mono font-bold">${change.new_cost.toFixed(2)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Activity className="h-4 w-4 text-blue-600" />
                        <span className="text-gray-900">
                          {changePercent}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                          onClick={() => approveMutation.mutate({ id: change.id, changeData: change })}
                        >
                          <Shield className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => rejectMutation.mutate({ id: change.id })}
                        >
                          Reject
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}