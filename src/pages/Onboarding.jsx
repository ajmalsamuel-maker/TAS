import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, Upload, ArrowRight, ArrowLeft, Zap, Shield, FileCheck, Clock, Users, Loader } from 'lucide-react';
import { toast } from 'sonner';
import OnboardingStep1 from '../components/onboarding/OnboardingStep1';
import OnboardingStep2 from '../components/onboarding/OnboardingStep2';
import OnboardingStep3 from '../components/onboarding/OnboardingStep3';
import OnboardingStep4 from '../components/onboarding/OnboardingStep4';
import OnboardingStep5 from '../components/onboarding/OnboardingStep5';
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

  // Check authentication on mount
  React.useEffect(() => {
    base44.auth.me()
      .then(currentUser => {
        if (currentUser) {
          setUser(currentUser);
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

  const totalSteps = 5;
  const progress = (currentStep / totalSteps) * 100;

  const steps = [
    { number: 1, title: 'Basic Information', component: OnboardingStep1 },
    { number: 2, title: 'Contact & Address', component: OnboardingStep2 },
    { number: 3, title: 'Business Details', component: OnboardingStep3 },
    { number: 4, title: 'Documents & Review', component: OnboardingStep4 },
    { number: 5, title: 'Facial Verification', component: OnboardingStep5 }
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
      
      toast.success('Application submitted successfully!');
      
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

      // Redirect to application status page
      setTimeout(() => navigate(createPageUrl('ApplicationStatus')), 2000);
    } catch (error) {
      toast.error('Failed to submit application. Please try again.');
      setIsSubmitting(false);
    }
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

          {/* Benefits Section */}
          <div className="grid md:grid-cols-5 gap-4 mb-16">
            <div className="bg-white rounded-lg p-6 border border-blue-100 shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                <Shield className="h-6 w-6 text-[#0066B3]" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">KYB Verification</h3>
              <p className="text-sm text-gray-600">Global business verification with UBO checks</p>
            </div>

            <div className="bg-white rounded-lg p-6 border border-blue-100 shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                <Zap className="h-6 w-6 text-[#0066B3]" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">AML Screening</h3>
              <p className="text-sm text-gray-600">Sanctions, PEP & adverse media screening</p>
            </div>

            <div className="bg-white rounded-lg p-6 border border-blue-100 shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                <FileCheck className="h-6 w-6 text-[#0066B3]" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">LEI Issuance</h3>
              <p className="text-sm text-gray-600">Automatic LEI generation upon approval</p>
            </div>

            <div className="bg-white rounded-lg p-6 border border-blue-100 shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                <FileCheck className="h-6 w-6 text-[#0066B3]" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">vLEI Credentials</h3>
              <p className="text-sm text-gray-600">Digital identity with KERI verification</p>
            </div>

            <div className="bg-white rounded-lg p-6 border border-blue-100 shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                <Clock className="h-6 w-6 text-[#0066B3]" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Fast Processing</h3>
              <p className="text-sm text-gray-600">Reviewed within 2-4 business days</p>
            </div>
          </div>

          {/* Process Overview */}
          <div className="bg-white rounded-xl border-2 border-blue-100 p-8 mb-12 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Onboarding Process</h2>
            <div className="grid md:grid-cols-5 gap-4">
              {[
                { num: 1, title: 'Basic Information', desc: 'Legal name, entity type, and business purpose' },
                { num: 2, title: 'Contact & Address', desc: 'Legal representatives and office locations' },
                { num: 3, title: 'Business Details', desc: 'Registration info, UBO, and employee count' },
                { num: 4, title: 'Document Upload', desc: 'Submit business certificates and verification' },
                { num: 5, title: 'Facial Verification', desc: 'Liveness test before LEI issuance' }
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
                  disabled={isSubmitting || isRunningAml}
                >
                  {isSubmitting || isRunningAml ? (
                    <>
                      <Loader className="mr-2 h-4 w-4 animate-spin" />
                      {isRunningAml ? 'Initiating Verification...' : 'Processing...'}
                    </>
                  ) : (
                    <>
                      Complete & Verify
                      <CheckCircle2 className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Info Banner */}
        <div className="mt-8 space-y-4">
          <div className="bg-blue-50 border-l-4 border-[#0044CC] p-6 rounded-lg">
            <p className="text-sm text-gray-700">
              <strong>Note:</strong> Fields marked with * are required. Your application will be reviewed within 2-4 business days.
            </p>
          </div>
          {currentStep === totalSteps && (
            <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-lg">
              <p className="text-sm text-amber-900">
                <strong>⚠️ Important:</strong> Complete facial verification (liveness test) to proceed with LEI and vLEI issuance. This is the final step before credentials are issued.
              </p>
            </div>
          )}
        </div>

        {/* Back Button */}
        <div className="mt-8 text-center">
          <Button
            variant="ghost"
            onClick={() => {
              setShowForm(false);
              setCurrentStep(1);
              setFormData({
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
            }}
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