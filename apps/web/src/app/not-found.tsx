import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export default function NotFound() {
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
				<div className="mx-auto max-w-2xl text-center">
					<h1 className="mb-6 font-bold text-5xl tracking-tight md:text-7xl">
						<span className="bg-gradient-to-r from-white to-secondary bg-clip-text text-transparent">
							404
						</span>
					</h1>
					<h2 className="mb-4 font-semibold text-2xl md:text-3xl">
						Page Not Found
					</h2>
					<p className="mb-8 text-lg text-muted-foreground">
						Sorry, the page you&apos;re looking for doesn&apos;t exist or has
						been moved.
					</p>
				</div>
			</main>

			<Footer />
		</div>
	);
}
