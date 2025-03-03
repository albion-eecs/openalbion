'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import React from 'react';

function HomeButton() {
  return (
    <button 
      className="inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4 py-2 border border-secondary/40 bg-transparent hover:bg-secondary/10 hover:border-secondary/60 transition-all duration-300 text-foreground relative"
      style={{ position: 'relative', zIndex: 50, pointerEvents: 'auto' }}
      onClick={() => window.location.href = '/'}
    >
      Back to Home
    </button>
  );
}

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    if (!loading && !user) {
      router.push('/');
    }
  }, [user, loading, router]);

  if (loading || !isClient) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="container mx-auto py-10 px-4 max-w-7xl relative">
      <div className="decorative-overlay absolute top-0 right-0 w-96 h-96 bg-secondary/10 rounded-full filter blur-3xl opacity-30"></div>
      <div className="decorative-overlay absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full filter blur-3xl opacity-30"></div>
      
      <style jsx global>{`
        .decorative-overlay {
          pointer-events: none !important;
        }
      `}</style>
      
      <header className="mb-8 relative">
        <div className="decorative-overlay absolute inset-0 bg-gradient-to-r from-secondary/5 to-purple-400/5 rounded-2xl -z-10"></div>
        
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-6 rounded-2xl border border-secondary/20 bg-card/50 backdrop-blur-sm shadow-lg">
          <div>
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-white via-secondary to-white bg-clip-text text-transparent">Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Welcome back, {user.name || user.email.split('@')[0]}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-secondary to-primary flex items-center justify-center text-sm font-medium text-white shadow-md shadow-secondary/20">
                  {user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
                </div>
                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></span>
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium">{user.name || user.email.split('@')[0]}</p>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </div>
            </div>
            <div className="relative" style={{ zIndex: 40 }}>
              <HomeButton />
            </div>
          </div>
        </div>
      </header>

      <main className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold mb-4 relative">
            Research Data Overview
            <span className="decorative-overlay absolute -bottom-1 left-0 w-20 h-0.5 bg-gradient-to-r from-secondary to-purple-400"></span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-secondary/20 overflow-hidden relative group">
              <div className="decorative-overlay absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-secondary to-purple-400 transform origin-left group-hover:scale-x-100 transition-transform duration-500"></div>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Data Sets</CardTitle>
                <CardDescription>Available research data sets</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">12</p>
                <p className="text-sm text-muted-foreground">3 added this month</p>
              </CardContent>
            </Card>
            <Card className="border-secondary/20 overflow-hidden relative group">
              <div className="decorative-overlay absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-secondary to-purple-400 transform origin-left group-hover:scale-x-100 transition-transform duration-500"></div>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">API Calls</CardTitle>
                <CardDescription>Monthly API usage</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">1,248</p>
                <p className="text-sm text-muted-foreground">↑ 12% from last month</p>
              </CardContent>
            </Card>
            <Card className="border-secondary/20 overflow-hidden relative group">
              <div className="decorative-overlay absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-secondary to-purple-400 transform origin-left group-hover:scale-x-100 transition-transform duration-500"></div>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">API Keys</CardTitle>
                <CardDescription>Active API keys</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">2</p>
                <p className="text-sm text-muted-foreground">Up to 5 allowed</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold relative">
              Recent Activity
              <span className="decorative-overlay absolute -bottom-1 left-0 w-20 h-0.5 bg-gradient-to-r from-secondary to-purple-400"></span>
            </h2>
            <Button variant="outline" size="sm" className="text-xs border-secondary/30 hover:bg-secondary/10 hover:border-secondary/50">View All</Button>
          </div>
          <Card className="border-secondary/20">
            <CardContent className="p-0">
              <div className="divide-y divide-border/40">
                {[
                  { action: 'API Key Created', time: '2 hours ago', description: 'New API key created for Research Project' },
                  { action: 'Dataset Access', time: 'Yesterday', description: 'Accessed Climate Data API' },
                  { action: 'Account Created', time: '3 days ago', description: 'Account created and verified' }
                ].map((item, i) => (
                  <div key={i} className="flex items-start justify-between p-4 hover:bg-secondary/5 transition-colors duration-200">
                    <div className="flex items-start space-x-4">
                      <div className="h-9 w-9 rounded-full bg-gradient-to-br from-secondary/20 to-purple-500/20 flex items-center justify-center">
                        <svg className="h-5 w-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">{item.action}</p>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">{item.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4 relative">
            Available APIs
            <span className="decorative-overlay absolute -bottom-1 left-0 w-20 h-0.5 bg-gradient-to-r from-secondary to-purple-400"></span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-secondary/20 group transition-all duration-300 hover:shadow-lg hover:shadow-secondary/10">
              <div className="decorative-overlay absolute inset-0 bg-gradient-to-br from-secondary/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
              <CardHeader>
                <CardTitle>Climate Data API</CardTitle>
                <CardDescription>Historical climate measurements</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">Access to temperature, precipitation, and atmospheric measurements collected by the Albion College weather station.</p>
                <Button className="bg-gradient-to-r from-secondary to-purple-600 text-white hover:shadow-md hover:shadow-secondary/20 transition-all duration-300">Access API</Button>
              </CardContent>
            </Card>
            <Card className="border-secondary/20 group transition-all duration-300 hover:shadow-lg hover:shadow-secondary/10">
              <div className="decorative-overlay absolute inset-0 bg-gradient-to-br from-secondary/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
              <CardHeader>
                <CardTitle>Research Publications API</CardTitle>
                <CardDescription>Albion College research papers</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">Programmatic access to research publications, citations, and abstracts from Albion College faculty and students.</p>
                <Button className="bg-gradient-to-r from-secondary to-purple-600 text-white hover:shadow-md hover:shadow-secondary/20 transition-all duration-300">Access API</Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
}

