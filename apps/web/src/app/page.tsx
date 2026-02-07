"use client";

import { Download, FileCode, FileJson, FileSpreadsheet } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { Footer } from "@/components/footer";
import SignInForm from "@/components/sign-in-form";
import SignUpForm from "@/components/sign-up-form";
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

const LOG_LINES = [
	{ method: "GET", path: "/api/headcounts?year=2024", status: 200, note: null },
	{ method: "GET", path: "/api/enrollment", status: 200, note: "1,247 rows" },
	{
		method: "GET",
		path: "/api/faculty?dept=math-cs?filter=cs",
		status: 200,
		note: "wow there's only two?",
	},
	{
		method: "GET",
		path: "/api/headcounts?year=1861",
		status: 404,
		note: "a couple of twigs and a rock",
	},
	{
		method: "GET",
		path: "/api/enrollment?major=non-science",
		status: 404,
		note: "we dont talk about dr.reimann's beginning of semester colloquium presentation ok?",
	},
	{
		method: "POST",
		path: "/api/auth/signup",
		status: 201,
		note: "hi!",
	},
	{ method: "GET", path: "/api/headcounts?year=2023", status: 200, note: null },
	{ method: "GET", path: "/api/faculty", status: 200, note: "148 records" },
	{
		method: "GET",
		path: "/api/parking",
		status: 200,
		note: "everywhere except behind mitchell",
	},
	{
		method: "POST",
		path: "/api/courses/register",
		status: 409,
		note: "COURSE RESTRICTION: FULL!",
	},
	{
		method: "GET",
		path: "/api/dining/menu?hall=baldwin",
		status: 200,
		note: "i'll miss you, baldy rations",
	},
	{
		method: "PATCH",
		path: "/api/gpa",
		status: 403,
		note: "seriously dude go study",
	},
	{
		method: "GET",
		path: "/api/enrollment?year=2024&major=econ",
		status: 200,
		note: `${Math.floor(Math.random() * 100)} rows`,
	},
	{
		method: "DELETE",
		path: "/api/finals",
		status: 403,
		note: `ACTUAL GENUINELY HELPFUL ADVICE: Cramming has for the ${new Date().getFullYear() - 191}th year been a blight on the Albion College student body.
		Please start studying at very least a week ahead of time. Depending on your course load, two weeks to a month is significantly better.`,
	},
];

function ApiLog() {
	const [lines, setLines] = useState<typeof LOG_LINES>([]);
	const indexRef = useRef(0);
	const scrollRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const initial = LOG_LINES.slice(0, 3);
		setLines(initial);
		indexRef.current = 3;

		const interval = setInterval(() => {
			setLines((prev) => {
				const next = LOG_LINES[indexRef.current % LOG_LINES.length];
				indexRef.current++;
				const updated = [...prev, next];
				if (updated.length > 12) return updated.slice(-12);
				return updated;
			});
		}, 2400);

		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		if (lines.length > 0 && scrollRef.current) {
			scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
		}
	}, [lines]);

	return (
		<div className="flex h-full flex-col overflow-hidden rounded-lg border border-border/40 bg-black/40 font-mono text-xs">
			<div className="flex items-center gap-1.5 border-border/40 border-b px-3 py-2">
				<div className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
				<div className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
				<div className="h-2.5 w-2.5 rounded-full bg-green-500/60" />
				<span className="ml-2 text-[10px] text-muted-foreground/60">
					api.openalbion.org
				</span>
			</div>
			<div
				ref={scrollRef}
				className="flex-1 overflow-hidden p-3 leading-relaxed"
			>
				{lines.map((line, i) => (
					<div
						key={`${indexRef.current}-${i}`}
						className="fade-in slide-in-from-bottom-1 animate-in py-0.5 duration-300"
					>
						<span
							className={
								line.status < 300
									? "text-green-400/80"
									: line.status < 500
										? "text-yellow-400/80"
										: "text-red-400/80"
							}
						>
							{line.status}
						</span>
						<span className="text-violet-300/50"> {line.method}</span>
						<span className="text-muted-foreground/70"> {line.path}</span>
						{line.note && (
							<span className="text-muted-foreground/40 italic">
								{" "}
								— {line.note}
							</span>
						)}
					</div>
				))}
				<span className="inline-block h-3.5 w-1.5 animate-pulse bg-violet-300/60" />
			</div>
		</div>
	);
}

export default function Home() {
	const { data: session } = authClient.useSession();
	const router = useRouter();
	const [activeTab, setActiveTab] = useState("sign-in");

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
				className="absolute -top-20 -right-20 h-96 w-96 animate-pulse rounded-full bg-violet-400/10 opacity-50 blur-3xl"
				style={{ animationDuration: "8s" }}
			/>
			<div
				className="absolute top-1/2 -left-48 h-96 w-96 animate-pulse rounded-full bg-violet-400/10 opacity-30 blur-3xl"
				style={{ animationDuration: "12s" }}
			/>

			<header className="relative z-10 border-border/40 border-b px-4 py-6 sm:px-6 lg:px-8">
				<div className="mx-auto flex max-w-7xl flex-col items-center gap-1">
					<h1 className="font-bold text-4xl tracking-tighter">OpenAlbion</h1>
					<p className="text-muted-foreground text-sm">
						An Albion College data portal
					</p>
					<p className="text-muted-foreground/50 text-xs tracking-wide">
						by the EECS Club
					</p>
				</div>
			</header>

			<main className="relative z-10 flex-1 px-4 py-12 sm:px-6 lg:px-8">
				<div className="mx-auto max-w-6xl">
					<div className="grid grid-cols-1 items-start gap-10 md:grid-cols-2 md:gap-12">
						<div>
							<div className="flex">
								{(["sign-in", "sign-up"] as const).map((tab) => (
									<button
										key={tab}
										type="button"
										onClick={() => setActiveTab(tab)}
										className={`relative border border-b-0 px-5 py-2.5 font-medium text-sm transition-colors ${
											activeTab === tab
												? "border-violet-400/30 bg-card/60 text-foreground"
												: "border-transparent text-muted-foreground hover:text-foreground/70"
										}`}
									>
										{tab === "sign-in" ? "Sign In" : "Sign Up"}
										{activeTab === tab && (
											<span className="absolute inset-x-0 -bottom-px h-px bg-card/60" />
										)}
									</button>
								))}
							</div>
							<div className="border border-violet-400/30 bg-card/60 p-8 shadow-lg backdrop-blur-sm">
								{session?.user ? (
									<div className="flex flex-col items-center space-y-5 py-4 text-center">
										<div className="flex h-20 w-20 items-center justify-center rounded-full bg-violet-400 font-bold text-2xl text-white">
											{session.user.name
												? session.user.name.charAt(0).toUpperCase()
												: session.user.email.charAt(0).toUpperCase()}
										</div>
										<h2 className="font-bold text-2xl tracking-tight">
											Welcome,{" "}
											{session.user.name || session.user.email.split("@")[0]}
										</h2>
										<p className="text-muted-foreground text-sm">
											Signed in as {session.user.email}
										</p>
										<Button
											className="bg-violet-400 px-6 text-white hover:bg-violet-500"
											onClick={() => router.push("/dashboard")}
										>
											Go to Dashboard
										</Button>
									</div>
								) : activeTab === "sign-in" ? (
									<SignInForm
										onSwitchToSignUp={() => setActiveTab("sign-up")}
									/>
								) : (
									<SignUpForm
										onSwitchToSignIn={() => setActiveTab("sign-in")}
									/>
								)}
							</div>
						</div>

						<div className="hidden h-80 md:mt-10 md:block">
							<ApiLog />
						</div>
					</div>

					<div className="relative mt-20">
						<h2 className="mb-4 text-center font-bold text-3xl tracking-tight">
							Download Datasets
						</h2>

						<p className="mx-auto mb-8 max-w-2xl text-center text-muted-foreground text-sm">
							Cleaned datasets by the EECS Club. Data sourced from the{" "}
							<Link
								href="https://www.albion.edu/offices/registrar/institutional-data/"
								target="_blank"
								rel="noopener noreferrer"
								className="underline underline-offset-4 hover:text-foreground"
							>
								Albion College Registrar&apos;s Office
							</Link>
							.
						</p>

						<Tabs defaultValue="csv" className="w-full">
							<div className="mb-6 flex justify-center">
								<TabsList>
									<TabsTrigger value="csv">
										<FileSpreadsheet className="mr-2 h-4 w-4" />
										CSV
									</TabsTrigger>
									<TabsTrigger value="json">
										<FileJson className="mr-2 h-4 w-4" />
										JSON
									</TabsTrigger>
									<TabsTrigger value="xml">
										<FileCode className="mr-2 h-4 w-4" />
										XML
									</TabsTrigger>
								</TabsList>
							</div>

							{(["csv", "json", "xml"] as const).map((format) => (
								<TabsContent key={format} value={format} className="mt-4">
									<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
										<Card className="border-border/60 transition-all duration-300 hover:shadow-md">
											<CardHeader>
												<CardTitle>Headcount Data</CardTitle>
												<CardDescription>
													Enrollment demographics by year
												</CardDescription>
											</CardHeader>
											<CardContent>
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
											<CardFooter>
												<Button
													className="w-full bg-violet-400 text-white hover:bg-violet-500"
													onClick={() =>
														handleDownload(`${format}/headcounts.${format}`)
													}
												>
													<Download className="mr-2 h-4 w-4" /> Download
												</Button>
											</CardFooter>
										</Card>

										<Card className="border-border/60 transition-all duration-300 hover:shadow-md">
											<CardHeader>
												<CardTitle>Enrollment Report</CardTitle>
												<CardDescription>
													Enrollment stats across years and programs
												</CardDescription>
											</CardHeader>
											<CardContent>
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
											<CardFooter>
												<Button
													className="w-full bg-violet-400 text-white hover:bg-violet-500"
													onClick={() =>
														handleDownload(`${format}/enrollment.${format}`)
													}
												>
													<Download className="mr-2 h-4 w-4" /> Download
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
