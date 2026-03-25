import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { SlidersHorizontal } from 'lucide-react';
import { useQuoteModal } from '../context/QuoteContext';

export function Catalog() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { openQuoteModal } = useQuoteModal();

  // States pour les filtres
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

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
      const catSlug = p.categories?.slug;
      
      let categoryCondition = true;
      if (selectedCategories.length > 0) {
        categoryCondition = catSlug ? selectedCategories.includes(catSlug) : false;
      }

      return categoryCondition;
    });
  }, [products, selectedCategories]);

  const handleCategoryToggle = (slug: string) => {
    setSelectedCategories(prev => 
      prev.includes(slug) 
        ? prev.filter(c => c !== slug) 
        : [...prev, slug]
    );
  };

  return (
    <div className="main-content" style={{ paddingTop: '2rem' }}>
      


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
              SONORISATION
            </label>
            <label style={{ display: 'block', marginBottom: '0.5rem', cursor: 'pointer' }}>
              <input 
                type="checkbox" 
                checked={selectedCategories.includes('lumiere')}
                onChange={() => handleCategoryToggle('lumiere')}
                style={{ marginRight: '8px' }}
               /> 
              LUMIÈRE ET AMBIANCE
            </label>
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
                  <div className="product-info" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <span className="product-brand">{product.brand || 'Marque Pro'}</span>
                      <h3 className="product-title">{product.name}</h3>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.5rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {product.description}
                      </p>
                    </div>
                    
                    <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div className="product-price" style={{ margin: 0 }}>
                        <span style={{ fontSize: '1.1rem' }}>{product.daily_price}€ <span style={{fontSize: '0.8rem', fontWeight: 500, color: 'var(--text-muted)'}}>/ jour</span></span>
                      </div>
                      <button 
                        onClick={(e) => {
                          e.preventDefault(); // Prevent Link navigation
                          openQuoteModal(product.name);
                        }}
                        className="btn-primary" 
                        style={{ fontSize: '0.85rem', padding: '0.6rem 1rem' }}
                      >
                        Demander un devis
                      </button>
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
