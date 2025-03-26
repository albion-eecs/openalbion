import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/Footer";

export default function TermsPage() {
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
          <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight mb-8 border-b pb-4 border-secondary/20">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white">
                Terms of Service
              </span>
            </h1>
            
            <div className="space-y-8 text-muted-foreground">
              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-foreground">Acceptance of Terms</h2>
                <p>
                  By accessing or using OpenAlbion, you agree to be bound by these Terms of Service. If you do not agree to these terms, you may not access or use the service.
                </p>
              </section>
              
              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-foreground">Eligibility</h2>
                <p>
                  OpenAlbion is a project run by the EECS Club at Albion College and is exclusively available to current students, faculty, staff, and alumni of Albion College with valid Albion email addresses.
                </p>
              </section>
              
              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-foreground">API Usage</h2>
                <p>
                  Users agree to:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Use the API for academic, research, or educational purposes only</li>
                  <li>Not attempt to overwhelm or crash the API (rate limits apply)</li>
                  <li>Keep API keys secure and not share them with others</li>
                  <li>Properly attribute OpenAlbion when using data in publications or projects</li>
                </ul>
              </section>
              
              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-foreground">Intellectual Property</h2>
                <p>
                  The data available through OpenAlbion is provided for educational and research purposes. Users may use the data for academic projects, research, and educational purposes, but may not commercialize the raw data without permission.
                </p>
              </section>
              
              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-foreground">Termination</h2>
                <p>
                  The EECS Club reserves the right to terminate or suspend access to the service for users who violate these terms or use the service in a manner that could cause harm to the platform, interfere with academic research, or negatively impact other users.
                </p>
              </section>
              
              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-foreground">Changes to Terms</h2>
                <p>
                  These terms may be updated periodically. Continued use of the service after changes constitutes acceptance of the updated terms.
                </p>
              </section>
              
              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-foreground">Disclaimer of Warranty</h2>
                <p>
                  OpenAlbion is provided &quot;as is&quot; without warranties of any kind, either express or implied. As a student-run project by the EECS Club, we do not guarantee the accuracy, completeness, or timeliness of the data. This service is designed primarily for academic research and educational purposes.
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 