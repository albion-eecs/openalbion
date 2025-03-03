import { AuthTabs } from "@/components/AuthTabs";
import { AuthProvider } from "@/contexts/AuthContext";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="py-6 px-4 sm:px-6 lg:px-8 border-b border-border/40">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-2">
          <h1 className="text-4xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-secondary">OpenAlbion</h1>
          <p className="text-sm text-muted-foreground">Albion College research Data portal</p>
        </div>
      </header>
      
      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
            <div className="flex flex-col justify-center space-y-8 md:sticky md:top-24">
              <div className="space-y-3">
                <h2 className="text-4xl font-bold tracking-tight leading-tight">Albion&apos;s <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-secondary">Research Data Portal</span></h2>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Access research data through standardized APIs to enhance academic research capabilities.
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-secondary/10 to-secondary/30 p-6 transition-all duration-300 hover:shadow-lg hover:shadow-secondary/20 hover:from-secondary/20 hover:to-secondary/40 border border-secondary/20">
                  <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-gradient-to-br from-secondary to-primary opacity-20 blur-xl transition-all duration-300 group-hover:opacity-30"></div>
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-secondary to-primary text-white font-medium">1</div>
                    <div>
                      <h3 className="font-semibold text-lg">Albion-only Access</h3>
                      <p className="text-muted-foreground leading-relaxed">Only students, faculty, and alumni with @albion.edu emails can register.</p>
                    </div>
                  </div>
                </div>
                
                <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-secondary/10 to-secondary/30 p-6 transition-all duration-300 hover:shadow-lg hover:shadow-secondary/20 hover:from-secondary/20 hover:to-secondary/40 border border-secondary/20">
                  <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-gradient-to-br from-secondary to-primary opacity-20 blur-xl transition-all duration-300 group-hover:opacity-30"></div>
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-secondary to-primary text-white font-medium">2</div>
                    <div>
                      <h3 className="font-semibold text-lg">API-Driven Data Access</h3>
                      <p className="text-muted-foreground leading-relaxed">Programmatically access research data through standardized API endpoints.</p>
                    </div>
                  </div>
                </div>
                
                <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-secondary/10 to-secondary/30 p-6 transition-all duration-300 hover:shadow-lg hover:shadow-secondary/20 hover:from-secondary/20 hover:to-secondary/40 border border-secondary/20">
                  <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-gradient-to-br from-secondary to-primary opacity-20 blur-xl transition-all duration-300 group-hover:opacity-30"></div>
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-secondary to-primary text-white font-medium">3</div>
                    <div>
                      <h3 className="font-semibold text-lg">Research Integration</h3>
                      <p className="text-muted-foreground leading-relaxed">Easily integrate research materials into academic projects and applications.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card/60 backdrop-blur-sm rounded-2xl shadow-xl border border-border/40 p-8 h-auto">
              <AuthProvider>
                <AuthTabs />
              </AuthProvider>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
