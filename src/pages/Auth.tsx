import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Lock, Mail, User, AlertCircle, Loader2 } from 'lucide-react';
import { z } from 'zod';

// Input validation schemas
const emailSchema = z.string().email({ message: "Please enter a valid email address" }).max(255);
const passwordSchema = z.string().min(6, { message: "Password must be at least 6 characters" }).max(128);
const fullNameSchema = z.string().min(1, { message: "Name is required" }).max(100).trim();

const Auth = () => {
  const { user, loading } = useAuth();
  const [tab, setTab] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();
  
  // If loading, show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-deep-teal mb-4"></div>
          <p className="text-muted-foreground">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // If already authenticated, redirect to admin
  if (user) {
    return <Navigate to="/admin" />;
  }
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setAuthLoading(true);
    
    try {
      // Validate inputs
      const emailResult = emailSchema.safeParse(email);
      if (!emailResult.success) {
        throw new Error(emailResult.error.errors[0].message);
      }
      
      const passwordResult = passwordSchema.safeParse(password);
      if (!passwordResult.success) {
        throw new Error(passwordResult.error.errors[0].message);
      }
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email: emailResult.data,
        password,
      });
      
      if (error) throw error;
      
      // Login successful - the redirect will happen automatically
      setSuccess("Login successful!");
      navigate('/admin');
    } catch (err: any) {
      setError(err.message || "Failed to sign in");
    } finally {
      setAuthLoading(false);
    }
  };
  
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setAuthLoading(true);
    
    try {
      // Validate inputs
      const emailResult = emailSchema.safeParse(email);
      if (!emailResult.success) {
        throw new Error(emailResult.error.errors[0].message);
      }
      
      const passwordResult = passwordSchema.safeParse(password);
      if (!passwordResult.success) {
        throw new Error(passwordResult.error.errors[0].message);
      }
      
      const fullNameResult = fullNameSchema.safeParse(fullName);
      if (!fullNameResult.success) {
        throw new Error(fullNameResult.error.errors[0].message);
      }
      
      const redirectUrl = `${window.location.origin}/`;
      
      const { data, error } = await supabase.auth.signUp({
        email: emailResult.data,
        password,
        options: {
          data: {
            full_name: fullNameResult.data,
          },
          emailRedirectTo: redirectUrl,
        },
      });
      
      if (error) throw error;
      
      if (data.user) {
        setSuccess("Registration successful! You can now log in.");
        setTab('login');
        setPassword('');
      }
    } catch (err: any) {
      if (err.message?.includes('already registered')) {
        setError("This email is already registered. Please log in instead.");
      } else {
        setError(err.message || "Failed to sign up");
      }
    } finally {
      setAuthLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="h-12 w-12 rounded-full bg-natural-purple/20 flex items-center justify-center">
              <Lock className="h-6 w-6 text-natural-purple" />
            </div>
          </div>
          <CardTitle className="text-2xl font-playfair">
            {tab === 'login' ? 'Welcome Back' : 'Create Account'}
          </CardTitle>
          <CardDescription>
            {tab === 'login' ? 'Enter your credentials to access the admin dashboard' : 'Sign up for a new account'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          {success && (
            <Alert className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}
          
          <Tabs value={tab} onValueChange={(value) => setTab(value as 'login' | 'signup')}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="youremail@example.com" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                      autoComplete="email"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="password" 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10"
                      required
                      autoComplete="current-password"
                    />
                  </div>
                </div>
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={authLoading}
                >
                  {authLoading ? (
                    <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Signing in...</>
                  ) : (
                    'Sign In'
                  )}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="fullName" 
                      placeholder="Your Name" 
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="pl-10"
                      required
                      autoComplete="name"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emailSignup">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="emailSignup" 
                      type="email" 
                      placeholder="youremail@example.com" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                      autoComplete="email"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="passwordSignup">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="passwordSignup" 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10"
                      required
                      minLength={6}
                      autoComplete="new-password"
                    />
                  </div>
                </div>
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={authLoading}
                >
                  {authLoading ? (
                    <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Creating Account...</>
                  ) : (
                    'Create Account'
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            {tab === 'login' 
              ? "Don't have an account? Click Sign Up above." 
              : "Already have an account? Click Login above."}
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Auth;
