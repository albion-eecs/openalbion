import './globals.css';
import type { Metadata } from 'next';
import { Sora } from 'next/font/google';
import { JetBrains_Mono } from 'next/font/google';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { AuthProvider } from '@/contexts/AuthContext';

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "OpenAlbion",
  description: "A research data portal exclusively for Albion College students, faculty, and alumni.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${sora.variable} ${jakarta.variable} ${jetbrainsMono.variable} antialiased bg-background text-foreground`}
      >
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
