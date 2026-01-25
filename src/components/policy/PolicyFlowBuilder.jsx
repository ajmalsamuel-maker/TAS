import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { 
  Play, Save, Plus, Trash2, Settings, GitBranch, 
  CheckCircle, XCircle, AlertCircle, Database, Code, Globe,
  ZoomIn, ZoomOut, Maximize2, Bug, Clock, ArrowRight, Copy
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
  const [zoom, setZoom] = useState(1);
  const [testMode, setTestMode] = useState(false);
  const [testData, setTestData] = useState('{}');
  const [executionResults, setExecutionResults] = useState(null);
  const [showExecutionHistory, setShowExecutionHistory] = useState(false);

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

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.1, 2));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.1, 0.5));
  const handleZoomReset = () => setZoom(1);

  const duplicateNode = useCallback((node) => {
    const newNode = {
      ...node,
      id: `node_${Date.now()}`,
      position: { x: node.position.x + 100, y: node.position.y + 50 }
    };
    setNodes([...nodes, newNode]);
  }, [nodes]);

  const testWorkflow = async () => {
    try {
      const inputData = JSON.parse(testData);
      // Simulate execution
      const results = {};
      nodes.forEach(node => {
        if (node.type === 'data_source' || node.type === 'api_call') {
          results[node.id] = {
            status: 'success',
            executedAt: new Date().toISOString(),
            output: { sample: 'data' }
          };
        }
      });
      setExecutionResults(results);
    } catch (error) {
      alert('Invalid test data JSON');
    }
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
    <div className="grid md:grid-cols-4 gap-6 h-[700px]">
      {/* Node Palette */}
      <Card className="md:col-span-1 overflow-auto">
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
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <CardTitle className="text-sm">Workflow Canvas</CardTitle>
          <div className="flex gap-1">
            <Button size="sm" variant="outline" onClick={handleZoomOut}>
              <ZoomOut className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="outline" onClick={handleZoomReset}>
              {Math.round(zoom * 100)}%
            </Button>
            <Button size="sm" variant="outline" onClick={handleZoomIn}>
              <ZoomIn className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="outline" onClick={() => setTestMode(!testMode)}>
              <Bug className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="outline" onClick={handleSave}>
              <Save className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent
          className="relative bg-gradient-to-br from-gray-50 to-gray-100 h-[580px] overflow-auto"
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          <div style={{ transform: `scale(${zoom})`, transformOrigin: 'top left', transition: 'transform 0.2s' }}>
            {/* Nodes */}
            {nodes.map((node) => {
              const NodeIcon = NODE_TYPES[node.type]?.icon || Settings;
              const isSelected = selectedNode?.id === node.id;
              const hasExecutionResult = executionResults?.[node.id];
              
              return (
                <div
                  key={node.id}
                  className={`absolute p-4 rounded-lg shadow-lg cursor-pointer transition-all border-2 ${
                    NODE_TYPES[node.type]?.color || 'bg-gray-100'
                  } ${isSelected ? 'ring-4 ring-blue-500 border-blue-600' : 'border-transparent'} ${
                    hasExecutionResult ? 'ring-2 ring-green-400' : ''
                  }`}
                  style={{ left: node.position.x, top: node.position.y, minWidth: '180px' }}
                  onClick={() => setSelectedNode(node)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <NodeIcon className="w-4 h-4" />
                      <span className="text-xs font-semibold">{node.label}</span>
                    </div>
                    {hasExecutionResult && (
                      <CheckCircle className="w-3 h-3 text-green-600" />
                    )}
                  </div>
                  {node.type === 'data_source' && node.config.source && (
                    <Badge variant="outline" className="text-xs">
                      {DATA_SOURCES.find(s => s.id === node.config.source)?.name}
                    </Badge>
                  )}
                  {node.type === 'api_call' && node.config.url && (
                    <div className="text-xs text-gray-600 mt-1 truncate">
                      {node.config.method} {node.config.url}
                    </div>
                  )}
                  {node.type === 'condition' && node.config.field && (
                    <div className="text-xs text-gray-600 mt-1">
                      {node.config.field} {node.config.operator} {node.config.value}
                    </div>
                  )}
                  {hasExecutionResult && (
                    <div className="mt-2 pt-2 border-t border-gray-300">
                      <p className="text-xs text-green-700 font-medium">Executed</p>
                      <p className="text-xs text-gray-500">{new Date(hasExecutionResult.executedAt).toLocaleTimeString()}</p>
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
          </div>

          {/* Test Mode Panel */}
          {testMode && (
            <div className="absolute bottom-4 left-4 right-4 bg-white border-2 border-blue-500 rounded-lg shadow-xl p-4 z-10">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-sm flex items-center gap-2">
                  <Bug className="w-4 h-4" />
                  Test Workflow
                </h3>
                <Button size="sm" variant="ghost" onClick={() => setTestMode(false)}>×</Button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium mb-1 block">Input Data (JSON)</label>
                  <Textarea
                    value={testData}
                    onChange={(e) => setTestData(e.target.value)}
                    placeholder='{"name": "Test", "amount": 1000}'
                    className="text-xs font-mono h-20"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium mb-1 block">Execution Results</label>
                  <div className="bg-gray-50 rounded p-2 h-20 overflow-auto text-xs">
                    {executionResults ? (
                      <pre className="text-xs">{JSON.stringify(executionResults, null, 2)}</pre>
                    ) : (
                      <p className="text-gray-500">Run test to see results</p>
                    )}
                  </div>
                </div>
              </div>
              <Button onClick={testWorkflow} size="sm" className="mt-3 bg-blue-600">
                <Play className="w-3 h-3 mr-1" />
                Run Test
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Node Properties */}
      <Card className="md:col-span-1 overflow-auto">
        <CardHeader>
          <CardTitle className="text-sm">Node Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          {selectedNode ? (
            <Tabs defaultValue="config" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="config" className="text-xs">Config</TabsTrigger>
                <TabsTrigger value="data" className="text-xs">Data</TabsTrigger>
                <TabsTrigger value="settings" className="text-xs">Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="config" className="space-y-4 mt-4">
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
                    <div>
                      <label className="text-xs font-medium text-gray-700">Response Mapping</label>
                      <Textarea
                        value={selectedNode.config.mapping || ''}
                        onChange={(e) => updateNodeConfig(selectedNode.id, { mapping: e.target.value })}
                        placeholder="result = response.data"
                        className="text-xs mt-1 font-mono"
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
                      <p className="text-xs text-gray-500 mt-1">Use variables: {'{{input.fieldName}}'}</p>
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
                      <label className="text-xs font-medium text-gray-700">Headers (JSON)</label>
                      <Textarea
                        value={selectedNode.config.headers || '{}'}
                        onChange={(e) => updateNodeConfig(selectedNode.id, { headers: e.target.value })}
                        placeholder='{"Authorization": "Bearer {{token}}"}'
                        className="text-xs mt-1 font-mono h-20"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-700">Request Body (JSON)</label>
                      <Textarea
                        value={selectedNode.config.body}
                        onChange={(e) => updateNodeConfig(selectedNode.id, { body: e.target.value })}
                        placeholder='{"key": "{{context.field}}"}'
                        className="text-xs mt-1 font-mono h-20"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-700">Response Path</label>
                      <Input
                        value={selectedNode.config.responsePath || ''}
                        onChange={(e) => updateNodeConfig(selectedNode.id, { responsePath: e.target.value })}
                        placeholder="data.result"
                        className="text-xs mt-1"
                      />
                      <p className="text-xs text-gray-500 mt-1">Extract specific field from response</p>
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
              </TabsContent>

              <TabsContent value="data" className="space-y-3 mt-4">
                <div className="bg-gray-50 rounded p-3">
                  <p className="text-xs font-medium mb-2">Available Variables</p>
                  <div className="space-y-1 text-xs font-mono">
                    <p className="text-gray-600">{'{{input.fieldName}}'} - Input data</p>
                    <p className="text-gray-600">{'{{results.nodeId}}'} - Previous node results</p>
                    <p className="text-gray-600">{'{{context.variable}}'} - Context variables</p>
                  </div>
                </div>
                {executionResults?.[selectedNode.id] && (
                  <div>
                    <p className="text-xs font-medium mb-2">Execution Output</p>
                    <pre className="bg-gray-50 p-2 rounded text-xs overflow-auto max-h-40">
                      {JSON.stringify(executionResults[selectedNode.id].output, null, 2)}
                    </pre>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="settings" className="space-y-3 mt-4">
                <div>
                  <label className="text-xs font-medium text-gray-700">Error Handling</label>
                  <Select
                    value={selectedNode.config.errorHandling || 'stop'}
                    onValueChange={(value) => updateNodeConfig(selectedNode.id, { errorHandling: value })}
                  >
                    <SelectTrigger className="text-xs mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="stop">Stop Workflow</SelectItem>
                      <SelectItem value="continue">Continue</SelectItem>
                      <SelectItem value="retry">Retry</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {selectedNode.config.errorHandling === 'retry' && (
                  <div>
                    <label className="text-xs font-medium text-gray-700">Retry Count</label>
                    <Input
                      type="number"
                      value={selectedNode.config.retryCount || 3}
                      onChange={(e) => updateNodeConfig(selectedNode.id, { retryCount: parseInt(e.target.value) })}
                      className="text-xs mt-1"
                    />
                  </div>
                )}
                <div className="flex gap-2 pt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => duplicateNode(selectedNode)}
                    className="flex-1"
                  >
                    <Copy className="w-3 h-3 mr-1" />
                    Duplicate
                  </Button>
                  {selectedNode.type !== 'start' && (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteNode(selectedNode.id)}
                      className="flex-1"
                    >
                      <Trash2 className="w-3 h-3 mr-1" />
                      Delete
                    </Button>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          ) : (
            <p className="text-xs text-gray-500">Select a node to edit its properties</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}