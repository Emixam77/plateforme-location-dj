-- Phase 1 : Base de données des équipements et packs
-- Fichier schema.sql pour Supabase / PostgreSQL

-- Activation de l'extension pour les UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Catégories (Son, Lumière, DJ Set, Vidéo...)
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- 2. Équipements (Matériel individuel)
-- Contient toutes les infos techniques pour les fiches produits
CREATE TABLE equipments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category_id UUID REFERENCES categories(id),
    name VARCHAR(255) NOT NULL,
    brand VARCHAR(100),
    description TEXT,
    power_rms INTEGER, -- en Watts (ex: 1200)
    weight_kg DECIMAL(5,2), -- en kg (ex: 15.5)
    dimensions VARCHAR(100), -- ex: "50x40x30 cm"
    connections TEXT[], -- ex: ['XLR', 'Jack 6.35', 'RCA']
    daily_price DECIMAL(10,2) NOT NULL, -- Prix journalier de base
    stock_quantity INTEGER NOT NULL DEFAULT 1, -- Gestion du stock physique
    is_active BOOLEAN DEFAULT true,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- 3. Packs "Clés en main" (Regroupement de matériel)
CREATE TABLE packs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    event_type VARCHAR(100), -- ex: 'Mariage', 'Soirée Privée', 'Conférence'
    daily_price DECIMAL(10,2) NOT NULL, -- Prix du pack (souvent inférieur à la somme du matériel)
    image_url TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- 4. Éléments des Packs (Table de liaison)
-- Permet de savoir précisément quel matériel compose un pack
CREATE TABLE pack_equipments (
    pack_id UUID REFERENCES packs(id) ON DELETE CASCADE,
    equipment_id UUID REFERENCES equipments(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL DEFAULT 1,
    PRIMARY KEY (pack_id, equipment_id)
);

-- 5. Cross-selling (Accessoires suggérés logistiquement)
-- Ex: si j'ajoute une enceinte (equipment_id), on me suggère un pied et un câble (accessory_id)
CREATE TABLE equipment_accessories (
    equipment_id UUID REFERENCES equipments(id) ON DELETE CASCADE,
    accessory_id UUID REFERENCES equipments(id) ON DELETE CASCADE,
    PRIMARY KEY (equipment_id, accessory_id)
);
