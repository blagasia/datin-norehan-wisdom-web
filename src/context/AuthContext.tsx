
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

interface AuthState {
  session: Session | null;
  user: User | null;
  userRole: string | null;
  loading: boolean;
}

interface AuthContextProps extends AuthState {
  signOut: () => Promise<void>;
  isAdmin: () => boolean;
  isEditor: () => boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    session: null,
    user: null,
    userRole: null,
    loading: true,
  });
  const { toast } = useToast();

  useEffect(() => {
    // Function to fetch user role
    const fetchUserRole = async (userId: string) => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', userId)
          .single();
        
        if (error) {
          console.error('Error fetching user role:', error);
          return null;
        }
        
        return data?.role || null;
      } catch (error) {
        console.error('Error in fetchUserRole:', error);
        return null;
      }
    };

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setAuthState(prev => ({ ...prev, session, user: session?.user ?? null }));
        
        if (session?.user) {
          // Use setTimeout to prevent potential deadlocks with Supabase auth
          setTimeout(async () => {
            const role = await fetchUserRole(session.user.id);
            setAuthState(prev => ({ ...prev, userRole: role, loading: false }));
          }, 0);
        } else {
          setAuthState(prev => ({ ...prev, userRole: null, loading: false }));
        }
      }
    );

    // Get initial session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setAuthState(prev => ({ ...prev, session, user: session?.user ?? null }));
      
      if (session?.user) {
        const role = await fetchUserRole(session.user.id);
        setAuthState(prev => ({ ...prev, userRole: role, loading: false }));
      } else {
        setAuthState(prev => ({ ...prev, loading: false }));
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Logged out",
        description: "You've been successfully logged out",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to sign out: " + error.message,
        variant: "destructive",
      });
    }
  };

  const isAdmin = () => authState.userRole === 'admin';
  const isEditor = () => authState.userRole === 'editor' || authState.userRole === 'admin';

  const value = {
    ...authState,
    signOut,
    isAdmin,
    isEditor,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
