import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Header() {
	return (
		<header className="relative z-10 border-border/40 border-b px-4 py-6 sm:px-6 lg:px-8">
			<div className="mx-auto flex max-w-7xl items-center justify-between">
				<Link href="/" className="font-bold text-2xl tracking-tighter">
					OpenAlbion
				</Link>
				<Link href="/">
					<Button variant="outline">Back to Home</Button>
				</Link>
			</div>
		</header>
	);
}

export default Header;
