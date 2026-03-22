import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { PillSearchBar } from '../components/PillSearchBar';
import { SlidersHorizontal } from 'lucide-react';

export function Catalog() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // States pour les filtres
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(500);

  useEffect(() => {
    async function fetchProducts() {
      try {
        // Ajout de la jointure sur categories pour récupérer le slug
        const { data } = await supabase
          .from('equipments')
          .select('*, categories(name, slug)')
          .eq('is_active', true);
          
        if (data) setProducts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  // Logique du filtre effectif
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const priceCondition = p.daily_price <= maxPrice;
      const catSlug = p.categories?.slug;
      
      let categoryCondition = true;
      if (selectedCategories.length > 0) {
        categoryCondition = catSlug ? selectedCategories.includes(catSlug) : false;
      }

      return priceCondition && categoryCondition;
    });
  }, [products, selectedCategories, maxPrice]);

  const handleCategoryToggle = (slug: string) => {
    setSelectedCategories(prev => 
      prev.includes(slug) 
        ? prev.filter(c => c !== slug) 
        : [...prev, slug]
    );
  };

  return (
    <div className="main-content" style={{ paddingTop: '2rem' }}>
      
      <div style={{ marginBottom: '4rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.1rem', marginBottom: '3rem' }}>Notre Catalogue</h1>
        <PillSearchBar />
      </div>

      <div style={{ display: 'flex', gap: '3rem', alignItems: 'flex-start' }}>
        
        {/* Sidebar Filtres */}
        <aside style={{ width: '250px', flexShrink: 0, position: 'sticky', top: '100px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontWeight: 600 }}>
            <SlidersHorizontal size={18} /> Filtres
          </div>

          <div className="filter-group" style={{ marginBottom: '2rem' }}>
            <h4 style={{ marginBottom: '1rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>CATÉGORIES</h4>
            <label style={{ display: 'block', marginBottom: '0.5rem', cursor: 'pointer' }}>
              <input 
                type="checkbox" 
                checked={selectedCategories.includes('son')}
                onChange={() => handleCategoryToggle('son')}
                style={{ marginRight: '8px' }}
               /> 
              Sonorisation
            </label>
            <label style={{ display: 'block', marginBottom: '0.5rem', cursor: 'pointer' }}>
              <input 
                type="checkbox" 
                checked={selectedCategories.includes('dj-set')}
                onChange={() => handleCategoryToggle('dj-set')}
                style={{ marginRight: '8px' }}
               /> 
              Régie DJ
            </label>
            <label style={{ display: 'block', marginBottom: '0.5rem', cursor: 'pointer' }}>
              <input 
                type="checkbox" 
                checked={selectedCategories.includes('lumiere')}
                onChange={() => handleCategoryToggle('lumiere')}
                style={{ marginRight: '8px' }}
               /> 
              Lumières & FX
            </label>
          </div>

          <div className="filter-group">
            <h4 style={{ marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>PRIX MAXIMUM / JOUR</h4>
            <div style={{ fontWeight: 600, marginBottom: '0.5rem' }}>{maxPrice} €</div>
            <input 
              type="range" 
              min="0" 
              max="500" 
              step="10"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--accent)' }} 
            />
          </div>
        </aside>

        {/* Grille Catalogue */}
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>{filteredProducts.length} équipements trouvés</span>
            <select style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #EBEBEB' }}>
              <option>Trier par : Pertinence</option>
              <option>Prix croissant</option>
              <option>Prix décroissant</option>
            </select>
          </div>

          {loading ? (
            <p>Chargement de l'inventaire...</p>
          ) : (
            <div className="catalog-grid" style={{ marginTop: '0' }}>
              {filteredProducts.map((product) => (
                <Link to={`/product/${product.id}`} key={product.id} className="product-card" style={{ display: 'flex', color: 'inherit', textDecoration: 'none' }}>
                  <div className="product-image-wrap">
                    <img src={product.image_url} alt={product.name} />
                  </div>
                  <div className="product-info">
                    <span className="product-brand">{product.brand || 'Marque Pro'}</span>
                    <h3 className="product-title">{product.name}</h3>
                    
                    <div className="product-specs">
                      {product.power_rms && <span>{product.power_rms}W RMS</span>}
                      {product.weight_kg && <span>{product.weight_kg}kg</span>}
                    </div>
                    
                    <div className="product-price">
                      <span>{product.daily_price}€ <span style={{fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-muted)'}}>/ jour</span></span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
