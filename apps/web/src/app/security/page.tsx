import { AlertTriangle, Clock } from "lucide-react";
import Link from "next/link";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SecurityPage() {
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
				<div className="mx-auto max-w-3xl">
					<div className="mb-12 text-center">
						<h2 className="mb-4 font-bold text-3xl tracking-tight">Security</h2>
						<p className="mx-auto max-w-2xl text-muted-foreground">
							The Albion College EECS Club is committed to ensuring the security
							and integrity of the OpenAlbion platform.
						</p>
					</div>

					<Card className="mb-8 border-secondary/20">
						<CardHeader>
							<CardTitle>Reporting</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="mb-6 flex items-start gap-4">
								<AlertTriangle className="mt-1 h-6 w-6 flex-shrink-0 text-secondary" />
								<div>
									<p className="mb-4 text-muted-foreground text-sm">
										If you discover a security vulnerability, please report it
										to us immediately:
									</p>
									<div className="space-y-4">
										<div className="rounded-lg border border-secondary/20 p-4">
											<h4 className="mb-2 font-medium text-sm">Email</h4>
											<p className="text-muted-foreground text-sm">
												Send security concerns to{" "}
												<Link
													href="mailto:security@openalbion.org"
													className="font-bold text-white hover:underline"
												>
													security@openalbion.org
												</Link>{" "}
												with details about the potential vulnerability.
											</p>
										</div>

										<div className="rounded-lg border border-secondary/20 p-4">
											<h4 className="mb-2 font-medium text-sm">
												PGP Encryption
											</h4>
											<p className="text-muted-foreground text-sm">
												For sensitive communications, use our PGP key available
												at{" "}
												<Link
													href="/.well-known/pgp-key.txt"
													className="font-bold text-white hover:underline"
												>
													/.well-known/pgp-key.txt
												</Link>
											</p>
										</div>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>

					<Card className="mb-8 border-secondary/20">
						<CardHeader>
							<CardTitle>Commitment</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="flex items-start gap-4">
								<Clock className="mt-1 h-6 w-6 flex-shrink-0 text-secondary" />
								<div>
									<p className="mb-4 text-muted-foreground text-sm">
										The EECS Club is committed to the following security
										patching guidelines:
									</p>
									<ul className="list-disc space-y-3 pl-5 text-muted-foreground text-sm">
										<li>Acknowledge all security reports within 12 hours</li>
										<li>Patch critical vulnerabilities within 24 hours</li>
										<li>Provide updates on the progress of reported issues</li>
										<li>
											Disclose relevant details to affected users once resolved
										</li>
									</ul>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</main>

			<Footer />
		</div>
	);
}
