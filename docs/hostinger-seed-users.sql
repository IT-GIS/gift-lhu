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

INSERT INTO settings (id, setting_key, setting_value, updated_at)
VALUES
  (UUID(), 'company_name', 'PT. Global Inspeksi Forensik Teknik', NOW()),
  (UUID(), 'company_address', 'Jl. Laboratorium No. 1, Jakarta', NOW()),
  (UUID(), 'company_email', 'lab@gift-lab.id', NOW()),
  (UUID(), 'company_phone', '021-00000000', NOW()),
  (UUID(), 'lhu_number_format', 'LHU-BTN/{year}/{sequence}', NOW()),
  (UUID(), 'verification_base_url', 'https://domain-anda.com', NOW()),
  (UUID(), 'document_footer', 'Dokumen ini sah apabila diverifikasi pada halaman publik resmi laboratorium.', NOW())
ON DUPLICATE KEY UPDATE
  setting_value = VALUES(setting_value),
  updated_at = NOW();
