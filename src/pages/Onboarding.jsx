import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, Upload, ArrowRight, ArrowLeft, Zap, Shield, FileCheck, Clock, Users, Loader, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import OnboardingStep1 from '../components/onboarding/OnboardingStep1';
import OnboardingStep2 from '../components/onboarding/OnboardingStep2';
import OnboardingStep3 from '../components/onboarding/OnboardingStep3';
import OnboardingStep4AML from '../components/onboarding/OnboardingStep4AML';
import OnboardingStep5 from '../components/onboarding/OnboardingStep4';
import OnboardingStep6Facia from '../components/onboarding/OnboardingStep6Facia';
import OnboardingStep7vLEI from '../components/onboarding/OnboardingStep7vLEI';
import GuidedWalkthrough from '../components/onboarding/GuidedWalkthrough';
import ProgressWithTime from '../components/onboarding/ProgressWithTime';

export default function Onboarding() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRunningAml, setIsRunningAml] = useState(false);
  const [showGuidance, setShowGuidance] = useState(true);
  const navigate = useNavigate();

  // Check authentication and load draft on mount
  React.useEffect(() => {
    base44.auth.me()
      .then(async (currentUser) => {
        if (currentUser) {
          setUser(currentUser);
          // Load existing draft application
          const draftApps = await base44.entities.OnboardingApplication.filter({ 
            created_by: currentUser.email,
            status: 'draft' 
          });
          if (draftApps.length > 0) {
            const draft = draftApps[0];
            setFormData({
              legal_name: draft.legal_name || '',
              entity_category: draft.entity_category || '',
              email: draft.email || '',
              apply_purpose: draft.apply_purpose || '',
              legal_representative_name: draft.legal_representative_name || '',
              contact_person_name: draft.contact_person_name || '',
              contact_person_tel: draft.contact_person_tel || '',
              contact_person_email: draft.contact_person_email || '',
              legal_address: draft.legal_address || {},
              headquarters_address: draft.headquarters_address || {},
              entity_legal_form: draft.entity_legal_form || '',
              registry_country_code: draft.registry_country_code || '',
              business_registry_name: draft.business_registry_name || '',
              unique_business_id: draft.unique_business_id || '',
              number_of_employees: draft.number_of_employees || '1',
              document_urls: draft.document_urls || []
            });
            setShowForm(true);
          }
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [navigate]);
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
    registry_country_code: '',
    business_registry_name: '',
    unique_business_id: '',
    number_of_employees: '1',
    document_urls: []
  });

  const [submittedApplication, setSubmittedApplication] = useState(null);
  
  const totalSteps = 7;
  const progress = (currentStep / totalSteps) * 100;

  const steps = [
    { number: 1, title: 'Basic Information', component: OnboardingStep1 },
    { number: 2, title: 'Address Details', component: OnboardingStep2 },
    { number: 3, title: 'Business Registry', component: OnboardingStep3 },
    { number: 4, title: 'AML Screening', component: OnboardingStep4AML },
    { number: 5, title: 'Documents', component: OnboardingStep5 },
    { number: 6, title: 'Identity Verification', component: OnboardingStep6Facia },
    { number: 7, title: 'vLEI Issuance', component: OnboardingStep7vLEI }
  ];

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      setShowGuidance(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setShowGuidance(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Create the application
      const response = await base44.entities.OnboardingApplication.create({
        ...formData,
        status: 'submitted'
      });

      setSubmittedApplication(response);
      toast.success('Application submitted successfully!');

      // Auto-create organization
      try {
        await base44.functions.invoke('createOrganization', {
          applicationId: response.id,
          organizationName: formData.legal_name
        });
        toast.success('Organization created');
      } catch (orgError) {
        console.error('Organization creation error:', orgError);
        toast.error('Organization creation failed');
      }

      // Trigger AML screening in the background
      setIsRunningAml(true);
      try {
        await base44.functions.invoke('runAmlScreening', {
          applicationId: response.id
        });
        toast.success('AML screening initiated');
      } catch (amlError) {
        console.error('AML screening error:', amlError);
        toast.error('AML screening failed to initiate');
      } finally {
        setIsRunningAml(false);
      }

      // Move to vLEI step instead of redirecting
      setCurrentStep(7);
      setIsSubmitting(false);
    } catch (error) {
      toast.error('Failed to submit application. Please try again.');
      setIsSubmitting(false);
    }
  };

  const handleSaveDraft = async () => {
    try {
      // Check if draft already exists
      const draftApps = await base44.entities.OnboardingApplication.filter({ 
        created_by: user.email,
        status: 'draft' 
      });
      
      if (draftApps.length > 0) {
        // Update existing draft
        await base44.entities.OnboardingApplication.update(draftApps[0].id, {
          ...formData,
          status: 'draft'
        });
      } else {
        // Create new draft
        await base44.entities.OnboardingApplication.create({
          ...formData,
          status: 'draft'
        });
      }
      toast.success('Draft saved successfully! You can continue anytime.');
    } catch (error) {
      toast.error('Failed to save draft. Please try again.');
      console.error('Draft save error:', error);
    }
  };

  const handleVLEIComplete = () => {
    navigate(createPageUrl('ApplicationStatus'));
  };

  const CurrentStepComponent = steps[currentStep - 1].component;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
        <div className="text-center">
          <Loader className="h-12 w-12 animate-spin text-[#0044CC] mx-auto mb-4" />
          <p className="text-gray-600">Loading your onboarding...</p>
        </div>
      </div>
    );
  }

  if (!showForm) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 py-12">
        <div className="max-w-6xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Get Started with Trust Anchor Service
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Complete a comprehensive LEI and Business Onboarding process to unlock full access to identity verification, compliance screening, and digital credentials
            </p>
          </div>

          {/* Demo Warning */}
          <div className="bg-red-50 border-2 border-red-400 rounded-xl p-6 mb-8 shadow-lg">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                <AlertCircle className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-red-900 mb-2">⚠️ SANDBOX/DEMO ENVIRONMENT</h3>
                <p className="text-red-800 mb-3">
                  This onboarding process issues <strong>DEMO credentials only</strong>. LEIs and vLEIs generated here are for testing purposes and have no legal standing.
                </p>
                <p className="text-sm text-red-700">
                  Real LEI issuance requires integration with GLEIF-accredited Local Operating Units (LOUs). 
                  Real vLEIs require GLEIF's Qualified vLEI Issuer (QVI) infrastructure.
                </p>
              </div>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="grid md:grid-cols-5 gap-4 mb-16">
            <div className="bg-white rounded-lg p-6 border border-blue-100 shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                <Shield className="h-6 w-6 text-[#0066B3]" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">KYB Verification</h3>
              <p className="text-sm text-gray-600">Instant company lookup and verification</p>
            </div>

            <div className="bg-white rounded-lg p-6 border border-blue-100 shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                <Zap className="h-6 w-6 text-[#0066B3]" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">AML Screening</h3>
              <p className="text-sm text-gray-600">Real-time sanctions & PEP screening</p>
            </div>

            <div className="bg-white rounded-lg p-6 border border-blue-100 shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                <Users className="h-6 w-6 text-[#0066B3]" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Face Verification</h3>
              <p className="text-sm text-gray-600">AI-powered liveness detection</p>
            </div>

            <div className="bg-white rounded-lg p-6 border border-blue-100 shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                <FileCheck className="h-6 w-6 text-[#0066B3]" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Demo LEI & vLEI</h3>
              <p className="text-sm text-gray-600">Sandbox credential issuance</p>
            </div>

            <div className="bg-white rounded-lg p-6 border border-blue-100 shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                <Clock className="h-6 w-6 text-[#0066B3]" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Fast Processing</h3>
              <p className="text-sm text-gray-600">Complete in under 15 minutes</p>
            </div>
          </div>

          {/* Process Overview */}
          <div className="bg-white rounded-xl border-2 border-blue-100 p-8 mb-12 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Onboarding Process</h2>
            <div className="grid md:grid-cols-3 lg:grid-cols-7 gap-4">
              {[
                { num: 1, title: 'Company Info', desc: 'KYB search & auto-fill' },
                { num: 2, title: 'Addresses', desc: 'HQ and legal address' },
                { num: 3, title: 'Registry', desc: 'Business registration details' },
                { num: 4, title: 'AML Check', desc: 'Sanctions & PEP screening' },
                { num: 5, title: 'Documents', desc: 'Upload certificates' },
                { num: 6, title: 'Verification', desc: 'Facial liveness test' },
                { num: 7, title: 'vLEI', desc: 'Digital credential issuance' }
              ].map((step) => (
                <div key={step.num} className="text-center">
                  <div className="w-12 h-12 bg-[#0066B3] text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-3">
                    {step.num}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-600">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <Button 
              onClick={() => setShowForm(true)}
              size="lg" 
              className="bg-[#0066B3] hover:bg-[#004C8C] text-white text-lg px-10 py-6 shadow-lg"
            >
              Start Application <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          {/* User Info */}
          {user && (
            <div className="text-center mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-600">
                Logged in as: <span className="font-semibold text-[#0044CC]">{user.email}</span>
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

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

        {/* Progress with Time Estimates */}
        <div className="mb-8">
          <ProgressWithTime currentStep={currentStep} totalSteps={totalSteps} steps={steps} />
        </div>

        {/* Guided Walkthrough */}
        {showGuidance && (
          <GuidedWalkthrough 
            currentStep={currentStep} 
            onDismiss={() => setShowGuidance(false)}
          />
        )}

        {/* Form Content */}
        <Card className="border-2 border-blue-100 shadow-xl">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b-2 border-blue-100">
            <CardTitle className="text-2xl text-gray-900">
              {steps[currentStep - 1].title}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-8">
            {currentStep === 7 ? (
              <OnboardingStep7vLEI 
                application={submittedApplication}
                onComplete={handleVLEIComplete}
              />
            ) : (
              <CurrentStepComponent 
                formData={formData}
                setFormData={setFormData}
              />
            )}

            {/* Navigation Buttons */}
            {currentStep !== 7 && (
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

                {currentStep < 6 ? (
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
                    disabled={isSubmitting || isRunningAml}
                  >
                    {isSubmitting || isRunningAml ? (
                      <>
                        <Loader className="mr-2 h-4 w-4 animate-spin" />
                        {isRunningAml ? 'Initiating Verification...' : 'Processing...'}
                      </>
                    ) : (
                      <>
                        Submit & Continue to vLEI
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Info Banner */}
        <div className="mt-8 space-y-4">
          <div className="bg-blue-50 border-l-4 border-[#0044CC] p-6 rounded-lg">
            <p className="text-sm text-gray-700">
              <strong>Note:</strong> Fields marked with * are required. Your application will be reviewed within 2-4 business days.
            </p>
          </div>
          {currentStep === 4 && (
            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg">
              <p className="text-sm text-red-900">
                <strong>⚠️ AML Screening:</strong> This step screens your business against global sanctions, PEP, and adverse media databases. Required for compliance.
              </p>
            </div>
          )}
          {currentStep === 6 && (
            <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-lg">
              <p className="text-sm text-purple-900">
                <strong>⚠️ Identity Verification:</strong> Complete facial verification to proceed with LEI and vLEI issuance.
              </p>
            </div>
          )}
          {currentStep === 7 && (
            <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-lg">
              <p className="text-sm text-purple-900">
                <strong>🎉 Final Step:</strong> Issue your vLEI credential to complete onboarding and gain full access to TAS services.
              </p>
            </div>
          )}
        </div>

        {/* Back Button - Preserves Form Data */}
        <div className="mt-8 text-center">
          <Button
            variant="ghost"
            onClick={() => setShowForm(false)}
            className="text-[#0066B3] hover:bg-blue-50"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Overview
          </Button>
        </div>
      </div>
    </div>
  );
}