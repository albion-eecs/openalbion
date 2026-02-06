"use client";

import Link from "next/link";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export default function ContactPage() {
	return (
		<div className="flex flex-col min-h-screen relative overflow-hidden">
			<div
				className="absolute -top-20 -right-20 w-96 h-96 bg-secondary/10 rounded-full filter blur-3xl opacity-50 animate-pulse"
				style={{ animationDuration: "8s" }}
			/>
			<div
				className="absolute top-1/2 -left-48 w-96 h-96 bg-secondary/10 rounded-full filter blur-3xl opacity-30 animate-pulse"
				style={{ animationDuration: "12s" }}
			/>

			<Header />

			<main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 relative z-10">
				<div className="max-w-4xl mx-auto">
					<h1 className="text-3xl font-bold tracking-tight mb-10 text-center">
						<span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white">
							Contact Us
						</span>
					</h1>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						<div className="space-y-6">
							<div className="mb-6">
								<h2 className="text-xl font-semibold text-foreground inline-block border-b border-secondary/30 pb-2 mb-4">
									Get In Touch
								</h2>
								<p className="text-muted-foreground">
									Have questions about OpenAlbion or need help with the API?
								</p>
							</div>

							<div className="space-y-6">
								<div className="flex items-start p-4 rounded-lg border border-secondary/10 bg-card/20 hover:bg-card/40 transition-colors duration-200">
									<div className="shrink-0 w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center mr-4">
										<span className="text-secondary">@</span>
									</div>
									<div>
										<h3 className="font-semibold text-foreground">Email</h3>
										<p className="text-muted-foreground">
											contact@openalbion.org
										</p>
									</div>
								</div>

								<div className="flex items-start p-4 rounded-lg border border-purple-500/20 bg-card/20 hover:bg-card/40 transition-colors duration-200">
									<div className="shrink-0 w-10 h-10 rounded-full bg-purple-600/30 flex items-center justify-center mr-4">
										<span className="text-purple-300">GH</span>
									</div>
									<div>
										<h3 className="font-semibold text-foreground">GitHub</h3>
										<p>
											<Link
												href="https://github.com/albion-eecs/openalbion"
												className="hover:underline text-purple-300 transition-all duration-300 hover:text-purple-200"
											>
												github.com/albion-eecs/openalbion
											</Link>
										</p>
									</div>
								</div>

								<div className="flex items-start p-4 rounded-lg border border-blue-500/20 bg-card/20 hover:bg-card/40 transition-colors duration-200">
									<div className="shrink-0 w-10 h-10 rounded-full bg-blue-600/30 flex items-center justify-center mr-4">
										<span className="text-blue-300">DC</span>
									</div>
									<div>
										<h3 className="font-semibold text-foreground">Discord</h3>
										<p>
											<Link
												href="https://discord.gg/XcZgWsN6YB"
												className="hover:underline text-blue-300 transition-all duration-300 hover:text-blue-200"
											>
												discord.gg/XcZgWsN6YB
											</Link>
										</p>
									</div>
								</div>
							</div>
						</div>

						<div className="flex items-center">
							<div className="w-full p-6 border border-secondary/20 rounded-lg bg-card/30 backdrop-blur-sm">
								<div className="flex flex-col items-center text-center space-y-4">
									<div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center mb-2">
										<span className="text-secondary text-2xl">+</span>
									</div>
									<h2 className="text-xl font-semibold text-foreground">
										Join the EECS Club
									</h2>
									<p className="text-muted-foreground mb-6">
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
