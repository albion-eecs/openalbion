'use client';

import { useState, memo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { AuthForm } from '@/components/AuthForm';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

export const AuthTabs = memo(function AuthTabs() {
  const { user } = useAuth();
  const router = useRouter();

  const handleAuthSuccess = useCallback(() => {
    router.push('/dashboard');
  }, [router]);

  if (user) {
    return (
      <div className="flex flex-col items-center py-6 space-y-5 text-center max-w-md mx-auto">
        <div className="relative">
          <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-secondary to-primary opacity-70 blur-sm"></div>
          <div className="relative h-24 w-24 rounded-full bg-gradient-to-br from-secondary/80 to-primary/80 flex items-center justify-center text-2xl font-bold text-white">
            {user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
          </div>
        </div>
        <h2 className="text-2xl font-bold tracking-tight">Welcome, {user.name || user.email.split('@')[0]}</h2>
        <p className="text-sm text-muted-foreground">You are currently signed in with {user.email}</p>
        <Button 
          className="bg-gradient-to-r from-secondary to-primary text-white font-medium rounded-lg px-6 py-2 shadow-md"
          onClick={() => router.push('/dashboard')}
        >
          Go to Dashboard
        </Button>
        <LogoutButton />
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto w-full">
      <div className="relative">
        <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-white/5 to-white/10 opacity-70 blur-sm"></div>
        <div className="relative bg-background/90 backdrop-blur-sm rounded-xl border border-white/10 p-6 shadow-lg min-h-[300px]">
          <AuthForm onSuccess={handleAuthSuccess} />
        </div>
      </div>
    </div>
  );
});

const LogoutButton = memo(function LogoutButton() {
  const { logout } = useAuth();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      router.push('/');
    } catch (error) {
      console.error('Error logging out:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <Button 
      onClick={handleLogout}
      disabled={isLoggingOut}
      className="bg-gradient-to-r from-white/10 to-white/5 hover:from-secondary/20 hover:to-primary/20 border border-white/10 text-foreground hover:text-secondary transition-all duration-300 font-medium rounded-lg px-6"
    >
      {isLoggingOut ? 'Signing out...' : 'Sign out'}
    </Button>
  );
}); 