
import { TrendingUp, PackageSearch, AlertCircle, CalendarClock } from 'lucide-react';

export function AdminDashboard() {
  return (
    <div>
      {/* KPI Cards */}
      <div className="admin-kpi-grid">
        <div className="glass-panel admin-kpi-card">
          <div className="kpi-icon">
            <TrendingUp size={24} />
          </div>
          <div className="kpi-title">Revenus (Ce mois)</div>
          <div className="kpi-value">3 450 €</div>
          <div style={{ color: 'var(--admin-success)', fontSize: '0.85rem', fontWeight: 600 }}>
            +12% vs mois dernier
          </div>
        </div>
        
        <div className="glass-panel admin-kpi-card">
          <div className="kpi-icon" style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}>
            <CalendarClock size={24} />
          </div>
          <div className="kpi-title">Locations en cours</div>
          <div className="kpi-value">8</div>
          <div style={{ color: 'var(--admin-text-muted)', fontSize: '0.85rem' }}>
            3 retours prévus aujourd'hui
          </div>
        </div>
        
        <div className="glass-panel admin-kpi-card">
          <div className="kpi-icon" style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--admin-success)' }}>
            <PackageSearch size={24} />
          </div>
          <div className="kpi-title">Taux de rotation</div>
          <div className="kpi-value">64%</div>
          <div style={{ color: 'var(--admin-text-muted)', fontSize: '0.85rem' }}>
            Parc globalement bien loué
          </div>
        </div>
        
        <div className="glass-panel admin-kpi-card">
          <div className="kpi-icon" style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--admin-danger)' }}>
            <AlertCircle size={24} />
          </div>
          <div className="kpi-title">À vérifier</div>
          <div className="kpi-value">2</div>
          <div style={{ color: 'var(--admin-warning)', fontSize: '0.85rem', fontWeight: 600 }}>
            1 Maintenance requise
          </div>
        </div>
      </div>

      {/* Placeholder for future charts or recent activity */}
      <div className="glass-panel" style={{ padding: '24px', minHeight: '300px' }}>
        <h2 style={{ fontSize: '1.1rem', marginBottom: '20px' }}>Activité Récente</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {[1, 2, 3].map((i) => (
            <div key={i} style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              padding: '16px',
              background: 'var(--admin-surface)',
              borderRadius: '12px'
            }}>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--admin-accent)' }}></div>
                <div>
                  <div style={{ fontWeight: 600 }}>Location Pack DJ Pro</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--admin-text-muted)' }}>Réservé par Thomas D. • CDJ-3000 + DJM-900</div>
                </div>
              </div>
              <div style={{ fontWeight: 'bold' }}>250 €</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
