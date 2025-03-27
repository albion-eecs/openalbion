'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/Footer";

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden">
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-secondary/10 rounded-full filter blur-3xl opacity-50 animate-pulse" style={{ animationDuration: '8s' }}></div>
      <div className="absolute top-1/2 -left-48 w-96 h-96 bg-secondary/10 rounded-full filter blur-3xl opacity-30 animate-pulse" style={{ animationDuration: '12s' }}></div>
      
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
      
      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold tracking-tight mb-10 text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white">
              Contact Us
            </span>
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column - Contact Methods */}
            <div className="space-y-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-foreground inline-block border-b border-secondary/30 pb-2 mb-4">Get In Touch</h2>
                <p className="text-muted-foreground">
                  Have questions about OpenAlbion or need help with the API?
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start p-4 rounded-lg border border-secondary/10 bg-card/20 hover:bg-card/40 transition-colors duration-200">
                  <div className="shrink-0 w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-secondary">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Email</h3>
                    <p className="text-muted-foreground">contact@openalbion.org</p>
                  </div>
                </div>
                
                <div className="flex items-start p-4 rounded-lg border border-secondary/10 bg-card/20 hover:bg-card/40 transition-colors duration-200">
                  <div className="shrink-0 w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-secondary">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Address</h3>
                    <p className="text-muted-foreground">EECS Club, Albion College<br />611 E. Porter St, Albion, MI 49224</p>
                  </div>
                </div>
                
                <div className="flex items-start p-4 rounded-lg border border-purple-500/20 bg-card/20 hover:bg-card/40 transition-colors duration-200" style={{ boxShadow: '0 4px 20px -5px rgba(168, 85, 247, 0.25)' }}>
                  <div className="shrink-0 w-10 h-10 rounded-full bg-purple-600/30 flex items-center justify-center mr-4" style={{ boxShadow: '0 0 15px rgba(168, 85, 247, 0.4)' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-300">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">GitHub</h3>
                    <p>
                      <Link href="https://github.com/albion-eecs/openalbion" className="hover:underline text-purple-300 transition-all duration-300 hover:text-purple-200">
                        github.com/albion-eecs/openalbion
                      </Link>
                    </p>
                    <p className="text-xs mt-1 text-muted-foreground">Start a pull request to contribute or open an issue if you find a problem</p>
                  </div>
                </div>
                
                <div className="flex items-start p-4 rounded-lg border border-blue-500/20 bg-card/20 hover:bg-card/40 transition-colors duration-200" style={{ boxShadow: '0 4px 20px -5px rgba(59, 130, 246, 0.25)' }}>
                  <div className="shrink-0 w-10 h-10 rounded-full bg-blue-600/30 flex items-center justify-center mr-4" style={{ boxShadow: '0 0 15px rgba(59, 130, 246, 0.4)' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-blue-300">
                      <path d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.09.09 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.09 16.09 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09-.01-.02-.04-.03-.07-.03-1.5.26-2.93.71-4.27 1.33-.01 0-.02.01-.03.02-2.72 4.07-3.47 8.03-3.1 11.95 0 .02.01.04.03.05 1.8 1.32 3.53 2.12 5.24 2.65.03.01.06 0 .07-.02.4-.55.76-1.13 1.07-1.74.02-.04 0-.08-.04-.09-.57-.22-1.11-.48-1.64-.78-.04-.02-.04-.08-.01-.11.11-.08.22-.17.33-.25.02-.02.05-.02.07-.01 3.44 1.57 7.15 1.57 10.55 0 .02-.01.05-.01.07.01.11.09.22.17.33.26.04.03.04.09-.01.11-.52.31-1.07.56-1.64.78-.04.01-.05.06-.04.09.32.61.68 1.19 1.07 1.74.03.02.06.03.09.02 1.72-.53 3.45-1.33 5.25-2.65.02-.01.03-.03.03-.05.44-4.53-.73-8.46-3.1-11.95-.01-.01-.02-.02-.04-.02zM8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12 0 1.17-.84 2.12-1.89 2.12zm6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12 0 1.17-.83 2.12-1.89 2.12z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Discord</h3>
                    <p>
                      <Link href="https://discord.gg/XcZgWsN6YB" className="hover:underline text-blue-300 transition-all duration-300 hover:text-blue-200">
                        discord.gg/XcZgWsN6YB
                      </Link>
                    </p>
                    <p className="text-xs mt-1 text-muted-foreground">Receive developmental updates and participate in EECS Club internal discussions</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Column - Join the Club */}
            <div className="flex items-center">
              <div className="w-full p-6 border border-secondary/20 rounded-lg bg-card/30 backdrop-blur-sm">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-secondary">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                  </div>
                  <h2 className="text-xl font-semibold text-foreground">Join the EECS Club</h2>
                  <p className="text-muted-foreground mb-6">
                    The EECS Club (or the Electrical Engineering and Computer Science Club) welcomes any and all students interested in engineering, computer science, data science, and research projects.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 