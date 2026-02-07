import { HomeLayout } from "fumadocs-ui/layouts/home";

import { baseOptions } from "@/lib/layout.shared";

export default function Layout({ children }: LayoutProps<"/">) {
	return (
		<HomeLayout
			{...baseOptions()}
			style={
				{
					"--spacing-fd-container": "1120px",
				} as object
			}
			links={[
				{
					text: "Documentation",
					url: "/docs/api",
				},
			]}
		>
			{children}
		</HomeLayout>
	);
}
