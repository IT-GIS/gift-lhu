CREATE TABLE `posts` (
	`id` varchar(36) NOT NULL,
	`title` varchar(255) NOT NULL,
	`slug` varchar(255) NOT NULL,
	`content` longtext NOT NULL,
	`excerpt` text,
	`image_url` varchar(255),
	`category` varchar(191),
	`published_at` datetime NOT NULL,
	`created_at` datetime NOT NULL,
	`updated_at` datetime NOT NULL,
	CONSTRAINT `posts_id` PRIMARY KEY(`id`),
	CONSTRAINT `posts_slug_unique` UNIQUE(`slug`)
);
