"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./mode-toggle";
import UserMenu from "./user-menu";

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
		<header className="relative z-10 border-secondary/20 border-b px-4 py-6 sm:px-6 lg:px-8">
			<div className="mx-auto flex max-w-7xl items-center justify-between">
				<div>
					<Link
						href="/"
						className="bg-gradient-to-r from-white to-white bg-clip-text font-bold text-2xl text-transparent tracking-tighter"
					>
						OpenAlbion
					</Link>
				</div>
				<Link href="/">
					<Button
						variant="outline"
						className="border-secondary/40 hover:border-secondary/60 hover:bg-secondary/10"
					>
						Back to Home
					</Button>
				</Link>
			</div>
		</header>
	);
}
