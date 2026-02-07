"use client";

import { ChevronDown, ExternalLink, LogOut, Settings } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { authClient } from "@/lib/auth-client";
import { authClient as auth } from "@/lib/auth-client";

function ProfileDropdown({
	user,
}: {
	user: { name?: string | null; email: string; id?: string };
}) {
	const router = useRouter();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				render={
					<Button
						variant="ghost"
						className="flex h-auto items-center gap-2 p-0 hover:bg-transparent"
					/>
				}
			>
				<div className="relative">
					<div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-secondary to-primary font-medium text-sm text-white shadow-md shadow-secondary/20">
						{user.name
							? user.name.charAt(0).toUpperCase()
							: user.email.charAt(0).toUpperCase()}
					</div>
					<span className="absolute right-0 bottom-0 h-3 w-3 rounded-full border-2 border-white bg-green-500" />
				</div>
				<div className="hidden flex-col items-start md:flex">
					<span className="font-medium text-sm">
						{user.name || user.email.split("@")[0]}
					</span>
					<span className="text-muted-foreground text-xs">{user.email}</span>
				</div>
				<ChevronDown className="hidden h-4 w-4 text-muted-foreground md:block" />
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
					onClick={() => {
						auth.signOut({
							fetchOptions: {
								onSuccess: () => {
									router.push("/");
								},
							},
						});
					}}
					className="cursor-pointer text-red-600"
				>
					<LogOut className="mr-2 h-4 w-4" />
					<span>Log out</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

type DashboardStats = {
	totalKeys?: number;
	activeKeys?: number;
	totalRequests?: number;
	requestsLast30Days?: number;
};

export default function Dashboard({
	session,
}: {
	session: typeof authClient.$Infer.Session;
}) {
	const router = useRouter();
	const [stats, setStats] = useState<DashboardStats | null>(null);
	const [statsLoading, setStatsLoading] = useState(true);

	const user = session.user;

	useEffect(() => {
		const fetchStats = async () => {
			setStatsLoading(true);
			try {
				const response = await fetch(`/api/dashboard/stats?userId=${user.id}`, {
					cache: "no-store",
				});

				if (response.ok) {
					const data: DashboardStats = await response.json();
					setStats(data);
				}
			} catch (error) {
				console.error("Error fetching dashboard stats:", error);
			} finally {
				setStatsLoading(false);
			}
		};

		fetchStats();
	}, [user.id]);

	return (
		<div className="container mx-auto py-8">
			<div className="pointer-events-none absolute top-0 right-0 h-96 w-96 rounded-full bg-secondary/10 opacity-30 blur-3xl filter" />
			<div className="pointer-events-none absolute bottom-0 left-0 h-96 w-96 rounded-full bg-secondary/10 opacity-30 blur-3xl filter" />

			<header className="relative mb-8">
				<div className="pointer-events-none absolute inset-0 -z-10 rounded-2xl bg-gradient-to-r from-secondary/5 to-purple-400/5" />

				<div className="flex flex-col gap-4 rounded-2xl border border-secondary/20 bg-card/50 p-6 shadow-lg backdrop-blur-sm md:flex-row md:items-center md:justify-between">
					<div>
						<h1 className="bg-gradient-to-r from-white to-white bg-clip-text font-bold text-3xl text-transparent tracking-tight">
							Dashboard
						</h1>
						<p className="mt-1 text-muted-foreground">
							Welcome back, {user.name || user.email.split("@")[0]}
						</p>
					</div>
					<div className="flex items-center space-x-4">
						<ProfileDropdown user={user} />
						<Button
							variant="outline"
							className="border-secondary/40 hover:border-secondary/60 hover:bg-secondary/10"
							onClick={() => router.push("/")}
						>
							Back to Home
						</Button>
					</div>
				</div>
			</header>

			<main className="space-y-8">
				<section>
					<h2 className="relative mb-4 font-semibold text-xl">
						Overview
						<span className="pointer-events-none absolute -bottom-1 left-0 h-0.5 w-20 bg-gradient-to-r from-secondary to-purple-400" />
					</h2>
					<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
						<Card className="group relative overflow-hidden border-secondary/20">
							<div className="pointer-events-none absolute inset-x-0 top-0 h-1 origin-left bg-gradient-to-r from-secondary to-purple-400 transition-transform duration-500 group-hover:scale-x-100" />
							<CardHeader className="pb-2">
								<CardTitle className="text-lg">Total API Keys</CardTitle>
								<CardDescription>All created API keys</CardDescription>
							</CardHeader>
							<CardContent>
								{statsLoading ? (
									<div className="h-10 animate-pulse rounded bg-gray-200/20" />
								) : (
									<>
										<p className="font-bold text-3xl">
											{stats?.totalKeys || 0}
										</p>
										<p className="text-muted-foreground text-sm">
											{stats?.activeKeys || 0} active keys
										</p>
									</>
								)}
							</CardContent>
						</Card>
						<Card className="group relative overflow-hidden border-secondary/20">
							<div className="pointer-events-none absolute inset-x-0 top-0 h-1 origin-left bg-gradient-to-r from-secondary to-purple-400 transition-transform duration-500 group-hover:scale-x-100" />
							<CardHeader className="pb-2">
								<CardTitle className="text-lg">API Calls (30 Days)</CardTitle>
								<CardDescription>
									API requests in the last 30 days
								</CardDescription>
							</CardHeader>
							<CardContent>
								{statsLoading ? (
									<div className="h-10 animate-pulse rounded bg-gray-200/20" />
								) : (
									<>
										<p className="font-bold text-3xl">
											{stats?.requestsLast30Days || 0}
										</p>
										<p className="text-muted-foreground text-sm">
											{stats?.totalRequests || 0} total requests
										</p>
									</>
								)}
							</CardContent>
						</Card>
						<Card className="group relative overflow-hidden border-secondary/20">
							<div className="pointer-events-none absolute inset-x-0 top-0 h-1 origin-left bg-gradient-to-r from-secondary to-purple-400 transition-transform duration-500 group-hover:scale-x-100" />
							<CardHeader className="pb-2">
								<CardTitle className="text-lg">Available Data Sets</CardTitle>
								<CardDescription>Available for query via API</CardDescription>
							</CardHeader>
							<CardContent>
								{statsLoading ? (
									<div className="h-10 animate-pulse rounded bg-gray-200/20" />
								) : (
									<>
										<p className="font-bold text-3xl">2</p>
										<p className="text-muted-foreground text-sm">
											Headcounts & Enrollment
										</p>
									</>
								)}
							</CardContent>
						</Card>
					</div>
				</section>

				<section>
					<h2 className="relative mb-4 font-semibold text-xl">
						Available APIs
						<span className="pointer-events-none absolute -bottom-1 left-0 h-0.5 w-20 bg-gradient-to-r from-secondary to-purple-400" />
					</h2>
					<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
						<Card className="group relative border-secondary/20 transition-all duration-300 hover:shadow-lg hover:shadow-secondary/10">
							<div className="pointer-events-none absolute inset-0 rounded-lg bg-gradient-to-br from-secondary/5 to-purple-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
							<CardHeader>
								<CardTitle>Headcounts Endpoint</CardTitle>
								<CardDescription>Student headcount reports</CardDescription>
							</CardHeader>
							<CardContent>
								<p className="mb-4 text-sm">
									Access to student headcount data by year.
								</p>
								<Button
									className="flex items-center gap-1 bg-gradient-to-r from-secondary to-purple-600 text-white transition-all duration-300 hover:shadow-md hover:shadow-secondary/20"
									onClick={() =>
										window.open(
											"https://docs.openalbion.org/docs/api/headcounts",
											"_blank",
										)
									}
								>
									Access API
									<ExternalLink size={14} className="ml-1" />
								</Button>
							</CardContent>
						</Card>
						<Card className="group relative border-secondary/20 transition-all duration-300 hover:shadow-lg hover:shadow-secondary/10">
							<div className="pointer-events-none absolute inset-0 rounded-lg bg-gradient-to-br from-secondary/5 to-purple-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
							<CardHeader>
								<CardTitle>Enrollment Endpoint</CardTitle>
								<CardDescription>
									Enrollment trends and statistics
								</CardDescription>
							</CardHeader>
							<CardContent>
								<p className="mb-4 text-sm">
									Comprehensive enrollment data by semester.
								</p>
								<Button
									className="flex items-center gap-1 bg-gradient-to-r from-secondary to-purple-600 text-white transition-all duration-300 hover:shadow-md hover:shadow-secondary/20"
									onClick={() =>
										window.open(
											"https://docs.openalbion.org/docs/api/enrollment",
											"_blank",
										)
									}
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
