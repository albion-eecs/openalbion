import Link from "next/link";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export default function Contact() {
	return (
		<div className="relative flex min-h-screen flex-col overflow-hidden">
			<Header />

			<main className="relative z-10 flex-1 px-4 py-12 sm:px-6 lg:px-8">
				<div className="mx-auto max-w-3xl">
					<h1 className="mb-10 text-center font-bold text-3xl tracking-tighter">
						Contact
					</h1>

					<div className="space-y-4">
						<div className="flex items-start rounded-lg border border-border/40 bg-card/60 p-4">
							<div className="mr-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted font-mono text-sm">
								@
							</div>
							<div>
								<h3 className="font-semibold">Email</h3>
								<p className="font-mono text-muted-foreground text-sm">
									contact@openalbion.org
								</p>
							</div>
						</div>

						<div
							className="flex items-start rounded-lg border border-purple-500/20 bg-card/60 p-4"
							style={{
								boxShadow: "0 4px 20px -5px rgba(168, 85, 247, 0.25)",
							}}
						>
							<div
								className="mr-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-600/30"
								style={{ boxShadow: "0 0 15px rgba(168, 85, 247, 0.4)" }}
							>
								<svg
									viewBox="0 0 24 24"
									fill="currentColor"
									className="h-5 w-5 text-purple-300"
									role="img"
									aria-label="GitHub"
								>
									<title>GitHub</title>
									<path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
								</svg>
							</div>
							<div>
								<h3 className="font-semibold">GitHub</h3>
								<p className="text-sm">
									<Link
										href="https://github.com/albion-eecs/openalbion"
										className="font-mono text-purple-300 underline-offset-4 transition-all duration-300 hover:text-purple-200 hover:underline"
									>
										github.com/albion-eecs/openalbion
									</Link>
								</p>
							</div>
						</div>

						<div
							className="flex items-start rounded-lg border border-blue-500/20 bg-card/60 p-4"
							style={{
								boxShadow: "0 4px 20px -5px rgba(59, 130, 246, 0.25)",
							}}
						>
							<div
								className="mr-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600/30"
								style={{ boxShadow: "0 0 15px rgba(59, 130, 246, 0.4)" }}
							>
								<svg
									viewBox="0 0 24 24"
									fill="currentColor"
									className="h-5 w-5 text-blue-300"
									role="img"
									aria-label="Discord"
								>
									<title>Discord</title>
									<path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03ZM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.956 2.418-2.157 2.418Zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.946 2.418-2.157 2.418Z" />
								</svg>
							</div>
							<div>
								<h3 className="font-semibold">Discord</h3>
								<p className="text-sm">
									<Link
										href="https://discord.gg/XcZgWsN6YB"
										className="font-mono text-blue-300 underline-offset-4 transition-all duration-300 hover:text-blue-200 hover:underline"
									>
										discord.gg/XcZgWsN6YB
									</Link>
								</p>
							</div>
						</div>
					</div>

					<div className="mt-10 rounded-lg border border-border/40 bg-card/60 p-6 text-center">
						<h2 className="font-semibold text-xl tracking-tight">
							Join the EECS Club
						</h2>
						<p className="mt-2 text-muted-foreground text-sm">
							Open to all students who like to learn.
							<br />
							(primarily in cs and engineering, but don't let that stop you,
							these fields have the unique ability to combine a myriad of other
							seemingly disparate fields)
						</p>
					</div>
				</div>
			</main>

			<Footer />
		</div>
	);
}
