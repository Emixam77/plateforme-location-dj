import { useState } from 'react';
import { Search, MapPin, PackageOpen } from 'lucide-react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import '../pillbar.css';

export function PillSearchBar() {
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to?: Date }>({
    from: undefined,
  });

  return (
    <div className="pill-bar-container" style={{ padding: '0 1rem', marginTop: '-32px', position: 'relative', zIndex: 200 }}>
      <div className="pill-bar">
        
        {/* SECTION CATÉGORIE */}
        <div 
          className="pill-section"
          onMouseEnter={() => setHoveredSection('category')}
          onMouseLeave={() => setHoveredSection(null)}
        >
          <div className="pill-label">Catégorie</div>
          <div className="pill-value">Son, Lumière...</div>
          
          {hoveredSection === 'category' && (
            <div className="pill-dropdown" style={{ left: 0 }}>
              <div className="dropdown-item">Platines & DJ</div>
              <div className="dropdown-item">Sonorisation</div>
              <div className="dropdown-item">Lumière & FX</div>
            </div>
          )}
        </div>

        <div className="pill-divider"></div>

        {/* SECTION DATES */}
        <div 
          className="pill-section"
          onMouseEnter={() => setHoveredSection('dates')}
          onMouseLeave={() => setHoveredSection(null)}
        >
          <div className="pill-label">Dates</div>
          <div className="pill-value">
            {dateRange.from 
              ? `${dateRange.from.toLocaleDateString()}${dateRange.to ? ' - ' + dateRange.to.toLocaleDateString() : ''}`
              : 'Quand ?'}
          </div>
          
          {hoveredSection === 'dates' && (
            <div className="pill-dropdown" style={{ left: '50%', transform: 'translateX(-50%)', minWidth: 'auto', padding: '0.5rem', marginTop: '1rem' }}>
              <DayPicker
                mode="range"
                selected={dateRange as any}
                onSelect={setDateRange as any}
                styles={{
                  day: { borderRadius: '50%', margin: '0.1rem' },
                  day_selected: { backgroundColor: 'var(--accent)', color: '#000', fontWeight: 'bold' },
                  day_range_middle: { backgroundColor: 'var(--bg-secondary)', color: 'var(--text-main)' }
                }}
              />
            </div>
          )}
        </div>

        <div className="pill-divider"></div>

        {/* SECTION LOGISTIQUE */}
        <div 
          className="pill-section"
          onMouseEnter={() => setHoveredSection('location')}
          onMouseLeave={() => setHoveredSection(null)}
        >
          <div className="pill-label">Logistique</div>
          <div className="pill-value">Retrait ou Livraison</div>
          
          {hoveredSection === 'location' && (
            <div className="pill-dropdown" style={{ right: 0, left: 'auto', minWidth: '280px' }}>
              <div className="dropdown-item" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <MapPin size={20} />
                <div>
                  <div style={{ fontWeight: 600 }}>Retrait au Dépôt</div>
                  <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>Gratuit - Paris 11e</div>
                </div>
              </div>
              <div className="dropdown-item" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <PackageOpen size={20} />
                <div>
                  <div style={{ fontWeight: 600 }}>Livraison & Installation</div>
                  <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>Sur devis selon distance</div>
                </div>
              </div>
            </div>
          )}
        </div>

        <button className="pill-search-btn">
          <Search size={22} strokeWidth={2.5} />
        </button>

      </div>
    </div>
  );
}
