import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search } from 'lucide-react';

const NODE_CATEGORIES = {
  triggers: ['start', 'schedule', 'webhook'],
  data: ['data_source', 'api_call', 'database'],
  logic: ['condition', 'switch', 'merge'],
  actions: ['action', 'approve', 'reject', 'manual_review'],
  transform: ['map', 'filter', 'aggregate'],
  output: ['notification', 'webhook_send', 'custom_code']
};

export default function NodeLibrary({ onNodeSelect }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">Node Library</CardTitle>
        <Input
          placeholder="Search nodes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="text-xs mt-2"
          icon={<Search className="h-3 w-3" />}
        />
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-1 mb-3">
          <Badge
            variant={selectedCategory === 'all' ? 'default' : 'outline'}
            className="cursor-pointer text-xs"
            onClick={() => setSelectedCategory('all')}
          >
            All
          </Badge>
          {Object.keys(NODE_CATEGORIES).map(category => (
            <Badge
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              className="cursor-pointer text-xs"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Badge>
          ))}
        </div>
        
        <div className="space-y-2 max-h-96 overflow-auto">
          {/* Node list would be filtered and displayed here */}
        </div>
      </CardContent>
    </Card>
  );
}