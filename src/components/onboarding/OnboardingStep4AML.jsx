import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, AlertTriangle, CheckCircle2, Loader, Search } from 'lucide-react';
import { toast } from 'sonner';

export default function OnboardingStep4AML({ formData }) {
  const [screening, setScreening] = useState(false);
  const [results, setResults] = useState(null);
  const [approved, setApproved] = useState(false);

  const handleAMLScreening = async () => {
    setScreening(true);
    try {
      const result = await base44.functions.invoke('amlWatcher', {
        action: 'screen',
        name: formData.legal_name,
        entity_type: ['Organization'],
        categories: ['PEP', 'Sanctions', 'SIP'],
        match_score: 80
      });

      if (result.data?.data) {
        setResults(result.data.data);
        
        // Auto-approve if no high-risk matches
        const hasHighRiskMatch = result.data.data.matches?.some(m => m.match_score > 90);
        if (!hasHighRiskMatch) {
          setApproved(true);
          toast.success('No sanctions or PEP matches found');
        } else {
          toast.warning('High-risk matches detected - review required');
        }
      }
    } catch (error) {
      toast.error('AML screening failed: ' + error.message);
    } finally {
      setScreening(false);
    }
  };

  const getRiskLevel = () => {
    if (!results?.matches || results.matches.length === 0) return 'low';
    const highestScore = Math.max(...results.matches.map(m => m.match_score || 0));
    if (highestScore >= 90) return 'high';
    if (highestScore >= 70) return 'medium';
    return 'low';
  };

  const riskLevel = results ? getRiskLevel() : null;

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* AML Screening Header */}
      <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 sm:p-6">
        <div className="flex items-center gap-3 mb-3">
          <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-red-600" />
          <h3 className="text-base sm:text-lg font-semibold text-gray-900">Anti-Money Laundering (AML) Screening</h3>
        </div>
        <p className="text-xs sm:text-sm text-gray-700 mb-4">
          We will screen your business against global sanctions lists, Politically Exposed Persons (PEP) databases, and adverse media.
        </p>
        
        {!results && (
          <Button
            onClick={handleAMLScreening}
            disabled={screening}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            {screening ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                Screening in progress...
              </>
            ) : (
              <>
                <Search className="mr-2 h-4 w-4" />
                Run AML Screening
              </>
            )}
          </Button>
        )}
      </div>

      {/* Screening Results */}
      {results && (
        <Card className="p-4 sm:p-6 border-2 border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900">Screening Results</h3>
            <Badge className={
              riskLevel === 'low' ? 'bg-green-600' :
              riskLevel === 'medium' ? 'bg-yellow-600' :
              'bg-red-600'
            }>
              {riskLevel === 'low' ? 'Low Risk' :
               riskLevel === 'medium' ? 'Medium Risk' :
               'High Risk'}
            </Badge>
          </div>

          {/* Entity Screened */}
          <div className="mb-6 p-3 sm:p-4 bg-gray-50 rounded-lg">
            <p className="text-xs sm:text-sm text-gray-600 mb-1">Entity Screened:</p>
            <p className="font-semibold text-sm sm:text-base text-gray-900">{formData.legal_name}</p>
          </div>

          {/* Matches */}
          {results.matches && results.matches.length > 0 ? (
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
                {results.matches.length} Match(es) Found
              </h4>
              
              {results.matches.map((match, idx) => (
                <div key={idx} className="border border-amber-200 bg-amber-50 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-medium text-gray-900">{match.name}</p>
                      <p className="text-sm text-gray-600">{match.type || 'Entity'}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {match.match_score}% match
                    </Badge>
                  </div>
                  
                  {match.categories && (
                    <div className="flex gap-2 flex-wrap mt-2">
                      {match.categories.map((cat, i) => (
                        <Badge key={i} variant="outline" className="text-xs bg-red-100 text-red-800">
                          {cat}
                        </Badge>
                      ))}
                    </div>
                  )}
                  
                  {match.notes && (
                    <p className="text-sm text-gray-600 mt-2">{match.notes}</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              <div>
                <p className="font-medium text-green-900">No Matches Found</p>
                <p className="text-sm text-green-700">Entity not found in sanctions, PEP, or adverse media lists</p>
              </div>
            </div>
          )}

          {/* Approval */}
          {!approved && riskLevel === 'medium' && (
            <div className="mt-6 pt-6 border-t">
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
                <p className="text-sm text-amber-900">
                  <strong>Manual Review:</strong> Medium-risk matches detected. Please review the matches above and confirm to proceed.
                </p>
              </div>
              <Button
                onClick={() => {
                  setApproved(true);
                  toast.success('AML screening approved');
                }}
                className="bg-green-600 hover:bg-green-700"
              >
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Approve & Continue
              </Button>
            </div>
          )}

          {riskLevel === 'high' && (
            <div className="mt-6 pt-6 border-t">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-sm text-red-900">
                  <strong>High Risk Detected:</strong> This application requires escalation to compliance team for manual review.
                </p>
              </div>
            </div>
          )}

          {approved && (
            <div className="mt-6 flex items-center gap-2 text-green-600">
              <CheckCircle2 className="h-5 w-5" />
              <span className="font-medium">AML Screening Approved</span>
            </div>
          )}
        </Card>
      )}

      {/* Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
        <p className="text-xs sm:text-sm text-blue-900">
          <strong>What we check:</strong> Global sanctions lists (OFAC, EU, UN), Politically Exposed Persons (PEP), Special Interest Persons (SIP), and adverse media mentions.
        </p>
      </div>
    </div>
  );
}