import Link from "next/link";
import { AlertTriangle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Footer } from "@/components/Footer";

export default function SecurityPage() {
  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden">
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-secondary/10 rounded-full filter blur-3xl opacity-50 animate-pulse" style={{ animationDuration: '8s' }}></div>
      <div className="absolute top-1/2 -left-48 w-96 h-96 bg-secondary/10 rounded-full filter blur-3xl opacity-30 animate-pulse" style={{ animationDuration: '12s' }}></div>
      
      {/* Header */}
      <header className="py-6 px-4 sm:px-6 lg:px-8 border-b border-secondary/20 relative z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <Link href="/" className="text-2xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-white">
              OpenAlbion
            </Link>
          </div>
          <Link href="/">
            <Button variant="outline" className="border-secondary/40 hover:bg-secondary/10 hover:border-secondary/60">
              Back to Home
            </Button>
          </Link>
        </div>
      </header>
      
      {/* Main content */}
      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto">
          {/* Hero Section */}
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Security
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The Albion College EECS Club is committed to ensuring the security and integrity of the OpenAlbion platform.
            </p>
          </div>
          
          {/* Reporting */}
          <Card className="border-secondary/20 mb-8">
            <CardHeader>
              <CardTitle>Reporting</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-4 mb-6">
                <AlertTriangle className="h-6 w-6 text-secondary flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm text-muted-foreground mb-4">
                    If you discover a security vulnerability, please report it to us immediately:
                  </p>
                  <div className="space-y-4">
                    <div className="rounded-lg border border-secondary/20 p-4">
                      <h4 className="font-medium mb-2 text-sm">Email</h4>
                      <p className="text-sm text-muted-foreground">
                        Send security concerns to <Link href="mailto:security@openalbion.org" className="font-bold text-white hover:underline">security@openalbion.org</Link> with details about the potential vulnerability.
                      </p>
                    </div>
                    
                    <div className="rounded-lg border border-secondary/20 p-4">
                      <h4 className="font-medium mb-2 text-sm">PGP Encryption</h4>
                      <p className="text-sm text-muted-foreground">
                        For sensitive communications, use our PGP key available at <Link href="/.well-known/pgp-key.txt" className="font-bold text-white hover:underline">/.well-known/pgp-key.txt</Link>
                      </p>
                    </div>
                    
                    <div className="rounded-lg border border-secondary/20 p-4">
                      <h4 className="font-medium mb-2 text-sm">Reporting Guidelines</h4>
                      <ul className="text-sm text-muted-foreground space-y-2 list-disc pl-5">
                        <li>Provide sufficient details to reproduce the issue</li>
                        <li>Allow reasonable time for us to address the issue before public disclosure</li>
                        <li>Act in good faith to minimize risk to other users</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Commitment */}
          <Card className="border-secondary/20 mb-8">
            <CardHeader>
              <CardTitle>Commitment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-4">
                <Clock className="h-6 w-6 text-secondary flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm text-muted-foreground mb-4">
                    The EECS Club is committed to the following security patching guidelines:
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-3 list-disc pl-5">
                    <li>Acknowledge all security reports within 12 hours</li>
                    <li>Patch critical vulnerabilities within 24 hours</li>
                    <li>Provide updates on the progress of reported issues</li>
                    <li>Disclose relevant details to affected users once resolved</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 