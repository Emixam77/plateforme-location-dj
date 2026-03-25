import { X, Phone, Mail, MessageSquare } from 'lucide-react';
import { useQuoteModal } from '../context/QuoteContext';

export function QuoteModal() {
  const { isOpen, closeQuoteModal, selectedProduct, contactInfo } = useQuoteModal();

  if (!isOpen) return null;

  return (
    <div className="admin-drawer-overlay open" style={{ zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }} onClick={closeQuoteModal}>
      <div 
        className="glass-panel" 
        style={{ 
          maxWidth: '500px', 
          width: '100%', 
          background: 'white', 
          padding: '40px', 
          position: 'relative',
          textAlign: 'center',
          boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
          border: 'none'
        }} 
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={closeQuoteModal} 
          style={{ position: 'absolute', top: '20px', right: '20px', background: '#f8fafc', border: 'none', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <X size={18} />
        </button>

        <div style={{ marginBottom: '32px' }}>
          <div style={{ 
            width: '64px', 
            height: '64px', 
            background: 'var(--accent-soft, #EEF2FF)', 
            color: 'var(--accent, #6366f1)', 
            borderRadius: '16px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            margin: '0 auto 20px' 
          }}>
            <MessageSquare size={32} />
          </div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '8px', letterSpacing: '-0.5px' }}>Demander un devis</h2>
          {selectedProduct && (
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>
              Pour l'équipement : <strong>{selectedProduct}</strong>
            </p>
          )}
          <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>
            Notre équipe est à votre disposition pour vous accompagner dans votre projet.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <a 
            href={`tel:${contactInfo.phone.replace(/\s/g, '')}`} 
            className="btn-primary" 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: '12px', 
              padding: '16px',
              fontSize: '1.1rem',
              textDecoration: 'none'
            }}
          >
            <Phone size={20} /> {contactInfo.phone}
          </a>

          <a 
            href={`mailto:${contactInfo.email}?subject=Demande de devis${selectedProduct ? ` - ${selectedProduct}` : ''}`} 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: '12px', 
              padding: '16px',
              borderRadius: '8px',
              border: '2px solid #e2e8f0',
              color: '#0f172a',
              fontWeight: 600,
              fontSize: '1rem',
              textDecoration: 'none',
              transition: 'background 0.2s'
            }}
            onMouseOver={e => e.currentTarget.style.background = '#f8fafc'}
            onMouseOut={e => e.currentTarget.style.background = 'transparent'}
          >
            <Mail size={20} /> {contactInfo.email}
          </a>
        </div>

        <p style={{ marginTop: '24px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Réponse rapide garantie sous 24h.
        </p>
      </div>
    </div>
  );
}
