'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Copy, Check, Trash, X, ArrowLeft, Settings, Key, Infinity, User } from 'lucide-react';
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
  const { user, loading } = useAuth();
  const [isClient, setIsClient] = useState(false);
  
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [apiKeysLoading, setApiKeysLoading] = useState(true);
  const [newKeyName, setNewKeyName] = useState('');
  const [expiresInDays, setExpiresInDays] = useState('30');
  const [neverExpires, setNeverExpires] = useState(false);
  const [apiKeyCreated, setApiKeyCreated] = useState<{ name: string; key: string } | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  
  const [notificationPrefs, setNotificationPrefs] = useState({
    apiUsageAlerts: true,
    securityAlerts: true,
    dataUpdateAlerts: false,
  });
  const [prefsLoading, setPrefsLoading] = useState(true);
  
  useEffect(() => {
    if (user) {
      fetchApiKeys();
      fetchNotificationPreferences(); 
    }
  }, [user]);

  const fetchApiKeys = async () => {
    try {
      setApiKeysLoading(true);
      const response = await fetch('/api/keys');
      const data = await response.json();
      
      if (data.success) {
        setApiKeys(data.data || []);
      } else {
        console.error(data.error || 'Failed to fetch API keys');
      }
    } catch (err) {
      console.error('An error occurred while fetching API keys', err);
    } finally {
      setApiKeysLoading(false);
    }
  };

  const fetchNotificationPreferences = async () => {
    try {
      setPrefsLoading(true);
      const response = await fetch('/api/user/preferences');
      
      if (response.ok) {
        const data = await response.json();
        setNotificationPrefs({
          apiUsageAlerts: data.apiUsageAlerts,
          securityAlerts: data.securityAlerts,
          dataUpdateAlerts: data.dataUpdateAlerts,
        });
      } else {
        console.error('Failed to fetch notification preferences');
      }
    } catch (error) {
      console.error('Error fetching notification preferences:', error);
    } finally {
      setPrefsLoading(false);
    }
  };

  const handleCreateApiKey = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setFormError(null);
    
    if (!newKeyName.trim()) {
      setFormError("API key name is required");
      return;
    }
    
    setApiKeysLoading(true);
    
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
        setApiKeyCreated({ name: newKeyName, key: data.data.apiKey });
        
        setApiKeys([data.data, ...apiKeys]);
        
        setNewKeyName('');
        setExpiresInDays('30');
        setNeverExpires(false);
      } else {
        setFormError(data.error || 'Failed to create API key');
      }
    } catch (err) {
      console.error('An error occurred while creating API key', err);
      setFormError('An error occurred while creating API key');
    } finally {
      setApiKeysLoading(false);
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
        console.error(data.error || 'Failed to revoke API key');
      }
    } catch (err) {
      console.error('An error occurred while revoking API key', err);
    }
  };

  const handleUnrevokeApiKey = async (id: number) => {
    try {
      const response = await fetch(`/api/keys?id=${id}&action=unrevoke`, {
        method: 'PUT',
      });
      
      const data = await response.json();
      
      if (data.success) {
        setApiKeys(apiKeys.map(key => 
          key.id === id ? { ...key, isActive: true } : key
        ));
      } else {
        console.error(data.error || 'Failed to unrevoke API key');
      }
    } catch (err) {
      console.error('An error occurred while unrevoking API key', err);
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
        console.error(data.error || 'Failed to delete API key');
      }
    } catch (err) {
      console.error('An error occurred while deleting API key', err);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('API key copied to clipboard!');
    setTimeout(() => setApiKeyCreated(null), 2000);
  };

  const formatDate = (timestamp: number | null) => {
    if (!timestamp) return 'Never';
    return new Date(timestamp * 1000).toLocaleString();
  };

  const handlePreferenceChange = async (preference: string, value: boolean) => {
    try {
      setNotificationPrefs(prev => ({
        ...prev,
        [preference]: value
      }));
      
      const response = await fetch('/api/user/preferences', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ [preference]: value }),
      });
      
      if (!response.ok) {
        setNotificationPrefs(prev => ({
          ...prev,
          [preference]: !value
        }));
        console.error('Failed to update notification preferences');
      }
    } catch (error) {
      setNotificationPrefs(prev => ({
        ...prev,
        [preference]: !value
      }));
      console.error('Error updating notification preferences:', error);
    }
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
      
      <Tabs defaultValue="account" className="space-y-6">
        <TabsList className="grid grid-cols-2 w-full max-w-md">
          <TabsTrigger value="account" className="flex items-center gap-2">
            <User className="h-4 w-4" />
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
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Manage your account settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Profile Information</h3>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="h-16 w-16 rounded-full bg-gradient-to-br from-secondary to-primary flex items-center justify-center text-lg font-bold text-white">
                      {user?.name ? user.name.charAt(0).toUpperCase() : user?.email.charAt(0).toUpperCase()}
                    </div>
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></span>
                  </div>
                  <div>
                    <p className="font-medium">{user?.name || 'User'}</p>
                    <p className="text-sm text-muted-foreground">{user?.email}</p>
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-6">
                <h3 className="text-lg font-medium mb-4">Notification Preferences</h3>
                {prefsLoading ? (
                  <div className="space-y-6">
                    {[1, 2].map((i) => (
                      <div key={i} className="animate-pulse flex items-center justify-between">
                        <div className="space-y-2">
                          <div className="h-4 bg-gray-200/20 rounded w-32"></div>
                          <div className="h-3 bg-gray-200/20 rounded w-48"></div>
                        </div>
                        <div className="h-5 w-10 bg-gray-200/20 rounded"></div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">API Usage Alerts</h4>
                        <p className="text-sm text-muted-foreground">Receive notifications when API usage nears limits</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch 
                          checked={notificationPrefs.apiUsageAlerts} 
                          onCheckedChange={(checked) => handlePreferenceChange('apiUsageAlerts', checked)} 
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
                          checked={notificationPrefs.securityAlerts} 
                          onCheckedChange={(checked) => handlePreferenceChange('securityAlerts', checked)} 
                          className="data-[state=checked]:bg-purple-600"
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Data Updates</h4>
                        <p className="text-sm text-muted-foreground">Get notified when new datasets are available</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch 
                          checked={notificationPrefs.dataUpdateAlerts} 
                          onCheckedChange={(checked) => handlePreferenceChange('dataUpdateAlerts', checked)} 
                          className="data-[state=checked]:bg-purple-600"
                        />
                      </div>
                    </div>
                  </div>
                )}
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
            <form onSubmit={handleCreateApiKey} noValidate>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="keyName">API Key Name</Label>
                    <Input
                      id="keyName"
                      placeholder="e.g., Development, Production"
                      value={newKeyName}
                      onChange={(e) => {
                        setNewKeyName(e.target.value);
                        if (formError) setFormError(null);
                      }}
                      required
                      className={formError ? "border-red-400" : ""}
                    />
                    {formError && (
                      <p className="text-sm text-red-500 mt-1">{formError}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="expiresInDays">Expires In (Days)</Label>
                    <div className="relative flex items-center">
                      <Input
                        id="expiresInDays"
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
                        <Label htmlFor="neverExpires" className="text-xs">Never expires</Label>
                      </div>
                    </div>
                  </div>
                </div>
                
                {apiKeyCreated && (
                  <div className="mt-4 p-4 bg-secondary/10 border border-secondary/20 rounded-md">
                    <p className="font-medium text-foreground mb-2">
                      Your new API key has been created. Copy it now, you won&apos;t be able to see it again!
                    </p>
                    <div className="flex items-center space-x-2">
                      <code className="bg-background border border-secondary/20 p-2 rounded flex-1 overflow-x-auto">
                        {apiKeyCreated.key}
                      </code>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(apiKeyCreated.key)}
                      >
                        <Copy size={16} />
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button 
                  type="submit" 
                  className="bg-gradient-to-r from-secondary to-purple-600 text-white"
                  disabled={apiKeysLoading}
                >
                  {apiKeysLoading ? 
                    <span className="flex items-center">
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </span> : 
                    'Create API Key'
                  }
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
                      className={`rounded-lg p-4 ${
                        key.isActive 
                          ? 'border' 
                          : 'border border-secondary/30 bg-secondary/20'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold flex items-center">
                            {key.name}
                            {!key.isActive && (
                              <span className="ml-2 text-xs font-medium bg-red-100 text-red-700 px-2 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
                                Revoked
                              </span>
                            )}
                          </h3>
                          <div className="text-sm text-muted-foreground">
                            Created: {formatDate(key.createdAt)}
                          </div>
                        </div>
                        <div className="flex items-center">
                          {key.isActive ? (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleRevokeApiKey(key.id)}
                              className="mr-2 text-yellow-600 border-yellow-200 hover:bg-yellow-50 hover:text-yellow-700"
                            >
                              Revoke
                            </Button>
                          ) : (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleUnrevokeApiKey(key.id)}
                              className="mr-2 text-green-600 border-green-200 hover:bg-green-50 hover:text-green-700"
                            >
                              Unrevoke
                            </Button>
                          )}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteApiKey(key.id)}
                            className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
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