import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Upload, FileText, X } from 'lucide-react';
import { toast } from 'sonner';

export default function OnboardingStep4({ formData, setFormData }) {
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setUploading(true);
    try {
      const uploadPromises = files.map(file => 
        base44.integrations.Core.UploadFile({ file })
      );
      
      const results = await Promise.all(uploadPromises);
      const fileUrls = results.map(r => r.file_url);
      
      setFormData(prev => ({
        ...prev,
        document_urls: [...(prev.document_urls || []), ...fileUrls]
      }));
      
      toast.success(`${files.length} document(s) uploaded successfully`);
    } catch (error) {
      toast.error('Failed to upload documents');
    } finally {
      setUploading(false);
    }
  };

  const removeDocument = (index) => {
    setFormData(prev => ({
      ...prev,
      document_urls: prev.document_urls.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="space-y-8">
      {/* Document Upload */}
      <div>
        <Label className="text-base mb-3 block">Upload Business Documents *</Label>
        <p className="text-sm text-gray-600 mb-4">
          Please upload: Business Registration Certificate, Certificate of Incorporation, and any other relevant documents
        </p>
        
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
          <input
            type="file"
            multiple
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleFileUpload}
            className="hidden"
            id="file-upload"
            disabled={uploading}
          />
          <label htmlFor="file-upload" className="cursor-pointer">
            <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <p className="text-lg font-medium text-gray-700 mb-2">
              {uploading ? 'Uploading...' : 'Click to upload documents'}
            </p>
            <p className="text-sm text-gray-500">PDF, JPG, PNG up to 10MB each</p>
          </label>
        </div>

        {formData.document_urls && formData.document_urls.length > 0 && (
          <div className="mt-6 space-y-3">
            <p className="font-medium text-gray-700">Uploaded Documents:</p>
            {formData.document_urls.map((url, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-50 rounded-lg p-3 border border-gray-200">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-blue-600" />
                  <span className="text-sm text-gray-700">Document {index + 1}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeDocument(index)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Review Summary */}
      <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
        <h3 className="text-lg font-semibold mb-4 text-gray-900">Application Summary</h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-600">Legal Name:</span>
            <p className="font-medium text-gray-900">{formData.legal_name || 'Not provided'}</p>
          </div>
          <div>
            <span className="text-gray-600">Entity Category:</span>
            <p className="font-medium text-gray-900">{formData.entity_category || 'Not provided'}</p>
          </div>
          <div>
            <span className="text-gray-600">Email:</span>
            <p className="font-medium text-gray-900">{formData.email || 'Not provided'}</p>
          </div>
          <div>
            <span className="text-gray-600">Contact Person:</span>
            <p className="font-medium text-gray-900">{formData.contact_person_name || 'Not provided'}</p>
          </div>
          <div>
            <span className="text-gray-600">Documents Uploaded:</span>
            <p className="font-medium text-gray-900">{formData.document_urls?.length || 0} files</p>
          </div>
        </div>
      </div>

      <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg">
        <p className="text-sm text-gray-700">
          <strong>Next Steps:</strong> Upon submission, your application will be reviewed within 2-4 business days. 
          You will receive an email notification when your LEI is issued and your account is activated. 
          You will then have access to the TAS platform and can begin using KYB, AML, vLEI, and DID services.
        </p>
      </div>
    </div>
  );
}