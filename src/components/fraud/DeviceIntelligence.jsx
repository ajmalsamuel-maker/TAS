import React from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Smartphone, Monitor, AlertCircle } from 'lucide-react';

export default function DeviceIntelligence() {
  const { data: transactions = [] } = useQuery({
    queryKey: ['transactions'],
    queryFn: () => base44.entities.Transaction.list('-created_date', 100),
    initialData: []
  });

  // Group by device fingerprint
  const deviceStats = transactions.reduce((acc, tx) => {
    const fingerprint = tx.device_fingerprint || 'unknown';
    if (!acc[fingerprint]) {
      acc[fingerprint] = {
        fingerprint,
        count: 0,
        totalAmount: 0,
        countries: new Set(),
        ips: new Set(),
        flagged: 0
      };
    }
    acc[fingerprint].count++;
    acc[fingerprint].totalAmount += tx.amount || 0;
    if (tx.counterparty_country) acc[fingerprint].countries.add(tx.counterparty_country);
    if (tx.ip_address) acc[fingerprint].ips.add(tx.ip_address);
    if (tx.status === 'flagged') acc[fingerprint].flagged++;
    return acc;
  }, {});

  const devices = Object.values(deviceStats).sort((a, b) => b.count - a.count);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Device Intelligence</CardTitle>
        <p className="text-sm text-gray-600">
          Track device fingerprints and identify suspicious device behavior
        </p>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Device Fingerprint</TableHead>
              <TableHead>Transactions</TableHead>
              <TableHead>Total Amount</TableHead>
              <TableHead>Unique IPs</TableHead>
              <TableHead>Countries</TableHead>
              <TableHead>Flagged</TableHead>
              <TableHead>Risk</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {devices.slice(0, 20).map((device) => {
              const riskScore = device.flagged / device.count;
              const riskLevel = riskScore > 0.5 ? 'high' : riskScore > 0.2 ? 'medium' : 'low';
              
              return (
                <TableRow key={device.fingerprint}>
                  <TableCell className="font-mono text-xs">
                    {device.fingerprint.substring(0, 16)}...
                  </TableCell>
                  <TableCell>{device.count}</TableCell>
                  <TableCell className="font-semibold">
                    ${device.totalAmount.toLocaleString()}
                  </TableCell>
                  <TableCell>{device.ips.size}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {Array.from(device.countries).slice(0, 3).map((country) => (
                        <Badge key={country} variant="outline" className="text-xs">
                          {country}
                        </Badge>
                      ))}
                      {device.countries.size > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{device.countries.size - 3}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {device.flagged > 0 ? (
                      <span className="text-red-600 font-semibold">{device.flagged}</span>
                    ) : (
                      <span className="text-gray-400">0</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge className={
                      riskLevel === 'high' ? 'bg-red-100 text-red-800' :
                      riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }>
                      {riskLevel}
                    </Badge>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}