import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Clock, AlertCircle, ExternalLink } from 'lucide-react';

export default function ApplicationStatus() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        base44.auth.me().then(setUser).catch(() => setUser(null));
    }, []);

    const { data: applications = [] } = useQuery({
        queryKey: ['applications', user?.id],
        queryFn: () => base44.entities.OnboardingApplication.filter({ created_by: user?.email }),
        enabled: !!user,
        initialData: []
    });

    const { data: workflows = [] } = useQuery({
        queryKey: ['workflows', user?.id],
        queryFn: () => base44.entities.Workflow.filter({ user_id: user?.id }),
        enabled: !!user,
        initialData: []
    });

    const { data: webhookLogs = [] } = useQuery({
        queryKey: ['webhooks'],
        queryFn: () => base44.entities.Webhook.list(),
        enabled: !!user,
        initialData: []
    });

    if (!user) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 sm:p-6">
                <div className="max-w-2xl mx-auto">
                    <Card>
                        <CardContent className="p-6 sm:p-12 text-center">
                            <p className="text-sm sm:text-base text-gray-500">Please log in to view your application status.</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }

    const application = applications[0];

    if (!application) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 sm:p-6">
                <div className="max-w-2xl mx-auto">
                    <Card>
                        <CardContent className="p-6 sm:p-12 text-center">
                            <p className="text-sm sm:text-base text-gray-500 mb-4">No application found.</p>
                            <Button className="bg-[#0066B3] hover:bg-[#004C8C] text-sm sm:text-base px-4 sm:px-6">
                                Start New Application
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }

    const verificationSteps = [
        { key: 'submitted', label: 'Application Submitted', icon: Clock },
        { key: 'aml_passed', label: 'AML Screening Passed', icon: CheckCircle2 },
        { key: 'facial_verified', label: 'Facial Verification Complete', icon: CheckCircle2 },
        { key: 'complete', label: 'Credentials Issued', icon: CheckCircle2 }
    ];

    const currentVerificationStep = application.tas_verification_status || 'submitted';
    const currentStepIndex = verificationSteps.findIndex(step => step.key === currentVerificationStep);

    const getStatusColor = (status) => {
        switch (status) {
            case 'approved':
                return 'bg-green-100 text-green-800';
            case 'under_review':
                return 'bg-blue-100 text-blue-800';
            case 'rejected':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-yellow-100 text-yellow-800';
        }
    };

    const facialVerificationWorkflow = workflows.find(w => w.type === 'did_verification');
    const facialVerificationUrl = facialVerificationWorkflow?.result?.verification_url;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 sm:p-6">
            <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
                {/* Status Header */}
                <div className="text-center mb-6 sm:mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Application Status</h1>
                    <p className="text-sm sm:text-base text-gray-600 break-words">
                        {application.legal_name}
                    </p>
                </div>

                {/* Application Details */}
                <Card>
                    <CardHeader className="p-4 sm:p-6">
                        <CardTitle className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                            <span className="text-base sm:text-lg">Current Status</span>
                            <Badge className={getStatusColor(application.status)}>
                                {application.status.toUpperCase()}
                            </Badge>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-sm text-gray-600">
                            Submitted on: {new Date(application.created_date).toLocaleDateString()}
                        </p>

                        {/* TAS Verification Progress */}
                        <div className="mt-8">
                            <h3 className="font-semibold text-gray-900 mb-4">TAS Verification Status</h3>
                            <div className="space-y-4">
                                {verificationSteps.map((step, index) => {
                                    const isCompleted = index <= currentStepIndex;
                                    const isCurrent = index === currentStepIndex;
                                    const Icon = step.icon;

                                    return (
                                        <div key={step.key} className="flex items-center gap-4">
                                            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                                                isCompleted 
                                                    ? 'bg-green-500 text-white' 
                                                    : 'bg-gray-200 text-gray-600'
                                            }`}>
                                                <Icon className="w-5 h-5" />
                                            </div>
                                            <div className="flex-1">
                                                <p className={`font-medium ${isCompleted ? 'text-gray-900' : 'text-gray-500'}`}>
                                                    {step.label}
                                                </p>
                                            </div>
                                            {isCurrent && currentVerificationStep !== 'complete' && (
                                                <Badge className="bg-blue-500 text-white">In Progress</Badge>
                                            )}
                                            {isCompleted && currentVerificationStep === 'complete' && (
                                                <Badge className="bg-green-500 text-white">Complete</Badge>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Next Action */}
                        {application.status === 'approved' && facialVerificationUrl && (
                            <div className="mt-8 bg-blue-50 border-l-4 border-[#0066B3] p-4 rounded">
                                <h3 className="font-semibold text-gray-900 mb-2">Next Step: Identity Verification</h3>
                                <p className="text-sm text-gray-700 mb-4">
                                    Your application has passed AML screening. Complete facial verification to receive your LEI credentials.
                                </p>
                                <a href={facialVerificationUrl} target="_blank" rel="noopener noreferrer">
                                    <Button className="bg-[#0066B3] hover:bg-[#004C8C] gap-2">
                                        Complete Facial Verification
                                        <ExternalLink className="w-4 h-4" />
                                    </Button>
                                </a>
                            </div>
                        )}

                        {application.tas_verification_status === 'complete' && application.generated_lei && (
                            <div className="mt-8 bg-green-50 border-l-4 border-green-500 p-4 rounded">
                                <h3 className="font-semibold text-gray-900 mb-4">Global Credentials Issued</h3>
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-xs font-semibold text-gray-600 uppercase">LEI (Legal Entity Identifier)</p>
                                        <p className="font-mono text-sm bg-white p-2 rounded border border-gray-200 mt-1">{application.generated_lei}</p>
                                        <p className="text-xs text-gray-500 mt-1">Global standard identifier recognized worldwide</p>
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold text-gray-600 uppercase">vLEI (Verifiable LEI)</p>
                                        <p className="font-mono text-sm bg-white p-2 rounded border border-gray-200 mt-1">{application.generated_vlei}</p>
                                        <p className="text-xs text-gray-500 mt-1">Cryptographically signed credential proving KYB/AML verification</p>
                                    </div>
                                    {application.vlei_credential && (
                                        <div className="bg-white p-3 rounded border border-green-200 text-xs">
                                            <p className="font-semibold text-gray-900 mb-2">Verification Chain:</p>
                                            <ul className="space-y-1 text-gray-700">
                                                <li>✓ KYB Verification Completed</li>
                                                <li>✓ AML Screening Passed</li>
                                                <li>✓ Facial Verification Completed</li>
                                                <li>✓ Issued by: Trust Anchor Service (TAS)</li>
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Estimated Timeline */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">Timeline</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3 text-sm text-gray-600">
                            <p>• <strong>AML Screening:</strong> 2-4 hours</p>
                            <p>• <strong>Facial Verification:</strong> 5-10 minutes (user action)</p>
                            <p>• <strong>LEI Issuance:</strong> Immediate upon approval</p>
                            <p className="mt-4 text-xs text-gray-500">Total estimated time: 2-4 business days</p>
                        </div>
                    </CardContent>
                </Card>

                {/* Webhook & Monitoring Status */}
                {application.status === 'approved' && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">Integration & Monitoring</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <p className="text-sm font-semibold text-gray-700 mb-2">Active Webhooks</p>
                                {webhookLogs.filter(w => w.is_active).length > 0 ? (
                                    <div className="space-y-2">
                                        {webhookLogs.filter(w => w.is_active).map(webhook => (
                                            <div key={webhook.id} className="flex items-center justify-between text-sm p-2 bg-gray-50 rounded">
                                                <span className="font-mono text-xs">{webhook.url}</span>
                                                <Badge variant={webhook.last_status === 'success' ? 'default' : 'destructive'}>
                                                    {webhook.last_status || 'pending'}
                                                </Badge>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-gray-500">No active webhooks configured</p>
                                )}
                            </div>

                            <div className="pt-4 border-t">
                                <p className="text-sm font-semibold text-gray-700 mb-2">AML Monitoring Status</p>
                                <div className="bg-blue-50 p-3 rounded text-sm">
                                    <p className="text-gray-700">✓ Quarterly AML screening active (every 90 days)</p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        Automated checks for sanctions, PEP, and adverse media changes
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}