import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export default function Terms() {
	return (
		<div className="relative flex min-h-screen flex-col overflow-hidden">
			<Header />

			<main className="relative z-10 flex-1 px-4 py-12 sm:px-6 lg:px-8">
				<div className="mx-auto max-w-3xl">
					<h1 className="mb-4 text-center font-bold text-3xl tracking-tighter">
						Terms of Service
					</h1>
					<p className="mb-12 text-center text-muted-foreground">
						By accessing or using OpenAlbion, you agree to be bound by these
						terms.
					</p>

					<div className="space-y-8 text-muted-foreground">
						<section className="space-y-4">
							<h2 className="font-semibold text-foreground text-xl tracking-tight">
								Eligibility
							</h2>
							<p className="text-sm">
								OpenAlbion is a project run by the Albion College EECS Club and
								is exclusively available to current students, faculty, staff,
								and alumni of Albion College with valid Albion email addresses.
							</p>
						</section>

						<section className="space-y-4">
							<h2 className="font-semibold text-foreground text-xl tracking-tight">
								API Usage
							</h2>
							<p className="text-sm">
								Users agree to use the API for academic, research, or
								educational purposes only. Do not attempt to overwhelm or crash
								the API in a malicious way. Attribute OpenAlbion when using data
								in publications or projects.
							</p>
						</section>

						<section className="space-y-4">
							<h2 className="font-semibold text-foreground text-xl tracking-tight">
								Intellectual Property
							</h2>
							<p className="text-sm">
								The data available through OpenAlbion is provided for
								educational and research purposes. Users may not commercialize
								the raw data without permission of Albion College.
							</p>
						</section>

						<section className="space-y-4">
							<h2 className="font-semibold text-foreground text-xl tracking-tight">
								Termination
							</h2>
							<p className="text-sm">
								The EECS Club reserves the right to terminate or suspend access
								to the service for users who violate these terms or use the
								service in a manner that could cause harm to the website and/or
								interfere with academic research.
							</p>
						</section>

						<section className="space-y-4">
							<h2 className="font-semibold text-foreground text-xl tracking-tight">
								Disclaimer
							</h2>
							<p className="text-sm">
								OpenAlbion is provided &quot;as is&quot; without warranties of
								any kind, either express or implied. As a student-run project by
								the Albion College EECS Club, we do not guarantee the accuracy,
								completeness, or timeliness of the data.
							</p>
						</section>
					</div>
				</div>
			</main>

			<Footer />
		</div>
	);
}
