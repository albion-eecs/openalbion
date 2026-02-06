import Link from "next/link";

export function Footer() {
	return (
		<footer className="w-full border-border/40 border-t px-4 py-6 md:px-6 lg:px-8">
			<div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
				<div className="flex items-center gap-2">
					<span className="bg-gradient-to-r from-secondary to-primary bg-clip-text font-semibold text-transparent">
						OpenAlbion
					</span>
					<span className="text-muted-foreground text-sm">
						{new Date().getFullYear()} &copy; Albion College EECS Club
					</span>
				</div>
				<div className="flex flex-wrap justify-center gap-4 text-sm md:gap-6">
					<Link
						href="/security"
						className="text-muted-foreground transition-colors duration-200 hover:text-white/90"
					>
						Security
					</Link>
					<Link
						href="/privacy"
						className="text-muted-foreground transition-colors duration-200 hover:text-white/90"
					>
						Privacy
					</Link>
					<Link
						href="/terms"
						className="text-muted-foreground transition-colors duration-200 hover:text-white/90"
					>
						Terms
					</Link>
					<Link
						href="/contact"
						className="text-muted-foreground transition-colors duration-200 hover:text-white/90"
					>
						Contact
					</Link>
					<Link
						href="/changelog"
						className="text-muted-foreground transition-colors duration-200 hover:text-white/90"
					>
						Changelog
					</Link>
					<Link
						href="https://docs.openalbion.org"
						className="text-muted-foreground transition-colors duration-200 hover:text-white/90"
					>
						API Docs
					</Link>
				</div>
			</div>
		</footer>
	);
}
