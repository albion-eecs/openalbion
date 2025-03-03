import { AuthTabs } from "@/components/AuthTabs";
import { AuthProvider } from "@/contexts/AuthContext";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="py-6 px-4 sm:px-6 lg:px-8 border-b border-border/40">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-2">
          <h1 className="text-4xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-secondary">OpenAlbion</h1>
          <p className="text-sm text-muted-foreground">Your exclusive Albion community platform</p>
        </div>
      </header>
      
      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
            <div className="flex flex-col justify-center space-y-6">
              <div className="space-y-2">
                <h2 className="text-4xl font-bold tracking-tight">Welcome to Albion&apos;s Digital Hub</h2>
                <p className="text-xl text-muted-foreground">
                  Connect with the Albion community, access resources, and collaborate with fellow students.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="mt-0.5 bg-secondary h-6 w-6 rounded-full flex items-center justify-center text-white text-sm font-medium">1</div>
                  <div>
                    <h3 className="font-medium text-lg">Exclusive Albion Access</h3>
                    <p className="text-muted-foreground">Only students, faculty, and alumni with @albion.edu emails can join.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="mt-0.5 bg-secondary h-6 w-6 rounded-full flex items-center justify-center text-white text-sm font-medium">2</div>
                  <div>
                    <h3 className="font-medium text-lg">Community Connection</h3>
                    <p className="text-muted-foreground">Find peers for study groups, research projects, and social events.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="mt-0.5 bg-secondary h-6 w-6 rounded-full flex items-center justify-center text-white text-sm font-medium">3</div>
                  <div>
                    <h3 className="font-medium text-lg">Resource Sharing</h3>
                    <p className="text-muted-foreground">Share and discover valuable academic resources and tools.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card/60 backdrop-blur-sm rounded-2xl shadow-xl border border-border/40 p-8">
              <AuthProvider>
                <AuthTabs />
              </AuthProvider>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-6 px-4 sm:px-6 lg:px-8 border-t border-border/40">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} OpenAlbion. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-secondary transition-colors">Privacy</a>
            <a href="#" className="hover:text-secondary transition-colors">Terms</a>
            <a href="#" className="hover:text-secondary transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
