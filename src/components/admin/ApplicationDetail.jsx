import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, MapPin, Users, Briefcase, Calendar } from 'lucide-react';
import { format } from 'date-fns';

export default function ApplicationDetail({ application }) {
  const statusColors = {
    draft: 'bg-gray-100 text-gray-800',
    submitted: 'bg-blue-100 text-blue-800',
    under_review: 'bg-yellow-100 text-yellow-800',
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800'
  };

  return (
    <div className="space-y-4">
      {/* Basic Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="h-5 w-5" />
            Business Information
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-600 mb-1">Legal Name</p>
            <p className="font-semibold text-lg">{application.legal_name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Entity Category</p>
            <Badge>{application.entity_category}</Badge>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Registration Country</p>
            <p className="font-semibold">{application.registry_country_code}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Business Registry</p>
            <p className="font-semibold text-sm">{application.business_registry_name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Entity Legal Form</p>
            <p className="font-semibold text-sm">{application.entity_legal_form}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Unique Business ID</p>
            <p className="font-semibold text-sm">{application.unique_business_id}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Entity Creation Date</p>
            <p className="font-semibold">
              {application.entity_creation_date 
                ? format(new Date(application.entity_creation_date), 'MMM dd, yyyy')
                : 'N/A'}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Employee Count</p>
            <p className="font-semibold">{application.number_of_employees}</p>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Contact Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-600 mb-1">General Email</p>
              <p className="font-semibold">{application.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Website</p>
              <p className="font-semibold text-sm break-all">{application.website || 'N/A'}</p>
            </div>
          </div>

          <div className="border-t pt-4 space-y-4">
            <p className="font-semibold text-sm">Legal Representative</p>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-600 mb-1">Name</p>
                <p className="font-semibold">{application.legal_representative_name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Email</p>
                <p className="font-semibold text-sm">{application.legal_representative_email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Mobile</p>
                <p className="font-semibold">{application.legal_representative_mobile}</p>
              </div>
            </div>
          </div>

          <div className="border-t pt-4 space-y-4">
            <p className="font-semibold text-sm">Contact Person</p>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-600 mb-1">Name</p>
                <p className="font-semibold">{application.contact_person_name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Position</p>
                <p className="font-semibold text-sm">{application.contact_person_position}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Email</p>
                <p className="font-semibold text-sm">{application.contact_person_email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Telephone</p>
                <p className="font-semibold">{application.contact_person_tel}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Addresses */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Addresses
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-6">
          <div className="space-y-3">
            <p className="font-semibold text-sm">Legal Address</p>
            {application.legal_address && (
              <div className="text-sm text-gray-700">
                <p>{application.legal_address.address}</p>
                <p>{application.legal_address.city}, {application.legal_address.province}</p>
                <p>{application.legal_address.postal_code}</p>
                <p>{application.legal_address.country}</p>
              </div>
            )}
          </div>
          <div className="space-y-3">
            <p className="font-semibold text-sm">Headquarters Address</p>
            {application.headquarters_address && (
              <div className="text-sm text-gray-700">
                <p>{application.headquarters_address.address}</p>
                <p>{application.headquarters_address.city}, {application.headquarters_address.province}</p>
                <p>{application.headquarters_address.postal_code}</p>
                <p>{application.headquarters_address.country}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Documents */}
      {application.document_urls && application.document_urls.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Uploaded Documents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {application.document_urls.map((url, idx) => (
                <a
                  key={idx}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-2 rounded hover:bg-blue-50 text-blue-600 hover:underline"
                >
                  <FileText className="h-4 w-4" />
                  <span className="text-sm">Document {idx + 1}</span>
                </a>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Verification Status */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Verification Status
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-600 mb-1">Application Status</p>
            <Badge className={statusColors[application.status]}>
              {application.status}
            </Badge>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">TAS Verification</p>
            <Badge variant="outline">
              {application.tas_verification_status || 'pending'}
            </Badge>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Submitted Date</p>
            <p className="font-semibold">
              {format(new Date(application.created_date), 'MMM dd, yyyy HH:mm')}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">LEI Status</p>
            <Badge variant={application.generated_lei ? 'default' : 'outline'}>
              {application.generated_lei ? `Issued: ${application.generated_lei}` : 'Not Issued'}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}