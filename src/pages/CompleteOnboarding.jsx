import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Upload, CheckCircle, AlertCircle, Loader, FileText, Camera } from 'lucide-react';
import { toast } from 'sonner';

export default function CompleteOnboarding() {
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploadedDocs, setUploadedDocs] = useState([]);
  const [faciaCompleted, setFaciaCompleted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadApplication();
  }, []);

  const loadApplication = async () => {
    try {
      const params = new URLSearchParams(window.location.search);
      const applicationId = params.get('application_id');

      if (!applicationId) {
        toast.error('Invalid onboarding link');
        return;
      }

      const apps = await base44.entities.OnboardingApplication.filter({ id: applicationId });
      if (apps.length === 0) {
        toast.error('Application not found');
        return;
      }

      const app = apps[0];
      setApplication(app);
      setUploadedDocs(app.document_urls || []);
      setFaciaCompleted(app.facial_verification_initiated ? true : false);
    } catch (error) {
      toast.error('Error loading application');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      toast.info('Uploading document...');
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      
      const updatedDocs = [...uploadedDocs, file_url];
      setUploadedDocs(updatedDocs);

      await base44.entities.OnboardingApplication.update(application.id, {
        document_urls: updatedDocs
      });

      toast.success('Document uploaded successfully');
      loadApplication();
    } catch (error) {
      toast.error('Error uploading document');
      console.error(error);
    }
  };

  const initiateFacialVerification = async () => {
    try {
      toast.info('Initiating facial verification...');
      const response = await base44.functions.invoke('initiateFacialVerification', {
        application_id: application.id
      });

      if (response.data.facia_url) {
        window.open(response.data.facia_url, '_blank');
        setFaciaCompleted(true);
        toast.success('Facial verification initiated. Complete it in the new window.');
        loadApplication();
      }
    } catch (error) {
      toast.error('Error initiating facial verification');
      console.error(error);
    }
  };

  const submitApplication = async () => {
    if (uploadedDocs.length === 0) {
      toast.error('Please upload at least one business document');
      return;
    }

    if (!faciaCompleted) {
      toast.error('Please complete facial verification');
      return;
    }

    try {
      setSubmitting(true);
      await base44.entities.OnboardingApplication.update(application.id, {
        status: 'submitted'
      });

      toast.success('Application submitted successfully! Our team will review it shortly.');
      loadApplication();
    } catch (error) {
      toast.error('Error submitting application');
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!application) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="pt-6 text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Application Not Found</h2>
            <p className="text-gray-600">The onboarding link is invalid or has expired.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (application.status === 'submitted' || application.status === 'under_review' || application.status === 'approved') {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <Card className="max-w-md">
          <CardContent className="pt-6 text-center">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Application Submitted</h2>
            <p className="text-gray-600 mb-4">
              Your LEI application has been submitted and is currently under review by our team.
            </p>
            <Badge className="bg-blue-100 text-blue-800">
              Status: {application.status.replace('_', ' ').toUpperCase()}
            </Badge>
            <p className="text-sm text-gray-500 mt-4">
              You will receive an email once your application has been reviewed.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete Your LEI Application</h1>
          <p className="text-gray-600">Follow the steps below to complete your onboarding process</p>
        </div>

        <div className="space-y-6">
          {/* Step 1: Upload Documents */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Step 1: Upload Business Documents
                {uploadedDocs.length > 0 && (
                  <CheckCircle className="h-5 w-5 text-green-600 ml-auto" />
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">
                Upload your business registration documents, incorporation certificate, or other legal documents.
              </p>
              
              <div className="border-2 border-dashed rounded-lg p-6 text-center">
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <label className="cursor-pointer">
                  <span className="text-blue-600 hover:text-blue-700 font-medium">
                    Click to upload documents
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileUpload}
                    accept=".pdf,.jpg,.jpeg,.png"
                  />
                </label>
                <p className="text-xs text-gray-500 mt-1">PDF, JPG, PNG (max 10MB)</p>
              </div>

              {uploadedDocs.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-semibold">Uploaded Documents ({uploadedDocs.length}):</p>
                  {uploadedDocs.map((url, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-2 rounded">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Document {idx + 1}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Step 2: Facial Verification */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5" />
                Step 2: Facial Liveness Verification
                {faciaCompleted && (
                  <CheckCircle className="h-5 w-5 text-green-600 ml-auto" />
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">
                Complete a quick facial liveness check to verify your identity.
              </p>
              
              <Button
                onClick={initiateFacialVerification}
                disabled={faciaCompleted}
                className="w-full"
              >
                {faciaCompleted ? (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Verification Completed
                  </>
                ) : (
                  <>
                    <Camera className="h-4 w-4 mr-2" />
                    Start Facial Verification
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Submit Application */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg mb-1">Ready to Submit?</h3>
                  <p className="text-sm text-gray-600">
                    Complete both steps above to submit your application for review
                  </p>
                </div>
                <Button
                  onClick={submitApplication}
                  disabled={uploadedDocs.length === 0 || !faciaCompleted || submitting}
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {submitting ? (
                    <>
                      <Loader className="h-4 w-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    'Submit Application'
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}