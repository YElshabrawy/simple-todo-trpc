CREATE TABLE `trpc-demo_post` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text(256),
	`created_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updatedAt` integer
);
--> statement-breakpoint
CREATE TABLE `trpc-demo_todo` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`content` text(256),
	`done` integer DEFAULT false
);
--> statement-breakpoint
CREATE INDEX `name_idx` ON `trpc-demo_post` (`name`);