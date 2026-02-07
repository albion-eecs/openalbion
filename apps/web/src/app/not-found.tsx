import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export default function NotFound() {
	return (
		<div className="relative flex min-h-screen flex-col overflow-hidden">
			<Header />

			<main className="relative z-10 flex-1 px-4 py-12 sm:px-6 lg:px-8">
				<div className="mx-auto max-w-2xl text-center">
					<h1 className="mb-6 font-bold text-5xl tracking-tight md:text-7xl">
						404
					</h1>
					<h2 className="mb-4 font-semibold text-2xl md:text-3xl">
						Page Not Found
					</h2>
					<p className="mb-8 text-lg text-muted-foreground">
						This page doesn&apos;t exist.
					</p>
				</div>
			</main>

			<Footer />
		</div>
	);
}
