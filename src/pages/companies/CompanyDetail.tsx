import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Edit, ArrowLeft, ExternalLink, Mail, MapPin, Users, Building } from 'lucide-react';
import Layout from '../../components/layout/Layout';
import PageHeader from '../../components/shared/PageHeader';
import Button from '../../components/shared/Button';
import Card from '../../components/shared/Card';
import StatusBadge from '../../components/shared/StatusBadge';
import { Company } from '../../types';
import { getCompanyById } from '../../services/dataService';

const CompanyDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [company, setCompany] = useState<Company | null>(null);

  useEffect(() => {
    if (id) {
      const companyData = getCompanyById(id);
      setCompany(companyData || null);
    }
  }, [id]);

  if (!company) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center h-64">
          <p className="text-gray-500">Company not found</p>
          <Button 
            variant="secondary" 
            onClick={() => navigate('/companies')}
            className="mt-4"
          >
            Return to Company List
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <PageHeader
        title="Company Details"
        subtitle="View company information"
        actions={
          <div className="flex space-x-3">
            <Button
              variant="secondary"
              onClick={() => navigate('/companies')}
              icon={<ArrowLeft size={16} />}
            >
              Back
            </Button>
            <Button
              variant="primary"
              onClick={() => navigate(`/companies/${id}/edit`)}
              icon={<Edit size={16} />}
            >
              Edit
            </Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Info Card */}
        <Card className="md:col-span-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-200">
            <div className="flex items-center">
              <div className="h-16 w-16 rounded-md bg-purple-500 flex items-center justify-center text-white text-xl font-medium">
                {company.name.slice(0, 2).toUpperCase()}
              </div>
              <div className="ml-4">
                <h2 className="text-xl font-semibold text-gray-800">{company.name}</h2>
                <p className="text-sm text-gray-500">{company.industry}</p>
              </div>
            </div>
            <StatusBadge status={company.status} />
          </div>

          <div className="mt-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start">
                <MapPin size={18} className="text-gray-400 mt-0.5 mr-2" />
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Location</h3>
                  <p className="mt-1 text-sm text-gray-900">{company.location}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Users size={18} className="text-gray-400 mt-0.5 mr-2" />
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Size</h3>
                  <p className="mt-1 text-sm text-gray-900">{company.size}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Building size={18} className="text-gray-400 mt-0.5 mr-2" />
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Website</h3>
                  <p className="mt-1 text-sm text-gray-900">
                    <a 
                      href={company.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 flex items-center"
                    >
                      {company.website}
                      <ExternalLink size={12} className="ml-1" />
                    </a>
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Mail size={18} className="text-gray-400 mt-0.5 mr-2" />
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Contact</h3>
                  <p className="mt-1 text-sm text-gray-900">
                    {company.contactName} - {company.contactEmail}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-4">
              <h3 className="text-sm font-medium text-gray-500 mb-2">About</h3>
              <p className="text-sm text-gray-700">
                {company.name} is a leading company in the {company.industry.toLowerCase()} industry, located in {company.location}. 
                With a team of {company.size} dedicated professionals, they are known for innovation and excellence in their field.
              </p>
            </div>
          </div>
        </Card>

        {/* Additional Info Card */}
        <Card>
          <h3 className="text-base font-medium text-gray-800 mb-4">Company Statistics</h3>
          
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-medium text-gray-500">Active Candidates</h4>
                <span className="text-sm font-medium text-gray-900">5</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
                <div className="h-full bg-purple-500 rounded-full" style={{ width: '50%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-medium text-gray-500">Hired Candidates</h4>
                <span className="text-sm font-medium text-gray-900">12</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
                <div className="h-full bg-green-500 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-medium text-gray-500">Open Positions</h4>
                <span className="text-sm font-medium text-gray-900">3</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: '30%' }}></div>
              </div>
            </div>
            
            <div className="pt-4 border-t border-gray-200">
              <h4 className="text-sm font-medium text-gray-800 mb-2">Recent Activity</h4>
              <ul className="space-y-2">
                <li className="text-sm text-gray-600">Posted new job for Frontend Developer (3 days ago)</li>
                <li className="text-sm text-gray-600">Updated company profile (1 week ago)</li>
                <li className="text-sm text-gray-600">Hired a new UX Designer (2 weeks ago)</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default CompanyDetail;