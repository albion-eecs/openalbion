import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Changelog } from "@/components/Changelog";

export default function ChangelogPage() {
  const changelogEntries = [
    {
      title: "Miscellaneous Fixes and Standardization",
      version: "v0.4.0",
      date: "March 27, 2025",
      items: [
        "Refactored environment variables and path authentication",
        "Improved component standards and reusability",
        "Updated public assets and folder structure",
        "Added new cleaned dataset types (json, xml)",
        "Fixed robots.txt and sitemaps TLD issues",
        "Fixed authentication UI input registration bug"
      ]
    },
    {
      title: "Authentication",
      version: "v0.3.0",
      date: "March 27, 2025",
      items: [
        "Updated to latest Next.js version",
        "Refactored authentication to use email and password",
        "Simplified security page",
        "Fixed footer responsiveness issues",
        "Added Discord server contact information",
        "Fixed route-related ESLint issues",
        "Resolved miscellaneous type errors",
        "Fixed dashboard available APIs card error"
      ]
    },
    {
      title: "UI & Infrastructure Updates",
      version: "v0.2.0",
      date: "March 26, 2025",
      items: [
        "Updated documentation code block styling",
        "Added robots.txt and sitemaps",
        "Added PGP key",
        "UI enhancements including theme adjustments and logo upgrade",
        "Switched to Roboto Slab font",
        "Improved deployment configuration and database setup"
      ]
    },
    {
      title: "Initial Release",
      version: "v0.1.0",
      date: "March 14, 2025",
      items: [
        "Launched research data portal for Albion College students, faculty, and alumni",
        "Basic authentication with @albion.edu email domains",
        "Released initial API documentation and endpoints",
        "Early Dashboard implementation"
      ]
    }
  ];

  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-secondary/10 rounded-full filter blur-3xl opacity-50 animate-pulse" style={{ animationDuration: '8s' }}></div>
      <div className="absolute top-1/2 -left-48 w-96 h-96 bg-secondary/10 rounded-full filter blur-3xl opacity-30 animate-pulse" style={{ animationDuration: '12s' }}></div>
      
      <Header />
      
      {/* Main content */}
      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold tracking-tight mb-10 text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white">
              Changelog
            </span>
          </h1>
          
          <Changelog entries={changelogEntries} />
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 