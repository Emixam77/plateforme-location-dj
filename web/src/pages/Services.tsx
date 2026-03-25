import { Truck, Wrench, ShieldCheck, Headphones } from 'lucide-react';

export function Services() {
  return (
    <div className="main-content" style={{ padding: '60px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      
      {/* Services Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '40px' }}>
        
        <div style={{ display: 'flex', gap: '24px', padding: '32px', background: '#f9fafb', borderRadius: '16px', border: '1px solid #eee' }}>
          <div style={{ background: '#fff', padding: '16px', borderRadius: '12px', height: 'fit-content', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
            <Truck size={32} color="var(--accent)" />
          </div>
          <div>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '12px', textTransform: 'uppercase' }}>LIVRAISON</h3>
            <p style={{ color: '#666', lineHeight: '1.6' }}>
              Ne vous souciez de rien : le matériel choisi est livré, installé et désinstallé après votre événement.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '24px', padding: '32px', background: '#f9fafb', borderRadius: '16px', border: '1px solid #eee' }}>
          <div style={{ background: '#fff', padding: '16px', borderRadius: '12px', height: 'fit-content', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
            <ShieldCheck size={32} color="var(--accent)" />
          </div>
          <div>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '12px', textTransform: 'uppercase' }}>ASSURANCE TECHNIQUE</h3>
            <p style={{ color: '#666', lineHeight: '1.6' }}>
              Vous bénéficiez de la présence d'un technicien tout au long de votre événement.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '24px', padding: '32px', background: '#f9fafb', borderRadius: '16px', border: '1px solid #eee' }}>
          <div style={{ background: '#fff', padding: '16px', borderRadius: '12px', height: 'fit-content', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
            <Headphones size={32} color="var(--accent)" />
          </div>
          <div>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '12px', textTransform: 'uppercase' }}>ANIMATION ÉVÉNEMENTIELLE <br/><span style={{ fontSize: '0.9rem', opacity: 0.8 }}>( partie deejaying )</span></h3>
            <p style={{ color: '#666', lineHeight: '1.6' }}>
              Sublimez vos événements de toute nature avec l'assistance d'un animateur expérimenté et à l'écoute de vos exigences
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '24px', padding: '32px', background: '#f9fafb', borderRadius: '16px', border: '1px solid #eee' }}>
          <div style={{ background: '#fff', padding: '16px', borderRadius: '12px', height: 'fit-content', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
            <Wrench size={32} color="var(--accent)" />
          </div>
          <div>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '12px', textTransform: 'uppercase' }}>FORMATION DEEJAYING</h3>
            <p style={{ color: '#666', lineHeight: '1.6' }}>
              Apprenez les bases du mix en toute sérénité et simplicité
            </p>
          </div>
        </div>

      </div>

      {/* Call to action */}
      <div style={{ marginTop: '80px', textAlign: 'center', padding: '60px', background: 'var(--accent)', color: 'white', borderRadius: '24px' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Un projet spécifique en tête ?</h2>
        <p style={{ fontSize: '1.2rem', marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px auto', opacity: 0.9 }}>
          Notre équipe commerciale est à votre écoute pour concevoir la configuration technique exacte dont votre événement a besoin.
        </p>
        <button style={{ 
          background: '#fff', 
          color: 'var(--accent)', 
          border: 'none', 
          padding: '16px 40px', 
          fontSize: '1.1rem', 
          fontWeight: 'bold', 
          borderRadius: '12px',
          cursor: 'pointer',
          boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
        }}>
          Demander un devis personnalisé
        </button>
      </div>

    </div>
  );
}
