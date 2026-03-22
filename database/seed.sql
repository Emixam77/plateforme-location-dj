-- Fichier de données de test (Seed) pour remplir la base de données
-- À exécuter dans l'éditeur SQL de Supabase après schema.sql

-- 1. Insertion de quelques catégories
INSERT INTO categories (id, name, slug) VALUES 
('11111111-1111-1111-1111-111111111111', 'Son', 'son'),
('22222222-2222-2222-2222-222222222222', 'DJ Set', 'dj-set'),
('33333333-3333-3333-3333-333333333333', 'Lumière', 'lumiere')
ON CONFLICT DO NOTHING;

-- 2. Insertion d'équipements de test (Enceintes, Platines, Micro)
INSERT INTO equipments (id, category_id, name, brand, description, power_rms, weight_kg, dimensions, connections, daily_price, stock_quantity, image_url) VALUES 
(
  'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 
  '22222222-2222-2222-2222-222222222222', 
  'CDJ-3000', 
  'Pioneer DJ', 
  'Lecteur professionnel multi-formats haut de gamme.', 
  NULL, 5.5, '32.9 x 11.8 x 45.3 cm', ARRAY['RCA', 'Numérique Coaxial', 'USB'], 85.00, 4, 
  'https://images.unsplash.com/photo-1598653222000-6b7b7a552625?auto=format&fit=crop&w=800&q=80'
),
(
  'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 
  '11111111-1111-1111-1111-111111111111', 
  'Syva (Système Complet)', 
  'L-Acoustics', 
  'Système de sonorisation colinéaire Premium avec Subwoofer.', 
  1000, 21.0, '130 x 14.4 x 20.9 cm', ARRAY['Speakon', 'XLR'], 350.00, 2, 
  'https://images.unsplash.com/photo-1505235687559-28b5f54645b7?auto=format&fit=crop&w=800&q=80'
),
(
  'cccccccc-cccc-cccc-cccc-cccccccccccc', 
  '11111111-1111-1111-1111-111111111111', 
  'SM58 (Micro Chant)', 
  'Shure', 
  'Microphone dynamique classique et robuste pour le live.', 
  NULL, 0.33, '16.2 x 5.1 cm', ARRAY['XLR'], 15.00, 10, 
  'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=800&q=80'
),
(
  'dddddddd-dddd-dddd-dddd-dddddddddddd', 
  '33333333-3333-3333-3333-333333333333', 
  'Aura XB', 
  'Martin', 
  'Projecteur Wash motorisé professionnel pour éclairage d''ambiance.', 
  NULL, 6.5, '30.2 x 30.2 x 36 cm', ARRAY['DMX 5 broches', 'PowerCON'], 45.00, 8, 
  'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80'
)
ON CONFLICT DO NOTHING;

-- 3. Insertion d'un Pack Test
INSERT INTO packs (id, name, description, event_type, daily_price, image_url) VALUES 
(
  'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 
  'Pack Premium Mariage', 
  'Un kit complet pour les DJs de mariage : 2x Enceintes, 2x Platines, et 1x Micro.', 
  'Mariage', 
  450.00, 
  'https://images.unsplash.com/photo-1501281668745-f7f579cebac2?auto=format&fit=crop&w=800&q=80'
)
ON CONFLICT DO NOTHING;

-- 4. Liaison du Pack avec les équipements concernés
-- 2x CDJ-3000, 1x Système Syva, 1x Micro SM58
INSERT INTO pack_equipments (pack_id, equipment_id, quantity) VALUES 
('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 2),
('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 1),
('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'cccccccc-cccc-cccc-cccc-cccccccccccc', 1)
ON CONFLICT DO NOTHING;
