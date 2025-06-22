"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import { Settings, LogOut, ChevronDown, ExternalLink } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function HomeButton() {
  return (
    <button
      className="inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4 py-2 border border-secondary/40 bg-transparent hover:bg-secondary/10 hover:border-secondary/60 transition-all duration-300 text-foreground relative"
      style={{ position: "relative", zIndex: 50, pointerEvents: "auto" }}
      onClick={() => (window.location.href = "/")}
    >
      Back to Home
    </button>
  );
}

function ProfileDropdown({
  user,
}: {
  user: { name?: string | null; email: string; id?: string };
}) {
  const { logout } = useAuth();
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="p-0 h-auto flex items-center gap-2 hover:bg-transparent"
        >
          <div className="relative">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-secondary to-primary flex items-center justify-center text-sm font-medium text-white shadow-md shadow-secondary/20">
              {user.name
                ? user.name.charAt(0).toUpperCase()
                : user.email.charAt(0).toUpperCase()}
            </div>
            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></span>
          </div>
          <div className="hidden md:flex flex-col items-start">
            <span className="text-sm font-medium">
              {user.name || user.email.split("@")[0]}
            </span>
            <span className="text-xs text-muted-foreground">{user.email}</span>
          </div>
          <ChevronDown className="h-4 w-4 text-muted-foreground hidden md:block" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => router.push("/dashboard/settings")}
          className="cursor-pointer"
        >
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => logout()}
          className="cursor-pointer text-red-600"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [stats, setStats] = useState<{
    totalKeys?: number;
    activeKeys?: number;
    totalRequests?: number;
    requestsLast30Days?: number;
  } | null>(null);
  const [statsLoading, setStatsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      const fetchStats = async () => {
        setStatsLoading(true);
        try {
          const response = await fetch(
            `/api/dashboard/stats?userId=${user.id}`,
            {
              cache: "no-store",
            }
          );

          if (response.ok) {
            const data = await response.json();
            setStats(data);
          } else {
            setError("Failed to load dashboard data");
          }
        } catch (error) {
          console.error("Error fetching dashboard stats:", error);
          setError("An error occurred while loading dashboard data");
        } finally {
          setStatsLoading(false);
        }
      };

      fetchStats();
    }
  }, [user]);

  useEffect(() => {
    if (error) {
      console.error("Dashboard error:", error);
    }
  }, [error]);

  if (loading || !isClient || !user) {
    return null;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="decorative-overlay absolute top-0 right-0 w-96 h-96 bg-secondary/10 rounded-full filter blur-3xl opacity-30"></div>
      <div className="decorative-overlay absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full filter blur-3xl opacity-30"></div>

      <style jsx global>{`
        .decorative-overlay {
          pointer-events: none !important;
        }
      `}</style>

      <header className="mb-8 relative">
        <div className="decorative-overlay absolute inset-0 bg-gradient-to-r from-secondary/5 to-purple-400/5 rounded-2xl -z-10"></div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-6 rounded-2xl border border-secondary/20 bg-card/50 backdrop-blur-sm shadow-lg">
          <div>
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-white to-white bg-clip-text text-transparent">
              Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">
              Welcome back, {user.name || user.email.split("@")[0]}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <ProfileDropdown user={user} />
            <div className="relative" style={{ zIndex: 40 }}>
              <HomeButton />
            </div>
          </div>
        </div>
      </header>

      <main className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold mb-4 relative">
            Overview
            <span className="decorative-overlay absolute -bottom-1 left-0 w-20 h-0.5 bg-gradient-to-r from-secondary to-purple-400"></span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-secondary/20 overflow-hidden relative group">
              <div className="decorative-overlay absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-secondary to-purple-400 transform origin-left group-hover:scale-x-100 transition-transform duration-500"></div>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Total API Keys</CardTitle>
                <CardDescription>All created API keys</CardDescription>
              </CardHeader>
              <CardContent>
                {statsLoading ? (
                  <div className="animate-pulse h-10 bg-gray-200/20 rounded"></div>
                ) : (
                  <>
                    <p className="text-3xl font-bold">
                      {stats?.totalKeys || 0}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {stats?.activeKeys || 0} active keys
                    </p>
                  </>
                )}
              </CardContent>
            </Card>
            <Card className="border-secondary/20 overflow-hidden relative group">
              <div className="decorative-overlay absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-secondary to-purple-400 transform origin-left group-hover:scale-x-100 transition-transform duration-500"></div>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">API Calls (30 Days)</CardTitle>
                <CardDescription>
                  API requests in the last 30 days
                </CardDescription>
              </CardHeader>
              <CardContent>
                {statsLoading ? (
                  <div className="animate-pulse h-10 bg-gray-200/20 rounded"></div>
                ) : (
                  <>
                    <p className="text-3xl font-bold">
                      {stats?.requestsLast30Days || 0}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {stats?.totalRequests || 0} total requests
                    </p>
                  </>
                )}
              </CardContent>
            </Card>
            <Card className="border-secondary/20 overflow-hidden relative group">
              <div className="decorative-overlay absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-secondary to-purple-400 transform origin-left group-hover:scale-x-100 transition-transform duration-500"></div>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Available Data Sets</CardTitle>
                <CardDescription>Available for query via API</CardDescription>
              </CardHeader>
              <CardContent>
                {statsLoading ? (
                  <div className="animate-pulse h-10 bg-gray-200/20 rounded"></div>
                ) : (
                  <>
                    <p className="text-3xl font-bold">2</p>
                    <p className="text-sm text-muted-foreground">
                      Headcounts & Enrollment
                    </p>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4 relative">
            Available APIs
            <span className="decorative-overlay absolute -bottom-1 left-0 w-20 h-0.5 bg-gradient-to-r from-secondary to-purple-400"></span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-secondary/20 group transition-all duration-300 hover:shadow-lg hover:shadow-secondary/10 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg pointer-events-none"></div>
              <CardHeader>
                <CardTitle>Headcount Data API</CardTitle>
                <CardDescription>Student headcount reports</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">
                  Access to student headcount data by demographics, program, and
                  enrollment status.
                </p>
                <Button
                  className="bg-gradient-to-r from-secondary to-purple-600 text-white hover:shadow-md hover:shadow-secondary/20 transition-all duration-300 flex items-center gap-1"
                  onClick={() =>
                    window.open(
                      "https://docs.openalbion.org/api-endpoints/headcounts",
                      "_blank"
                    )
                  }
                  title="https://docs.openalbion.org/api-endpoints/headcounts"
                >
                  Access API
                  <ExternalLink size={14} className="ml-1" />
                </Button>
              </CardContent>
            </Card>
            <Card className="border-secondary/20 group transition-all duration-300 hover:shadow-lg hover:shadow-secondary/10 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg pointer-events-none"></div>
              <CardHeader>
                <CardTitle>Class Size API</CardTitle>
                <CardDescription>
                  Course capacity and enrollment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">
                  Detailed information about class sizes, capacity, and
                  enrollment statistics for courses at Albion College.
                </p>
                <Button
                  className="bg-gradient-to-r from-secondary to-purple-600 text-white hover:shadow-md hover:shadow-secondary/20 transition-all duration-300 flex items-center gap-1"
                  onClick={() =>
                    window.open(
                      "https://docs.openalbion.org/api-endpoints/class-sizes",
                      "_blank"
                    )
                  }
                  title="https://docs.openalbion.org/api-endpoints/class-sizes"
                >
                  Access API
                  <ExternalLink size={14} className="ml-1" />
                </Button>
              </CardContent>
            </Card>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <Card className="border-secondary/20 group transition-all duration-300 hover:shadow-lg hover:shadow-secondary/10 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg pointer-events-none"></div>
              <CardHeader>
                <CardTitle>Faculty API</CardTitle>
                <CardDescription>
                  Faculty demographic information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">
                  Aggregated data about faculty characteristics including rank,
                  diversity, and departmental distribution.
                </p>
                <Button
                  className="bg-gradient-to-r from-secondary to-purple-600 text-white hover:shadow-md hover:shadow-secondary/20 transition-all duration-300 flex items-center gap-1"
                  onClick={() =>
                    window.open(
                      "https://docs.openalbion.org/api-endpoints/faculty",
                      "_blank"
                    )
                  }
                  title="https://docs.openalbion.org/api-endpoints/faculty"
                >
                  Access API
                  <ExternalLink size={14} className="ml-1" />
                </Button>
              </CardContent>
            </Card>
            <Card className="border-secondary/20 group transition-all duration-300 hover:shadow-lg hover:shadow-secondary/10 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg pointer-events-none"></div>
              <CardHeader>
                <CardTitle>Enrollment Reports API</CardTitle>
                <CardDescription>
                  Enrollment trends and statistics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">
                  Comprehensive enrollment data including admission rates,
                  retention, and graduation statistics over time.
                </p>
                <Button
                  className="bg-gradient-to-r from-secondary to-purple-600 text-white hover:shadow-md hover:shadow-secondary/20 transition-all duration-300 flex items-center gap-1"
                  onClick={() =>
                    window.open(
                      "https://docs.openalbion.org/api-endpoints/enrollment",
                      "_blank"
                    )
                  }
                  title="https://docs.openalbion.org/api-endpoints/enrollment"
                >
                  Access API
                  <ExternalLink size={14} className="ml-1" />
                </Button>
              </CardContent>
            </Card>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <Card className="border-secondary/20 group transition-all duration-300 hover:shadow-lg hover:shadow-secondary/10 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg pointer-events-none"></div>
              <CardHeader>
                <CardTitle>Departments API</CardTitle>
                <CardDescription>
                  Academic department information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">
                  Detailed information about university departments.
                </p>
                <Button
                  className="bg-gradient-to-r from-secondary to-purple-600 text-white hover:shadow-md hover:shadow-secondary/20 transition-all duration-300 flex items-center gap-1"
                  onClick={() =>
                    window.open(
                      "https://docs.openalbion.org/api-endpoints/departments",
                      "_blank"
                    )
                  }
                  title="https://docs.openalbion.org/api-endpoints/departments"
                >
                  Access API
                  <ExternalLink size={14} className="ml-1" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
}
