import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { ArrowLeft, CheckCircle2, Zap, Weight } from 'lucide-react';

export function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function loadProduct() {
      if (!id) return;
      const { data } = await supabase.from('equipments').select('*').eq('id', id).single();
      if (data) setProduct(data);
      setLoading(false);
    }
    loadProduct();
  }, [id]);

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

        {/* Colonne 2 : Specs et Description */}
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
          </div>
        </div>

        {/* Colonne 3 : CTA Devis */}
        <div style={{ border: '1px solid #EAEAEA', borderRadius: '12px', padding: '1.5rem', background: '#FFF', position: 'sticky', top: '100px' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
              {product.daily_price}€ <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 'normal' }}>/ jour (estim.)</span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
              Le tarif final peut varier selon la durée et les options de livraison.
            </p>
          </div>

          <a 
            href={`mailto:contact@angelo-entertainment.com?subject=Demande de devis : ${product.name}`}
            className="btn-primary" 
            style={{ width: '100%', justifyContent: 'center', padding: '1rem', fontSize: '1rem', borderRadius: '8px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
             Demander un devis
          </a>

          <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid #EAEAEA' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CheckCircle2 size={14} color="var(--accent)" /> Matériel vérifié avant chaque loc.
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CheckCircle2 size={14} color="var(--accent)" /> Assistance technique disponible
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
