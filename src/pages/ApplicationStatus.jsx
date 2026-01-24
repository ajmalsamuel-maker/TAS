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

    if (!user) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
                <div className="max-w-2xl mx-auto">
                    <Card>
                        <CardContent className="p-12 text-center">
                            <p className="text-gray-500">Please log in to view your application status.</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }

    const application = applications[0];

    if (!application) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
                <div className="max-w-2xl mx-auto">
                    <Card>
                        <CardContent className="p-12 text-center">
                            <p className="text-gray-500 mb-4">No application found.</p>
                            <Button className="bg-[#0066B3] hover:bg-[#004C8C]">
                                Start New Application
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }

    const statusSteps = [
        { key: 'draft', label: 'Application Started', icon: Clock },
        { key: 'submitted', label: 'Submitted', icon: Clock },
        { key: 'under_review', label: 'AML & Verification', icon: Clock },
        { key: 'approved', label: 'Approved', icon: CheckCircle2 }
    ];

    const currentStepIndex = statusSteps.findIndex(step => step.key === application.status);

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
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
            <div className="max-w-4xl mx-auto space-y-6">
                {/* Status Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Application Status</h1>
                    <p className="text-gray-600">
                        {application.legal_name}
                    </p>
                </div>

                {/* Application Details */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                            <span>Current Status</span>
                            <Badge className={getStatusColor(application.status)}>
                                {application.status.toUpperCase()}
                            </Badge>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-sm text-gray-600">
                            Submitted on: {new Date(application.created_date).toLocaleDateString()}
                        </p>

                        {/* Progress Steps */}
                        <div className="mt-8">
                            <div className="space-y-4">
                                {statusSteps.map((step, index) => {
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
                                            {isCurrent && application.status === 'under_review' && (
                                                <Badge className="bg-blue-500 text-white">In Progress</Badge>
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

                        {application.status === 'approved' && application.generated_lei && (
                            <div className="mt-8 bg-green-50 border-l-4 border-green-500 p-4 rounded">
                                <h3 className="font-semibold text-gray-900 mb-3">Your Credentials</h3>
                                <div className="space-y-2">
                                    <div>
                                        <p className="text-xs text-gray-600">LEI (Legal Entity Identifier)</p>
                                        <p className="font-mono text-lg text-gray-900">{application.generated_lei}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-600">vLEI (verifiable LEI)</p>
                                        <p className="font-mono text-lg text-gray-900">{application.generated_vlei}</p>
                                    </div>
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
            </div>
        </div>
    );
}