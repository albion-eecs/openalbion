'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Copy, Check, Trash, X, ArrowLeft, Settings, Key, Infinity } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";

type ApiKey = {
  id: number;
  userId: string;
  apiKey: string;
  name: string;
  createdAt: number;
  expiresAt: number | null;
  lastUsedAt: number | null;
  isActive: boolean;
};

export default function SettingsPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newKeyName, setNewKeyName] = useState('');
  const [expiresInDays, setExpiresInDays] = useState('30');
  const [neverExpires, setNeverExpires] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [newApiKey, setNewApiKey] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [apiUsageAlerts, setApiUsageAlerts] = useState(true);
  const [securityAlerts, setSecurityAlerts] = useState(true);

  useEffect(() => {
    async function fetchApiKeys() {
      try {
        const response = await fetch('/api/keys');
        const data = await response.json();
        
        if (data.success) {
          setApiKeys(data.data || []);
        } else {
          setError(data.error || 'Failed to fetch API keys');
        }
      } catch (err) {
        setError('An error occurred while fetching API keys');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    
    fetchApiKeys();
  }, []);

  const handleCreateApiKey = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newKeyName.trim()) {
      setError('API key name is required');
      return;
    }
    
    setIsCreating(true);
    setError(null);
    
    try {
      const response = await fetch('/api/keys', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newKeyName,
          expiresInDays: neverExpires ? null : parseInt(expiresInDays, 10),
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setNewApiKey(data.data.apiKey);
        
        setApiKeys([data.data, ...apiKeys]);
        
        setNewKeyName('');
        setExpiresInDays('30');
        setNeverExpires(false);
      } else {
        setError(data.error || 'Failed to create API key');
      }
    } catch (err) {
      setError('An error occurred while creating API key');
      console.error(err);
    } finally {
      setIsCreating(false);
    }
  };

  const handleRevokeApiKey = async (id: number) => {
    if (!confirm('Are you sure you want to revoke this API key? This action cannot be undone.')) {
      return;
    }
    
    try {
      const response = await fetch(`/api/keys?id=${id}&action=revoke`, {
        method: 'DELETE',
      });
      
      const data = await response.json();
      
      if (data.success) {
        setApiKeys(apiKeys.map(key => 
          key.id === id ? { ...key, isActive: false } : key
        ));
      } else {
        setError(data.error || 'Failed to revoke API key');
      }
    } catch (err) {
      setError('An error occurred while revoking API key');
      console.error(err);
    }
  };

  const handleDeleteApiKey = async (id: number) => {
    if (!confirm('Are you sure you want to delete this API key? This action cannot be undone.')) {
      return;
    }
    
    try {
      const response = await fetch(`/api/keys?id=${id}&action=delete`, {
        method: 'DELETE',
      });
      
      const data = await response.json();
      
      if (data.success) {
        setApiKeys(apiKeys.filter(key => key.id !== id));
      } else {
        setError(data.error || 'Failed to delete API key');
      }
    } catch (err) {
      setError('An error occurred while deleting API key');
      console.error(err);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatDate = (timestamp: number | null) => {
    if (!timestamp) return 'Never';
    return new Date(timestamp * 1000).toLocaleString();
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          className="mr-2 p-0 h-auto" 
          onClick={() => router.push('/dashboard')}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-3xl font-bold">Settings</h1>
      </div>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 flex justify-between items-center">
          <span>{error}</span>
          <button onClick={() => setError(null)} className="text-red-700">
            <X size={18} />
          </button>
        </div>
      )}
      
      <Tabs defaultValue="apikeys" className="space-y-6">
        <TabsList className="mb-4">
          <TabsTrigger value="account" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Account
          </TabsTrigger>
          <TabsTrigger value="apikeys" className="flex items-center gap-2">
            <Key className="h-4 w-4" />
            API Keys
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="account" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your account profile information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" defaultValue={user?.name || ''} placeholder="Your name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" defaultValue={user?.email} disabled />
                  <p className="text-sm text-muted-foreground">Your email is linked to your authentication provider</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Update Profile</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Manage your notification settings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">API Usage Alerts</h4>
                    <p className="text-sm text-muted-foreground">Receive notifications when API usage nears limits</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch 
                      checked={apiUsageAlerts} 
                      onCheckedChange={setApiUsageAlerts} 
                      className="data-[state=checked]:bg-purple-600"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Security Alerts</h4>
                    <p className="text-sm text-muted-foreground">Get notified about suspicious account activity</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch 
                      checked={securityAlerts} 
                      onCheckedChange={setSecurityAlerts} 
                      className="data-[state=checked]:bg-purple-600"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="apikeys" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Create New API Key</CardTitle>
              <CardDescription>
                Generate a new API key to access the API. Keep your API keys secure!
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleCreateApiKey}>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="keyName">API Key Name</Label>
                    <Input
                      id="keyName"
                      placeholder="e.g., Development, Production"
                      value={newKeyName}
                      onChange={(e) => setNewKeyName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Expires In (Days)</Label>
                    <div className="relative flex items-center">
                      <Input
                        id="expiry"
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        disabled={neverExpires}
                        value={neverExpires ? "" : expiresInDays}
                        placeholder={neverExpires ? "∞" : "e.g., 30, 60, 90"}
                        onChange={(e) => setExpiresInDays(e.target.value)}
                        className={`pr-32 ${neverExpires ? "text-muted-foreground placeholder:text-muted-foreground/80" : ""}`}
                      />
                      <div className="absolute right-3 flex items-center space-x-1.5 bg-background pl-2">
                        <Checkbox
                          id="neverExpires"
                          checked={neverExpires}
                          onCheckedChange={(checked) => setNeverExpires(checked === true)}
                          className="h-4 w-4"
                        />
                        <Label htmlFor="neverExpires" className="cursor-pointer flex items-center text-xs text-muted-foreground whitespace-nowrap">
                          <Infinity className="w-3 h-3 inline mr-1" />
                          Never expires
                        </Label>
                      </div>
                    </div>
                  </div>
                </div>
                
                {newApiKey && (
                  <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                    <p className="font-medium text-yellow-800 mb-2">
                      Your new API key has been created. Copy it now, you won&apos;t be able to see it again!
                    </p>
                    <div className="flex items-center space-x-2">
                      <code className="bg-gray-100 p-2 rounded flex-1 overflow-x-auto">
                        {newApiKey}
                      </code>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(newApiKey)}
                      >
                        {copied ? <Check size={16} /> : <Copy size={16} />}
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={isCreating}>
                  {isCreating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    'Create API Key'
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Your API Keys</CardTitle>
              <CardDescription>
                Manage your existing API keys
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center items-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                </div>
              ) : apiKeys.length === 0 ? (
                <p className="text-muted-foreground py-4">You don&apos;t have any API keys yet.</p>
              ) : (
                <div className="space-y-4">
                  {apiKeys.map((key) => (
                    <div 
                      key={key.id} 
                      className={`border rounded-lg p-4 ${key.isActive ? '' : 'bg-gray-50 opacity-70'}`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold flex items-center">
                            {key.name}
                            {!key.isActive && (
                              <span className="ml-2 text-xs bg-gray-200 text-gray-800 px-2 py-0.5 rounded-full">
                                Revoked
                              </span>
                            )}
                          </h3>
                          <div className="text-sm text-muted-foreground">
                            Created: {formatDate(key.createdAt)}
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          {key.isActive && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleRevokeApiKey(key.id)}
                              className="text-yellow-600 border-yellow-200 hover:bg-yellow-50"
                            >
                              Revoke
                            </Button>
                          )}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteApiKey(key.id)}
                            className="text-red-600 border-red-200 hover:bg-red-50"
                          >
                            <Trash size={16} />
                          </Button>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-muted-foreground">Last used:</span> {formatDate(key.lastUsedAt)}
                        </div>
                        <div>
                          <span className="text-muted-foreground">Expires:</span> {key.expiresAt ? formatDate(key.expiresAt) : 'Never'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 