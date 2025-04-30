
import React from 'react';
import { Navigate } from 'react-router-dom';
import AdminLogin from '@/components/admin/AdminLogin';
import AdminDashboard from '@/components/admin/AdminDashboard';

const Admin = () => {
  // Simple authentication check - in a real app, you'd use a proper auth system
  const isAuthenticated = localStorage.getItem('cmsAuthenticated') === 'true';

  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  return <AdminDashboard />;
};

export default Admin;
