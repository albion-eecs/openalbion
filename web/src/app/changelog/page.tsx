import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/Footer";

export default function ChangelogPage() {
  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden">
      {/* Background elements */}
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
          <h1 className="text-3xl font-bold tracking-tight mb-10 text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white">
              Changelog
            </span>
          </h1>
          
          <div className="space-y-8">
            {/* Version Entry */}
            <div className="relative pl-8 before:content-[''] before:absolute before:left-0 before:top-[22px] before:bottom-0 before:w-px before:bg-secondary/30">
              <div className="flex items-center gap-4">
                <div className="absolute left-0 w-2 h-2 rounded-full bg-secondary -translate-x-[4px]"></div>
                <h2 className="text-xl font-semibold text-white">Initial Release</h2>
                <div className="px-3 py-1.5 rounded-md text-sm font-medium bg-secondary/30 text-white border-2 border-secondary/60 shadow-[0_0_10px_rgba(168,85,247,0.3)] transition-all">v0.1.0</div>
              </div>
              <time className="text-sm text-muted-foreground ml-4 mt-1 block">March 14, 2025</time>
              <div className="mt-4 ml-4 p-4 rounded-lg border border-secondary/10 bg-card/20">
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-secondary">•</span>
                    <span>Launched research data portal for Albion College students, faculty, and alumni</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary">•</span>
                    <span>Implemented secure authentication with @albion.edu email domains</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary">•</span>
                    <span>Released initial API documentation and endpoints</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary">•</span>
                    <span>Early Dashboard implementation</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 