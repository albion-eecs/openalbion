import Link from "next/link";
import { Shield, Lock, FileCheck, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Footer } from "@/components/Footer";

export default function SecurityPage() {
  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-secondary/10 rounded-full filter blur-3xl opacity-50 animate-pulse" style={{ animationDuration: '8s' }}></div>
      <div className="absolute top-1/2 -left-48 w-96 h-96 bg-secondary/10 rounded-full filter blur-3xl opacity-30 animate-pulse" style={{ animationDuration: '12s' }}></div>
      
      {/* Header */}
      <header className="py-6 px-4 sm:px-6 lg:px-8 border-b border-secondary/20 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-2">
          <h1 className="text-4xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white via-secondary to-white">OpenAlbion</h1>
          <p className="text-sm text-muted-foreground">Albion College research data portal</p>
        </div>
      </header>
      
      {/* Main content */}
      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-secondary to-white">
                Security & Privacy
              </span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We take security and privacy seriously at OpenAlbion. Learn about our commitment to protecting your data and maintaining the integrity of our research platform.
            </p>
          </div>
          
          {/* Security Tabs */}
          <Tabs defaultValue="policies" className="w-full">
            <div className="flex justify-center mb-6">
              <TabsList className="bg-background/30 backdrop-blur-sm border border-secondary/20">
                <TabsTrigger value="policies" className="data-[state=active]:bg-secondary/40 data-[state=active]:text-white data-[state=active]:font-medium">
                  <Shield className="h-4 w-4 mr-2" />
                  Security Policies
                </TabsTrigger>
                <TabsTrigger value="data" className="data-[state=active]:bg-secondary/40 data-[state=active]:text-white data-[state=active]:font-medium">
                  <Lock className="h-4 w-4 mr-2" />
                  Data Protection
                </TabsTrigger>
                <TabsTrigger value="reporting" className="data-[state=active]:bg-secondary/40 data-[state=active]:text-white data-[state=active]:font-medium">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Vulnerability Reporting
                </TabsTrigger>
              </TabsList>
            </div>
            
            {/* Security Policies Tab */}
            <TabsContent value="policies" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-secondary/20 group transition-all duration-300 hover:shadow-lg hover:shadow-secondary/10 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg z-0"></div>
                  <CardHeader className="relative z-10">
                    <CardTitle className="transition-colors duration-300">Access Control</CardTitle>
                    <CardDescription>Authentication and authorization policies</CardDescription>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <p className="text-sm text-muted-foreground mb-4">
                      OpenAlbion implements strict access controls to ensure data is only accessible to authorized users:
                    </p>
                    <ul className="text-sm text-muted-foreground space-y-2 list-disc pl-5">
                      <li>Authentication via @albion.edu email domains only</li>
                      <li>Role-based access for research data</li>
                      <li>Session timeouts for inactive users</li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="border-secondary/20 group transition-all duration-300 hover:shadow-lg hover:shadow-secondary/10 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-yellow-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg z-0"></div>
                  <CardHeader className="relative z-10">
                    <CardTitle className="transition-colors duration-300">Compliance Standards</CardTitle>
                    <CardDescription>Regulatory frameworks and guidelines</CardDescription>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <p className="text-sm text-muted-foreground mb-4">
                      Our platform adheres to academic and industry standards for data protection:
                    </p>
                    <ul className="text-sm text-muted-foreground space-y-2 list-disc pl-5">
                      <li>Adherence to academic data ethics standards</li>
                      <li>Regular security reviews</li>
                      <li>Protection of student information following best practices</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            {/* Data Protection Tab */}
            <TabsContent value="data" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-secondary/20 group transition-all duration-300 hover:shadow-lg hover:shadow-secondary/10 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg z-0"></div>
                  <CardHeader className="relative z-10">
                    <CardTitle className="transition-colors duration-300">Data Encryption</CardTitle>
                    <CardDescription>Protecting sensitive information</CardDescription>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <p className="text-sm text-muted-foreground mb-4">
                      All data in OpenAlbion is protected using industry-standard encryption:
                    </p>
                    <ul className="text-sm text-muted-foreground space-y-2 list-disc pl-5">
                      <li>HTTPS for all connections</li>
                      <li>Secure password storage</li>
                      <li>Regular backups of research data</li>
                      <li>AES-256 encryption for sensitive data</li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="border-secondary/20 group transition-all duration-300 hover:shadow-lg hover:shadow-secondary/10 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg z-0"></div>
                  <CardHeader className="relative z-10">
                    <CardTitle className="transition-colors duration-300">Privacy Measures</CardTitle>
                    <CardDescription>Anonymization and data handling</CardDescription>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <p className="text-sm text-muted-foreground mb-4">
                      We collect no data aside from what&apos;s necessary to run the service:
                    </p>
                    <ul className="text-sm text-muted-foreground space-y-2 list-disc pl-5">
                      <li>Only essential account information is collected (email and authentication data)</li>
                      <li>No tracking, analytics, or behavioral data collection</li>
                      <li>Minimal logging for security purposes only</li>
                      <li>Transparent data usage policies</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            {/* Vulnerability Reporting Tab */}
            <TabsContent value="reporting" className="mt-4">
              <Card className="border-secondary/20 transition-all duration-300 hover:shadow-lg hover:shadow-secondary/10 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-lg z-0"></div>
                <CardHeader className="relative z-10">
                  <CardTitle className="transition-colors duration-300">Responsible Disclosure</CardTitle>
                  <CardDescription>Reporting security vulnerabilities</CardDescription>
                </CardHeader>
                <CardContent className="relative z-10">
                  <p className="text-sm text-muted-foreground mb-6">
                    We appreciate the security community&apos;s efforts in helping us maintain a secure platform. If you discover a security vulnerability, please follow our responsible disclosure process:
                  </p>
                  
                  <div className="space-y-4">
                    <div className="rounded-lg border border-secondary/20 p-4 bg-card/30">
                      <h4 className="font-medium mb-2 text-sm">1. Contact Information</h4>
                      <p className="text-sm text-muted-foreground">
                        Email security concerns to <span className="text-white font-medium">security@openalbion.org</span> with detailed information about the potential vulnerability.
                      </p>
                    </div>
                    
                    <div className="rounded-lg border border-secondary/20 p-4 bg-card/30">
                      <h4 className="font-medium mb-2 text-sm">2. PGP Encryption</h4>
                      <p className="text-sm text-muted-foreground">
                        For sensitive communications, please use our PGP key available at <Link href="/.well-known/pgp-key.txt" className="text-white/80 hover:text-white hover:underline">/.well-known/pgp-key.txt</Link>.
                      </p>
                    </div>
                    
                    <div className="rounded-lg border border-secondary/20 p-4 bg-card/30">
                      <h4 className="font-medium mb-2 text-sm">3. Disclosure Guidelines</h4>
                      <ul className="text-sm text-muted-foreground space-y-2 list-disc pl-5">
                        <li>Provide sufficient information to reproduce the issue</li>
                        <li>Allow reasonable time for us to address the issue before public disclosure</li>
                        <li>Do not access or modify data belonging to others</li>
                        <li>Act in good faith and avoid privacy violations or service disruptions</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="relative z-10">
                  <Button 
                    className="w-full bg-gradient-to-r from-secondary to-purple-600 text-white hover:shadow-md hover:shadow-secondary/20 transition-all duration-300 relative z-10"
                    asChild
                  >
                    <Link href="mailto:eecs-club-security@albion.edu">
                      <AlertTriangle className="h-4 w-4 mr-2" /> Report a Vulnerability
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
          
          {/* Additional Security Information */}
          <div className="mt-20">
            <h3 className="text-xl font-bold tracking-tight mb-6 text-center">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-secondary to-white">
                Our Commitment to Security
              </span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="rounded-lg border border-secondary/20 p-6 bg-card/30 group hover:shadow-lg hover:shadow-secondary/10 transition-all duration-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg z-0"></div>
                <div className="relative z-10">
                  <Shield className="h-8 w-8 mb-4 text-secondary" />
                  <h4 className="font-medium mb-2">Student-Run Security</h4>
                  <p className="text-sm text-muted-foreground">
                    Our security members consist of student volunteers from the EECS club who are passionate about research and data.
                  </p>
                </div>
              </div>
              
              <div className="rounded-lg border border-secondary/20 p-6 bg-card/30 group hover:shadow-lg hover:shadow-secondary/10 transition-all duration-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-yellow-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg z-0"></div>
                <div className="relative z-10">
                  <Lock className="h-8 w-8 mb-4 text-secondary" />
                  <h4 className="font-medium mb-2">Academic Integrity</h4>
                  <p className="text-sm text-muted-foreground">
                    We prioritize the protection of research data and maintain the highest standards of academic integrity in our data handling practices.
                  </p>
                </div>
              </div>
              
              <div className="rounded-lg border border-secondary/20 p-6 bg-card/30 group hover:shadow-lg hover:shadow-secondary/10 transition-all duration-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg z-0"></div>
                <div className="relative z-10">
                  <FileCheck className="h-8 w-8 mb-4 text-secondary" />
                  <h4 className="font-medium mb-2">Collaborative Approach</h4>
                  <p className="text-sm text-muted-foreground">
                    We collaborate with the IT department and faculty advisors to ensure our platform meets institutional security standards.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Back to Home Link */}
          <div className="mt-16 text-center">
            <Button 
              asChild
              variant="outline" 
              className="border-secondary/20 hover:bg-secondary/10 hover:text-white transition-all duration-300"
            >
              <Link href="/">
                Return to Home
              </Link>
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 