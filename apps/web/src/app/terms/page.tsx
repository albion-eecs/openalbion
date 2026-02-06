import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export default function TermsPage() {
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
					<div className="space-y-6">
						<h1 className="mb-8 border-secondary/20 border-b pb-4 font-bold text-3xl tracking-tight">
							<span className="bg-gradient-to-r from-white to-white bg-clip-text text-transparent">
								Terms of Service
							</span>
						</h1>

						<div className="space-y-8 text-muted-foreground">
							<section className="space-y-4">
								<h2 className="font-semibold text-foreground text-xl">
									Acceptance of Terms
								</h2>
								<p>
									By accessing or using OpenAlbion, you agree to be bound by
									these Terms of Service. If you do not agree to these terms,
									you may not access or use the service.
								</p>
							</section>

							<section className="space-y-4">
								<h2 className="font-semibold text-foreground text-xl">
									Eligibility
								</h2>
								<p>
									OpenAlbion is a project run by the Albion College EECS Club
									and is exclusively available to current students, faculty,
									staff, and alumni of Albion College with valid Albion email
									addresses.
								</p>
							</section>

							<section className="space-y-4">
								<h2 className="font-semibold text-foreground text-xl">
									API Usage
								</h2>
								<p>Users agree to:</p>
								<ul className="list-disc space-y-2 pl-6">
									<li>
										Use the API for academic, research, or educational purposes
										only
									</li>
									<li>
										Not attempt to overwhelm or crash the API (rate limits may
										apply)
									</li>
									<li>Keep API keys secure and not share them with others</li>
									<li>
										Attribute OpenAlbion when using data in publications or
										projects
									</li>
								</ul>
							</section>

							<section className="space-y-4">
								<h2 className="font-semibold text-foreground text-xl">
									Intellectual Property
								</h2>
								<p>
									The data available through OpenAlbion is provided for
									educational and research purposes. Users may use the data for
									academic projects, research, and educational purposes, but may
									not commercialize the raw data without permission.
								</p>
							</section>

							<section className="space-y-4">
								<h2 className="font-semibold text-foreground text-xl">
									Termination
								</h2>
								<p>
									The EECS Club reserves the right to terminate or suspend
									access to the service for users who violate these terms or use
									the service in a manner that could cause harm to the platform,
									interfere with academic research, or negatively impact other
									users.
								</p>
							</section>

							<section className="space-y-4">
								<h2 className="font-semibold text-foreground text-xl">
									Disclaimer of Warranty
								</h2>
								<p>
									OpenAlbion is provided &quot;as is&quot; without warranties of
									any kind, either express or implied. As a student-run project
									by the Albion College EECS Club, we do not guarantee the
									accuracy, completeness, or timeliness of the data.
								</p>
							</section>
						</div>
					</div>
				</div>
			</main>

			<Footer />
		</div>
	);
}
