'use client';

import { createContext, useContext, ReactNode } from 'react';
import { authClient } from '@/lib/auth-client';

type User = {
  id: string;
  email: string;
  name: string | null;
  image?: string | null;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  logout: (redirectPath?: string) => Promise<void>;
  validateAlbionEmail: (email: string) => boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: session, isPending } = authClient.useSession();
  
  const user = session?.user as User | null;
  const loading = isPending;

  const validateAlbionEmail = (email: string) => {
    const emailRegex = /@albion\.edu$/i;
    return emailRegex.test(email);
  };

  const signUp = async (email: string, password: string, name: string) => {
    try {
      if (!validateAlbionEmail(email)) {
        throw new Error('Only @albion.edu email addresses are allowed to register');
      }
      
      await authClient.signUp.email({
        email,
        password,
        name,
        callbackURL: "/dashboard"
      });
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      await authClient.signIn.email({
        email,
        password,
        callbackURL: "/dashboard",
        rememberMe: true
      });
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = async (redirectPath = "/") => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            window.location.href = redirectPath;
          },
        },
      });
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, logout, validateAlbionEmail }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 