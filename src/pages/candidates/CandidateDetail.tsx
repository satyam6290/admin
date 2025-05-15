import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Edit, ArrowLeft, Phone, Mail, Briefcase, Clock } from 'lucide-react';
import Layout from '../../components/layout/Layout';
import PageHeader from '../../components/shared/PageHeader';
import Button from '../../components/shared/Button';
import Card from '../../components/shared/Card';
import StatusBadge from '../../components/shared/StatusBadge';
import { Candidate } from '../../types';
import { getCandidateById } from '../../services/dataService';

const CandidateDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [candidate, setCandidate] = useState<Candidate | null>(null);

  useEffect(() => {
    if (id) {
      const candidateData = getCandidateById(id);
      setCandidate(candidateData || null);
    }
  }, [id]);

  if (!candidate) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center h-64">
          <p className="text-gray-500">Candidate not found</p>
          <Button 
            variant="secondary" 
            onClick={() => navigate('/candidates')}
            className="mt-4"
          >
            Return to Candidate List
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <PageHeader
        title="Candidate Details"
        subtitle="View candidate information"
        actions={
          <div className="flex space-x-3">
            <Button
              variant="secondary"
              onClick={() => navigate('/candidates')}
              icon={<ArrowLeft size={16} />}
            >
              Back
            </Button>
            <Button
              variant="primary"
              onClick={() => navigate(`/candidates/${id}/edit`)}
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
              <div className="h-16 w-16 rounded-full bg-teal-500 flex items-center justify-center text-white text-xl font-medium">
                {candidate.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="ml-4">
                <h2 className="text-xl font-semibold text-gray-800">{candidate.name}</h2>
                <p className="text-sm text-gray-500">{candidate.position}</p>
              </div>
            </div>
            <StatusBadge status={candidate.status} />
          </div>

          <div className="mt-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start">
                <Mail size={18} className="text-gray-400 mt-0.5 mr-2" />
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Email</h3>
                  <p className="mt-1 text-sm text-gray-900">{candidate.email}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Phone size={18} className="text-gray-400 mt-0.5 mr-2" />
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Phone</h3>
                  <p className="mt-1 text-sm text-gray-900">{candidate.phone}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Briefcase size={18} className="text-gray-400 mt-0.5 mr-2" />
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Experience</h3>
                  <p className="mt-1 text-sm text-gray-900">{candidate.experience} years</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Clock size={18} className="text-gray-400 mt-0.5 mr-2" />
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Applied On</h3>
                  <p className="mt-1 text-sm text-gray-900">
                    {new Date(candidate.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-4">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {candidate.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center rounded-full bg-teal-100 px-3 py-0.5 text-sm font-medium text-teal-800"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Additional Info Card */}
        <Card>
          <h3 className="text-base font-medium text-gray-800 mb-4">Application Status</h3>
          
          <div className="space-y-6">
            <div>
              <div className="relative">
                <div className="flex items-center mb-2">
                  <div className="z-10 flex h-6 w-6 items-center justify-center rounded-full bg-teal-500 text-white">
                    <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h4 className="text-sm font-medium text-gray-900">Application Received</h4>
                    <p className="text-xs text-gray-500">Mar 24, 2025</p>
                  </div>
                </div>
                <div className="absolute top-6 left-3 -ml-px h-full w-0.5 bg-gray-200"></div>
              </div>
              
              {/* Second step */}
              <div className="relative">
                <div className="flex items-center mb-2">
                  <div className="z-10 flex h-6 w-6 items-center justify-center rounded-full bg-teal-500 text-white">
                    <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h4 className="text-sm font-medium text-gray-900">Resume Reviewed</h4>
                    <p className="text-xs text-gray-500">Mar 25, 2025</p>
                  </div>
                </div>
                <div className="absolute top-6 left-3 -ml-px h-full w-0.5 bg-gray-200"></div>
              </div>
              
              {/* Third step */}
              <div className="relative">
                <div className="flex items-center mb-2">
                  <div className={`z-10 flex h-6 w-6 items-center justify-center rounded-full ${
                    candidate.status === 'interviewing' || candidate.status === 'hired'
                      ? 'bg-teal-500 text-white'
                      : 'bg-white border-2 border-gray-300'
                  }`}>
                    {(candidate.status === 'interviewing' || candidate.status === 'hired') && (
                      <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <div className="ml-3">
                    <h4 className="text-sm font-medium text-gray-900">Interview Scheduled</h4>
                    {(candidate.status === 'interviewing' || candidate.status === 'hired') ? (
                      <p className="text-xs text-gray-500">Mar 28, 2025</p>
                    ) : (
                      <p className="text-xs text-gray-500">Pending</p>
                    )}
                  </div>
                </div>
                <div className="absolute top-6 left-3 -ml-px h-full w-0.5 bg-gray-200"></div>
              </div>
              
              {/* Fourth step */}
              <div className="relative">
                <div className="flex items-center">
                  <div className={`z-10 flex h-6 w-6 items-center justify-center rounded-full ${
                    candidate.status === 'hired'
                      ? 'bg-teal-500 text-white'
                      : 'bg-white border-2 border-gray-300'
                  }`}>
                    {candidate.status === 'hired' && (
                      <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <div className="ml-3">
                    <h4 className="text-sm font-medium text-gray-900">Offer Extended</h4>
                    {candidate.status === 'hired' ? (
                      <p className="text-xs text-gray-500">Apr 2, 2025</p>
                    ) : (
                      <p className="text-xs text-gray-500">Pending</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-4">
              <h4 className="text-sm font-medium text-gray-800 mb-2">Interviewer Notes</h4>
              <p className="text-sm text-gray-600 italic">
                "Great candidate with strong technical skills. Shows enthusiasm for the role and has relevant experience in similar projects."
              </p>
              <p className="text-xs text-gray-500 mt-1">- John Doe, Mar 28, 2025</p>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default CandidateDetail;