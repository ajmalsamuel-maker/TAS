import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, ToggleLeft, ToggleRight, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

export default function FraudModels({ models }) {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    model_type: 'anomaly_detection',
    confidence_threshold: 0.7,
    severity: 'medium',
    auto_block: false,
    features: []
  });

  const queryClient = useQueryClient();

  const createModelMutation = useMutation({
    mutationFn: (data) => base44.entities.FraudModel.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries(['fraud-models']);
      setShowForm(false);
      resetForm();
      toast.success('Model created');
    }
  });

  const updateModelMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.FraudModel.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['fraud-models']);
      toast.success('Model updated');
    }
  });

  const deleteModelMutation = useMutation({
    mutationFn: (id) => base44.entities.FraudModel.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['fraud-models']);
      toast.success('Model deleted');
    }
  });

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      model_type: 'anomaly_detection',
      confidence_threshold: 0.7,
      severity: 'medium',
      auto_block: false,
      features: []
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createModelMutation.mutate(formData);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Fraud Detection Models</CardTitle>
          <p className="text-sm text-gray-600 mt-2">
            Configure AI-powered fraud detection models
          </p>
        </div>
        <Button onClick={() => setShowForm(!showForm)}>
          <Plus className="w-4 h-4 mr-2" />
          New Model
        </Button>
      </CardHeader>
      <CardContent>
        {showForm && (
          <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded-lg space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <Input
                placeholder="Model Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <Select
                value={formData.model_type}
                onValueChange={(v) => setFormData({ ...formData, model_type: v })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="device_fingerprint">Device Fingerprint</SelectItem>
                  <SelectItem value="behavioral_analysis">Behavioral Analysis</SelectItem>
                  <SelectItem value="anomaly_detection">Anomaly Detection</SelectItem>
                  <SelectItem value="velocity_check">Velocity Check</SelectItem>
                  <SelectItem value="pattern_recognition">Pattern Recognition</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={2}
            />

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-medium text-gray-700">Confidence Threshold</label>
                <Input
                  type="number"
                  min="0"
                  max="1"
                  step="0.1"
                  value={formData.confidence_threshold}
                  onChange={(e) => setFormData({ ...formData, confidence_threshold: parseFloat(e.target.value) })}
                />
              </div>
              <Select
                value={formData.severity}
                onValueChange={(v) => setFormData({ ...formData, severity: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.auto_block}
                  onChange={(e) => setFormData({ ...formData, auto_block: e.target.checked })}
                  className="w-4 h-4"
                />
                <span className="text-sm">Auto-block</span>
              </label>
            </div>

            <div className="flex gap-2">
              <Button type="submit">Create Model</Button>
              <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
            </div>
          </form>
        )}

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Model Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Threshold</TableHead>
              <TableHead>Severity</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Detections</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {models.map((model) => (
              <TableRow key={model.id}>
                <TableCell>
                  <div>
                    <p className="font-medium">{model.name}</p>
                    <p className="text-xs text-gray-500">{model.description}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{model.model_type.replace(/_/g, ' ')}</Badge>
                </TableCell>
                <TableCell>{(model.confidence_threshold * 100).toFixed(0)}%</TableCell>
                <TableCell>
                  <Badge className={
                    model.severity === 'critical' ? 'bg-red-100 text-red-800' :
                    model.severity === 'high' ? 'bg-orange-100 text-orange-800' :
                    'bg-yellow-100 text-yellow-800'
                  }>
                    {model.severity}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge className={model.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                    {model.is_active ? 'Active' : 'Inactive'}
                  </Badge>
                </TableCell>
                <TableCell>{model.detection_count || 0}</TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => updateModelMutation.mutate({
                        id: model.id,
                        data: { is_active: !model.is_active }
                      })}
                    >
                      {model.is_active ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => deleteModelMutation.mutate(model.id)}
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}