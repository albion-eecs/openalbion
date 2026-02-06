interface ChangelogEntryProps {
	title: string;
	version: string;
	date: string;
	items: string[];
}

export function ChangelogEntry({
	title,
	version,
	date,
	items,
}: ChangelogEntryProps) {
	return (
		<div className="relative pl-10">
			<div className="flex items-center gap-4">
				<div
					className="absolute top-[0.80rem] left-0 h-3 w-3 rounded-full bg-secondary"
					style={{ transform: "translateX(-50%)" }}
				/>

				<h2 className="font-semibold text-white text-xl">{title}</h2>
				<div className="rounded-md border-2 border-secondary/60 bg-secondary/30 px-3 py-1.5 font-medium text-sm text-white shadow-[0_0_10px_rgba(168,85,247,0.3)] transition-all">
					{version}
				</div>
			</div>

			<time className="mt-1 block text-muted-foreground text-sm">{date}</time>

			<div className="mt-4 rounded-lg border border-secondary/10 bg-card/20 p-4">
				<ul className="space-y-3 text-muted-foreground">
					{items.map((item, index) => (
						<li key={index} className="flex items-start gap-2">
							<span className="text-secondary">•</span>
							<span>{item}</span>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}

interface ChangelogTimelineProps {
	entries: ChangelogEntryProps[];
}

export function Changelog({ entries }: ChangelogTimelineProps) {
	return (
		<div className="relative">
			<div className="absolute top-0 bottom-0 left-4 w-px bg-secondary/30" />

			<div className="ml-4 space-y-8 pt-6 pb-6">
				{entries.map((entry, index) => (
					<ChangelogEntry
						key={index}
						title={entry.title}
						version={entry.version}
						date={entry.date}
						items={entry.items}
					/>
				))}
			</div>
		</div>
	);
}
