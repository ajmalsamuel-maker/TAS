import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Play, Save, Plus, Trash2, Settings, GitBranch, 
  CheckCircle, XCircle, AlertCircle, Database, Code, Globe 
} from 'lucide-react';

const NODE_TYPES = {
  start: { icon: Play, color: 'bg-green-100 text-green-800', label: 'Start' },
  data_source: { icon: Database, color: 'bg-blue-100 text-blue-800', label: 'Data Source' },
  api_call: { icon: Globe, color: 'bg-cyan-100 text-cyan-800', label: 'API Call' },
  condition: { icon: GitBranch, color: 'bg-yellow-100 text-yellow-800', label: 'Condition' },
  action: { icon: Settings, color: 'bg-purple-100 text-purple-800', label: 'Action' },
  approve: { icon: CheckCircle, color: 'bg-green-100 text-green-800', label: 'Approve' },
  reject: { icon: XCircle, color: 'bg-red-100 text-red-800', label: 'Reject' },
  manual_review: { icon: AlertCircle, color: 'bg-orange-100 text-orange-800', label: 'Manual Review' },
  custom_code: { icon: Code, color: 'bg-indigo-100 text-indigo-800', label: 'Custom Code' }
};

const DATA_SOURCES = [
  { id: 'fts_kyb', name: 'FTS KYB Verification', provider: 'FTS' },
  { id: 'fts_aml', name: 'FTS AML Screening', provider: 'FTS' },
  { id: 'facia', name: 'Facia Verification', provider: 'Facia' },
  { id: 'certizen', name: 'Certizen vLEI', provider: 'Certizen' },
  { id: 'gleif', name: 'GLEIF LEI Registry', provider: 'GLEIF' }
];

const CONDITION_OPERATORS = [
  { value: 'equals', label: 'Equals' },
  { value: 'not_equals', label: 'Not Equals' },
  { value: 'greater_than', label: 'Greater Than' },
  { value: 'less_than', label: 'Less Than' },
  { value: 'contains', label: 'Contains' },
  { value: 'not_contains', label: 'Does Not Contain' },
  { value: 'in_list', label: 'In List' },
  { value: 'regex_match', label: 'Regex Match' }
];

export default function PolicyFlowBuilder({ initialWorkflow, onSave }) {
  const [nodes, setNodes] = useState(initialWorkflow?.nodes || [
    { id: 'start', type: 'start', label: 'Start Workflow', position: { x: 50, y: 50 }, config: {} }
  ]);
  const [edges, setEdges] = useState(initialWorkflow?.edges || []);
  const [selectedNode, setSelectedNode] = useState(null);
  const [draggedNodeType, setDraggedNodeType] = useState(null);

  const addNode = useCallback((type, x = 300, y = 200) => {
    const newNode = {
      id: `node_${Date.now()}`,
      type,
      label: NODE_TYPES[type].label,
      position: { x, y },
      config: type === 'data_source' ? { source: '', timeout: 5000 } :
             type === 'api_call' ? { url: '', method: 'GET', headers: {}, body: '', timeout: 10000 } :
             type === 'condition' ? { field: '', operator: 'equals', value: '', branches: [{ label: 'true', condition: 'true' }, { label: 'false', condition: 'false' }] } :
             type === 'custom_code' ? { code: '' } : {}
    };
    setNodes([...nodes, newNode]);
  }, [nodes]);

  const deleteNode = useCallback((nodeId) => {
    setNodes(nodes.filter(n => n.id !== nodeId));
    setEdges(edges.filter(e => e.source !== nodeId && e.target !== nodeId));
    setSelectedNode(null);
  }, [nodes, edges]);

  const updateNodeConfig = useCallback((nodeId, config) => {
    setNodes(nodes.map(n => n.id === nodeId ? { ...n, config: { ...n.config, ...config } } : n));
  }, [nodes]);

  const connectNodes = useCallback((sourceId, targetId, label = '') => {
    const edgeExists = edges.find(e => e.source === sourceId && e.target === targetId);
    if (edgeExists) return;
    
    setEdges([...edges, { 
      id: `edge_${Date.now()}`, 
      source: sourceId, 
      target: targetId, 
      label 
    }]);
  }, [edges]);

  const handleSave = () => {
    onSave({ nodes, edges });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (draggedNodeType) {
      const rect = e.currentTarget.getBoundingClientRect();
      addNode(draggedNodeType, e.clientX - rect.left, e.clientY - rect.top);
      setDraggedNodeType(null);
    }
  };

  return (
    <div className="grid md:grid-cols-4 gap-6 h-[600px]">
      {/* Node Palette */}
      <Card className="md:col-span-1">
        <CardHeader>
          <CardTitle className="text-sm">Node Types</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {Object.entries(NODE_TYPES).map(([type, config]) => {
            const Icon = config.icon;
            return (
              <div
                key={type}
                draggable
                onDragStart={() => setDraggedNodeType(type)}
                className={`p-3 rounded-lg border-2 border-dashed cursor-move hover:shadow-md transition-all ${config.color}`}
              >
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4" />
                  <span className="text-xs font-medium">{config.label}</span>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Canvas */}
      <Card className="md:col-span-2">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-sm">Workflow Canvas</CardTitle>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={handleSave}>
              <Save className="w-4 h-4 mr-1" />
              Save
            </Button>
          </div>
        </CardHeader>
        <CardContent
          className="relative bg-gray-50 h-[500px] overflow-auto"
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          {/* Nodes */}
          {nodes.map((node) => {
            const NodeIcon = NODE_TYPES[node.type]?.icon || Settings;
            const isSelected = selectedNode?.id === node.id;
            
            return (
              <div
                key={node.id}
                className={`absolute p-4 rounded-lg shadow-md cursor-pointer transition-all ${
                  NODE_TYPES[node.type]?.color || 'bg-gray-100'
                } ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
                style={{ left: node.position.x, top: node.position.y }}
                onClick={() => setSelectedNode(node)}
              >
                <div className="flex items-center gap-2 mb-2">
                  <NodeIcon className="w-4 h-4" />
                  <span className="text-xs font-semibold">{node.label}</span>
                </div>
                {node.type === 'data_source' && node.config.source && (
                  <Badge variant="outline" className="text-xs">
                    {DATA_SOURCES.find(s => s.id === node.config.source)?.name}
                  </Badge>
                )}
                {node.type === 'condition' && node.config.field && (
                  <div className="text-xs text-gray-600 mt-1">
                    {node.config.field} {node.config.operator} {node.config.value}
                  </div>
                )}
              </div>
            );
          })}

          {/* Edges - Simple arrows */}
          <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
            {edges.map((edge) => {
              const source = nodes.find(n => n.id === edge.source);
              const target = nodes.find(n => n.id === edge.target);
              if (!source || !target) return null;

              const x1 = source.position.x + 60;
              const y1 = source.position.y + 30;
              const x2 = target.position.x + 60;
              const y2 = target.position.y + 30;

              return (
                <g key={edge.id}>
                  <line
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="#6B7280"
                    strokeWidth="2"
                    markerEnd="url(#arrowhead)"
                  />
                  {edge.label && (
                    <text
                      x={(x1 + x2) / 2}
                      y={(y1 + y2) / 2}
                      fill="#4B5563"
                      fontSize="10"
                      textAnchor="middle"
                    >
                      {edge.label}
                    </text>
                  )}
                </g>
              );
            })}
            <defs>
              <marker
                id="arrowhead"
                markerWidth="10"
                markerHeight="10"
                refX="9"
                refY="3"
                orient="auto"
              >
                <polygon points="0 0, 10 3, 0 6" fill="#6B7280" />
              </marker>
            </defs>
          </svg>
        </CardContent>
      </Card>

      {/* Node Properties */}
      <Card className="md:col-span-1">
        <CardHeader>
          <CardTitle className="text-sm">Node Properties</CardTitle>
        </CardHeader>
        <CardContent>
          {selectedNode ? (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-gray-700">Node ID</label>
                <Input value={selectedNode.id} disabled className="text-xs mt-1" />
              </div>

              <div>
                <label className="text-xs font-medium text-gray-700">Label</label>
                <Input
                  value={selectedNode.label}
                  onChange={(e) => setNodes(nodes.map(n => 
                    n.id === selectedNode.id ? { ...n, label: e.target.value } : n
                  ))}
                  className="text-xs mt-1"
                />
              </div>

              {selectedNode.type === 'data_source' && (
                <>
                  <div>
                    <label className="text-xs font-medium text-gray-700">Data Source</label>
                    <Select
                      value={selectedNode.config.source}
                      onValueChange={(value) => updateNodeConfig(selectedNode.id, { source: value })}
                    >
                      <SelectTrigger className="text-xs mt-1">
                        <SelectValue placeholder="Select source" />
                      </SelectTrigger>
                      <SelectContent>
                        {DATA_SOURCES.map(source => (
                          <SelectItem key={source.id} value={source.id} className="text-xs">
                            {source.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-700">Timeout (ms)</label>
                    <Input
                      type="number"
                      value={selectedNode.config.timeout}
                      onChange={(e) => updateNodeConfig(selectedNode.id, { timeout: parseInt(e.target.value) })}
                      className="text-xs mt-1"
                    />
                  </div>
                </>
              )}

              {selectedNode.type === 'api_call' && (
                <>
                  <div>
                    <label className="text-xs font-medium text-gray-700">API URL</label>
                    <Input
                      value={selectedNode.config.url}
                      onChange={(e) => updateNodeConfig(selectedNode.id, { url: e.target.value })}
                      placeholder="https://api.example.com/endpoint"
                      className="text-xs mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-700">Method</label>
                    <Select
                      value={selectedNode.config.method}
                      onValueChange={(value) => updateNodeConfig(selectedNode.id, { method: value })}
                    >
                      <SelectTrigger className="text-xs mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="GET">GET</SelectItem>
                        <SelectItem value="POST">POST</SelectItem>
                        <SelectItem value="PUT">PUT</SelectItem>
                        <SelectItem value="DELETE">DELETE</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-700">Request Body (JSON)</label>
                    <Input
                      value={selectedNode.config.body}
                      onChange={(e) => updateNodeConfig(selectedNode.id, { body: e.target.value })}
                      placeholder='{"key": "{{context.field}}"}'
                      className="text-xs mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-700">Timeout (ms)</label>
                    <Input
                      type="number"
                      value={selectedNode.config.timeout}
                      onChange={(e) => updateNodeConfig(selectedNode.id, { timeout: parseInt(e.target.value) })}
                      className="text-xs mt-1"
                    />
                  </div>
                </>
              )}

              {selectedNode.type === 'condition' && (
                <>
                  <div>
                    <label className="text-xs font-medium text-gray-700">Field Path</label>
                    <Input
                      value={selectedNode.config.field}
                      onChange={(e) => updateNodeConfig(selectedNode.id, { field: e.target.value })}
                      placeholder="e.g., response.risk_score"
                      className="text-xs mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-700">Operator</label>
                    <Select
                      value={selectedNode.config.operator}
                      onValueChange={(value) => updateNodeConfig(selectedNode.id, { operator: value })}
                    >
                      <SelectTrigger className="text-xs mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {CONDITION_OPERATORS.map(op => (
                          <SelectItem key={op.value} value={op.value} className="text-xs">
                            {op.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-700">Value</label>
                    <Input
                      value={selectedNode.config.value}
                      onChange={(e) => updateNodeConfig(selectedNode.id, { value: e.target.value })}
                      className="text-xs mt-1"
                    />
                  </div>
                  <div className="bg-yellow-50 border border-yellow-200 rounded p-2">
                    <p className="text-xs text-yellow-800">
                      Connect branches labeled "true" and "false" to route workflow based on condition
                    </p>
                  </div>
                </>
              )}

              <div className="pt-4 border-t space-y-2">
                <label className="text-xs font-medium text-gray-700">Connect to Node</label>
                <Select onValueChange={(targetId) => connectNodes(selectedNode.id, targetId)}>
                  <SelectTrigger className="text-xs">
                    <SelectValue placeholder="Select target" />
                  </SelectTrigger>
                  <SelectContent>
                    {nodes.filter(n => n.id !== selectedNode.id).map(node => (
                      <SelectItem key={node.id} value={node.id} className="text-xs">
                        {node.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedNode.type !== 'start' && (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => deleteNode(selectedNode.id)}
                  className="w-full"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Delete Node
                </Button>
              )}
            </div>
          ) : (
            <p className="text-xs text-gray-500">Select a node to edit its properties</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}