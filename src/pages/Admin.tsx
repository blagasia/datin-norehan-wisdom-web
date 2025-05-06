
import React, { useState, useEffect } from 'react';
import AdminDashboard from '@/components/admin/AdminDashboard';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/context/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';

const Admin = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // When auth state is resolved, update loading state
    if (!loading) {
      setIsLoading(false);
      
      // If not authenticated, redirect to auth page
      if (!user) {
        toast({
          title: "Authentication required",
          description: "Please log in to access the admin dashboard",
        });
        navigate('/auth');
      }
    }
  }, [loading, user, navigate, toast]);
  
  if (isLoading || loading) {
    // Show loading state while checking authentication
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-deep-teal mb-4"></div>
          <p className="text-muted-foreground">Loading admin dashboard...</p>
        </div>
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
