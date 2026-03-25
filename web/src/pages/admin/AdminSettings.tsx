import { useEffect, useState } from 'react';
import { Save, Bell, Paintbrush, Phone, Loader2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export function AdminSettings() {
  const [settings, setSettings] = useState<any>({
    site_name: 'AudioRent Pro',
    contact_email: 'contact@audiorent.com',
    contact_phone: '07 54 24 81 83',
    currency: 'EUR'
  });
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchSettings();
  }, []);

  async function fetchSettings() {
    setLoading(true);
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .single();

    if (data && !error) {
      setSettings(data);
    }
    setLoading(false);
  }

  async function handleSave() {
    setIsSaving(true);
    const { error } = await supabase
      .from('site_settings')
      .upsert({ id: 1, ...settings });

    if (!error) {
      setMessage('Paramètres enregistrés avec succès !');
      setTimeout(() => setMessage(''), 3000);
    } else {
      alert("Erreur lors de la sauvegarde : " + error.message);
    }
    setIsSaving(false);
  }

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
        <Loader2 className="animate-spin" size={40} color="var(--admin-accent)" />
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div className="admin-page-header">
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Paramètres</h2>
          <p style={{ color: 'var(--admin-text-muted)' }}>Configurez les options générales de votre plateforme.</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {message && <span style={{ color: 'var(--admin-success)', fontSize: '0.9rem', fontWeight: 600 }}>{message}</span>}
          <button className="admin-btn" onClick={handleSave} disabled={isSaving}>
            {isSaving ? <Loader2 className="animate-spin" size={20} /> : <><Save size={20} /> Sauvegarder</>}
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {/* Coordonnées de Devis */}
        <div className="glass-panel" style={{ padding: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <div style={{ background: 'var(--admin-accent-soft)', padding: '10px', borderRadius: '10px' }}>
              <Phone size={24} color="var(--admin-accent)" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', margin: 0 }}>Contact Devis</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--admin-text-muted)', margin: 0 }}>Ces informations apparaîtront sur la modale de demande de devis.</p>
            </div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="form-group">
              <label>Téléphone de contact</label>
              <input 
                type="text" 
                className="admin-input" 
                value={settings.contact_phone || ''} 
                onChange={e => setSettings({...settings, contact_phone: e.target.value})}
                placeholder="07 XX XX XX XX" 
              />
            </div>
            <div className="form-group">
              <label>Email de contact</label>
              <input 
                type="email" 
                className="admin-input" 
                value={settings.contact_email || ''} 
                onChange={e => setSettings({...settings, contact_email: e.target.value})}
                placeholder="contact@audiorent.com" 
              />
            </div>
          </div>
        </div>

        {/* Paramètres Généraux */}
        <div className="glass-panel" style={{ padding: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <div style={{ background: 'var(--admin-bg)', padding: '10px', borderRadius: '10px' }}>
              <Paintbrush size={24} color="var(--admin-text-muted)" />
            </div>
            <h3 style={{ fontSize: '1.1rem', margin: 0 }}>Apparence du site</h3>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="form-group">
              <label>Nom de l'entreprise</label>
              <input 
                type="text" 
                className="admin-input" 
                value={settings.site_name || ''} 
                onChange={e => setSettings({...settings, site_name: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>Devise d'affichage</label>
              <select 
                className="admin-input" 
                value={settings.currency || 'EUR'}
                onChange={e => setSettings({...settings, currency: e.target.value})}
              >
                <option value="EUR">Euro (€)</option>
                <option value="USD">Dollar ($)</option>
                <option value="CHF">Franc Suisse (CHF)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Paramètres Notifications (Demo) */}
        <div className="glass-panel" style={{ padding: '32px', opacity: 0.6 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <Bell size={24} color="var(--admin-text-muted)" />
            <h3 style={{ fontSize: '1.1rem', margin: 0 }}>Notifications (Bientôt disponible)</h3>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '12px', pointerEvents: 'none' }}>
              <input type="checkbox" disabled style={{ width: '18px', height: '18px' }} />
              <span>Recevoir un e-mail à chaque demande de devis</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
