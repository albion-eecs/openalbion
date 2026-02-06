import Link from "next/link";

export function Footer() {
	return (
		<footer className="py-6 px-4 md:px-6 lg:px-8 border-t border-border/40 w-full">
			<div className="w-full max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
				<div className="flex items-center gap-2">
					<span className="bg-clip-text text-transparent bg-gradient-to-r from-secondary to-primary font-semibold">
						OpenAlbion
					</span>
					<span className="text-sm text-muted-foreground">
						{new Date().getFullYear()} &copy; Albion College EECS Club
					</span>
				</div>
				<div className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm">
					<Link
						href="/security"
						className="text-muted-foreground hover:text-white/90 transition-colors duration-200"
					>
						Security
					</Link>
					<Link
						href="/privacy"
						className="text-muted-foreground hover:text-white/90 transition-colors duration-200"
					>
						Privacy
					</Link>
					<Link
						href="/terms"
						className="text-muted-foreground hover:text-white/90 transition-colors duration-200"
					>
						Terms
					</Link>
					<Link
						href="/contact"
						className="text-muted-foreground hover:text-white/90 transition-colors duration-200"
					>
						Contact
					</Link>
					<Link
						href="/changelog"
						className="text-muted-foreground hover:text-white/90 transition-colors duration-200"
					>
						Changelog
					</Link>
					<Link
						href="https://docs.openalbion.org"
						className="text-muted-foreground hover:text-white/90 transition-colors duration-200"
					>
						API Docs
					</Link>
				</div>
			</div>
		</footer>
	);
}
