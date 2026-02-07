import { Timeline } from "@/components/changelog";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export default function Changelog() {
	const changelogEntries = [
		{
			title: "The First Major Release!",
			version: "v1.0.0",
			date: "Spring 2026",
			items: [],
		},
		{
			title: "Miscellaneous Fixes and Standardization",
			version: "v0.4.0",
			date: "Summer 2025",
			items: [
				"Added a couple of public assets",
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
				"Refactored authentication to use a simple email and password",
				"Added the EECS Club's Discord server to contact information",
				"Fixed route-related ESLint issues",
				"Resolved miscellaneous type errors",
			],
		},
		{
			title: "UI & Infrastructure Updates",
			version: "v0.2.0",
			date: "March 26, 2025",
			items: [
				"Added robots.txt and sitemaps",
				"Added the EECS Club's PGP key",
				"UI changes including theme adjustments and a logo upgrade",
			],
		},
		{
			title: "Initial Release",
			version: "v0.1.0",
			date: "March 14, 2025",
			items: [
				"Basic authentication with @albion.edu email domains",
				"Initial API documentation and endpoints",
				"Early Dashboard",
			],
		},
	];

	return (
		<div className="relative flex min-h-screen flex-col overflow-hidden">
			<Header />

			<main className="relative z-10 flex-1 px-4 py-12 sm:px-6 lg:px-8">
				<div className="mx-auto max-w-3xl">
					<h1 className="mb-10 text-center font-bold text-3xl tracking-tighter">
						Changelog
					</h1>

					<Timeline entries={changelogEntries} />
				</div>
			</main>

			<Footer />
		</div>
	);
}
