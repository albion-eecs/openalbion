import { DocsLayout } from "fumadocs-ui/layouts/docs";
import type { ReactNode } from "react";
import { baseOptions } from "@/app/layout.config";
import { source } from "@/lib/source";
import { BookText } from "lucide-react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={source.pageTree}
      {...baseOptions}
      sidebar={{
        tabs: {
          transform: option => {
            if (option.title === "API Reference") {
              const color = "#9561e2";
              return {
                ...option,
                icon: (
                  <div
                    className="rounded-lg p-1.5 shadow-lg ring-2 m-px border [&_svg]:size-5"
                    style={
                      {
                        color,
                        borderColor: `color-mix(in oklab, ${color} 50%, transparent)`,
                        "--tw-ring-color": `color-mix(in oklab, ${color} 20%, transparent)`,
                      } as object
                    }
                  >
                    <BookText />
                  </div>
                ),
              };
            }
            return option;
          },
        },
      }}
    >
      {children}
    </DocsLayout>
  );
}
