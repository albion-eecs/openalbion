'use client';

import { useState, memo } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

type AuthFormProps = {
  onSuccess?: () => void;
};

export const AuthForm = memo(function AuthForm({ onSuccess }: AuthFormProps) {
  const { loginWithGoogle } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleSignIn = async () => {
    setError(null);
    setIsLoading(true);

    try {
      await loginWithGoogle();

      if (onSuccess) onSuccess();
    } catch (err) {
      console.error('Authentication error:', err);
      setError(err instanceof Error ? err.message : 'Authentication failed');
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 relative">
      <div className="absolute -top-12 -left-12 w-40 h-40 bg-secondary/20 rounded-full filter blur-3xl opacity-50 animate-pulse"></div>
      <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-secondary/20 rounded-full filter blur-3xl opacity-50 animate-pulse" style={{ animationDelay: '2s' }}></div>
      
      <div className="space-y-2 text-center relative z-10">
        <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-white via-secondary/80 to-white bg-clip-text text-transparent">Sign In with Google</h1>
        <p className="text-sm text-muted-foreground">
          Access the Albion research data portal with your @albion.edu account
        </p>
      </div>

      {error && (
        <div className="text-destructive text-sm p-3 bg-destructive/10 rounded-lg border border-destructive/20 relative z-10">
          {error}
        </div>
      )}

      <div className="relative group z-10">
        {/* Button glow effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-secondary to-purple-500 rounded-lg blur-sm opacity-75 group-hover:opacity-100 transition duration-300"></div>
        
        <Button 
          onClick={handleGoogleSignIn}
          className="relative w-full h-11 bg-white hover:bg-slate-100 text-black font-medium rounded-lg transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center space-x-2"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Signing in...
            </span>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px">
                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
                <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
                <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
                <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
              </svg>
              <span>Sign in with Google</span>
            </>
          )}
        </Button>
      </div>

      <div className="text-center mt-6 relative z-10">
        <p className="text-xs text-muted-foreground">
          Only @albion.edu email addresses allowed
        </p>
      </div>
      
      {/* Decorative purple elements */}
      <div className="absolute top-1/2 -right-6 w-12 h-12 rounded-full border border-secondary/40 animate-ping opacity-20" style={{ animationDuration: '4s' }}></div>
      <div className="absolute top-1/3 -left-8 w-16 h-16 rounded-full border border-secondary/30 animate-ping opacity-10" style={{ animationDuration: '6s' }}></div>
    </div>
  );
}); 