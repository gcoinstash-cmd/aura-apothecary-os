-- ==============================================================================
-- AURA APOTHECARY & ATELIER — SEED DATA (v1.0.0)
-- ==============================================================================

-- 1. Insert Raw Materials & Essences Vault
INSERT INTO public.raw_essence_vault (essence_name, botanical_origin, extraction_method, olfactory_family, stock_grams, min_threshold_grams, cost_per_gram, ifra_compliance_status, vault_location) VALUES
('Sandalwood Album Heartwood (Aged 15 Yrs)', 'Mysore, India', 'Steam Distilled', 'Woody', 850.00, 200.00, 18.50, 'IFRA 51st Standard Certified', 'Cabinet A - Cold Storage'),
('Rose de Mai Absolute (Centifolia)', 'Grasse, France', 'Volatile Solvent Extraction', 'Floral', 320.00, 100.00, 24.00, 'IFRA 51st Standard Certified', 'Cabinet B - Light Shielded'),
('Frankincense Sacra Tears', 'Dhofar, Oman', 'Hydro-Distillation', 'Resin', 1200.00, 300.00, 9.80, 'IFRA 51st Standard Certified', 'Cabinet C - Dry Ambient'),
('Orris Root Butter (15% Irones)', 'Florence, Italy', '3-Year Rhizome Steam Distillation', 'Powdery Floral', 85.00, 50.00, 65.00, 'IFRA 51st Standard Certified', 'Cabinet A - Cryo Lock'),
('Haitian Vetiver Root (Organic)', 'Les Cayes, Haiti', 'Fractionated Steam Distillation', 'Earthy Woody', 2400.00, 500.00, 4.50, 'IFRA 51st Standard Certified', 'Cabinet D - Bulk Vault'),
('Calabrian Bergamot Extra Superiore', 'Calabria, Italy', 'Cold Expression (FCF Cruelty-Free)', 'Citrus', 1600.00, 400.00, 6.20, 'IFRA 51st Standard Certified', 'Cabinet A - Cold Storage');

-- 2. Insert House Signatures
INSERT INTO public.house_signatures (slug, name, tagline, character, intensity, flacon_50ml_price, flacon_100ml_price, in_stock) VALUES
('santalum-vetiver', 'Santalum Vetiver', 'An earthly anchor under shifting winds.', 'Mineral, Dry Woody, Resinous', 4, 290.00, 440.00, true),
('rose-noire', 'Rose Noire', 'An obsidian shadow in full bloom.', 'Smoky Floral, Dark Balsamic, Velvety', 4, 320.00, 480.00, true),
('iris-pallida', 'Iris Pallida', 'Powdered slate and cold aristocratic dust.', 'Orris Root, Earthy, Chalk Mineral', 3, 350.00, 520.00, true);

-- 3. Insert Active Bespoke Perfume Formulations
INSERT INTO public.perfume_formulations (formula_code, client_name, client_email, client_tier, fragrance_family, top_accord, heart_accord, base_accord, concentration_pct, maceration_days, maceration_target_days, flacon_status, deposit_amount, total_price, delivery_date, organ_notes) VALUES
('FORMULA-AUR-019', 'Countess Eléonore de Rohan', 'e.derohan@paris-patrimoine.fr', 'Private Bespoke', 'Smoky Amber Floral', 'Calabrian Bergamot & Pink Peppercorn', 'Grasse Rose de Mai & Papyrus Extract', 'Mysore Sandalwood Album & Ambergris', 28, 42, 60, 'Cold Maceration', 1800.00, 4200.00, CURRENT_DATE + INTERVAL '18 days', 'Heavy mouthblown black crystal flacon with palladium monogram cap.'),
('FORMULA-AUR-020', 'Julian Sterling, Esq.', 'j.sterling@mayfairpartners.co.uk', 'Haute Flacon', 'Mineral Ozonic Leather', 'Frozen Aldehydes & Mountain Ash', 'Mineral Charcoal & Damask Rose', 'Scorched Birch Tar & White Suede', 24, 58, 60, 'Micro-Filtration', 1200.00, 2800.00, CURRENT_DATE + INTERVAL '5 days', 'Double filtered through unbleached parchment. Ready for hand-pouring.'),
('FORMULA-AUR-021', 'Amara Vance', 'amara.vance@geneva-trust.ch', 'Atelier Reserve', 'Verdant Earth & Sacred Wood', 'Siberian Pine Needles & Crushed Mint', 'Galbanum Resin & Blue Lotus', 'High-Altitude Oakmoss & Omani Frankincense', 30, 14, 45, 'Organ Compounding', 2200.00, 5000.00, CURRENT_DATE + INTERVAL '31 days', 'Extrait concentration. Third batch adjustment approved by patron.'),
('FORMULA-AUR-022', 'Lord George Cavendish', 'g.cavendish@belgravia-estates.com', 'Private Bespoke', 'Solar Citrus Chypre', 'Cold-Pressed Neroli & Sicilian Mandarin', 'Violet Leaf Absolute & Orris Butter', 'Bourbon Vetiver & Cedarwood Flakes', 22, 60, 60, 'Hand Bottled', 1600.00, 3500.00, CURRENT_DATE + INTERVAL '2 days', 'Sealed with gold baudruchage cord and wax crest.');
