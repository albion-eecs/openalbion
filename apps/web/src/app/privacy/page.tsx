import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export default function PrivacyPage() {
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
								Privacy Policy
							</span>
						</h1>

						<div className="space-y-8 text-muted-foreground">
							<section className="space-y-4">
								<h2 className="font-semibold text-foreground text-xl">
									Information We Collect
								</h2>
								<p>
									OpenAlbion, maintained by the Albion College EECS Club,
									collects information necessary to provide access to research
									data. This includes:
								</p>
								<ul className="list-disc space-y-2 pl-6">
									<li>
										Authentication information (Albion email address and
										password)
									</li>
									<li>API usage statistics</li>
									<li>Log data for security and troubleshooting purposes</li>
								</ul>
							</section>

							<section className="space-y-4">
								<h2 className="font-semibold text-foreground text-xl">
									How We Use Your Information
								</h2>
								<p>The information we collect is used to:</p>
								<ul className="list-disc space-y-2 pl-6">
									<li>Authenticate and authorize access to research data</li>
									<li>Monitor API usage for fair use and capacity planning</li>
									<li>Improve the platform and troubleshoot issues</li>
									<li>Communicate important updates about the service</li>
								</ul>
							</section>

							<section className="space-y-4">
								<h2 className="font-semibold text-foreground text-xl">
									Data Retention
								</h2>
								<p>
									OpenAlbion retains user data for as long as necessary to
									provide the service. Usage logs may be retained for up to 12
									months for security, troubleshooting, and academic research
									purposes.
								</p>
							</section>

							<section className="space-y-4">
								<h2 className="font-semibold text-foreground text-xl">
									Data Security
								</h2>
								<p>
									We implement appropriate security measures to protect user
									information. API keys should be kept confidential and not
									shared with others.
								</p>
							</section>

							<section className="space-y-4">
								<h2 className="font-semibold text-foreground text-xl">
									Updates to This Policy
								</h2>
								<p>
									This privacy policy may be updated periodically as the EECS
									Club continues to improve the platform. We will notify users
									of significant changes by email or through the platform.
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
