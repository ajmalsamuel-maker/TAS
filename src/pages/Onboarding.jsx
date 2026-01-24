import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, Upload, ArrowRight, ArrowLeft, Zap, Shield, FileCheck, Clock, Users } from 'lucide-react';
import { toast } from 'sonner';
import OnboardingStep1 from '../components/onboarding/OnboardingStep1';
import OnboardingStep2 from '../components/onboarding/OnboardingStep2';
import OnboardingStep3 from '../components/onboarding/OnboardingStep3';
import OnboardingStep4 from '../components/onboarding/OnboardingStep4';

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    legal_name: '',
    entity_category: '',
    email: '',
    apply_purpose: '',
    legal_representative_name: '',
    contact_person_name: '',
    contact_person_tel: '',
    contact_person_email: '',
    legal_address: {},
    headquarters_address: {},
    entity_legal_form: '',
    business_registry_name: '',
    unique_business_id: '',
    number_of_employees: '1',
    document_urls: []
  });

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const steps = [
    { number: 1, title: 'Basic Information', component: OnboardingStep1 },
    { number: 2, title: 'Contact & Address', component: OnboardingStep2 },
    { number: 3, title: 'Business Details', component: OnboardingStep3 },
    { number: 4, title: 'Documents & Review', component: OnboardingStep4 }
  ];

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = async () => {
    try {
      await base44.entities.OnboardingApplication.create({
        ...formData,
        status: 'submitted'
      });
      
      toast.success('Application submitted successfully! We will review and contact you shortly.');
      
      setTimeout(() => {
        window.location.href = '/';
      }, 2000);
    } catch (error) {
      toast.error('Failed to submit application. Please try again.');
    }
  };

  const CurrentStepComponent = steps[currentStep - 1].component;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 py-12">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            LEI Application & Business Onboarding
          </h1>
          <p className="text-lg text-gray-600">
            Complete this form to apply for your Legal Entity Identifier and access TAS services
          </p>
        </div>

        {/* Progress Bar */}
        <Card className="mb-8 border-2 border-blue-100">
          <CardContent className="pt-6">
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Step {currentStep} of {totalSteps}
                </span>
                <span className="text-sm font-medium text-[#0044CC]">
                  {Math.round(progress)}% Complete
                </span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            <div className="flex justify-between">
              {steps.map((step) => (
                <div key={step.number} className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all ${
                    step.number < currentStep 
                      ? 'bg-green-500 text-white' 
                      : step.number === currentStep 
                      ? 'bg-[#0044CC] text-white ring-4 ring-blue-200' 
                      : 'bg-gray-200 text-gray-500'
                  }`}>
                    {step.number < currentStep ? (
                      <CheckCircle2 className="h-5 w-5" />
                    ) : (
                      <span className="font-bold">{step.number}</span>
                    )}
                  </div>
                  <span className="text-xs text-gray-600 text-center hidden md:block">
                    {step.title}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Form Content */}
        <Card className="border-2 border-blue-100 shadow-xl">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b-2 border-blue-100">
            <CardTitle className="text-2xl text-gray-900">
              {steps[currentStep - 1].title}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-8">
            <CurrentStepComponent 
              formData={formData}
              setFormData={setFormData}
            />

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 1}
                className="px-6"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>

              {currentStep < totalSteps ? (
                <Button
                  onClick={handleNext}
                  className="bg-[#0044CC] hover:bg-[#002D66] px-6"
                >
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  className="bg-green-600 hover:bg-green-700 px-8"
                >
                  Submit Application
                  <CheckCircle2 className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Info Banner */}
        <div className="mt-8 bg-blue-50 border-l-4 border-[#0044CC] p-6 rounded-lg">
          <p className="text-sm text-gray-700">
            <strong>Note:</strong> Fields marked with * are required. Your application will be reviewed within 2-4 business days. 
            Upon approval, your LEI and vLEI credentials will be automatically issued.
          </p>
        </div>
      </div>
    </div>
  );
}