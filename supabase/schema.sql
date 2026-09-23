-- ==============================================================================
-- AURA APOTHECARY & ATELIER — SUPABASE DATABASE SCHEMA (v1.0.0)
-- Haute Parfumerie, Bespoke Flacon Commissions & Raw Volatiles Organ OS
-- ==============================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Bespoke Perfume Formulations Table
CREATE TABLE IF NOT EXISTS public.perfume_formulations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    formula_code VARCHAR(32) NOT NULL UNIQUE, -- e.g. 'FORMULA-AUR-019'
    client_name VARCHAR(255) NOT NULL,
    client_email VARCHAR(255) NOT NULL,
    client_tier VARCHAR(64) NOT NULL DEFAULT 'Private Bespoke', -- 'Private Bespoke', 'Haute Flacon', 'Atelier Reserve'
    fragrance_family VARCHAR(128) NOT NULL, -- 'Smoky Amber Floral', 'Mineral Ozonic Leather', etc.
    top_accord TEXT NOT NULL,
    heart_accord TEXT NOT NULL,
    base_accord TEXT NOT NULL,
    concentration_pct INTEGER NOT NULL DEFAULT 25 CHECK (concentration_pct >= 10 AND concentration_pct <= 40),
    maceration_days INTEGER NOT NULL DEFAULT 30,
    maceration_target_days INTEGER NOT NULL DEFAULT 60,
    flacon_status VARCHAR(64) NOT NULL DEFAULT 'Organ Compounding', -- 'Organ Compounding', 'Cold Maceration', 'Micro-Filtration', 'Hand Bottled', 'Dispatched'
    deposit_amount NUMERIC(10, 2) NOT NULL DEFAULT 1500.00,
    total_price NUMERIC(10, 2) NOT NULL DEFAULT 3500.00,
    delivery_date DATE NOT NULL,
    organ_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Raw Materials & Essences Vault Table
CREATE TABLE IF NOT EXISTS public.raw_essence_vault (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    essence_name VARCHAR(255) NOT NULL,
    botanical_origin VARCHAR(128) NOT NULL, -- 'Mysore, India', 'Grasse, France', etc.
    extraction_method VARCHAR(128) NOT NULL, -- 'Steam Distilled', 'Volatile Solvent', 'CO2 Supercritical'
    olfactory_family VARCHAR(64) NOT NULL, -- 'Woody', 'Floral', 'Resin', 'Citrus', 'Animalic'
    stock_grams NUMERIC(10, 2) NOT NULL DEFAULT 500.00,
    min_threshold_grams NUMERIC(10, 2) NOT NULL DEFAULT 100.00,
    cost_per_gram NUMERIC(10, 2) NOT NULL DEFAULT 15.00,
    ifra_compliance_status VARCHAR(64) NOT NULL DEFAULT 'IFRA 51st Standard Certified',
    vault_location VARCHAR(64) NOT NULL DEFAULT 'Cabinet A - Cold Storage',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Olfactory Lab Presets & House Signatures Table
CREATE TABLE IF NOT EXISTS public.house_signatures (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(64) NOT NULL UNIQUE,
    name VARCHAR(128) NOT NULL,
    tagline VARCHAR(255) NOT NULL,
    character VARCHAR(128) NOT NULL,
    intensity INTEGER NOT NULL DEFAULT 4 CHECK (intensity >= 1 AND intensity <= 5),
    flacon_50ml_price NUMERIC(10, 2) NOT NULL DEFAULT 280.00,
    flacon_100ml_price NUMERIC(10, 2) NOT NULL DEFAULT 420.00,
    in_stock BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Enable Row Level Security (RLS)
ALTER TABLE public.perfume_formulations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.raw_essence_vault ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.house_signatures ENABLE ROW LEVEL SECURITY;

-- 6. Public Read & Booking Policies
CREATE POLICY "Allow public read access to house signatures" 
    ON public.house_signatures FOR SELECT USING (true);

CREATE POLICY "Allow public read access to raw essence vault" 
    ON public.raw_essence_vault FOR SELECT USING (true);

CREATE POLICY "Allow authenticated insert to perfume formulations" 
    ON public.perfume_formulations FOR INSERT WITH CHECK (true);
