import { Check } from 'lucide-react';
import { useQuoteModal } from '../context/QuoteContext';

const MOCK_PACKS = [
  // ... (keeping the same packs)
  {
    id: 'pack-1',
    badge: 'Soirée Privée',
    name: 'Essentiel',
    description: 'Parfait pour les petits événements',
    price: 150,
    highlight: false,
    includes: [
      'Jusqu\'à 50 personnes',
      '2x Enceintes amplifiées 500W',
      '1x Contrôleur DJ de base',
      'Câblage fourni'
    ],
    buttonText: 'Demander un devis'
  },
  {
    id: 'pack-2',
    badge: 'Mariage & Pro',
    name: 'Intermédiaire',
    description: 'Idéal pour célébrer en grand',
    price: 350,
    highlight: true,
    includes: [
      'Jusqu\'à 150 personnes',
      'Système son 1500W',
      '4x Lyres LED motorisées',
      'Machine à fumée lourde',
      'Installation possible'
    ],
    buttonText: 'Demander un devis'
  },
  {
    id: 'pack-3',
    badge: 'Clubbing Pro',
    name: 'Premium',
    description: 'Pour les grands rassemblements',
    price: 600,
    highlight: false,
    includes: [
      'Plus de 300 personnes',
      '2x CDJ-3000 + DJM-900',
      'Façade L-Acoustics complète',
      'Retours DJ dédiés',
      'Assistance technique'
    ],
    buttonText: 'Demander un devis'
  }
];

export function Packs() {
  const { openQuoteModal } = useQuoteModal();
  
  return (
    <div style={{ backgroundColor: '#e9ecef', minHeight: '100vh', padding: '80px 20px', fontFamily: '"Inter", sans-serif' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        
        {/* Header Section */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#111', marginBottom: '12px', letterSpacing: '-1px' }}>
            Packs de location
          </h1>
          <p style={{ fontSize: '1rem', color: '#555', fontWeight: 500 }}>
            Découvrez nos configurations adaptées à l'envergure de votre événement.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', alignItems: 'stretch' }}>
          {MOCK_PACKS.map((pack) => (
            <div key={pack.id} style={{
              backgroundColor: '#fff',
              borderRadius: '24px',
              padding: '12px',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 12px 36px rgba(0,0,0,0.08)',
              border: '1px solid rgba(0,0,0,0.05)'
            }}>
              
              {/* Inner Top Block */}
              <div style={{
                backgroundColor: pack.highlight ? '#efe8fa' : '#f1f3f5',
                borderRadius: '16px',
                padding: '32px 24px',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                marginBottom: '16px'
              }}>
                {/* Badge */}
                <span style={{
                  backgroundColor: '#fff',
                  color: pack.highlight ? '#5b21b6' : '#333',
                  padding: '6px 12px',
                  borderRadius: '100px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  alignSelf: 'flex-start',
                  marginBottom: '20px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
                }}>
                  {pack.badge}
                </span>

                {/* Price */}
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '12px' }}>
                  {typeof pack.price === 'number' ? (
                    <>
                      <span style={{ fontSize: '2.5rem', fontWeight: 800, color: '#111', letterSpacing: '-1px' }}>{pack.price}€</span>
                      <span style={{ fontSize: '1rem', fontWeight: 600, color: '#666' }}>/jour</span>
                    </>
                  ) : (
                    <span style={{ fontSize: '2.5rem', fontWeight: 800, color: '#111', letterSpacing: '-1px' }}>Sur devis</span>
                  )}
                </div>

                {/* Description Subtitle */}
                <p style={{ fontSize: '0.9rem', color: '#555', fontWeight: 500, marginBottom: '24px' }}>
                  {pack.description}
                </p>

                {/* Main Button */}
                <button 
                  onClick={() => openQuoteModal(`Pack ${pack.name}`)}
                  style={{
                    backgroundColor: '#111',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '14px 24px',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    width: '100%',
                    transition: 'background-color 0.2s ease',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#333'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#111'}
                >
                  {pack.buttonText}
                </button>
              </div>

              {/* Bottom Features List */}
              <div style={{ padding: '8px 16px 24px 16px', flex: 1 }}>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {pack.includes.map((item, index) => (
                    <li key={index} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <Check size={16} color="#d1d5db" strokeWidth={3} />
                      <span style={{ fontSize: '0.9rem', color: '#4b5563', fontWeight: 500 }}>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
