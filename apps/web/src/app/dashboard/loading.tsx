export default function Loading() {
	return (
		<div className="flex min-h-screen items-center justify-center">
			<div className="flex flex-col items-center space-y-4">
				<div className="h-12 w-12 animate-spin rounded-full border-secondary border-b-2" />
				<p className="text-muted-foreground">Loading dashboard...</p>
			</div>
		</div>
	);
}
