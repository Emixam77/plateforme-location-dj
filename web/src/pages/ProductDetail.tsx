import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { ShoppingCart, ArrowLeft, CheckCircle2, Zap, Weight, Settings2 } from 'lucide-react';
import { DayPicker } from 'react-day-picker';
import { differenceInDays, startOfDay } from 'date-fns';
import { useCart } from '../context/CartContext';
import 'react-day-picker/dist/style.css';

export function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to?: Date }>({ from: undefined });
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    async function loadProduct() {
      if (!id) return;
      const { data } = await supabase.from('equipments').select('*').eq('id', id).single();
      if (data) setProduct(data);
      setLoading(false);
    }
    loadProduct();
  }, [id]);

  const calculateTotal = () => {
    if (!product) return 0;
    let days = 1;
    if (dateRange.from && dateRange.to) {
      days = Math.max(1, differenceInDays(startOfDay(dateRange.to), startOfDay(dateRange.from)) + 1);
    }
    let totalPrice = product.daily_price;
    for (let i = 2; i <= days; i++) {
      totalPrice += (product.daily_price * 0.5);
    }
    return totalPrice * quantity;
  };

  const handleReserve = () => {
    if (!product) return;
    
    addToCart({
      id: crypto.randomUUID(),
      productId: product.id,
      name: product.name,
      brand: product.brand,
      image: product.image_url,
      price: calculateTotal(),
      quantity,
      dateRange,
      priceOptions: `${calculateTotal()}€ pour ${quantity > 1 ? quantity + ' pièces' : 'la sélection'}`
    });
    
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  if (loading) return <div style={{ padding: '4rem', textAlign: 'center' }}>Chargement...</div>;
  if (!product) return <div style={{ padding: '4rem', textAlign: 'center' }}>Produit introuvable.</div>;

  return (
    <div className="main-content" style={{ padding: '2rem 5%' }}>
      
      <Link to="/catalog" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', color: 'var(--text-muted)' }}>
        <ArrowLeft size={18} /> Retour au catalogue
      </Link>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid #EAEAEA' }}>
        <div>
          <span style={{ fontSize: '1rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700 }}>{product.brand}</span>
          <h1 style={{ fontSize: '2.2rem', margin: 0 }}>{product.name}</h1>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>{product.daily_price}€ <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>/ jour</span></div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(250px, 1fr) minmax(300px, 1.5fr) 350px', gap: '3rem', alignItems: 'start' }}>
        
        {/* Colonne 1 : Image Condensée */}
        <div style={{ background: 'var(--bg-secondary)', borderRadius: '12px', padding: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center', aspectRatio: '1/1' }}>
          <img src={product.image_url} alt={product.name} style={{ width: '100%', maxHeight: '250px', objectFit: 'contain', filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.1))' }} />
        </div>

        {/* Colonne 2 : Specs et Description (Badges) */}
        <div>
          <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>À propos</h3>
          <p style={{ lineHeight: '1.7', color: 'var(--text-main)', marginBottom: '2rem' }}>{product.description}</p>
          
          <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>Caractéristiques</h3>
          <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', background: 'var(--bg-secondary)', borderRadius: '99px', fontSize: '0.85rem', fontWeight: 500 }}>
              <Zap size={16} /> {product.power_rms ? `${product.power_rms}W RMS` : 'Passif'}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', background: 'var(--bg-secondary)', borderRadius: '99px', fontSize: '0.85rem', fontWeight: 500 }}>
              <Weight size={16} /> {product.weight_kg ? `${product.weight_kg} kg` : 'N/C'}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', background: 'var(--bg-secondary)', borderRadius: '99px', fontSize: '0.85rem', fontWeight: 500 }}>
              <Settings2 size={16} /> {product.connections ? product.connections.join(' / ') : 'Standard'}
            </div>
          </div>
        </div>

        {/* Colonne 3 : Simulateur Ultra-Compact */}
        <div style={{ border: '1px solid #EAEAEA', borderRadius: '12px', padding: '1.5rem', background: '#FFF' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem' }}>Vos Dates</label>
            <div style={{ border: '1px solid #EAEAEA', borderRadius: '8px', padding: '0.5rem', background: 'var(--bg-secondary)', display: 'flex', justifyContent: 'center' }}>
               <DayPicker
                mode="range"
                selected={dateRange as any}
                onSelect={setDateRange as any}
                styles={{
                  day: { borderRadius: '50%', margin: '0.1rem', width: '28px', height: '28px', fontSize: '0.8rem' },
                  day_selected: { backgroundColor: 'var(--accent)', color: '#000', fontWeight: 'bold' }
                }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Quantité</span>
            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #EAEAEA', borderRadius: '4px', background: 'var(--bg-secondary)' }}>
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} style={{ padding: '0.3rem 0.8rem' }}>-</button>
              <div style={{ padding: '0 0.8rem', fontWeight: 'bold', fontSize: '0.9rem' }}>{quantity}</div>
              <button onClick={() => setQuantity(quantity + 1)} style={{ padding: '0.3rem 0.8rem' }}>+</button>
            </div>
          </div>

          <div style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
              <span style={{ fontSize: '0.9rem' }}>Total estimé</span>
              <span style={{ fontWeight: 'bold', fontSize: '1.4rem' }}>{calculateTotal()} €</span>
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.5rem' }}>
              <CheckCircle2 size={12} color="var(--accent)" /> -50% appliqué sur les jours supp.
            </div>
          </div>

          <button 
            className="btn-primary" 
            onClick={handleReserve}
            style={{ width: '100%', justifyContent: 'center', padding: '0.8rem', fontSize: '1rem', borderRadius: '8px', background: showSuccess ? '#10B981' : 'var(--accent)', color: showSuccess ? '#FFF' : '#000', transition: 'all 0.3s' }}
          >
            {showSuccess ? 'Ajouté au panier ✅' : <><ShoppingCart size={18} /> Réserver</>}
          </button>
        </div>

      </div>
    </div>
  );
}
