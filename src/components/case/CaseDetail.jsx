import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  ArrowLeft, MessageSquare, Upload, Users, ArrowUpCircle,
  CheckCircle2, XCircle, AlertCircle, Clock, Tag
} from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';

export default function CaseDetail({ caseItem, user, onClose }) {
  const [newNote, setNewNote] = useState('');
  const [newTag, setNewTag] = useState('');
  const [resolutionText, setResolutionText] = useState('');
  const [resolutionAction, setResolutionAction] = useState('approved');

  const queryClient = useQueryClient();

  const { data: notes = [] } = useQuery({
    queryKey: ['case-notes', caseItem.id],
    queryFn: () => base44.entities.CaseNote.filter({ case_id: caseItem.id }),
    initialData: []
  });

  const { data: users = [] } = useQuery({
    queryKey: ['users'],
    queryFn: () => base44.entities.User.list(),
    initialData: []
  });

  const addNoteMutation = useMutation({
    mutationFn: (noteData) => base44.entities.CaseNote.create(noteData),
    onSuccess: () => {
      queryClient.invalidateQueries(['case-notes', caseItem.id]);
      setNewNote('');
      toast.success('Note added');
    }
  });

  const updateCaseMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.Case.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['cases']);
      toast.success('Case updated');
    }
  });

  const handleAddNote = () => {
    if (!newNote.trim()) return;
    
    addNoteMutation.mutate({
      case_id: caseItem.id,
      author_email: user.email,
      author_name: user.full_name,
      note_type: 'comment',
      content: newNote,
      is_internal: true
    });
  };

  const handleStatusChange = async (newStatus) => {
    await updateCaseMutation.mutateAsync({
      id: caseItem.id,
      data: { status: newStatus }
    });

    addNoteMutation.mutate({
      case_id: caseItem.id,
      author_email: user.email,
      author_name: user.full_name,
      note_type: 'status_change',
      content: `Status changed from ${caseItem.status} to ${newStatus}`,
      metadata: { old_value: caseItem.status, new_value: newStatus }
    });
  };

  const handleEscalate = async () => {
    const supervisor = users.find(u => u.role === 'admin' && u.email !== user.email);
    
    if (!supervisor) {
      toast.error('No supervisor found for escalation');
      return;
    }

    await updateCaseMutation.mutateAsync({
      id: caseItem.id,
      data: { 
        status: 'escalated',
        escalated_to: supervisor.email,
        escalation_reason: 'Manual escalation by investigator'
      }
    });

    addNoteMutation.mutate({
      case_id: caseItem.id,
      author_email: user.email,
      author_name: user.full_name,
      note_type: 'escalation',
      content: `Case escalated to ${supervisor.full_name} (${supervisor.email})`
    });
  };

  const handleResolve = async () => {
    if (!resolutionText.trim()) {
      toast.error('Please provide resolution notes');
      return;
    }

    const resolvedAt = new Date();
    const createdAt = new Date(caseItem.created_date);
    const hoursToResolve = (resolvedAt - createdAt) / (1000 * 60 * 60);

    await updateCaseMutation.mutateAsync({
      id: caseItem.id,
      data: { 
        status: 'resolved',
        resolution: resolutionText,
        resolution_action: resolutionAction,
        resolved_at: resolvedAt.toISOString(),
        resolved_by: user.email,
        time_to_resolve_hours: Math.round(hoursToResolve * 100) / 100
      }
    });

    addNoteMutation.mutate({
      case_id: caseItem.id,
      author_email: user.email,
      author_name: user.full_name,
      note_type: 'resolution',
      content: `Case resolved: ${resolutionAction}\n\n${resolutionText}`
    });

    toast.success('Case resolved');
  };

  const handleAddTag = () => {
    if (!newTag.trim()) return;
    
    const currentTags = caseItem.tags || [];
    if (currentTags.includes(newTag)) {
      toast.error('Tag already exists');
      return;
    }

    updateCaseMutation.mutate({
      id: caseItem.id,
      data: { tags: [...currentTags, newTag] }
    });
    setNewTag('');
  };

  const handleRemoveTag = (tag) => {
    const currentTags = caseItem.tags || [];
    updateCaseMutation.mutate({
      id: caseItem.id,
      data: { tags: currentTags.filter(t => t !== tag) }
    });
  };

  const isResolved = caseItem.status === 'resolved' || caseItem.status === 'closed';

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onClose}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Queue
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-6">
          {/* Case Header */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl">{caseItem.subject}</CardTitle>
                  <p className="text-sm text-gray-500 mt-1">
                    Case #{caseItem.case_number || caseItem.id.substring(0, 8)}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Badge className="bg-purple-100 text-purple-800">
                    {caseItem.type.replace(/_/g, ' ')}
                  </Badge>
                  <Badge className={caseItem.priority === 'critical' ? 'bg-red-500 text-white' : 'bg-yellow-100 text-yellow-800'}>
                    {caseItem.priority}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">{caseItem.description}</p>
              
              {caseItem.context_data && (
                <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                  <p className="text-xs font-semibold text-gray-700 mb-2">Context Data</p>
                  <pre className="text-xs text-gray-600 overflow-auto">
                    {JSON.stringify(caseItem.context_data, null, 2)}
                  </pre>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Activity Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Activity Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 mb-6">
                {notes.map((note) => (
                  <div key={note.id} className="border-l-2 border-blue-500 pl-4 pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-sm">{note.author_name}</p>
                        <Badge variant="outline" className="text-xs">
                          {note.note_type.replace(/_/g, ' ')}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-500">
                        {format(new Date(note.created_date), 'MMM d, yyyy HH:mm')}
                      </p>
                    </div>
                    <p className="text-sm text-gray-700 whitespace-pre-wrap">{note.content}</p>
                  </div>
                ))}
              </div>

              {!isResolved && (
                <div className="space-y-3">
                  <Textarea
                    placeholder="Add a note or comment..."
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    rows={3}
                  />
                  <Button onClick={handleAddNote} disabled={!newNote.trim()}>
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Add Note
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Resolution */}
          {!isResolved && caseItem.status !== 'new' && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Resolve Case</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Select value={resolutionAction} onValueChange={setResolutionAction}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="approved">Approve</SelectItem>
                    <SelectItem value="rejected">Reject</SelectItem>
                    <SelectItem value="escalated">Escalate</SelectItem>
                    <SelectItem value="more_info_needed">More Info Needed</SelectItem>
                    <SelectItem value="no_action">No Action</SelectItem>
                  </SelectContent>
                </Select>
                <Textarea
                  placeholder="Resolution notes and reasoning..."
                  value={resolutionText}
                  onChange={(e) => setResolutionText(e.target.value)}
                  rows={4}
                />
                <div className="flex gap-2">
                  <Button onClick={handleResolve} className="bg-green-600 hover:bg-green-700">
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Resolve Case
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status & Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Status & Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-xs font-medium text-gray-700">Status</label>
                <Select 
                  value={caseItem.status} 
                  onValueChange={handleStatusChange}
                  disabled={isResolved}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="assigned">Assigned</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="pending_info">Pending Info</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {!isResolved && (
                <Button 
                  variant="outline" 
                  onClick={handleEscalate}
                  className="w-full"
                >
                  <ArrowUpCircle className="w-4 h-4 mr-2" />
                  Escalate Case
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Case Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <p className="text-xs text-gray-500">Created</p>
                <p className="font-medium">{format(new Date(caseItem.created_date), 'PPpp')}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Assigned To</p>
                <p className="font-medium">{caseItem.assigned_to || 'Unassigned'}</p>
              </div>
              {caseItem.sla_due_date && (
                <div>
                  <p className="text-xs text-gray-500">SLA Deadline</p>
                  <p className={`font-medium ${caseItem.sla_status === 'breached' ? 'text-red-600' : ''}`}>
                    {format(new Date(caseItem.sla_due_date), 'PPpp')}
                  </p>
                </div>
              )}
              {caseItem.resolved_at && (
                <div>
                  <p className="text-xs text-gray-500">Resolved</p>
                  <p className="font-medium">{format(new Date(caseItem.resolved_at), 'PPpp')}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Time to resolve: {caseItem.time_to_resolve_hours?.toFixed(1)}h
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Tags */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Tag className="w-4 h-4" />
                Tags
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex flex-wrap gap-2">
                {(caseItem.tags || []).map((tag) => (
                  <Badge key={tag} variant="outline" className="cursor-pointer" onClick={() => handleRemoveTag(tag)}>
                    {tag} ×
                  </Badge>
                ))}
              </div>
              {!isResolved && (
                <div className="flex gap-2">
                  <Input
                    placeholder="Add tag..."
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                  />
                  <Button size="sm" onClick={handleAddTag}>Add</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}