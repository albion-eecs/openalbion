'use client';

import { useState, memo } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type AuthFormProps = {
  onSuccess?: () => void;
};

export const AuthForm = memo(function AuthForm({ onSuccess }: AuthFormProps) {
  const { signUp, signIn, validateAlbionEmail } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await signIn(email, password);
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error('Authentication error:', err);
      setError(err instanceof Error ? err.message : 'Authentication failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateAlbionEmail(email)) {
      setError('Only @albion.edu email addresses are allowed to register');
      return;
    }

    setIsLoading(true);

    try {
      await signUp(email, password, name);
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error('Registration error:', err);
      setError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 relative">
      <div className="absolute -top-12 -left-12 w-40 h-40 bg-secondary/20 rounded-full filter blur-3xl opacity-50 animate-pulse"></div>
      <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-secondary/20 rounded-full filter blur-3xl opacity-50 animate-pulse" style={{ animationDelay: '2s' }}></div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="login">Sign In</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>
        
        <TabsContent value="login" className="space-y-4">
          <div className="space-y-2 text-center relative z-10">
            <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-white to-white bg-clip-text text-transparent">Sign In</h1>
            <p className="text-sm text-muted-foreground">
              Access the Albion research data portal
            </p>
          </div>

          {error && (
            <div className="text-destructive text-sm p-3 bg-destructive/10 rounded-lg border border-destructive/20 relative z-10">
              {error}
            </div>
          )}

          <form onSubmit={handleSignIn} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="name@albion.edu" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <div className="pt-4">
              <Button 
                type="submit"
                className="w-full h-10 text-base bg-gradient-to-r from-secondary to-purple-600 text-white hover:shadow-md hover:shadow-secondary/20 transition-all duration-300"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  <span>Sign in</span>
                )}
              </Button>
            </div>
          </form>
        </TabsContent>
        
        <TabsContent value="register" className="space-y-4">
          <div className="space-y-2 text-center relative z-10">
            <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-white to-white bg-clip-text text-transparent">Create Account</h1>
            <p className="text-sm text-muted-foreground">
              Register for the Albion research data portal
            </p>
          </div>

          {error && (
            <div className="text-destructive text-sm p-3 bg-destructive/10 rounded-lg border border-destructive/20 relative z-10">
              {error}
            </div>
          )}

          <form onSubmit={handleSignUp} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="reg-name">Full Name</Label>
              <Input 
                id="reg-name" 
                type="text" 
                placeholder="Your Name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reg-email">Email</Label>
              <Input 
                id="reg-email" 
                type="email" 
                placeholder="name@albion.edu" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <p className="text-xs text-muted-foreground">
                Only @albion.edu email addresses are allowed to register
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="reg-password">Password</Label>
              <Input 
                id="reg-password" 
                type="password" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <div className="pt-4">
              <Button 
                type="submit"
                className="w-full h-10 text-base bg-gradient-to-r from-secondary to-purple-600 text-white hover:shadow-md hover:shadow-secondary/20 transition-all duration-300"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Registering...
                  </span>
                ) : (
                  <span>Register</span>
                )}
              </Button>
            </div>
          </form>
        </TabsContent>
      </Tabs>

      {/* Decorative purple elements */}
      <div className="absolute top-1/2 -right-6 w-12 h-12 rounded-full border border-secondary/40 animate-ping opacity-20" style={{ animationDuration: '4s' }}></div>
      <div className="absolute top-1/3 -left-8 w-16 h-16 rounded-full border border-secondary/30 animate-ping opacity-10" style={{ animationDuration: '6s' }}></div>
    </div>
  );
}); 