"use client";

import { AuthTabs } from "@/components/auth-tabs";
import { AuthProvider } from "@/contexts/auth-context";
import { Footer } from "@/components/footer";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileSpreadsheet, FileJson, FileCode } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const handleDownload = (filePath: string) => {
    const link = document.createElement("a");
    link.href = `/datasets/cleaned/${filePath}`;
    link.download = filePath.split("/").pop() || "";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden">
      <div
        className="absolute -top-20 -right-20 w-96 h-96 bg-secondary/10 rounded-full filter blur-3xl opacity-50 animate-pulse"
        style={{ animationDuration: "8s" }}
      ></div>
      <div
        className="absolute top-1/2 -left-48 w-96 h-96 bg-secondary/10 rounded-full filter blur-3xl opacity-30 animate-pulse"
        style={{ animationDuration: "12s" }}
      ></div>

      <header className="py-6 px-4 sm:px-6 lg:px-8 border-b border-secondary/20 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-2">
          <h1 className="text-4xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-white">
            OpenAlbion
          </h1>
          <p className="text-sm text-muted-foreground">
            Albion College data portal
          </p>
        </div>
      </header>

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
            <div className="flex flex-col justify-center space-y-8 md:sticky md:top-24">
              <div className="space-y-3">
                <h2 className="text-4xl font-bold tracking-tight leading-tight">
                  Albion&apos;s{" "}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white">
                    Data Portal
                  </span>
                </h2>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Access research data through standardized APIs to further
                  academic research.
                </p>
              </div>

              <div className="space-y-6">
                <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-secondary/10 to-secondary/30 p-6 transition-all duration-500 hover:shadow-xl hover:shadow-secondary/30 hover:from-secondary/20 hover:to-secondary/40 border border-secondary/20">
                  <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-gradient-to-br from-secondary to-purple-600 opacity-20 blur-2xl transition-all duration-500 group-hover:opacity-40 group-hover:scale-110"></div>
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-secondary to-purple-600 text-white font-medium shadow-md shadow-secondary/20">
                      1
                    </div>
                    <div className="z-10">
                      <h3 className="font-semibold text-lg group-hover:text-white/90 transition-colors duration-300">
                        Albion-only Access
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Only students, faculty, and alumni with @albion.edu
                        emails can register.
                      </p>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-secondary/0 via-secondary/80 to-secondary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-secondary/10 to-secondary/30 p-6 transition-all duration-500 hover:shadow-xl hover:shadow-secondary/30 hover:from-secondary/20 hover:to-secondary/40 border border-secondary/20">
                  <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-gradient-to-br from-secondary to-purple-600 opacity-20 blur-2xl transition-all duration-500 group-hover:opacity-40 group-hover:scale-110"></div>
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-secondary to-purple-600 text-white font-medium shadow-md shadow-secondary/20">
                      2
                    </div>
                    <div className="z-10">
                      <h3 className="font-semibold text-lg group-hover:text-white/90 transition-colors duration-300">
                        API-Driven
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Programmatically access research data through
                        standardized API endpoints.
                      </p>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-secondary/0 via-secondary/80 to-secondary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-secondary/10 to-secondary/30 p-6 transition-all duration-500 hover:shadow-xl hover:shadow-secondary/30 hover:from-secondary/20 hover:to-secondary/40 border border-secondary/20">
                  <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-gradient-to-br from-secondary to-purple-600 opacity-20 blur-2xl transition-all duration-500 group-hover:opacity-40 group-hover:scale-110"></div>
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-secondary to-purple-600 text-white font-medium shadow-md shadow-secondary/20">
                      3
                    </div>
                    <div className="z-10">
                      <h3 className="font-semibold text-lg group-hover:text-white/90 transition-colors duration-300">
                        Research Integration
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Easily integrate research materials into academic
                        projects and applications.
                      </p>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-secondary/0 via-secondary/80 to-secondary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </div>

              <div
                className="absolute -bottom-16 -left-16 w-32 h-32 rounded-full border border-secondary/20 animate-ping opacity-20"
                style={{ animationDuration: "8s" }}
              ></div>
            </div>

            <div className="bg-card/60 backdrop-blur-sm rounded-2xl shadow-xl border border-secondary/30 p-8 h-auto relative">
              <div className="absolute -top-5 -right-5 w-24 h-24 bg-secondary/5 rounded-full filter blur-xl opacity-0 transition-opacity duration-700"></div>

              <div className="relative">
                <AuthProvider>
                  <AuthTabs />
                </AuthProvider>
              </div>
            </div>
          </div>

          {/* Dataset Download Section */}
          <div className="mt-20 relative">
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-secondary/5 rounded-full filter blur-3xl opacity-30"></div>

            <h2 className="text-3xl font-bold tracking-tight mb-6 text-center">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white">
                Download Datasets
              </span>
            </h2>

            <p className="text-muted-foreground text-center mb-10 max-w-2xl mx-auto">
              Access our cleaned datasets directly for your research projects.
              The following datasets are available for download in various
              formats.
            </p>

            <div className="text-sm text-center text-muted-foreground mb-8 max-w-2xl mx-auto relative z-10">
              <p>
                Data was originally gathered from{" "}
                <Link
                  href="https://www.albion.edu/offices/registrar/institutional-data/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-white hover:underline inline-block"
                >
                  Albion College Registrar&apos;s Office Institutional Data
                </Link>{" "}
                and cleaned for research purposes.
              </p>
            </div>

            <Tabs defaultValue="csv" className="w-full">
              <div className="flex justify-center mb-6">
                <TabsList className="bg-background/30 backdrop-blur-sm border border-secondary/20">
                  <TabsTrigger
                    value="csv"
                    className="data-[state=active]:bg-secondary/20 data-[state=active]:text-secondary"
                  >
                    <FileSpreadsheet className="h-4 w-4 mr-2" />
                    CSV
                  </TabsTrigger>
                  <TabsTrigger
                    value="json"
                    className="data-[state=active]:bg-secondary/20 data-[state=active]:text-secondary"
                  >
                    <FileJson className="h-4 w-4 mr-2" />
                    JSON
                  </TabsTrigger>
                  <TabsTrigger
                    value="xml"
                    className="data-[state=active]:bg-secondary/20 data-[state=active]:text-secondary"
                  >
                    <FileCode className="h-4 w-4 mr-2" />
                    XML
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="csv" className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Headcounts Dataset */}
                  <Card className="border-secondary/20 group transition-all duration-300 hover:shadow-lg hover:shadow-secondary/10 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg z-0"></div>
                    <CardHeader className="relative z-10">
                      <CardTitle className="transition-colors duration-300">
                        Headcount Data
                      </CardTitle>
                      <CardDescription>
                        Student enrollment demographics
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="relative z-10">
                      <p className="text-sm text-muted-foreground mb-2">
                        Comprehensive data on student enrollment by
                        demographics, program, and status.
                      </p>
                      <div className="text-xs flex items-center text-muted-foreground">
                        <span className="font-semibold mr-2">Format:</span>
                        <FileSpreadsheet className="h-3 w-3 mr-1" />
                        CSV
                      </div>
                    </CardContent>
                    <CardFooter className="relative z-10">
                      <Button
                        className="w-full bg-gradient-to-r from-secondary to-purple-600 text-white hover:shadow-md hover:shadow-secondary/20 transition-all duration-300 relative z-10"
                        onClick={() => handleDownload("csv/headcounts.csv")}
                      >
                        <Download className="h-4 w-4 mr-2" /> Download Dataset
                      </Button>
                    </CardFooter>
                  </Card>

                  {/* Enrollment Report Dataset */}
                  <Card className="border-secondary/20 group transition-all duration-300 hover:shadow-lg hover:shadow-secondary/10 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg z-0"></div>
                    <CardHeader className="relative z-10">
                      <CardTitle className="transition-colors duration-300">
                        Enrollment Report
                      </CardTitle>
                      <CardDescription>
                        Comprehensive enrollment statistics
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="relative z-10">
                      <p className="text-sm text-muted-foreground mb-2">
                        Detailed enrollment reports across academic years and
                        programs.
                      </p>
                      <div className="text-xs flex items-center text-muted-foreground">
                        <span className="font-semibold mr-2">Format:</span>
                        <FileSpreadsheet className="h-3 w-3 mr-1" />
                        CSV
                      </div>
                    </CardContent>
                    <CardFooter className="relative z-10">
                      <Button
                        className="w-full bg-gradient-to-r from-secondary to-purple-600 text-white hover:shadow-md hover:shadow-secondary/20 transition-all duration-300 relative z-10"
                        onClick={() => handleDownload("csv/enrollment.csv")}
                      >
                        <Download className="h-4 w-4 mr-2" /> Download Dataset
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="json" className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Headcounts Dataset */}
                  <Card className="border-secondary/20 group transition-all duration-300 hover:shadow-lg hover:shadow-secondary/10 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg z-0"></div>
                    <CardHeader className="relative z-10">
                      <CardTitle className="transition-colors duration-300">
                        Headcount Data
                      </CardTitle>
                      <CardDescription>
                        Student enrollment demographics
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="relative z-10">
                      <p className="text-sm text-muted-foreground mb-2">
                        Comprehensive data on student enrollment by
                        demographics, program, and status.
                      </p>
                      <div className="text-xs flex items-center text-muted-foreground">
                        <span className="font-semibold mr-2">Format:</span>
                        <FileJson className="h-3 w-3 mr-1" />
                        JSON
                      </div>
                    </CardContent>
                    <CardFooter className="relative z-10">
                      <Button
                        className="w-full bg-gradient-to-r from-secondary to-purple-600 text-white hover:shadow-md hover:shadow-secondary/20 transition-all duration-300 relative z-10"
                        onClick={() => handleDownload("json/headcounts.json")}
                      >
                        <Download className="h-4 w-4 mr-2" /> Download Dataset
                      </Button>
                    </CardFooter>
                  </Card>

                  {/* Enrollment Report Dataset */}
                  <Card className="border-secondary/20 group transition-all duration-300 hover:shadow-lg hover:shadow-secondary/10 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg z-0"></div>
                    <CardHeader className="relative z-10">
                      <CardTitle className="transition-colors duration-300">
                        Enrollment Report
                      </CardTitle>
                      <CardDescription>
                        Comprehensive enrollment statistics
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="relative z-10">
                      <p className="text-sm text-muted-foreground mb-2">
                        Detailed enrollment reports across academic years and
                        programs.
                      </p>
                      <div className="text-xs flex items-center text-muted-foreground">
                        <span className="font-semibold mr-2">Format:</span>
                        <FileJson className="h-3 w-3 mr-1" />
                        JSON
                      </div>
                    </CardContent>
                    <CardFooter className="relative z-10">
                      <Button
                        className="w-full bg-gradient-to-r from-secondary to-purple-600 text-white hover:shadow-md hover:shadow-secondary/20 transition-all duration-300 relative z-10"
                        onClick={() => handleDownload("json/enrollment.json")}
                      >
                        <Download className="h-4 w-4 mr-2" /> Download Dataset
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="xml" className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Headcounts Dataset */}
                  <Card className="border-secondary/20 group transition-all duration-300 hover:shadow-lg hover:shadow-secondary/10 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg z-0"></div>
                    <CardHeader className="relative z-10">
                      <CardTitle className="transition-colors duration-300">
                        Headcount Data
                      </CardTitle>
                      <CardDescription>
                        Student enrollment demographics
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="relative z-10">
                      <p className="text-sm text-muted-foreground mb-2">
                        Comprehensive data on student enrollment by
                        demographics, program, and status.
                      </p>
                      <div className="text-xs flex items-center text-muted-foreground">
                        <span className="font-semibold mr-2">Format:</span>
                        <FileCode className="h-3 w-3 mr-1" />
                        XML
                      </div>
                    </CardContent>
                    <CardFooter className="relative z-10">
                      <Button
                        className="w-full bg-gradient-to-r from-secondary to-purple-600 text-white hover:shadow-md hover:shadow-secondary/20 transition-all duration-300 relative z-10"
                        onClick={() => handleDownload("xml/headcounts.xml")}
                      >
                        <Download className="h-4 w-4 mr-2" /> Download Dataset
                      </Button>
                    </CardFooter>
                  </Card>

                  {/* Enrollment Report Dataset */}
                  <Card className="border-secondary/20 group transition-all duration-300 hover:shadow-lg hover:shadow-secondary/10 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg z-0"></div>
                    <CardHeader className="relative z-10">
                      <CardTitle className="transition-colors duration-300">
                        Enrollment Report
                      </CardTitle>
                      <CardDescription>
                        Comprehensive enrollment statistics
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="relative z-10">
                      <p className="text-sm text-muted-foreground mb-2">
                        Detailed enrollment reports across academic years and
                        programs.
                      </p>
                      <div className="text-xs flex items-center text-muted-foreground">
                        <span className="font-semibold mr-2">Format:</span>
                        <FileCode className="h-3 w-3 mr-1" />
                        XML
                      </div>
                    </CardContent>
                    <CardFooter className="relative z-10">
                      <Button
                        className="w-full bg-gradient-to-r from-secondary to-purple-600 text-white hover:shadow-md hover:shadow-secondary/20 transition-all duration-300 relative z-10"
                        onClick={() => handleDownload("xml/enrollment.xml")}
                      >
                        <Download className="h-4 w-4 mr-2" /> Download Dataset
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
