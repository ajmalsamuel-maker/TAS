import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  AlertCircle, Clock, User, ArrowUp, Search, Filter,
  ChevronRight, TrendingUp, CheckCircle2
} from 'lucide-react';
import { toast } from 'sonner';
import CaseDetail from './CaseDetail';

const PRIORITY_COLORS = {
  low: 'bg-blue-100 text-blue-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-orange-100 text-orange-800',
  critical: 'bg-red-100 text-red-800'
};

const STATUS_COLORS = {
  new: 'bg-purple-100 text-purple-800',
  assigned: 'bg-blue-100 text-blue-800',
  in_progress: 'bg-yellow-100 text-yellow-800',
  pending_info: 'bg-gray-100 text-gray-800',
  escalated: 'bg-red-100 text-red-800',
  resolved: 'bg-green-100 text-green-800',
  closed: 'bg-gray-100 text-gray-800'
};

const SLA_COLORS = {
  on_time: 'text-green-600',
  at_risk: 'text-yellow-600',
  breached: 'text-red-600'
};

export default function CaseQueue({ user }) {
  const [selectedCase, setSelectedCase] = useState(null);
  const [filters, setFilters] = useState({
    status: 'all',
    priority: 'all',
    assigned: 'all',
    search: ''
  });

  const queryClient = useQueryClient();

  const { data: cases = [], isLoading } = useQuery({
    queryKey: ['cases'],
    queryFn: () => base44.entities.Case.list('-created_date'),
    initialData: [],
    refetchInterval: 30000
  });

  const { data: users = [] } = useQuery({
    queryKey: ['users'],
    queryFn: () => base44.entities.User.list(),
    initialData: []
  });

  const assignCaseMutation = useMutation({
    mutationFn: async ({ caseId, assigneeEmail }) => {
      const response = await base44.functions.invoke('assignCase', {
        case_id: caseId,
        assignee_email: assigneeEmail
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['cases']);
      toast.success('Case assigned successfully');
    }
  });

  const claimCase = async (caseItem) => {
    assignCaseMutation.mutate({
      caseId: caseItem.id,
      assigneeEmail: user.email
    });
  };

  const filteredCases = cases.filter(c => {
    const statusMatch = filters.status === 'all' || c.status === filters.status;
    const priorityMatch = filters.priority === 'all' || c.priority === filters.priority;
    const assignedMatch = filters.assigned === 'all' ||
      (filters.assigned === 'me' && c.assigned_to === user?.email) ||
      (filters.assigned === 'unassigned' && !c.assigned_to) ||
      (filters.assigned === 'assigned' && c.assigned_to);
    const searchMatch = !filters.search || 
      c.subject?.toLowerCase().includes(filters.search.toLowerCase()) ||
      c.case_number?.toLowerCase().includes(filters.search.toLowerCase());
    
    return statusMatch && priorityMatch && assignedMatch && searchMatch;
  });

  const stats = {
    total: cases.length,
    myOpen: cases.filter(c => c.assigned_to === user?.email && c.status !== 'resolved' && c.status !== 'closed').length,
    unassigned: cases.filter(c => !c.assigned_to && c.status !== 'resolved').length,
    breached: cases.filter(c => c.sla_status === 'breached').length
  };

  const getSLATimeRemaining = (dueDate) => {
    if (!dueDate) return null;
    const now = new Date();
    const due = new Date(dueDate);
    const diffHours = Math.round((due - now) / (1000 * 60 * 60));
    
    if (diffHours < 0) return `${Math.abs(diffHours)}h overdue`;
    if (diffHours < 24) return `${diffHours}h remaining`;
    return `${Math.round(diffHours / 24)}d remaining`;
  };

  if (selectedCase) {
    return (
      <CaseDetail
        caseItem={selectedCase}
        user={user}
        onClose={() => setSelectedCase(null)}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Cases</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">My Open Cases</p>
                <p className="text-2xl font-bold">{stats.myOpen}</p>
              </div>
              <User className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Unassigned</p>
                <p className="text-2xl font-bold">{stats.unassigned}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">SLA Breached</p>
                <p className="text-2xl font-bold text-red-600">{stats.breached}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Case Queue</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-5 gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search cases..."
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              />
            </div>
            <Select value={filters.status} onValueChange={(v) => setFilters({ ...filters, status: v })}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="assigned">Assigned</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="escalated">Escalated</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filters.priority} onValueChange={(v) => setFilters({ ...filters, priority: v })}>
              <SelectTrigger>
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filters.assigned} onValueChange={(v) => setFilters({ ...filters, assigned: v })}>
              <SelectTrigger>
                <SelectValue placeholder="Assignment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Cases</SelectItem>
                <SelectItem value="me">My Cases</SelectItem>
                <SelectItem value="unassigned">Unassigned</SelectItem>
                <SelectItem value="assigned">Assigned to Others</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={() => setFilters({ status: 'all', priority: 'all', assigned: 'all', search: '' })}>
              Clear Filters
            </Button>
          </div>

          {/* Cases Table */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Case #</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Assigned To</TableHead>
                  <TableHead>SLA</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCases.map((caseItem) => (
                  <TableRow key={caseItem.id} className="cursor-pointer hover:bg-gray-50">
                    <TableCell className="font-mono text-sm">
                      {caseItem.case_number || caseItem.id.substring(0, 8)}
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{caseItem.subject}</p>
                        <p className="text-xs text-gray-500">{caseItem.description?.substring(0, 60)}...</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {caseItem.type.replace(/_/g, ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={PRIORITY_COLORS[caseItem.priority]}>
                        {caseItem.priority === 'critical' && <ArrowUp className="w-3 h-3 mr-1" />}
                        {caseItem.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={STATUS_COLORS[caseItem.status]}>
                        {caseItem.status.replace(/_/g, ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {caseItem.assigned_to ? (
                        <span className="text-sm">{caseItem.assigned_to}</span>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            claimCase(caseItem);
                          }}
                        >
                          Claim
                        </Button>
                      )}
                    </TableCell>
                    <TableCell>
                      {caseItem.sla_due_date && (
                        <div className={`text-xs font-medium ${SLA_COLORS[caseItem.sla_status]}`}>
                          {getSLATimeRemaining(caseItem.sla_due_date)}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setSelectedCase(caseItem)}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {filteredCases.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                No cases found matching your filters
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}