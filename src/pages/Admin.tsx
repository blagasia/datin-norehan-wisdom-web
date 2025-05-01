
import React, { useState, useEffect } from 'react';
import AdminLogin from '@/components/admin/AdminLogin';
import AdminDashboard from '@/components/admin/AdminDashboard';
import { useToast } from '@/components/ui/use-toast';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();
  
  useEffect(() => {
    // Check if user is authenticated
    const authStatus = localStorage.getItem('cmsAuthenticated') === 'true';
    setIsAuthenticated(authStatus);
    setIsLoading(false);
    
    // Show authentication status for debugging purposes
    console.log('Authentication status:', authStatus);
  }, []);
  
  // Function to handle successful login
  const handleLoginSuccess = () => {
    console.log('Login successful, updating state');
    setIsAuthenticated(true);
    toast({
      title: "Login successful",
      description: "Welcome to the admin dashboard",
    });
  };
  
  if (isLoading) {
    // Show loading state while checking authentication
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-deep-teal"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminLogin onLoginSuccess={handleLoginSuccess} />;
  }

  return <AdminDashboard />;
};

export default Admin;
