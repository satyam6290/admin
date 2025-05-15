import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Edit, ArrowLeft, Clock, Calendar } from 'lucide-react';
import Layout from '../../components/layout/Layout';
import PageHeader from '../../components/shared/PageHeader';
import Button from '../../components/shared/Button';
import Card from '../../components/shared/Card';
import StatusBadge from '../../components/shared/StatusBadge';
import { Admin } from '../../types';
import { getAdminById } from '../../services/dataService';

const AdminDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [admin, setAdmin] = useState<Admin | null>(null);

  useEffect(() => {
    if (id) {
      const adminData = getAdminById(id);
      setAdmin(adminData || null);
    }
  }, [id]);

  if (!admin) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center h-64">
          <p className="text-gray-500">Admin not found</p>
          <Button 
            variant="secondary" 
            onClick={() => navigate('/admins')}
            className="mt-4"
          >
            Return to Admin List
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <PageHeader
        title="Admin Details"
        subtitle="View administrator information"
        actions={
          <div className="flex space-x-3">
            <Button
              variant="secondary"
              onClick={() => navigate('/admins')}
              icon={<ArrowLeft size={16} />}
            >
              Back
            </Button>
            <Button
              variant="primary"
              onClick={() => navigate(`/admins/${id}/edit`)}
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
              <div className="h-16 w-16 rounded-full bg-blue-500 flex items-center justify-center text-white text-xl font-medium">
                {admin.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="ml-4">
                <h2 className="text-xl font-semibold text-gray-800">{admin.name}</h2>
                <p className="text-sm text-gray-500">{admin.email}</p>
              </div>
            </div>
            <StatusBadge status={admin.status} />
          </div>

          <div className="mt-4 space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Role</h3>
              <p className="mt-1 text-base text-gray-900">{admin.role}</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-gray-200 pt-4">
              <div className="flex items-center">
                <Calendar size={18} className="text-gray-400 mr-2" />
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Created At</h3>
                  <p className="mt-1 text-sm text-gray-900">
                    {new Date(admin.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Clock size={18} className="text-gray-400 mr-2" />
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Last Login</h3>
                  <p className="mt-1 text-sm text-gray-900">
                    {new Date(admin.lastLogin).toLocaleDateString()} at {' '}
                    {new Date(admin.lastLogin).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Additional Info Card */}
        <Card>
          <h3 className="text-base font-medium text-gray-800 mb-4">Activity Summary</h3>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-medium text-gray-500">Total Logins</h4>
                <span className="text-sm font-medium text-gray-900">24</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-medium text-gray-500">Actions Performed</h4>
                <span className="text-sm font-medium text-gray-900">156</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
                <div className="h-full bg-green-500 rounded-full" style={{ width: '60%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-medium text-gray-500">Last Active</h4>
                <span className="text-sm font-medium text-gray-900">2 days ago</span>
              </div>
            </div>
            
            <div className="pt-4 border-t border-gray-200">
              <h4 className="text-sm font-medium text-gray-800 mb-2">Recent Activity</h4>
              <ul className="space-y-2">
                <li className="text-sm text-gray-600">Added new candidate (2 days ago)</li>
                <li className="text-sm text-gray-600">Updated company profile (3 days ago)</li>
                <li className="text-sm text-gray-600">Modified system settings (1 week ago)</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default AdminDetail;