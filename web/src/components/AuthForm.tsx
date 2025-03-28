'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertError } from '@/components/ui/alert-error';
import { FormError } from '@/components/ui/form-error';

type AuthFormProps = {
  onSuccess?: () => void;
};

type FieldErrors = {
  name?: string;
  email?: string;
  password?: string;
};

export function AuthForm({ onSuccess }: AuthFormProps) {
  const { signUp, signIn, validateAlbionEmail } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [activeTab, setActiveTab] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const validateForm = (isRegister = false): boolean => {
    const errors: FieldErrors = {};
    let isValid = true;

    setFieldErrors({});
    setFormError(null);

    if (!email.trim()) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Please include an @ in the email';
      isValid = false;
    } else if (isRegister && !validateAlbionEmail(email)) {
      errors.email = 'Must use an @albion.edu email';
      isValid = false;
    }

    if (!password) {
      errors.password = 'Password is required';
      isValid = false;
    } else if (isRegister && password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
      isValid = false;
    }

    if (isRegister && !name.trim()) {
      errors.name = 'Name is required';
      isValid = false;
    }

    setFieldErrors(errors);
    return isValid;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (fieldErrors.email) {
      setFieldErrors(prev => ({ ...prev, email: undefined }));
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (fieldErrors.password) {
      setFieldErrors(prev => ({ ...prev, password: undefined }));
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    if (fieldErrors.name) {
      setFieldErrors(prev => ({ ...prev, name: undefined }));
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);

    try {
      await signIn(email, password);
      if (onSuccess) onSuccess();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Authentication failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm(true)) return;
    
    setIsLoading(true);

    try {
      await signUp(email, password, name);
      if (onSuccess) onSuccess();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Registration failed');
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
              Access the portal
            </p>
          </div>

          <AlertError message={formError} />

          <form onSubmit={handleSignIn} noValidate className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="name@albion.edu" 
                value={email}
                onChange={handleEmailChange}
                className={fieldErrors.email ? "border-destructive/50 focus-visible:ring-destructive/30" : ""}
                aria-invalid={!!fieldErrors.email}
                required
              />
              <FormError message={fieldErrors.email} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                placeholder="••••••••" 
                value={password}
                onChange={handlePasswordChange}
                className={fieldErrors.password ? "border-destructive/50 focus-visible:ring-destructive/30" : ""}
                aria-invalid={!!fieldErrors.password}
                required
              />
              <FormError message={fieldErrors.password} />
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
              Register for the portal
            </p>
          </div>

          <AlertError message={formError} />

          <form onSubmit={handleSignUp} noValidate className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="reg-name">Full Name</Label>
              <Input 
                id="reg-name" 
                type="text" 
                placeholder="Your Name" 
                value={name}
                onChange={handleNameChange}
                className={fieldErrors.name ? "border-destructive/50 focus-visible:ring-destructive/30" : ""}
                aria-invalid={!!fieldErrors.name}
                required
              />
              <FormError message={fieldErrors.name} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reg-email">Email</Label>
              <Input 
                id="reg-email" 
                type="email" 
                placeholder="name@albion.edu" 
                value={email}
                onChange={handleEmailChange}
                className={fieldErrors.email ? "border-destructive/50 focus-visible:ring-destructive/30" : ""}
                aria-invalid={!!fieldErrors.email}
                required
              />
              <FormError message={fieldErrors.email} />
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
                onChange={handlePasswordChange}
                className={fieldErrors.password ? "border-destructive/50 focus-visible:ring-destructive/30" : ""}
                aria-invalid={!!fieldErrors.password}
                required
              />
              <FormError message={fieldErrors.password} />
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

      <div className="absolute top-1/2 -right-6 w-12 h-12 rounded-full border border-secondary/40 animate-ping opacity-20" style={{ animationDuration: '4s' }}></div>
      <div className="absolute top-1/3 -left-8 w-16 h-16 rounded-full border border-secondary/30 animate-ping opacity-10" style={{ animationDuration: '6s' }}></div>
    </div>
  );
} 