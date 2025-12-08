import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

type AppRole = 'admin' | 'moderator' | 'user';

interface AuthState {
  session: Session | null;
  user: User | null;
  userRoles: AppRole[];
  loading: boolean;
}

interface AuthContextProps extends AuthState {
  signOut: () => Promise<void>;
  isAdmin: () => boolean;
  isEditor: () => boolean;
  hasRole: (role: AppRole) => boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    session: null,
    user: null,
    userRoles: [],
    loading: true,
  });
  const { toast } = useToast();

  useEffect(() => {
    // Function to fetch user roles from user_roles table
    const fetchUserRoles = async (userId: string): Promise<AppRole[]> => {
      try {
        const { data, error } = await (supabase
          .from('user_roles' as any)
          .select('role')
          .eq('user_id', userId) as any);
        
        if (error) {
          console.error('Error fetching user roles:', error);
          return [];
        }
        
        return (data || []).map((row: { role: AppRole }) => row.role);
      } catch (error) {
        console.error('Error in fetchUserRoles:', error);
        return [];
      }
    };

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setAuthState(prev => ({ ...prev, session, user: session?.user ?? null }));
        
        if (session?.user) {
          // Use setTimeout to prevent potential deadlocks with Supabase auth
          setTimeout(async () => {
            const roles = await fetchUserRoles(session.user.id);
            setAuthState(prev => ({ ...prev, userRoles: roles, loading: false }));
          }, 0);
        } else {
          setAuthState(prev => ({ ...prev, userRoles: [], loading: false }));
        }
      }
    );

    // Get initial session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setAuthState(prev => ({ ...prev, session, user: session?.user ?? null }));
      
      if (session?.user) {
        const roles = await fetchUserRoles(session.user.id);
        setAuthState(prev => ({ ...prev, userRoles: roles, loading: false }));
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

  const hasRole = (role: AppRole) => authState.userRoles.includes(role);
  const isAdmin = () => hasRole('admin');
  const isEditor = () => hasRole('moderator') || hasRole('admin');

  const value = {
    ...authState,
    signOut,
    isAdmin,
    isEditor,
    hasRole,
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
