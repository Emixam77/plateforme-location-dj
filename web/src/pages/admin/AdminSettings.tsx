import { Save, Bell, Shield, Paintbrush } from 'lucide-react';

export function AdminSettings() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div className="admin-page-header">
        <div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>Paramètres</h2>
          <p style={{ color: 'var(--admin-text-muted)' }}>Configurez les options générales de votre plateforme de location.</p>
        </div>
        <button className="admin-btn">
          <Save size={20} /> Sauvegarder
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {/* Paramètres Généraux */}
        <div className="glass-panel" style={{ padding: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <Paintbrush size={24} color="var(--admin-accent)" />
            <h3 style={{ fontSize: '1.2rem', margin: 0 }}>Général & Apparence</h3>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="form-group">
              <label>Nom du site / Entreprise</label>
              <input type="text" className="admin-input" defaultValue="AudioRent Pro" />
            </div>
            <div className="form-group">
              <label>Devise d'affichage</label>
              <select className="admin-input" defaultValue="EUR">
                <option value="EUR">Euro (€)</option>
                <option value="USD">Dollar ($)</option>
                <option value="CHF">Franc Suisse (CHF)</option>
              </select>
            </div>
            <div className="form-group">
              <label>Message d'accueil catalogue</label>
              <textarea className="admin-input" style={{ minHeight: '80px', resize: 'vertical' }} defaultValue="Location de matériel audiovisuel haute fidélité pour vos événements." />
            </div>
          </div>
        </div>

        {/* Paramètres Notifications */}
        <div className="glass-panel" style={{ padding: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <Bell size={24} color="#3b82f6" />
            <h3 style={{ fontSize: '1.2rem', margin: 0 }}>Notifications & Alertes</h3>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
              <input type="checkbox" defaultChecked style={{ width: '18px', height: '18px', accentColor: 'var(--admin-accent)' }} />
              <span>Recevoir un e-mail à chaque nouvelle réservation</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
              <input type="checkbox" defaultChecked style={{ width: '18px', height: '18px', accentColor: 'var(--admin-accent)' }} />
              <span>Alerte SMS pour les retours prévus aujourd'hui</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
              <input type="checkbox" style={{ width: '18px', height: '18px', accentColor: 'var(--admin-accent)' }} />
              <span>Alerter si stock faible (taux de rotation &gt; 90%)</span>
            </label>
          </div>
        </div>

        {/* Paramètres Sécurité */}
        <div className="glass-panel" style={{ padding: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <Shield size={24} color="var(--admin-danger)" />
            <h3 style={{ fontSize: '1.2rem', margin: 0 }}>Sécurité & Paiement</h3>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="form-group">
              <label>Montant de la caution par défaut (%)</label>
              <input type="number" className="admin-input" defaultValue="15" />
            </div>
            <div className="form-group">
              <label>Délai minimum avant réservation (en heures)</label>
              <input type="number" className="admin-input" defaultValue="24" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
