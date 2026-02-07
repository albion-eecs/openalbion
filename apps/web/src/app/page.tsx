"use client";

import { Download, FileCode, FileJson, FileSpreadsheet } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { authClient } from "@/lib/auth-client";

export default function Home() {
	const { data: session } = authClient.useSession();
	const router = useRouter();

	const handleDownload = (filePath: string) => {
		const link = document.createElement("a");
		link.href = `/datasets/cleaned/${filePath}`;
		link.download = filePath.split("/").pop() || "";
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	return (
		<div className="relative flex min-h-screen flex-col overflow-hidden">
			<div
				className="absolute -top-20 -right-20 h-96 w-96 animate-pulse rounded-full bg-secondary/10 opacity-50 blur-3xl filter"
				style={{ animationDuration: "8s" }}
			/>
			<div
				className="absolute top-1/2 -left-48 h-96 w-96 animate-pulse rounded-full bg-secondary/10 opacity-30 blur-3xl filter"
				style={{ animationDuration: "12s" }}
			/>

			<header className="relative z-10 border-secondary/20 border-b px-4 py-6 sm:px-6 lg:px-8">
				<div className="mx-auto flex max-w-7xl flex-col items-center gap-2">
					<h1 className="bg-gradient-to-r from-white to-white bg-clip-text font-bold text-4xl text-transparent tracking-tighter">
						OpenAlbion
					</h1>
					<p className="text-muted-foreground text-sm">
						Albion College data portal
					</p>
				</div>
			</header>

			<main className="relative z-10 flex-1 px-4 py-12 sm:px-6 lg:px-8">
				<div className="mx-auto max-w-6xl">
					<div className="grid grid-cols-1 items-start gap-12 md:grid-cols-2 md:gap-20">
						<div className="flex flex-col justify-center space-y-8 md:sticky md:top-24">
							<div className="space-y-3">
								<h2 className="font-bold text-4xl leading-tight tracking-tight">
									Albion&apos;s{" "}
									<span className="bg-gradient-to-r from-white to-white bg-clip-text text-transparent">
										Data Portal
									</span>
								</h2>
								<p className="text-muted-foreground text-xl leading-relaxed">
									Access research data through standardized APIs to further
									academic research.
								</p>
							</div>

							<div className="space-y-6">
								<div className="group relative overflow-hidden rounded-xl border border-secondary/20 bg-gradient-to-br from-secondary/10 to-secondary/30 p-6 transition-all duration-500 hover:from-secondary/20 hover:to-secondary/40 hover:shadow-secondary/30 hover:shadow-xl">
									<div className="absolute -top-4 -right-4 h-20 w-20 rounded-full bg-gradient-to-br from-secondary to-purple-600 opacity-20 blur-2xl transition-all duration-500 group-hover:scale-110 group-hover:opacity-40" />
									<div className="flex items-center gap-4">
										<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-secondary to-purple-600 font-medium text-white shadow-md shadow-secondary/20">
											1
										</div>
										<div className="z-10">
											<h3 className="font-semibold text-lg transition-colors duration-300 group-hover:text-white/90">
												Albion-only Access
											</h3>
											<p className="text-muted-foreground leading-relaxed">
												Only students, faculty, and alumni with @albion.edu
												emails can register.
											</p>
										</div>
									</div>
									<div className="absolute bottom-0 left-0 h-0.5 w-full bg-gradient-to-r from-secondary/0 via-secondary/80 to-secondary/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
								</div>

								<div className="group relative overflow-hidden rounded-xl border border-secondary/20 bg-gradient-to-br from-secondary/10 to-secondary/30 p-6 transition-all duration-500 hover:from-secondary/20 hover:to-secondary/40 hover:shadow-secondary/30 hover:shadow-xl">
									<div className="absolute -top-4 -right-4 h-20 w-20 rounded-full bg-gradient-to-br from-secondary to-purple-600 opacity-20 blur-2xl transition-all duration-500 group-hover:scale-110 group-hover:opacity-40" />
									<div className="flex items-center gap-4">
										<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-secondary to-purple-600 font-medium text-white shadow-md shadow-secondary/20">
											2
										</div>
										<div className="z-10">
											<h3 className="font-semibold text-lg transition-colors duration-300 group-hover:text-white/90">
												API-Driven
											</h3>
											<p className="text-muted-foreground leading-relaxed">
												Programmatically access research data through
												standardized API endpoints.
											</p>
										</div>
									</div>
									<div className="absolute bottom-0 left-0 h-0.5 w-full bg-gradient-to-r from-secondary/0 via-secondary/80 to-secondary/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
								</div>

								<div className="group relative overflow-hidden rounded-xl border border-secondary/20 bg-gradient-to-br from-secondary/10 to-secondary/30 p-6 transition-all duration-500 hover:from-secondary/20 hover:to-secondary/40 hover:shadow-secondary/30 hover:shadow-xl">
									<div className="absolute -top-4 -right-4 h-20 w-20 rounded-full bg-gradient-to-br from-secondary to-purple-600 opacity-20 blur-2xl transition-all duration-500 group-hover:scale-110 group-hover:opacity-40" />
									<div className="flex items-center gap-4">
										<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-secondary to-purple-600 font-medium text-white shadow-md shadow-secondary/20">
											3
										</div>
										<div className="z-10">
											<h3 className="font-semibold text-lg transition-colors duration-300 group-hover:text-white/90">
												Research Integration
											</h3>
											<p className="text-muted-foreground leading-relaxed">
												Easily integrate research materials into academic
												projects and applications.
											</p>
										</div>
									</div>
									<div className="absolute bottom-0 left-0 h-0.5 w-full bg-gradient-to-r from-secondary/0 via-secondary/80 to-secondary/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
								</div>
							</div>

							<div
								className="absolute -bottom-16 -left-16 h-32 w-32 animate-ping rounded-full border border-secondary/20 opacity-20"
								style={{ animationDuration: "8s" }}
							/>
						</div>

						<div className="relative h-auto rounded-2xl border border-secondary/30 bg-card/60 p-8 shadow-xl backdrop-blur-sm">
							<div className="absolute -top-5 -right-5 h-24 w-24 rounded-full bg-secondary/5 opacity-0 blur-xl filter transition-opacity duration-700" />

							<div className="relative">
								{session?.user ? (
									<div className="mx-auto flex max-w-md flex-col items-center space-y-5 py-6 text-center">
										<div className="relative">
											<div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-secondary to-primary opacity-70 blur-sm" />
											<div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-secondary/80 to-primary/80 font-bold text-2xl text-white">
												{session.user.name
													? session.user.name.charAt(0).toUpperCase()
													: session.user.email.charAt(0).toUpperCase()}
											</div>
										</div>
										<h2 className="font-bold text-2xl tracking-tight">
											Welcome,{" "}
											{session.user.name || session.user.email.split("@")[0]}
										</h2>
										<p className="text-muted-foreground text-sm">
											You are currently signed in with {session.user.email}
										</p>
										<Button
											className="rounded-lg bg-gradient-to-r from-secondary to-primary px-6 py-2 font-medium text-white shadow-md"
											onClick={() => router.push("/dashboard")}
										>
											Go to Dashboard
										</Button>
									</div>
								) : (
									<div className="mx-auto flex max-w-md flex-col items-center space-y-5 py-6 text-center">
										<h2 className="font-bold text-2xl tracking-tight">
											Get Started
										</h2>
										<p className="text-muted-foreground text-sm">
											Sign in with your @albion.edu email to access the data
											portal and API.
										</p>
										<Button
											className="rounded-lg bg-gradient-to-r from-secondary to-purple-600 px-6 py-2 font-medium text-white shadow-md shadow-secondary/20 transition-all duration-300 hover:shadow-md"
											onClick={() => router.push("/login")}
										>
											Sign In / Register
										</Button>
									</div>
								)}
							</div>
						</div>
					</div>

					<div className="relative mt-20">
						<div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-secondary/5 opacity-30 blur-3xl filter" />

						<h2 className="mb-6 text-center font-bold text-3xl tracking-tight">
							<span className="bg-gradient-to-r from-white to-white bg-clip-text text-transparent">
								Download Datasets
							</span>
						</h2>

						<p className="mx-auto mb-10 max-w-2xl text-center text-muted-foreground">
							Access our cleaned datasets directly for your research projects.
							The following datasets are available for download in various
							formats.
						</p>

						<div className="relative z-10 mx-auto mb-8 max-w-2xl text-center text-muted-foreground text-sm">
							<p>
								Data was originally gathered from{" "}
								<Link
									href="https://www.albion.edu/offices/registrar/institutional-data/"
									target="_blank"
									rel="noopener noreferrer"
									className="inline-block text-white/80 hover:text-white hover:underline"
								>
									Albion College Registrar&apos;s Office Institutional Data
								</Link>{" "}
								and cleaned for research purposes.
							</p>
						</div>

						<Tabs defaultValue="csv" className="w-full">
							<div className="mb-6 flex justify-center">
								<TabsList className="border border-secondary/20 bg-background/30 backdrop-blur-sm">
									<TabsTrigger
										value="csv"
										className="data-[state=active]:bg-secondary/20 data-[state=active]:text-secondary"
									>
										<FileSpreadsheet className="mr-2 h-4 w-4" />
										CSV
									</TabsTrigger>
									<TabsTrigger
										value="json"
										className="data-[state=active]:bg-secondary/20 data-[state=active]:text-secondary"
									>
										<FileJson className="mr-2 h-4 w-4" />
										JSON
									</TabsTrigger>
									<TabsTrigger
										value="xml"
										className="data-[state=active]:bg-secondary/20 data-[state=active]:text-secondary"
									>
										<FileCode className="mr-2 h-4 w-4" />
										XML
									</TabsTrigger>
								</TabsList>
							</div>

							{(["csv", "json", "xml"] as const).map((format) => (
								<TabsContent key={format} value={format} className="mt-4">
									<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
										<Card className="group relative overflow-hidden border-secondary/20 transition-all duration-300 hover:shadow-lg hover:shadow-secondary/10">
											<div className="absolute inset-0 rounded-lg bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
											<CardHeader className="relative z-10">
												<CardTitle className="transition-colors duration-300">
													Headcount Data
												</CardTitle>
												<CardDescription>
													Student enrollment demographics
												</CardDescription>
											</CardHeader>
											<CardContent className="relative z-10">
												<p className="mb-2 text-muted-foreground text-sm">
													Comprehensive data on student enrollment by
													demographics, program, and status.
												</p>
												<div className="flex items-center text-muted-foreground text-xs">
													<span className="mr-2 font-semibold">Format:</span>
													{format === "csv" && (
														<FileSpreadsheet className="mr-1 h-3 w-3" />
													)}
													{format === "json" && (
														<FileJson className="mr-1 h-3 w-3" />
													)}
													{format === "xml" && (
														<FileCode className="mr-1 h-3 w-3" />
													)}
													{format.toUpperCase()}
												</div>
											</CardContent>
											<CardFooter className="relative z-10">
												<Button
													className="relative z-10 w-full bg-gradient-to-r from-secondary to-purple-600 text-white transition-all duration-300 hover:shadow-md hover:shadow-secondary/20"
													onClick={() =>
														handleDownload(`${format}/headcounts.${format}`)
													}
												>
													<Download className="mr-2 h-4 w-4" /> Download Dataset
												</Button>
											</CardFooter>
										</Card>

										<Card className="group relative overflow-hidden border-secondary/20 transition-all duration-300 hover:shadow-lg hover:shadow-secondary/10">
											<div className="absolute inset-0 rounded-lg bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
											<CardHeader className="relative z-10">
												<CardTitle className="transition-colors duration-300">
													Enrollment Report
												</CardTitle>
												<CardDescription>
													Comprehensive enrollment statistics
												</CardDescription>
											</CardHeader>
											<CardContent className="relative z-10">
												<p className="mb-2 text-muted-foreground text-sm">
													Detailed enrollment reports across academic years and
													programs.
												</p>
												<div className="flex items-center text-muted-foreground text-xs">
													<span className="mr-2 font-semibold">Format:</span>
													{format === "csv" && (
														<FileSpreadsheet className="mr-1 h-3 w-3" />
													)}
													{format === "json" && (
														<FileJson className="mr-1 h-3 w-3" />
													)}
													{format === "xml" && (
														<FileCode className="mr-1 h-3 w-3" />
													)}
													{format.toUpperCase()}
												</div>
											</CardContent>
											<CardFooter className="relative z-10">
												<Button
													className="relative z-10 w-full bg-gradient-to-r from-secondary to-purple-600 text-white transition-all duration-300 hover:shadow-md hover:shadow-secondary/20"
													onClick={() =>
														handleDownload(`${format}/enrollment.${format}`)
													}
												>
													<Download className="mr-2 h-4 w-4" /> Download Dataset
												</Button>
											</CardFooter>
										</Card>
									</div>
								</TabsContent>
							))}
						</Tabs>
					</div>
				</div>
			</main>

			<Footer />
		</div>
	);
}
