-- Patch untuk database Hostinger yang baru berisi tabel `settings`.
-- Import file ini lewat phpMyAdmin pada database yang sama dengan DATABASE_URL.
-- File ini tidak drop tabel dan tidak menimpa setting yang sudah ada.

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE TABLE IF NOT EXISTS `audit_logs` (
  `id` varchar(36) NOT NULL,
  `user_id` varchar(36),
  `action` varchar(191) NOT NULL,
  `entity_type` varchar(100) NOT NULL,
  `entity_id` varchar(36) NOT NULL,
  `metadata_json` json,
  `created_at` datetime NOT NULL,
  CONSTRAINT `audit_logs_id` PRIMARY KEY(`id`)
);

CREATE TABLE IF NOT EXISTS `customers` (
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

CREATE TABLE IF NOT EXISTS `lhu_attachments` (
  `id` varchar(36) NOT NULL,
  `lhu_document_id` varchar(36) NOT NULL,
  `category` enum('produk','pengujian') NOT NULL,
  `file_url` longtext NOT NULL,
  `file_name` varchar(191) NOT NULL,
  `caption` varchar(255),
  `sort_order` int NOT NULL DEFAULT 0,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  CONSTRAINT `lhu_attachments_id` PRIMARY KEY(`id`)
);

CREATE TABLE IF NOT EXISTS `lhu_documents` (
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

CREATE TABLE IF NOT EXISTS `lhu_result_rows` (
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
  `compressive_strength_kg_cm2` varchar(64),
  `cube_conversion_strength_kg_cm2` varchar(64),
  `failure_pattern` varchar(191),
  `remarks` text,
  `analyst_name` varchar(191),
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  CONSTRAINT `lhu_result_rows_id` PRIMARY KEY(`id`)
);

CREATE TABLE IF NOT EXISTS `lhu_reviews` (
  `id` varchar(36) NOT NULL,
  `lhu_document_id` varchar(36) NOT NULL,
  `reviewer_user_id` varchar(36) NOT NULL,
  `action` enum('review','approve','return_revision','reject') NOT NULL,
  `comment` text,
  `created_at` datetime NOT NULL,
  CONSTRAINT `lhu_reviews_id` PRIMARY KEY(`id`)
);

CREATE TABLE IF NOT EXISTS `lhu_verification_tokens` (
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

CREATE TABLE IF NOT EXISTS `login_attempts` (
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

CREATE TABLE IF NOT EXISTS `pdf_template_layout_versions` (
  `id` varchar(36) NOT NULL,
  `layout_id` varchar(36) NOT NULL,
  `version_number` int NOT NULL,
  `layout_json` json NOT NULL,
  `created_by_user_id` varchar(36) NOT NULL,
  `notes` text,
  `created_at` datetime NOT NULL,
  CONSTRAINT `pdf_template_layout_versions_id` PRIMARY KEY(`id`)
);

CREATE TABLE IF NOT EXISTS `pdf_template_layouts` (
  `id` varchar(36) NOT NULL,
  `template_key` varchar(100) NOT NULL,
  `active_version_id` varchar(36),
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  CONSTRAINT `pdf_template_layouts_id` PRIMARY KEY(`id`),
  CONSTRAINT `pdf_template_layouts_template_key_unique` UNIQUE(`template_key`)
);

CREATE TABLE IF NOT EXISTS `posts` (
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

CREATE TABLE IF NOT EXISTS `sessions` (
  `id` varchar(36) NOT NULL,
  `user_id` varchar(36) NOT NULL,
  `expires_at` datetime NOT NULL,
  `created_at` datetime NOT NULL,
  CONSTRAINT `sessions_id` PRIMARY KEY(`id`)
);

CREATE TABLE IF NOT EXISTS `settings` (
  `id` varchar(36) NOT NULL,
  `setting_key` varchar(191) NOT NULL,
  `setting_value` text NOT NULL,
  `updated_at` datetime NOT NULL,
  CONSTRAINT `settings_id` PRIMARY KEY(`id`),
  CONSTRAINT `settings_setting_key_unique` UNIQUE(`setting_key`)
);

CREATE TABLE IF NOT EXISTS `users` (
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

INSERT INTO users (
  id,
  full_name,
  email,
  password_hash,
  role,
  is_active,
  last_login_at,
  created_at,
  updated_at
)
VALUES
  (
    UUID(),
    'Super Administrator',
    'superadmin@gift-lab.id',
    '$2b$12$aJN4RMQ5dq.pnMFyytjOPuXMDUMIe4HOOkPr.4uXruCEjesI7G2AK',
    'super_admin',
    1,
    NULL,
    NOW(),
    NOW()
  ),
  (
    UUID(),
    'Admin Laboratorium',
    'admin@gift-lab.id',
    '$2b$12$aJN4RMQ5dq.pnMFyytjOPuXMDUMIe4HOOkPr.4uXruCEjesI7G2AK',
    'admin',
    1,
    NULL,
    NOW(),
    NOW()
  ),
  (
    UUID(),
    'Analis Lab',
    'analis@gift-lab.id',
    '$2b$12$aJN4RMQ5dq.pnMFyytjOPuXMDUMIe4HOOkPr.4uXruCEjesI7G2AK',
    'analis',
    1,
    NULL,
    NOW(),
    NOW()
  ),
  (
    UUID(),
    'QA Supervisor',
    'qa@gift-lab.id',
    '$2b$12$aJN4RMQ5dq.pnMFyytjOPuXMDUMIe4HOOkPr.4uXruCEjesI7G2AK',
    'qa',
    1,
    NULL,
    NOW(),
    NOW()
  )
ON DUPLICATE KEY UPDATE
  full_name = VALUES(full_name),
  password_hash = VALUES(password_hash),
  role = VALUES(role),
  is_active = VALUES(is_active),
  updated_at = NOW();

INSERT IGNORE INTO settings (id, setting_key, setting_value, updated_at)
VALUES
  (UUID(), 'company_name', 'PT. Global Inspeksi Forensik Teknik', NOW()),
  (UUID(), 'company_address', 'Jl. Laboratorium No. 1, Jakarta', NOW()),
  (UUID(), 'company_email', 'lab@gift-lab.id', NOW()),
  (UUID(), 'company_phone', '021-00000000', NOW()),
  (UUID(), 'lhu_number_format', 'LHU-BTN/{year}/{sequence}', NOW()),
  (UUID(), 'verification_base_url', 'https://gift-laboratory.com', NOW()),
  (UUID(), 'document_footer', 'Dokumen ini sah apabila diverifikasi pada halaman publik resmi laboratorium.', NOW());

COMMIT;
