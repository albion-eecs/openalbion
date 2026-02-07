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
			<div
				className="absolute top-[0.80rem] left-0 h-3 w-3 rounded-full bg-violet-400"
				style={{ transform: "translateX(-50%)" }}
			/>

			<div className="flex items-center gap-3">
				<h2 className="font-semibold text-lg tracking-tight">{title}</h2>
				<span className="font-mono text-muted-foreground text-xs">
					{version}
				</span>
			</div>

			<time className="mt-1 block text-muted-foreground text-sm">{date}</time>

			<ul className="mt-3 space-y-1.5 text-muted-foreground text-sm">
				{items.map((item, index) => (
					<li key={index} className="flex items-start gap-2">
						<span className="text-violet-400">•</span>
						<span>{item}</span>
					</li>
				))}
			</ul>
		</div>
	);
}

interface ChangelogTimelineProps {
	entries: ChangelogEntryProps[];
}

export function Timeline({ entries }: ChangelogTimelineProps) {
	return (
		<div className="relative">
			<div className="absolute top-0 bottom-0 left-4 w-px bg-violet-400/20" />

			<div className="ml-4 space-y-10 pt-6 pb-6">
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
