CREATE TABLE `contact_messages` (
	`id` varchar(36) NOT NULL,
	`name` varchar(191) NOT NULL,
	`email` varchar(191) NOT NULL,
	`company` varchar(191),
	`message` text NOT NULL,
	`source_page` varchar(50) NOT NULL DEFAULT 'home',
	`status` enum('new','read') NOT NULL DEFAULT 'new',
	`created_at` datetime NOT NULL,
	CONSTRAINT `contact_messages_id` PRIMARY KEY(`id`)
);
