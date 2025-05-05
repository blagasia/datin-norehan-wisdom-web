
import React, { useState, useEffect } from 'react';
import AdminLogin from '@/components/admin/AdminLogin';
import AdminDashboard from '@/components/admin/AdminDashboard';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/context/AuthContext';
import { Navigate } from 'react-router-dom';

const Admin = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();
  const { user, loading } = useAuth();
  
  useEffect(() => {
    // When auth state is resolved, update loading state
    if (!loading) {
      setIsLoading(false);
    }
  }, [loading]);
  
  if (isLoading || loading) {
    // Show loading state while checking authentication
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-deep-teal"></div>
      </div>
    );
  }

  // If not authenticated, redirect to auth page
  if (!user) {
    return <Navigate to="/auth" />;
  }

  // If authenticated, show dashboard
  return <AdminDashboard />;
};

export default Admin;
