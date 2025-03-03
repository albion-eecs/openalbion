import Link from "next/link";

export function Footer() {
  return (
    <footer className="py-6 px-4 sm:px-6 lg:px-8 border-t border-border/40">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-secondary to-primary font-semibold">OpenAlbion</span>
          <span className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} All rights reserved.
          </span>
        </div>
        <div className="flex gap-6 text-sm">
          <Link 
            href="#" 
            className="text-muted-foreground hover:text-secondary transition-colors duration-200"
          >
            Privacy
          </Link>
          <Link 
            href="#" 
            className="text-muted-foreground hover:text-secondary transition-colors duration-200"
          >
            Terms
          </Link>
          <Link 
            href="#" 
            className="text-muted-foreground hover:text-secondary transition-colors duration-200"
          >
            Contact
          </Link>
          <Link 
            href="#" 
            className="text-muted-foreground hover:text-secondary transition-colors duration-200"
          >
            API Docs
          </Link>
        </div>
      </div>
    </footer>
  );
} 