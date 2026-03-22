import { useState } from 'react';
import { Plus, X, Search, Edit2 } from 'lucide-react';

const MOCK_INVENTORY = [
  { id: 1, brand: 'Pioneer DJ', name: 'CDJ-3000', price: 85, status: 'disponible', category: 'Platine', image: 'https://images.unsplash.com/photo-1598653222000-6b7b7a552625?auto=format&fit=crop&w=400&q=80' },
  { id: 2, brand: 'L-Acoustics', name: 'Syva', price: 350, status: 'loué', category: 'Sonorisation', image: 'https://images.unsplash.com/photo-1505235687559-28b5f54645b7?auto=format&fit=crop&w=400&q=80' },
  { id: 3, brand: 'Pioneer DJ', name: 'DJM-900NXS2', price: 70, status: 'maintenance', category: 'Table Mixage', image: 'https://images.unsplash.com/photo-1516280440502-3114995f5108?auto=format&fit=crop&w=400&q=80' },
  { id: 4, brand: 'Chauvet', name: 'Intimidator Spot', price: 45, status: 'disponible', category: 'Lumière', image: 'https://images.unsplash.com/photo-1533069158021-f09971050e82?auto=format&fit=crop&w=400&q=80' }
];

export function AdminProducts() {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  const openDrawer = (item: any = null) => {
    setEditingItem(item);
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    setTimeout(() => setEditingItem(null), 300); // Clear after animation
  };

  const renderBadge = (status: string) => {
    switch (status) {
      case 'disponible': return <span className="badge badge-success">Dispo</span>;
      case 'loué': return <span className="badge badge-warning">En Location</span>;
      case 'maintenance': return <span className="badge badge-danger">Maintenance</span>;
      default: return null;
    }
  };

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>Inventaire Matériel</h2>
          <p style={{ color: 'var(--admin-text-muted)' }}>Gérez vos équipements, tarifs et disponibilités.</p>
        </div>
        <button className="admin-btn" onClick={() => openDrawer(null)}>
          <Plus size={20} /> Ajouter un Produit
        </button>
      </div>

      {/* Quick Search */}
      <div style={{ marginBottom: '24px', position: 'relative', width: '300px' }}>
        <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--admin-text-muted)' }} />
        <input 
          type="text" 
          placeholder="Rechercher (ex: Pioneer, Enceinte...)" 
          className="admin-input"
          style={{ width: '100%', paddingLeft: '40px' }}
        />
      </div>

      {/* Grid */}
      <div className="admin-inventory-grid">
        {MOCK_INVENTORY.map(item => (
          <div key={item.id} className="glass-panel admin-product-card" onClick={() => openDrawer(item)}>
            <img src={item.image} alt={item.name} className="admin-product-img" />
            <div className="admin-product-info">
              <div className="admin-product-header">
                <span className="admin-product-brand">{item.brand}</span>
                {renderBadge(item.status)}
              </div>
              <h3 className="admin-product-title">{item.name}</h3>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
                <span className="admin-product-price">{item.price} € <span style={{fontSize:'0.8rem', color:'var(--admin-text-muted)', fontWeight: 'normal'}}>/jour</span></span>
                <Edit2 size={16} color="var(--admin-text-muted)" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Drawer Overlay */}
      <div className={`admin-drawer-overlay ${isDrawerOpen ? 'open' : ''}`} onClick={closeDrawer} />
      
      {/* Sliding Drawer */}
      <div className={`admin-drawer ${isDrawerOpen ? 'open' : ''}`}>
        <div className="drawer-header">
          <h3 style={{ fontSize: '1.25rem' }}>{editingItem ? 'Modifier le Produit' : 'Nouvel Équipement'}</h3>
          <button onClick={closeDrawer} style={{ background: 'transparent', border: 'none', color: 'var(--admin-text)', cursor: 'pointer' }}>
            <X size={24} />
          </button>
        </div>
        
        <div className="drawer-body">
          <div className="form-group">
            <label>Nom du produit</label>
            <input type="text" className="admin-input" defaultValue={editingItem?.name || ''} placeholder="ex: CDJ-3000" />
          </div>
          <div className="form-group">
            <label>Marque</label>
            <input type="text" className="admin-input" defaultValue={editingItem?.brand || ''} placeholder="ex: Pioneer DJ" />
          </div>
          <div className="form-group">
            <label>Catégorie</label>
            <select className="admin-input" defaultValue={editingItem?.category || ''}>
              <option value="Platine">Platine / Lecteur</option>
              <option value="Table Mixage">Table de Mixage</option>
              <option value="Sonorisation">Sonorisation</option>
              <option value="Lumière">Lumière</option>
              <option value="Câblage">Câblage / Accessoires</option>
            </select>
          </div>
          <div className="form-group" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group" style={{ padding: 0 }}>
              <label>Prix par jour (€)</label>
              <input type="number" className="admin-input" defaultValue={editingItem?.price || ''} placeholder="0.00" />
            </div>
            <div className="form-group" style={{ padding: 0 }}>
              <label>Statut</label>
              <select className="admin-input" defaultValue={editingItem?.status || 'disponible'}>
                <option value="disponible">Disponible</option>
                <option value="loué">En Location</option>
                <option value="maintenance">En Maintenance</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label>Description technique</label>
            <textarea 
              className="admin-input" 
              defaultValue={editingItem?.description || ''} 
              placeholder="ex: Puissance 1000W RMS, Connectique XLR, Poids 21kg..."
              style={{ minHeight: '100px', resize: 'vertical' }}
            />
          </div>
          <div className="form-group">
            <label>URL de l'image</label>
            <input type="text" className="admin-input" defaultValue={editingItem?.image || ''} placeholder="https://..." />
            {editingItem?.image && (
              <img src={editingItem.image} alt="Preview" style={{ marginTop: '12px', width: '100%', height: '160px', objectFit: 'cover', borderRadius: '8px', border: '1px solid var(--admin-border)' }} />
            )}
          </div>
        </div>

        <div className="drawer-footer">
          <button className="admin-btn admin-btn-outline" onClick={closeDrawer}>Annuler</button>
          <button className="admin-btn">Sauvegarder</button>
        </div>
      </div>
    </div>
  );
}
