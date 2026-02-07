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
					<div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-400 font-medium text-sm text-white">
						{user.name
							? user.name.charAt(0).toUpperCase()
							: user.email.charAt(0).toUpperCase()}
					</div>
					<span className="absolute right-0 bottom-0 h-3 w-3 rounded-full border-2 border-background bg-green-500" />
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
			<header className="mb-8">
				<div className="flex flex-col gap-4 rounded-xl border border-border/60 bg-card/50 p-6 backdrop-blur-sm md:flex-row md:items-center md:justify-between">
					<div>
						<h1 className="font-bold text-3xl tracking-tight">Dashboard</h1>
						<p className="mt-1 text-muted-foreground">
							Welcome back, {user.name || user.email.split("@")[0]}
						</p>
					</div>
					<div className="flex items-center space-x-4">
						<ProfileDropdown user={user} />
						<Button variant="outline" onClick={() => router.push("/")}>
							Back to Home
						</Button>
					</div>
				</div>
			</header>

			<main className="space-y-8">
				<section>
					<h2 className="mb-4 font-semibold text-xl">Overview</h2>
					<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
						<Card>
							<CardHeader className="pb-2">
								<CardTitle className="text-lg">API Keys</CardTitle>
								<CardDescription>All created keys</CardDescription>
							</CardHeader>
							<CardContent>
								{statsLoading ? (
									<div className="h-10 animate-pulse rounded bg-muted" />
								) : (
									<>
										<p className="font-bold text-3xl">
											{stats?.totalKeys || 0}
										</p>
										<p className="text-muted-foreground text-sm">
											{stats?.activeKeys || 0} active
										</p>
									</>
								)}
							</CardContent>
						</Card>
						<Card>
							<CardHeader className="pb-2">
								<CardTitle className="text-lg">API Calls (30d)</CardTitle>
								<CardDescription>Recent usage</CardDescription>
							</CardHeader>
							<CardContent>
								{statsLoading ? (
									<div className="h-10 animate-pulse rounded bg-muted" />
								) : (
									<>
										<p className="font-bold text-3xl">
											{stats?.requestsLast30Days || 0}
										</p>
										<p className="text-muted-foreground text-sm">
											{stats?.totalRequests || 0} total
										</p>
									</>
								)}
							</CardContent>
						</Card>
						<Card>
							<CardHeader className="pb-2">
								<CardTitle className="text-lg">Datasets</CardTitle>
								<CardDescription>Available via API</CardDescription>
							</CardHeader>
							<CardContent>
								{statsLoading ? (
									<div className="h-10 animate-pulse rounded bg-muted" />
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
					<h2 className="mb-4 font-semibold text-xl">Available APIs</h2>
					<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
						<Card className="transition-all duration-200 hover:shadow-md">
							<CardHeader>
								<CardTitle>Headcounts</CardTitle>
								<CardDescription>
									Student headcount data by year
								</CardDescription>
							</CardHeader>
							<CardContent>
								<Button
									className="flex items-center gap-1 bg-violet-400 text-white hover:bg-violet-500"
									onClick={() =>
										window.open(
											"https://docs.openalbion.org/docs/api/headcounts",
											"_blank",
										)
									}
								>
									View Docs
									<ExternalLink size={14} className="ml-1" />
								</Button>
							</CardContent>
						</Card>
						<Card className="transition-all duration-200 hover:shadow-md">
							<CardHeader>
								<CardTitle>Enrollment</CardTitle>
								<CardDescription>Enrollment data by semester</CardDescription>
							</CardHeader>
							<CardContent>
								<Button
									className="flex items-center gap-1 bg-violet-400 text-white hover:bg-violet-500"
									onClick={() =>
										window.open(
											"https://docs.openalbion.org/docs/api/enrollment",
											"_blank",
										)
									}
								>
									View Docs
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
