import React from "react";

interface ChangelogEntryProps {
  title: string;
  version: string;
  date: string;
  items: string[];
}

export const ChangelogEntry: React.FC<ChangelogEntryProps> = ({
  title,
  version,
  date,
  items,
}) => {
  return (
    <div className="relative pl-10">
      <div className="flex items-center gap-4">
        <div
          className="absolute left-0 top-[0.80rem] w-3 h-3 rounded-full bg-secondary"
          style={{ transform: "translateX(-50%)" }}
        ></div>

        <h2 className="text-xl font-semibold text-white">{title}</h2>
        <div className="px-3 py-1.5 rounded-md text-sm font-medium bg-secondary/30 text-white border-2 border-secondary/60 shadow-[0_0_10px_rgba(168,85,247,0.3)] transition-all">
          {version}
        </div>
      </div>

      <time className="text-sm text-muted-foreground mt-1 block">{date}</time>

      <div className="mt-4 p-4 rounded-lg border border-secondary/10 bg-card/20">
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
};

interface ChangelogTimelineProps {
  entries: ChangelogEntryProps[];
}

export const Changelog: React.FC<ChangelogTimelineProps> = ({ entries }) => {
  return (
    <div className="relative">
      <div className="absolute left-4 top-0 bottom-0 w-px bg-secondary/30"></div>

      {/* Entries */}
      <div className="space-y-8 ml-4 pt-6 pb-6">
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
};
