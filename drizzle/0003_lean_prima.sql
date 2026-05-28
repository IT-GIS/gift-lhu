CREATE TABLE `login_attempts` (
	`id` varchar(36) NOT NULL,
	`attempt_key` varchar(64) NOT NULL,
	`email` varchar(191) NOT NULL,
	`ip_address` varchar(64) NOT NULL,
	`failed_count` int NOT NULL DEFAULT 0,
	`first_failed_at` datetime NOT NULL,
	`last_failed_at` datetime NOT NULL,
	`locked_until` datetime,
	`created_at` datetime NOT NULL,
	`updated_at` datetime NOT NULL,
	CONSTRAINT `login_attempts_id` PRIMARY KEY(`id`),
	CONSTRAINT `login_attempts_attempt_key_unique` UNIQUE(`attempt_key`)
);
