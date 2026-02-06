"use client";

import Link from "next/link";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export default function ContactPage() {
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

			<Header />

			<main className="relative z-10 flex-1 px-4 py-12 sm:px-6 lg:px-8">
				<div className="mx-auto max-w-4xl">
					<h1 className="mb-10 text-center font-bold text-3xl tracking-tight">
						<span className="bg-gradient-to-r from-white to-white bg-clip-text text-transparent">
							Contact Us
						</span>
					</h1>

					<div className="grid grid-cols-1 gap-8 md:grid-cols-2">
						<div className="space-y-6">
							<div className="mb-6">
								<h2 className="mb-4 inline-block border-secondary/30 border-b pb-2 font-semibold text-foreground text-xl">
									Get In Touch
								</h2>
								<p className="text-muted-foreground">
									Have questions about OpenAlbion or need help with the API?
								</p>
							</div>

							<div className="space-y-6">
								<div className="flex items-start rounded-lg border border-secondary/10 bg-card/20 p-4 transition-colors duration-200 hover:bg-card/40">
									<div className="mr-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary/20">
										<span className="text-secondary">@</span>
									</div>
									<div>
										<h3 className="font-semibold text-foreground">Email</h3>
										<p className="text-muted-foreground">
											contact@openalbion.org
										</p>
									</div>
								</div>

								<div className="flex items-start rounded-lg border border-purple-500/20 bg-card/20 p-4 transition-colors duration-200 hover:bg-card/40">
									<div className="mr-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-600/30">
										<span className="text-purple-300">GH</span>
									</div>
									<div>
										<h3 className="font-semibold text-foreground">GitHub</h3>
										<p>
											<Link
												href="https://github.com/albion-eecs/openalbion"
												className="text-purple-300 transition-all duration-300 hover:text-purple-200 hover:underline"
											>
												github.com/albion-eecs/openalbion
											</Link>
										</p>
									</div>
								</div>

								<div className="flex items-start rounded-lg border border-blue-500/20 bg-card/20 p-4 transition-colors duration-200 hover:bg-card/40">
									<div className="mr-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600/30">
										<span className="text-blue-300">DC</span>
									</div>
									<div>
										<h3 className="font-semibold text-foreground">Discord</h3>
										<p>
											<Link
												href="https://discord.gg/XcZgWsN6YB"
												className="text-blue-300 transition-all duration-300 hover:text-blue-200 hover:underline"
											>
												discord.gg/XcZgWsN6YB
											</Link>
										</p>
									</div>
								</div>
							</div>
						</div>

						<div className="flex items-center">
							<div className="w-full rounded-lg border border-secondary/20 bg-card/30 p-6 backdrop-blur-sm">
								<div className="flex flex-col items-center space-y-4 text-center">
									<div className="mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-secondary/20">
										<span className="text-2xl text-secondary">+</span>
									</div>
									<h2 className="font-semibold text-foreground text-xl">
										Join the EECS Club
									</h2>
									<p className="mb-6 text-muted-foreground">
										The EECS Club welcomes any and all students interested in
										engineering, computer science, data science, and research
										projects.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>

			<Footer />
		</div>
	);
}
