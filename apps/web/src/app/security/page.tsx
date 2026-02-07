import Link from "next/link";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export default function Security() {
	return (
		<div className="relative flex min-h-screen flex-col overflow-hidden">
			<Header />

			<main className="relative z-10 flex-1 px-4 py-12 sm:px-6 lg:px-8">
				<div className="mx-auto max-w-3xl">
					<h1 className="mb-4 text-center font-bold text-3xl tracking-tighter">
						Security
					</h1>
					<p className="mb-12 text-center text-muted-foreground">
						The Albion College EECS Club takes the security of our
						infrastructure very seriously!
					</p>

					<div className="space-y-8 text-muted-foreground">
						<section className="space-y-4">
							<h2 className="font-semibold text-foreground text-xl tracking-tight">
								Reporting
							</h2>
							<p className="text-sm">
								If you discover a security vulnerability, please report it to
								us. Email us at{" "}
								<Link
									href="mailto:security@openalbion.org"
									className="font-bold font-mono text-foreground hover:underline"
								>
									security@openalbion.org
								</Link>{" "}
								with reproduction steps and any information. We'll get back to
								you relatively quickly.
							</p>
							<p className="text-sm">
								For especially sensitive reports, use our PGP key available at{" "}
								<a
									href="/.well-known/pgp-key.txt"
									className="font-bold font-mono text-foreground hover:underline"
								>
									/.well-known/pgp-key.txt
								</a>
							</p>
						</section>
					</div>
				</div>
			</main>

			<Footer />
		</div>
	);
}
