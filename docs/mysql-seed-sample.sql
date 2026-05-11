-- Sample SQL reference for phpMyAdmin / MySQL import
-- Adjust IDs and timestamps as needed

INSERT INTO customers (id, company_name, contact_name, phone, email, address, created_at, updated_at)
VALUES
('cus_001', 'PT Beton Konstruksi Nusantara', 'Budi Santoso', '08123456789', 'budi@example.com', 'Jakarta', NOW(), NOW());

INSERT INTO lhu_documents (
  id, document_code, lhu_number, customer_id, project_name, project_address, reference_number, test_type,
  concrete_type, status, received_date, testing_date, notes, created_by_user_id, created_at, updated_at
) VALUES (
  'lhu_001', 'DRF-2026-0001', 'LHU-BTN/2026/0031', 'cus_001', 'Tower Residence Blok A',
  'Jl. Pembangunan Raya No. 18, Jakarta', 'REF/BTN/031/III/2026', 'Kuat Tekan Beton',
  'silinder', 'published', NOW(), NOW(), 'Demo seed', 'usr_admin', NOW(), NOW()
);

INSERT INTO lhu_verification_tokens (id, lhu_document_id, public_token, is_active, created_at, updated_at)
VALUES ('tok_001', 'lhu_001', 'valid-demo-token', 1, NOW(), NOW());
