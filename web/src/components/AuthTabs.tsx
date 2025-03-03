'use client';

import { useState } from 'react';
import { AuthForm } from '@/components/AuthForm';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

export function AuthTabs() {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const { user } = useAuth();

  if (user) {
    return (
      <div className="flex flex-col items-center py-6 space-y-5 text-center max-w-md mx-auto">
        <div className="h-24 w-24 rounded-full bg-secondary flex items-center justify-center text-2xl font-bold text-white mb-2">
          {user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
        </div>
        <h2 className="text-2xl font-bold tracking-tight">Welcome, {user.name || user.email.split('@')[0]}</h2>
        <p className="text-sm text-muted-foreground">You are currently signed in with {user.email}</p>
        <LogoutButton />
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto w-full">
      <div className="flex justify-center mb-8">
        <Button
          variant={mode === 'login' ? 'secondary' : 'ghost'}
          className="rounded-md rounded-r-none px-8 py-2.5 text-sm font-medium transition-all"
          onClick={() => setMode('login')}
        >
          Sign In
        </Button>
        <Button
          variant={mode === 'register' ? 'secondary' : 'ghost'}
          className="rounded-md rounded-l-none px-8 py-2.5 text-sm font-medium transition-all"
          onClick={() => setMode('register')}
        >
          Register
        </Button>
      </div>

      <AuthForm mode={mode} onSuccess={() => setMode('login')} />
    </div>
  );
}

function LogoutButton() {
  const { logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
    } catch (error) {
      console.error('Error logging out:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <Button 
      variant="outline" 
      onClick={handleLogout}
      disabled={isLoggingOut}
      className="hover:bg-secondary hover:text-white transition-colors"
    >
      {isLoggingOut ? 'Signing out...' : 'Sign out'}
    </Button>
  );
} 