CREATE TABLE `audit_logs` (
	`id` varchar(36) NOT NULL,
	`user_id` varchar(36),
	`action` varchar(191) NOT NULL,
	`entity_type` varchar(100) NOT NULL,
	`entity_id` varchar(36) NOT NULL,
	`metadata_json` json,
	`created_at` datetime NOT NULL,
	CONSTRAINT `audit_logs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `customers` (
	`id` varchar(36) NOT NULL,
	`company_name` varchar(191) NOT NULL,
	`contact_name` varchar(191),
	`phone` varchar(64),
	`email` varchar(191),
	`address` text,
	`created_at` datetime NOT NULL,
	`updated_at` datetime NOT NULL,
	CONSTRAINT `customers_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `lhu_attachments` (
	`id` varchar(36) NOT NULL,
	`lhu_document_id` varchar(36) NOT NULL,
	`category` enum('produk','pengujian') NOT NULL,
	`file_url` varchar(512) NOT NULL,
	`file_name` varchar(191) NOT NULL,
	`caption` varchar(255),
	`sort_order` int NOT NULL DEFAULT 0,
	`created_at` datetime NOT NULL,
	`updated_at` datetime NOT NULL,
	CONSTRAINT `lhu_attachments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `lhu_documents` (
	`id` varchar(36) NOT NULL,
	`document_code` varchar(100) NOT NULL,
	`lhu_number` varchar(100),
	`customer_id` varchar(36) NOT NULL,
	`project_name` varchar(191) NOT NULL,
	`project_address` text NOT NULL,
	`reference_number` varchar(100) NOT NULL,
	`test_type` varchar(100) NOT NULL DEFAULT 'Kuat Tekan Beton',
	`concrete_type` enum('silinder','kubus') NOT NULL,
	`status` enum('draft','input_hasil','review','revisi','approved','published','revoked') NOT NULL DEFAULT 'draft',
	`received_date` datetime NOT NULL,
	`testing_date` datetime NOT NULL,
	`notes` text,
	`approval_notes` text,
	`published_at` datetime,
	`revoked_at` datetime,
	`revoked_reason` text,
	`approved_by_user_id` varchar(36),
	`created_by_user_id` varchar(36) NOT NULL,
	`updated_by_user_id` varchar(36),
	`created_at` datetime NOT NULL,
	`updated_at` datetime NOT NULL,
	CONSTRAINT `lhu_documents_id` PRIMARY KEY(`id`),
	CONSTRAINT `lhu_documents_document_code_unique` UNIQUE(`document_code`)
);
--> statement-breakpoint
CREATE TABLE `lhu_result_rows` (
	`id` varchar(36) NOT NULL,
	`lhu_document_id` varchar(36) NOT NULL,
	`row_number` int NOT NULL,
	`sample_code` varchar(100) NOT NULL,
	`casting_date` datetime NOT NULL,
	`testing_date` datetime NOT NULL,
	`age_days` int NOT NULL,
	`weight` varchar(64),
	`dimension` varchar(100),
	`max_load` varchar(64),
	`compressive_strength` varchar(64),
	`failure_pattern` varchar(191),
	`remarks` text,
	`analyst_name` varchar(191),
	`created_at` datetime NOT NULL,
	`updated_at` datetime NOT NULL,
	CONSTRAINT `lhu_result_rows_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `lhu_reviews` (
	`id` varchar(36) NOT NULL,
	`lhu_document_id` varchar(36) NOT NULL,
	`reviewer_user_id` varchar(36) NOT NULL,
	`action` enum('review','approve','return_revision','reject') NOT NULL,
	`comment` text,
	`created_at` datetime NOT NULL,
	CONSTRAINT `lhu_reviews_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `lhu_verification_tokens` (
	`id` varchar(36) NOT NULL,
	`lhu_document_id` varchar(36) NOT NULL,
	`public_token` varchar(191) NOT NULL,
	`is_active` boolean NOT NULL DEFAULT true,
	`revoked_reason` text,
	`created_at` datetime NOT NULL,
	`updated_at` datetime NOT NULL,
	CONSTRAINT `lhu_verification_tokens_id` PRIMARY KEY(`id`),
	CONSTRAINT `lhu_verification_tokens_public_token_unique` UNIQUE(`public_token`)
);
--> statement-breakpoint
CREATE TABLE `sessions` (
	`id` varchar(36) NOT NULL,
	`user_id` varchar(36) NOT NULL,
	`expires_at` datetime NOT NULL,
	`created_at` datetime NOT NULL,
	CONSTRAINT `sessions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `settings` (
	`id` varchar(36) NOT NULL,
	`setting_key` varchar(191) NOT NULL,
	`setting_value` text NOT NULL,
	`updated_at` datetime NOT NULL,
	CONSTRAINT `settings_id` PRIMARY KEY(`id`),
	CONSTRAINT `settings_setting_key_unique` UNIQUE(`setting_key`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` varchar(36) NOT NULL,
	`full_name` varchar(191) NOT NULL,
	`email` varchar(191) NOT NULL,
	`password_hash` varchar(255) NOT NULL,
	`role` enum('super_admin','admin','frontdesk','analis','qa','viewer') NOT NULL,
	`is_active` boolean NOT NULL DEFAULT true,
	`last_login_at` datetime,
	`created_at` datetime NOT NULL,
	`updated_at` datetime NOT NULL,
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`)
);
