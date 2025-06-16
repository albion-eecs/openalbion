CREATE TABLE `academic_years` (
	`id` integer PRIMARY KEY NOT NULL,
	`year` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `academic_years_year_unique` ON `academic_years` (`year`);--> statement-breakpoint
CREATE TABLE `enrollment` (
	`id` integer PRIMARY KEY NOT NULL,
	`academic_year_id` integer NOT NULL,
	`dimension` text NOT NULL,
	`primary_category` text NOT NULL,
	`secondary_category` text NOT NULL,
	`value` integer NOT NULL,
	FOREIGN KEY (`academic_year_id`) REFERENCES `academic_years`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `headcounts` (
	`year` integer PRIMARY KEY NOT NULL,
	`count` integer NOT NULL
);
