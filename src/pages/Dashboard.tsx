import React from 'react';
import { Users, UserCircle, Briefcase, Activity } from 'lucide-react';
import Layout from '../components/layout/Layout';
import PageHeader from '../components/shared/PageHeader';
import StatsCard from '../components/shared/StatsCard';
import Card from '../components/shared/Card';
import { getEntityCount, getActiveCount } from '../services/dataService';
import { StatsCard as StatsCardType } from '../types';

const Dashboard: React.FC = () => {
  // Stats data
  const stats: StatsCardType[] = [
    {
      title: 'Total Admins',
      value: getEntityCount('admin'),
      icon: 'UserCircle',
      color: 'bg-blue-600',
    },
    {
      title: 'Total Candidates',
      value: getEntityCount('candidate'),
      icon: 'Users',
      color: 'bg-teal-600',
    },
    {
      title: 'Total Companies',
      value: getEntityCount('company'),
      icon: 'Briefcase',
      color: 'bg-purple-600',
    },
    {
      title: 'Active Users',
      value: getActiveCount('admin') + getActiveCount('candidate'),
      icon: 'Activity',
      color: 'bg-amber-600',
    },
  ];

  return (
    <Layout>
      <PageHeader 
        title="Dashboard" 
        subtitle="Welcome to your admin panel!" 
      />
      
      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatsCard key={index} stat={stat} />
        ))}
      </div>
      
      {/* Quick Access Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <h2 className="text-lg font-medium text-gray-800 mb-4">Recent Activities</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <span className="flex h-8 w-8 rounded-full bg-blue-100 text-blue-600 items-center justify-center mr-3">
                <Users size={16} />
              </span>
              <div>
                <p className="text-sm font-medium">New candidate added</p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="flex h-8 w-8 rounded-full bg-green-100 text-green-600 items-center justify-center mr-3">
                <Briefcase size={16} />
              </span>
              <div>
                <p className="text-sm font-medium">Company status updated</p>
                <p className="text-xs text-gray-500">Yesterday</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="flex h-8 w-8 rounded-full bg-amber-100 text-amber-600 items-center justify-center mr-3">
                <UserCircle size={16} />
              </span>
              <div>
                <p className="text-sm font-medium">Admin role changed</p>
                <p className="text-xs text-gray-500">3 days ago</p>
              </div>
            </div>
          </div>
        </Card>
        
        <Card>
          <h2 className="text-lg font-medium text-gray-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <button className="flex flex-col items-center justify-center bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors">
              <span className="p-2 rounded-full bg-blue-100 text-blue-600 mb-2">
                <UserCircle size={20} />
              </span>
              <span className="text-sm font-medium text-gray-700">Add Admin</span>
            </button>
            <button className="flex flex-col items-center justify-center bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors">
              <span className="p-2 rounded-full bg-teal-100 text-teal-600 mb-2">
                <Users size={20} />
              </span>
              <span className="text-sm font-medium text-gray-700">Add Candidate</span>
            </button>
            <button className="flex flex-col items-center justify-center bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors">
              <span className="p-2 rounded-full bg-purple-100 text-purple-600 mb-2">
                <Briefcase size={20} />
              </span>
              <span className="text-sm font-medium text-gray-700">Add Company</span>
            </button>
            <button className="flex flex-col items-center justify-center bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors">
              <span className="p-2 rounded-full bg-amber-100 text-amber-600 mb-2">
                <Activity size={20} />
              </span>
              <span className="text-sm font-medium text-gray-700">Reports</span>
            </button>
          </div>
        </Card>
      </div>
      
      {/* System Status Card */}
      <Card>
        <h2 className="text-lg font-medium text-gray-800 mb-4">System Status</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium">Server Status</p>
              <p className="text-xs text-gray-500">All systems operational</p>
            </div>
            <span className="inline-flex h-3 w-3 rounded-full bg-green-500"></span>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium">Database Status</p>
              <p className="text-xs text-gray-500">Connected, performance normal</p>
            </div>
            <span className="inline-flex h-3 w-3 rounded-full bg-green-500"></span>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium">Last Backup</p>
              <p className="text-xs text-gray-500">Today, 04:30 AM</p>
            </div>
            <button className="text-xs text-blue-600 hover:text-blue-800">Details</button>
          </div>
        </div>
      </Card>
    </Layout>
  );
};

export default Dashboard;