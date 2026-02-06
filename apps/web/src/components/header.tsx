"use client";
import Link from "next/link";

import { ModeToggle } from "./mode-toggle";
import UserMenu from "./user-menu";
import { Button } from "@/components/ui/button";

export default function NavBar() {
	const links = [
		{ to: "/", label: "Home" },
		{ to: "/dashboard", label: "Dashboard" },
	] as const;

	return (
		<div>
			<div className="flex flex-row items-center justify-between px-2 py-1">
				<nav className="flex gap-4 text-lg">
					{links.map(({ to, label }) => {
						return (
							<Link key={to} href={to}>
								{label}
							</Link>
						);
					})}
				</nav>
				<div className="flex items-center gap-2">
					<ModeToggle />
					<UserMenu />
				</div>
			</div>
			<hr />
		</div>
	);
}

export function Header() {
	return (
		<header className="py-6 px-4 sm:px-6 lg:px-8 border-b border-secondary/20 relative z-10">
			<div className="max-w-7xl mx-auto flex justify-between items-center">
				<div>
					<Link
						href="/"
						className="text-2xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-white"
					>
						OpenAlbion
					</Link>
				</div>
				<Link href="/">
					<Button
						variant="outline"
						className="border-secondary/40 hover:bg-secondary/10 hover:border-secondary/60"
					>
						Back to Home
					</Button>
				</Link>
			</div>
		</header>
	);
}
