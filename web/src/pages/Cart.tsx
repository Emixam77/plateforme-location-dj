import React, { useState } from 'react';
import { ArrowLeft, Trash2, MapPin, Truck, ShieldCheck, CreditCard, FileCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export function Cart() {
  const [deliveryMode, setDeliveryMode] = useState<'pickup' | 'delivery'>('pickup');
  const { cartItems, removeFromCart } = useCart();

  const subTotal = cartItems.reduce((acc, item) => acc + item.price, 0);
  const deliveryCost = deliveryMode === 'delivery' ? 150 : 0;
  const total = subTotal + deliveryCost;

  return (
    <div className="main-content" style={{ padding: '2rem 5%' }}>
      
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>Votre Location</h1>
        <p style={{ color: 'var(--text-muted)' }}>Vérifiez vos équipements et validez votre réservation.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(400px, 1.5fr) 400px', gap: '4rem', alignItems: 'start' }}>
        
        {/* Colonne Gauche : Articles et Logistique */}
        <div>
          {/* Liste des équipements */}
          <div style={{ border: '1px solid #EAEAEA', borderRadius: '12px', background: '#FFF', padding: '1.5rem', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', borderBottom: '1px solid #EAEAEA', paddingBottom: '0.8rem' }}>Équipements ({cartItems.length})</h2>
            
            {cartItems.length === 0 ? (
              <div style={{ padding: '2rem 0', textAlign: 'center', color: 'var(--text-muted)' }}>
                Votre panier est vide. <Link to="/catalog" style={{ color: 'var(--accent)', fontWeight: 'bold' }}>Voir le catalogue</Link>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <div style={{ width: '80px', height: '80px', background: 'var(--bg-secondary)', borderRadius: '8px', padding: '0.5rem', display: 'flex', alignItems: 'center' }}>
                    <img src={item.image} alt={item.name} style={{ width: '100%', objectFit: 'contain' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>{item.brand}</div>
                    <div style={{ fontWeight: 600, fontSize: '1.1rem' }}>{item.name}</div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Qté: {item.quantity} | {item.dateRange.from ? `Du ${item.dateRange.from.toLocaleDateString()}` : 'Dates non définies'}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{item.price} €</div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      style={{ color: '#E74C3C', display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.8rem', marginTop: '0.5rem' }}
                    >
                      <Trash2 size={14} /> Retirer
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Logistique : Retrait ou Livraison */}
          <div style={{ border: '1px solid #EAEAEA', borderRadius: '12px', background: '#FFF', padding: '1.5rem' }}>
            <h2 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', borderBottom: '1px solid #EAEAEA', paddingBottom: '0.8rem' }}>Logistique</h2>
            
            <div style={{ display: 'flex', gap: '1rem' }}>
              
              <div 
                onClick={() => setDeliveryMode('pickup')}
                style={{ flex: 1, border: `2px solid ${deliveryMode === 'pickup' ? 'var(--accent)' : '#EAEAEA'}`, borderRadius: '8px', padding: '1rem', cursor: 'pointer', background: deliveryMode === 'pickup' ? '#FFFAF0' : 'transparent', transition: 'all 0.2s' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                   <MapPin size={20} color={deliveryMode === 'pickup' ? 'var(--accent)' : 'var(--text-muted)'} />
                   <span style={{ fontWeight: 600 }}>Retrait au Dépôt</span>
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>Gratuit. Du lundi au vendredi de 9h à 18h.</p>
              </div>

              <div 
                onClick={() => setDeliveryMode('delivery')}
                style={{ flex: 1, border: `2px solid ${deliveryMode === 'delivery' ? 'var(--accent)' : '#EAEAEA'}`, borderRadius: '8px', padding: '1rem', cursor: 'pointer', background: deliveryMode === 'delivery' ? '#FFFAF0' : 'transparent', transition: 'all 0.2s' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                   <Truck size={20} color={deliveryMode === 'delivery' ? 'var(--accent)' : 'var(--text-muted)'} />
                   <span style={{ fontWeight: 600 }}>Livraison & Installation</span>
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>À partir de 150€. Selon distance et accès.</p>
              </div>

            </div>
          </div>
        </div>

        {/* Colonne Droite : Récapitulatif et Paiement */}
        <div style={{ border: '1px solid #EAEAEA', borderRadius: '12px', background: '#FFF', padding: '2rem', position: 'sticky', top: '100px', boxShadow: '0 8px 24px rgba(0,0,0,0.06)' }}>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>Récapitulatif</h2>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: 'var(--text-muted)' }}>
            <span>Sous-total équipements</span>
            <span>{subTotal} €</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', color: 'var(--text-muted)', borderBottom: '1px solid #EAEAEA', paddingBottom: '1.5rem' }}>
            <span>Frais logistiques</span>
            <span>{deliveryCost === 0 ? 'Gratuit' : `${deliveryCost} €`}</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', fontWeight: 'bold', fontSize: '1.5rem' }}>
            <span>Total TTC</span>
            <span>{subTotal === 0 ? 0 : total} €</span>
          </div>

          {/* Module de Caution (KYC) */}
          <div style={{ background: '#F8F9FA', borderRadius: '8px', padding: '1rem', marginBottom: '2rem', border: '1px dashed #C0C0C0' }}>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', fontWeight: 600, marginBottom: '0.5rem', color: '#1A1A1A' }}>
              <ShieldCheck size={18} color="var(--accent)" /> Dépôt de garantie (Empreinte)
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>
              Une empreinte bancaire non-débitée de <strong>1500 €</strong> vous sera demandée à l'étape suivante pour valider le contrat.
            </p>
          </div>

          <button className="btn-primary" disabled={cartItems.length === 0} style={{ width: '100%', justifyContent: 'center', padding: '1rem', fontSize: '1rem', borderRadius: '8px', marginBottom: '1rem', opacity: cartItems.length === 0 ? 0.5 : 1 }}>
            <CreditCard size={18} /> Procéder au paiement
          </button>
          
          <div style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem' }}>
            <FileCheck size={14} /> Contrat généré et signé électroniquement
          </div>
        </div>

      </div>
    </div>
  );
}
