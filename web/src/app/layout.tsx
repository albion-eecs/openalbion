import "./globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { AuthProvider } from "@/contexts/AuthContext";

const robotoSlab = localFont({
  src: "../../public/fonts/RobotoSlab-VariableFont_wght.ttf",
  variable: "--font-roboto-slab",
});

export const metadata: Metadata = {
  title: "OpenAlbion",
  description:
    "A research data portal exclusively for Albion College students, faculty, and alumni",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${robotoSlab.variable} antialiased bg-background text-foreground`}
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
