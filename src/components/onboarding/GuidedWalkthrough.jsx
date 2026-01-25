import React, { useState } from 'react';
import { Lightbulb, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Guided tips for each step
const stepGuides = {
  1: {
    title: 'Basic Information',
    intro: 'Let\'s start with your basic business details.',
    tips: [
      {
        title: 'Legal Name',
        description: 'Enter the exact legal name as registered with your business registry. This must match official documents.'
      },
      {
        title: 'Entity Category',
        description: 'Select the type of entity that best describes your organization (e.g., Bank, Fintech, Law Firm).'
      },
      {
        title: 'Application Purpose',
        description: 'Briefly describe why you\'re applying - this helps expedite our review process.'
      }
    ]
  },
  2: {
    title: 'Contact & Address',
    intro: 'Now we need your contact and location information.',
    tips: [
      {
        title: 'Legal Representative',
        description: 'This should be a senior executive or business owner with signing authority.'
      },
      {
        title: 'Legal Address',
        description: 'The registered address of your business. This is where official documents will be sent.'
      },
      {
        title: 'Contact Person',
        description: 'The main point of contact who will handle the onboarding process. They\'ll receive status updates.'
      }
    ]
  },
  3: {
    title: 'Business Details',
    intro: 'Let\'s gather more details about your organization.',
    tips: [
      {
        title: 'Business Registration',
        description: 'Provide your business registration number (also called company registration number or ABN).'
      },
      {
        title: 'Entity Legal Form',
        description: 'Select your legal structure (LLC, Corporation, Partnership, etc.).'
      },
      {
        title: 'Employee Count',
        description: 'This helps us understand your organization size and assess compliance requirements.'
      }
    ]
  },
  4: {
    title: 'Documents & Review',
    intro: 'Please upload supporting documents to verify your information.',
    tips: [
      {
        title: 'Acceptable Documents',
        description: 'Business registration certificate, articles of incorporation, government-issued business license.'
      },
      {
        title: 'Document Quality',
        description: 'Ensure documents are clear, legible, and not older than 3 years.'
      },
      {
        title: 'Multiple Documents',
        description: 'You can upload multiple documents to support your application (PDF, JPG, PNG accepted).'
      }
    ]
  },
  5: {
    title: 'Facial Verification',
    intro: 'Final step: Let\'s verify your identity through facial recognition.',
    tips: [
      {
        title: 'Liveness Test',
        description: 'You\'ll need to perform a quick liveness check to prove you\'re a real person.'
      },
      {
        title: 'Good Lighting',
        description: 'Position yourself with good lighting on your face - natural light works best.'
      },
      {
        title: 'Device Camera',
        description: 'Ensure your device camera is working and you\'ve granted camera permissions.'
      }
    ]
  }
};

export default function GuidedWalkthrough({ currentStep, onDismiss }) {
  const guide = stepGuides[currentStep];
  
  if (!guide) return null;

  return (
    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-lg p-6 mb-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3 flex-1">
          <div className="flex-shrink-0">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0066B3]/20">
              <Lightbulb className="h-5 w-5 text-[#0044CC]" />
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-bold text-gray-900 mb-1">
              Step {currentStep}: {guide.title}
            </h3>
            <p className="text-sm text-gray-700 mb-4">{guide.intro}</p>
            
            <div className="space-y-3">
              {guide.tips.map((tip, idx) => (
                <div key={idx} className="flex gap-2 bg-white rounded-lg p-3 border border-blue-100">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#0044CC] text-white flex items-center justify-center text-xs font-bold">
                    {idx + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-gray-900">{tip.title}</p>
                    <p className="text-xs text-gray-600 mt-0.5">{tip.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <button
          onClick={onDismiss}
          className="flex-shrink-0 text-gray-400 hover:text-gray-600"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}