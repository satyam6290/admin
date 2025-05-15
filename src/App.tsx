import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { NotificationProvider } from './components/shared/NotificationContext';

// Pages
import Dashboard from './pages/Dashboard';
import AdminList from './pages/admins/AdminList';
import AdminForm from './pages/admins/AdminForm';
import AdminDetail from './pages/admins/AdminDetail';
import CandidateList from './pages/candidates/CandidateList';
import CandidateForm from './pages/candidates/CandidateForm';
import CandidateDetail from './pages/candidates/CandidateDetail';
import CompanyList from './pages/companies/CompanyList';
import CompanyForm from './pages/companies/CompanyForm';
import CompanyDetail from './pages/companies/CompanyDetail';
import NotFound from './pages/NotFound';

function App() {
  return (
    <NotificationProvider>
      <Router>
        <Routes>
          {/* Dashboard */}
          <Route path="/" element={<Dashboard />} />
          
          {/* Admin Routes */}
          <Route path="/admins" element={<AdminList />} />
          <Route path="/admins/add" element={<AdminForm />} />
          <Route path="/admins/:id" element={<AdminDetail />} />
          <Route path="/admins/:id/edit" element={<AdminForm />} />
          
          {/* Candidate Routes */}
          <Route path="/candidates" element={<CandidateList />} />
          <Route path="/candidates/add" element={<CandidateForm />} />
          <Route path="/candidates/:id" element={<CandidateDetail />} />
          <Route path="/candidates/:id/edit" element={<CandidateForm />} />
          
          {/* Company Routes */}
          <Route path="/companies" element={<CompanyList />} />
          <Route path="/companies/add" element={<CompanyForm />} />
          <Route path="/companies/:id" element={<CompanyDetail />} />
          <Route path="/companies/:id/edit" element={<CompanyForm />} />
          
          {/* Settings placeholder */}
          <Route path="/settings" element={<Navigate to="/" />} />
          
          {/* 404 page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </NotificationProvider>
  );
}

export default App;