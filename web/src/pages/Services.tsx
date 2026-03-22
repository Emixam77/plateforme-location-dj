import { Truck, Wrench, ShieldCheck, Headphones } from 'lucide-react';

export function Services() {
  return (
    <div className="main-content" style={{ padding: '60px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      
      {/* Hero Section */}
      <div style={{ textAlign: 'center', marginBottom: '80px' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '16px' }}>Services Professionnels</h1>
        <p style={{ fontSize: '1.2rem', color: '#666', maxWidth: '700px', margin: '0 auto' }}>
          Au-delà de la simple location de matériel, nous vous accompagnons sur le terrain pour garantir la réussite totale de votre événement. Configurez votre prestation sur mesure.
        </p>
      </div>

      {/* Services Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '40px' }}>
        
        <div style={{ display: 'flex', gap: '24px', padding: '32px', background: '#f9fafb', borderRadius: '16px', border: '1px solid #eee' }}>
          <div style={{ background: '#fff', padding: '16px', borderRadius: '12px', height: 'fit-content', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
            <Truck size={32} color="var(--accent)" />
          </div>
          <div>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '12px' }}>Livraison & Installation</h3>
            <p style={{ color: '#666', lineHeight: '1.6', marginBottom: '16px' }}>
              Ne vous souciez plus de la logistique. Notre équipe achemine le matériel directement sur le lieu de votre événement, procède au montage intégral et aux tests sonores.
            </p>
            <span style={{ fontWeight: 600, color: 'var(--accent)' }}>Sur devis (selon distance et volume)</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '24px', padding: '32px', background: '#f9fafb', borderRadius: '16px', border: '1px solid #eee' }}>
          <div style={{ background: '#fff', padding: '16px', borderRadius: '12px', height: 'fit-content', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
            <Headphones size={32} color="var(--accent)" />
          </div>
          <div>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '12px' }}>Technicien sur place</h3>
            <p style={{ color: '#666', lineHeight: '1.6', marginBottom: '16px' }}>
              Un ingénieur du son ou un Light Jockey professionnel pour gérer la régie pendant toute la durée de votre événement. L'assurance d'une prestation parfaitement maîtrisée.
            </p>
            <span style={{ fontWeight: 600, color: 'var(--accent)' }}>À partir de 350 € / prestation</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '24px', padding: '32px', background: '#f9fafb', borderRadius: '16px', border: '1px solid #eee' }}>
          <div style={{ background: '#fff', padding: '16px', borderRadius: '12px', height: 'fit-content', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
            <ShieldCheck size={32} color="var(--accent)" />
          </div>
          <div>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '12px' }}>Assurance Annulation</h3>
            <p style={{ color: '#666', lineHeight: '1.6', marginBottom: '16px' }}>
              Protégez votre budget en cas d'imprévu. Annulation gratuite jusqu'à 24h avant l'événement avec remboursement intégral de l'acompte.
            </p>
            <span style={{ fontWeight: 600, color: 'var(--accent)' }}>+ 5% du montant total</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '24px', padding: '32px', background: '#f9fafb', borderRadius: '16px', border: '1px solid #eee' }}>
          <div style={{ background: '#fff', padding: '16px', borderRadius: '12px', height: 'fit-content', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
            <Wrench size={32} color="var(--accent)" />
          </div>
          <div>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '12px' }}>Assistance H24 (Astreinte)</h3>
            <p style={{ color: '#666', lineHeight: '1.6', marginBottom: '16px' }}>
              Même à 3h du matin, en cas de panne technique imprévue sur un équipement, nous intervenons pour un remplacement standard en moins de 2 heures.
            </p>
            <span style={{ fontWeight: 600, color: 'var(--accent)' }}>Inclus gratuitement sur les Packs Pro</span>
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
