import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export default function Privacy() {
	return (
		<div className="relative flex min-h-screen flex-col overflow-hidden">
			<Header />

			<main className="relative z-10 flex-1 px-4 py-12 sm:px-6 lg:px-8">
				<div className="mx-auto max-w-3xl">
					<h1 className="mb-4 text-center font-bold text-3xl tracking-tighter">
						Privacy Policy
					</h1>
					<p className="mb-12 text-center text-muted-foreground">
						How OpenAlbion collects, uses, and protects your information.
					</p>

					<div className="space-y-8 text-muted-foreground">
						<section className="space-y-4">
							<h2 className="font-semibold text-foreground text-xl tracking-tight">
								Information We Collect
							</h2>
							<p className="text-sm">
								OpenAlbion, maintained by the Albion College EECS Club, collects
								information necessary to provide access to research data. This
								includes authentication information (Albion email address and
								password), API usage statistics, and log data.
							</p>
						</section>

						<section className="space-y-4">
							<h2 className="font-semibold text-foreground text-xl tracking-tight">
								How We Use Your Information
							</h2>
							<p className="text-sm">
								The information we collect is used to authenticate and authorize
								access to OpenAlbion's research data, monitor API usage, and
								maintain OpenAlbion's functionality.
							</p>
						</section>

						<section className="space-y-4">
							<h2 className="font-semibold text-foreground text-xl tracking-tight">
								Data Retention
							</h2>
							<p className="text-sm">
								OpenAlbion retains user data only as long as needed. Usage logs
								may be retained for a period up to 12 months for testing or
								research.
							</p>
						</section>

						<section className="space-y-4">
							<h2 className="font-semibold text-foreground text-xl tracking-tight">
								Updates to This Policy
							</h2>
							<p className="text-sm">
								This privacy policy may be updated periodically as the EECS Club
								continues to change OpenAlbion.
							</p>
						</section>
					</div>
				</div>
			</main>

			<Footer />
		</div>
	);
}
