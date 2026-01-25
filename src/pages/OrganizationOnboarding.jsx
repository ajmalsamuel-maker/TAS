import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, ChevronRight, ChevronLeft } from 'lucide-react';
import { toast } from 'sonner';
import { createPageUrl } from '../utils';
import OrgProfileStep from '../components/onboarding/org/OrgProfileStep';
import InviteUsersStep from '../components/onboarding/org/InviteUsersStep';
import BrandingSettingsStep from '../components/onboarding/org/BrandingSettingsStep';
import CompletionStep from '../components/onboarding/org/CompletionStep';

export default function OrganizationOnboarding() {
  const queryClient = useQueryClient();
  const [currentStep, setCurrentStep] = useState(1);
  const [user, setUser] = useState(null);
  const [organization, setOrganization] = useState(null);

  useEffect(() => {
    base44.auth.me().then(setUser).catch(() => setUser(null));
  }, []);

  const { data: org } = useQuery({
    queryKey: ['organization', user?.organization_id],
    queryFn: async () => {
      const orgs = await base44.entities.Organization.filter({ id: user.organization_id });
      return orgs[0];
    },
    enabled: !!user?.organization_id,
    onSuccess: (data) => setOrganization(data)
  });

  const completeOnboardingMutation = useMutation({
    mutationFn: (id) => base44.entities.Organization.update(id, { onboarding_completed: true }),
    onSuccess: () => {
      queryClient.invalidateQueries(['organization']);
      toast.success('Onboarding completed!');
      setTimeout(() => {
        window.location.href = createPageUrl('AdminDashboard');
      }, 1500);
    }
  });

  const steps = [
    { number: 1, title: 'Organization Profile', component: OrgProfileStep },
    { number: 2, title: 'Invite Team Members', component: InviteUsersStep },
    { number: 3, title: 'Branding & Settings', component: BrandingSettingsStep },
    { number: 4, title: 'Complete Setup', component: CompletionStep }
  ];

  const progress = (currentStep / steps.length) * 100;
  const CurrentStepComponent = steps[currentStep - 1]?.component;

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      completeOnboardingMutation.mutate(organization.id);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (!user || !organization) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome to TAS Platform!</h1>
          <p className="text-gray-600">Let's get your organization set up in just a few steps</p>
        </div>

        {/* Progress Bar */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="mb-4">
              <div className="flex justify-between mb-2">
                {steps.map((step) => (
                  <div key={step.number} className="flex items-center">
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                      currentStep > step.number ? 'bg-green-500 text-white' :
                      currentStep === step.number ? 'bg-blue-600 text-white' :
                      'bg-gray-200 text-gray-500'
                    }`}>
                      {currentStep > step.number ? (
                        <CheckCircle2 className="h-5 w-5" />
                      ) : (
                        <span className="text-sm font-semibold">{step.number}</span>
                      )}
                    </div>
                    {step.number < steps.length && (
                      <div className={`w-12 md:w-24 h-1 mx-2 ${
                        currentStep > step.number ? 'bg-green-500' : 'bg-gray-200'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
              <Progress value={progress} className="h-2" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-700">
                Step {currentStep} of {steps.length}: {steps[currentStep - 1]?.title}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Step Content */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            {CurrentStepComponent && (
              <CurrentStepComponent 
                organization={organization}
                user={user}
                onNext={handleNext}
                onComplete={() => completeOnboardingMutation.mutate(organization.id)}
              />
            )}
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 1}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <Button
            onClick={handleNext}
            className="bg-blue-600 hover:bg-blue-700"
            disabled={currentStep === steps.length && completeOnboardingMutation.isPending}
          >
            {currentStep === steps.length ? 'Complete Setup' : 'Next'}
            {currentStep < steps.length && <ChevronRight className="h-4 w-4 ml-2" />}
          </Button>
        </div>
      </div>
    </div>
  );
}