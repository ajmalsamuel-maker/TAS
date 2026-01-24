import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Globe, Plus, Edit, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'fr', name: 'Français' },
  { code: 'es', name: 'Español' },
  { code: 'de', name: 'Deutsch' },
  { code: 'zh', name: '中文' },
  { code: 'ja', name: '日本語' },
  { code: 'ar', name: 'العربية' },
  { code: 'ru', name: 'Русский' },
  { code: 'pt', name: 'Português' },
  { code: 'hi', name: 'हिन्दी' }
];

export default function TranslationsManagement() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTranslation, setNewTranslation] = useState({
    key: '',
    language: 'en',
    value: '',
    context: ''
  });

  const queryClient = useQueryClient();

  const { data: translations = [] } = useQuery({
    queryKey: ['translations'],
    queryFn: () => base44.entities.Translation.list(),
    initialData: []
  });

  const createMutation = useMutation({
    mutationFn: (data) => base44.entities.Translation.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['translations'] });
      setShowAddForm(false);
      setNewTranslation({ key: '', language: 'en', value: '', context: '' });
      toast.success('Translation added');
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => base44.entities.Translation.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['translations'] });
      toast.success('Translation deleted');
    }
  });

  return (
    <Card className="border-2 border-blue-100 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b-2 border-blue-100">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-xl">
            <Globe className="h-6 w-6 text-[#0044CC]" />
            Multilingual Translations (i18n)
          </CardTitle>
          <Button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-[#0044CC] hover:bg-[#002D66]"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Translation
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        {showAddForm && (
          <div className="mb-6 p-6 bg-blue-50 rounded-lg border-2 border-blue-200">
            <h3 className="font-semibold mb-4 text-gray-900">New Translation</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Translation Key</Label>
                <Input
                  value={newTranslation.key}
                  onChange={(e) => setNewTranslation({...newTranslation, key: e.target.value})}
                  placeholder="e.g., kyb_success"
                  className="mt-2"
                />
              </div>
              <div>
                <Label>Language</Label>
                <Select
                  value={newTranslation.language}
                  onValueChange={(value) => setNewTranslation({...newTranslation, language: value})}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {LANGUAGES.map(lang => (
                      <SelectItem key={lang.code} value={lang.code}>
                        {lang.name} ({lang.code})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2">
                <Label>Translation Value</Label>
                <Input
                  value={newTranslation.value}
                  onChange={(e) => setNewTranslation({...newTranslation, value: e.target.value})}
                  placeholder="Translated text"
                  className="mt-2"
                />
              </div>
              <div className="md:col-span-2">
                <Label>Context</Label>
                <Input
                  value={newTranslation.context}
                  onChange={(e) => setNewTranslation({...newTranslation, context: e.target.value})}
                  placeholder="Where this translation is used"
                  className="mt-2"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-4">
              <Button onClick={() => createMutation.mutate(newTranslation)} className="bg-green-600 hover:bg-green-700">
                Save Translation
              </Button>
              <Button variant="outline" onClick={() => setShowAddForm(false)}>
                Cancel
              </Button>
            </div>
          </div>
        )}

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead>Key</TableHead>
                <TableHead>Language</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Context</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {translations.map((trans) => (
                <TableRow key={trans.id} className="hover:bg-blue-50/50">
                  <TableCell className="font-mono text-sm">{trans.key}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{trans.language?.toUpperCase()}</Badge>
                  </TableCell>
                  <TableCell className="max-w-xs truncate">{trans.value}</TableCell>
                  <TableCell className="text-sm text-gray-600">{trans.context}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteMutation.mutate(trans.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {translations.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-gray-500 py-8">
                    No translations yet. Add your first translation to support multilingual features.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}