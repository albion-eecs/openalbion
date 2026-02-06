import { Changelog } from "@/components/changelog";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export default function ChangelogPage() {
	const changelogEntries = [
		{
			title: "Miscellaneous Fixes and Standardization",
			version: "v0.4.0",
			date: "March 27, 2025",
			items: [
				"Refactored environment variables and path authentication",
				"Improved component standards and reusability",
				"Updated public assets and folder structure",
				"Added new cleaned dataset types (json, xml)",
				"Fixed robots.txt and sitemaps TLD issues",
				"Fixed authentication UI input registration bug",
			],
		},
		{
			title: "Authentication",
			version: "v0.3.0",
			date: "March 27, 2025",
			items: [
				"Updated to latest Next.js version",
				"Refactored authentication to use email and password",
				"Simplified security page",
				"Fixed footer responsiveness issues",
				"Added Discord server contact information",
				"Fixed route-related ESLint issues",
				"Resolved miscellaneous type errors",
				"Fixed dashboard available APIs card error",
			],
		},
		{
			title: "UI & Infrastructure Updates",
			version: "v0.2.0",
			date: "March 26, 2025",
			items: [
				"Updated documentation code block styling",
				"Added robots.txt and sitemaps",
				"Added PGP key",
				"UI enhancements including theme adjustments and logo upgrade",
				"Switched to Roboto Slab font",
				"Improved deployment configuration and database setup",
			],
		},
		{
			title: "Initial Release",
			version: "v0.1.0",
			date: "March 14, 2025",
			items: [
				"Launched research data portal for Albion College students, faculty, and alumni",
				"Basic authentication with @albion.edu email domains",
				"Released initial API documentation and endpoints",
				"Early Dashboard implementation",
			],
		},
	];

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
					<h1 className="mb-10 text-center font-bold text-3xl tracking-tight">
						<span className="bg-gradient-to-r from-white to-white bg-clip-text text-transparent">
							Changelog
						</span>
					</h1>

					<Changelog entries={changelogEntries} />
				</div>
			</main>

			<Footer />
		</div>
	);
}
