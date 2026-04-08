CREATE TABLE `pdf_template_layout_versions` (
	`id` varchar(36) NOT NULL,
	`layout_id` varchar(36) NOT NULL,
	`version_number` int NOT NULL,
	`layout_json` json NOT NULL,
	`created_by_user_id` varchar(36) NOT NULL,
	`notes` text,
	`created_at` datetime NOT NULL,
	CONSTRAINT `pdf_template_layout_versions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `pdf_template_layouts` (
	`id` varchar(36) NOT NULL,
	`template_key` varchar(100) NOT NULL,
	`active_version_id` varchar(36),
	`created_at` datetime NOT NULL,
	`updated_at` datetime NOT NULL,
	CONSTRAINT `pdf_template_layouts_id` PRIMARY KEY(`id`),
	CONSTRAINT `pdf_template_layouts_template_key_unique` UNIQUE(`template_key`)
);
--> statement-breakpoint
ALTER TABLE `lhu_attachments` MODIFY COLUMN `file_url` longtext NOT NULL;--> statement-breakpoint
ALTER TABLE `lhu_result_rows` ADD `compressive_strength_kg_cm2` varchar(64);--> statement-breakpoint
ALTER TABLE `lhu_result_rows` ADD `cube_conversion_strength_kg_cm2` varchar(64);