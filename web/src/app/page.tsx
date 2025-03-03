import { AuthTabs } from "@/components/AuthTabs";
import { AuthProvider } from "@/contexts/AuthContext";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden">
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-secondary/10 rounded-full filter blur-3xl opacity-50 animate-pulse" style={{ animationDuration: '8s' }}></div>
      <div className="absolute top-1/2 -left-48 w-96 h-96 bg-secondary/10 rounded-full filter blur-3xl opacity-30 animate-pulse" style={{ animationDuration: '12s' }}></div>
      
      <header className="py-6 px-4 sm:px-6 lg:px-8 border-b border-secondary/20 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-2">
          <h1 className="text-4xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white via-secondary to-white">OpenAlbion</h1>
          <p className="text-sm text-muted-foreground">Albion College research data portal</p>
        </div>
      </header>
      
      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
            <div className="flex flex-col justify-center space-y-8 md:sticky md:top-24">
              <div className="space-y-3">
                <h2 className="text-4xl font-bold tracking-tight leading-tight">Albion&apos;s <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-secondary to-white">Data Portal</span></h2>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Access research data through standardized APIs to further academic research.
                </p>
              </div>
              
              <div className="space-y-6">
                {/* Enhanced feature cards with more purple effects */}
                <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-secondary/10 to-secondary/30 p-6 transition-all duration-500 hover:shadow-xl hover:shadow-secondary/30 hover:from-secondary/20 hover:to-secondary/40 border border-secondary/20">
                  <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-gradient-to-br from-secondary to-purple-600 opacity-20 blur-2xl transition-all duration-500 group-hover:opacity-40 group-hover:scale-110"></div>
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-secondary to-purple-600 text-white font-medium shadow-md shadow-secondary/20">1</div>
                    <div className="z-10">
                      <h3 className="font-semibold text-lg group-hover:text-secondary transition-colors duration-300">Albion-only Access</h3>
                      <p className="text-muted-foreground leading-relaxed">Only students, faculty, and alumni with @albion.edu emails can register.</p>
                    </div>
                  </div>
                  {/* Add a subtle animated highlight */}
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-secondary/0 via-secondary/80 to-secondary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                
                <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-secondary/10 to-secondary/30 p-6 transition-all duration-500 hover:shadow-xl hover:shadow-secondary/30 hover:from-secondary/20 hover:to-secondary/40 border border-secondary/20">
                  <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-gradient-to-br from-secondary to-purple-600 opacity-20 blur-2xl transition-all duration-500 group-hover:opacity-40 group-hover:scale-110"></div>
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-secondary to-purple-600 text-white font-medium shadow-md shadow-secondary/20">2</div>
                    <div className="z-10">
                      <h3 className="font-semibold text-lg group-hover:text-secondary transition-colors duration-300">API-Driven Data Access</h3>
                      <p className="text-muted-foreground leading-relaxed">Programmatically access research data through standardized API endpoints.</p>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-secondary/0 via-secondary/80 to-secondary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                
                <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-secondary/10 to-secondary/30 p-6 transition-all duration-500 hover:shadow-xl hover:shadow-secondary/30 hover:from-secondary/20 hover:to-secondary/40 border border-secondary/20">
                  <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-gradient-to-br from-secondary to-purple-600 opacity-20 blur-2xl transition-all duration-500 group-hover:opacity-40 group-hover:scale-110"></div>
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-secondary to-purple-600 text-white font-medium shadow-md shadow-secondary/20">3</div>
                    <div className="z-10">
                      <h3 className="font-semibold text-lg group-hover:text-secondary transition-colors duration-300">Research Integration</h3>
                      <p className="text-muted-foreground leading-relaxed">Easily integrate research materials into academic projects and applications.</p>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-secondary/0 via-secondary/80 to-secondary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </div>
              
              {/* Add a decorative purple element */}
              <div className="absolute -bottom-16 -left-16 w-32 h-32 rounded-full border border-secondary/20 animate-ping opacity-20" style={{ animationDuration: '8s' }}></div>
            </div>

            <div className="bg-card/60 backdrop-blur-sm rounded-2xl shadow-xl border border-secondary/30 p-8 h-auto relative group">
              {/* Add purple glow effect on hover */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-secondary/0 to-purple-600/0 opacity-0 group-hover:opacity-100 rounded-2xl blur-sm transition-all duration-700 group-hover:from-secondary/20 group-hover:to-purple-600/20"></div>
              
              {/* Decorative purple elements */}
              <div className="absolute -top-5 -right-5 w-24 h-24 bg-secondary/5 rounded-full filter blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              
              <div className="relative">
                <AuthProvider>
                  <AuthTabs />
                </AuthProvider>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
