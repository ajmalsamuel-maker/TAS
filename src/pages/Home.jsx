import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Shield, Users, FileCheck } from 'lucide-react';

export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-slate-900 mb-4">
                        Welcome to KYB & Compliance Platform
                    </h1>
                    <p className="text-lg text-slate-600">
                        Streamlined onboarding, AML screening, and transaction monitoring
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card>
                        <CardHeader>
                            <Building2 className="w-8 h-8 text-blue-600 mb-2" />
                            <CardTitle>KYB Verification</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-slate-600">
                                Comprehensive business verification and LEI issuance
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <Shield className="w-8 h-8 text-green-600 mb-2" />
                            <CardTitle>AML Screening</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-slate-600">
                                Real-time sanctions and PEP screening
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <Users className="w-8 h-8 text-purple-600 mb-2" />
                            <CardTitle>Transaction Monitoring</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-slate-600">
                                Automated fraud detection and rule-based screening
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <FileCheck className="w-8 h-8 text-orange-600 mb-2" />
                            <CardTitle>Case Management</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-slate-600">
                                Efficient investigation and compliance workflows
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}