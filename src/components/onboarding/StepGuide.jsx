import React, { useState } from 'react';
import { HelpCircle, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function StepGuide({ step, title, tips }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center gap-3">
          <HelpCircle className="h-5 w-5 text-[#0066B3]" />
          <div>
            <p className="text-sm font-semibold text-gray-900">Step {step}: {title}</p>
            <p className="text-xs text-gray-600 mt-0.5">Click to see helpful tips</p>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-600 hover:text-gray-900"
        >
          <ChevronDown className={`h-5 w-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {isOpen && (
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-100 border-t-0 p-4 rounded-b-lg space-y-3">
          {tips.map((tip, idx) => (
            <div key={idx} className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#0066B3] text-white flex items-center justify-center text-xs font-bold">
                {idx + 1}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{tip.title}</p>
                <p className="text-xs text-gray-600 mt-0.5">{tip.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}