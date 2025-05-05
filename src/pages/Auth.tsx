import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import AuthComponent from '@/components/admin/AuthLogin';

const Auth = () => {
  const { user, loading } = useAuth();

  // If loading, show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-deep-teal"></div>
      </div>
    );
  }

  // If already authenticated, redirect to admin
  if (user) {
    return <Navigate to="/admin" />;
  }

  // Otherwise, show login form
  return <AuthComponent />;
};

export default Auth;
