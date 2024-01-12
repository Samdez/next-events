CREATE TABLE `events` (
	`id` text PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`active` integer DEFAULT true,
	`email` text
);
--> statement-breakpoint
CREATE TABLE `users_events` (
	`userId` text NOT NULL,
	`eventCodename` text NOT NULL,
	PRIMARY KEY(`eventCodename`, `userId`),
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`eventCodename`) REFERENCES `events`(`id`) ON UPDATE no action ON DELETE no action
);
