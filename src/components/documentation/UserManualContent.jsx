import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronRight } from 'lucide-react';

export function UserManualSection({ section, isExpanded, onToggle }) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <Collapsible open={isExpanded} onOpenChange={onToggle}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent transition-all">
            <CardTitle className="flex items-center justify-between group">
              <div className="flex items-center gap-3">
                {React.createElement(section.icon, { className: "h-6 w-6 text-blue-600" })}
                <span className="text-2xl">{section.title}</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={isExpanded ? "default" : "outline"} className="text-xs">
                  {section.subsections.length} Topics
                </Badge>
                {isExpanded ? 
                  <ChevronDown className="h-5 w-5 text-blue-600 group-hover:scale-110 transition-transform" /> : 
                  <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 group-hover:scale-110 transition-all" />
                }
              </div>
            </CardTitle>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="space-y-6 pt-0">
            {section.subsections.map((subsection, idx) => (
              <SubsectionContent key={idx} subsection={subsection} />
            ))}
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}

function SubsectionContent({ subsection }) {
  const [isExpanded, setIsExpanded] = React.useState(false);
  
  return (
    <div className="border-l-4 border-blue-200 pl-6 py-2">
      <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
        <CollapsibleTrigger asChild>
          <button className="w-full text-left group flex items-center justify-between hover:bg-blue-50 p-3 rounded-lg transition-colors">
            <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
              {subsection.title}
            </h3>
            {isExpanded ? 
              <ChevronDown className="h-4 w-4 text-blue-600" /> : 
              <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
            }
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="mt-4 prose prose-blue prose-sm max-w-none">
            <div 
              className="whitespace-pre-wrap text-gray-700 leading-relaxed bg-white p-6 rounded-lg shadow-sm border border-gray-100"
              dangerouslySetInnerHTML={{ __html: formatContent(subsection.content) }}
            />
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}

function formatContent(content) {
  return content
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-gray-900 font-semibold">$1</strong>')
    .replace(/^(#{1,6})\s+(.+)$/gm, (match, hashes, text) => {
      const level = hashes.length;
      return `<h${level} class="text-lg font-bold mt-6 mb-3 text-gray-900">${text}</h${level}>`;
    })
    .replace(/^- (.+)$/gm, '<li class="ml-6 mb-1">$1</li>')
    .replace(/\n\n/g, '</p><p class="mb-3">')
    .replace(/^(.+)$/gm, '<p class="mb-3">$1</p>')
    .replace(/\|(.+)\|/g, (match) => {
      const cells = match.split('|').filter(c => c.trim());
      if (match.includes('---')) return '';
      const isHeader = match.includes('Function') || match.includes('Stage') || match.includes('Alert Type');
      return `<tr class="hover:bg-gray-50">${cells.map(cell => 
        `<td class="border border-gray-300 p-2 ${isHeader ? 'font-semibold bg-gray-100' : ''}">${cell.trim()}</td>`
      ).join('')}</tr>`;
    });
}