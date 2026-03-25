import { useEffect, useState } from 'react';
import { Plus, X, Search, Edit2, Trash2, Loader2, LayoutGrid, List } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export function AdminProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');

  // Form states
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    const { data: productsData } = await supabase
      .from('equipments')
      .select('*, categories(name, slug)')
      .order('created_at', { ascending: false });
    
    const { data: categoriesData } = await supabase
      .from('categories')
      .select('*');

    if (productsData) setProducts(productsData);
    if (categoriesData) setCategories(categoriesData);
    setLoading(false);
  }

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openDrawer = (item: any = null) => {
    setEditingItem(item);
    setFormData(item || {
      name: '',
      brand: '',
      category_id: categories[0]?.id || '',
      daily_price: 0,
      description: '',
      image_url: '',
      is_active: true
    });
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    setTimeout(() => {
      setEditingItem(null);
      setFormData({});
    }, 300);
  };

  const handleSave = async () => {
    setIsSaving(true);
    const { error } = await supabase
      .from('equipments')
      .upsert({
        id: editingItem?.id || undefined,
        ...formData
      });

    if (!error) {
      await fetchData();
      closeDrawer();
    } else {
      alert("Erreur lors de la sauvegarde : " + error.message);
    }
    setIsSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cet équipement ?")) return;
    
    const { error } = await supabase
      .from('equipments')
      .delete()
      .eq('id', id);

    if (!error) {
      setProducts(prev => prev.filter(p => p.id !== id));
      if (editingItem?.id === id) closeDrawer();
    } else {
      alert("Erreur lors de la suppression : " + error.message);
    }
  };

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Inventaire Matériel</h2>
          <p style={{ color: 'var(--admin-text-muted)', fontSize: '0.9rem' }}>{products.length} équipements enregistrés</p>
        </div>
        <button className="admin-btn" onClick={() => openDrawer(null)}>
          <Plus size={18} /> Ajouter un Produit
        </button>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', gap: '20px' }}>
        <div style={{ position: 'relative', flex: 1, maxWidth: '400px' }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--admin-text-muted)' }} />
          <input 
            type="text" 
            placeholder="Rechercher par nom ou marque..." 
            className="admin-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ paddingLeft: '40px' }}
          />
        </div>
        
        <div className="glass-panel" style={{ display: 'flex', padding: '4px', gap: '4px' }}>
          <button 
            onClick={() => setViewMode('grid')}
            style={{ 
              padding: '6px 10px', 
              borderRadius: '6px', 
              background: viewMode === 'grid' ? 'var(--admin-bg)' : 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: viewMode === 'grid' ? 'var(--admin-accent)' : 'var(--admin-text-muted)'
            }}
          >
            <LayoutGrid size={18} />
          </button>
          <button 
            onClick={() => setViewMode('list')}
            style={{ 
              padding: '6px 10px', 
              borderRadius: '6px', 
              background: viewMode === 'list' ? 'var(--admin-bg)' : 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: viewMode === 'list' ? 'var(--admin-accent)' : 'var(--admin-text-muted)'
            }}
          >
            <List size={18} />
          </button>
        </div>
      </div>

      {loading ? (
        <div style={{ padding: '8rem 0', textAlign: 'center' }}>
          <Loader2 className="animate-spin" size={40} color="var(--admin-accent)" />
          <p style={{ marginTop: '16px', color: 'var(--admin-text-muted)' }}>Chargement de l'inventaire...</p>
        </div>
      ) : (
        <div className={viewMode === 'grid' ? 'admin-inventory-grid' : ''} style={viewMode === 'list' ? { display: 'flex', flexDirection: 'column', gap: '12px' } : {}}>
          {filteredProducts.map(item => (
            <div 
              key={item.id} 
              className="admin-product-card" 
              onClick={() => openDrawer(item)}
              style={viewMode === 'list' ? { 
                flexDirection: 'row', 
                alignItems: 'center', 
                padding: '12px 20px',
                height: 'auto'
              } : {}}
            >
              <img 
                src={item.image_url} 
                alt={item.name} 
                className="admin-product-img" 
                style={viewMode === 'list' ? { width: '80px', height: '60px', borderRadius: '8px', border: 'none' } : {}}
              />
              <div className="admin-product-info" style={viewMode === 'list' ? { flex: 1, padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' } : {}}>
                <div style={viewMode === 'list' ? { flex: 1 } : {}}>
                  <div className="admin-product-brand">{item.brand}</div>
                  <h3 className="admin-product-title" style={viewMode === 'list' ? { margin: 0, fontSize: '1rem' } : {}}>{item.name}</h3>
                </div>
                
                <div style={viewMode === 'list' ? { display: 'flex', alignItems: 'center', gap: '40px', minWidth: '300px', justifyContent: 'flex-end' } : {}}>
                  <span className={`badge ${item.is_active ? 'badge-success' : 'badge-danger'}`}>
                    {item.is_active ? 'Actif' : 'Masqué'}
                  </span>
                  <span className="admin-product-price" style={viewMode === 'list' ? { fontSize: '1.1rem', width: '100px', textAlign: 'right' } : {}}>
                    {item.daily_price} €
                  </span>
                  <Edit2 size={16} color="var(--admin-text-muted)" />
                </div>
              </div>
            </div>
          ))}
          {filteredProducts.length === 0 && (
            <div style={{ padding: '4rem', textAlign: 'center', background: 'white', borderRadius: '12px', border: '1px dashed var(--admin-border)' }}>
              <p style={{ color: 'var(--admin-text-muted)' }}>Aucun produit ne correspond à votre recherche.</p>
            </div>
          )}
        </div>
      )}

      {/* Drawer */}
      <div className={`admin-drawer-overlay ${isDrawerOpen ? 'open' : ''}`} onClick={closeDrawer} />
      
      <div className={`admin-drawer ${isDrawerOpen ? 'open' : ''}`}>
        <div className="drawer-header">
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>{editingItem ? 'Modifier le produit' : 'Nouvel équipement'}</h3>
            {editingItem && <p style={{ fontSize: '0.8rem', color: 'var(--admin-text-muted)', marginTop: '4px' }}>ID: {editingItem.id}</p>}
          </div>
          <button onClick={closeDrawer} style={{ background: 'var(--admin-bg)', border: 'none', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>
        
        <div className="drawer-body">
          {/* Section: Informations générales */}
          <div>
            <h4 className="form-section-title">Informations Générales</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
              <div className="form-group">
                <label>Nom de l'équipement</label>
                <input 
                  type="text" 
                  className="admin-input" 
                  value={formData.name || ''} 
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  placeholder="ex: CDJ-3000" 
                />
              </div>
              <div className="form-group">
                <label>Marque</label>
                <input 
                  type="text" 
                  className="admin-input" 
                  value={formData.brand || ''} 
                  onChange={e => setFormData({...formData, brand: e.target.value})}
                  placeholder="ex: Pioneer DJ" 
                />
              </div>
              <div className="form-group">
                <label>Catégorie</label>
                <select 
                  className="admin-input" 
                  value={formData.category_id || ''}
                  onChange={e => setFormData({...formData, category_id: e.target.value})}
                >
                  <option value="">Sélectionner une catégorie</option>
                  {categories.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Section: Tarification & Visibilité */}
          <div>
            <h4 className="form-section-title">Tarification & Visibilité</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '16px' }}>
              <div className="form-group">
                <label>Prix / Jour (€)</label>
                <input 
                  type="number" 
                  className="admin-input" 
                  value={formData.daily_price || 0} 
                  onChange={e => setFormData({...formData, daily_price: parseFloat(e.target.value)})}
                  placeholder="0.00" 
                />
              </div>
              <div className="form-group">
                <label>Statut</label>
                <select 
                  className="admin-input" 
                  value={formData.is_active ? 'active' : 'inactive'}
                  onChange={e => setFormData({...formData, is_active: e.target.value === 'active'})}
                >
                  <option value="active">Actif (Visible)</option>
                  <option value="inactive">Inactif (Masqué)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section: Détails & Media */}
          <div>
            <h4 className="form-section-title">Détails & Media</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
              <div className="form-group">
                <label>Description technique</label>
                <textarea 
                  className="admin-input" 
                  value={formData.description || ''} 
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  placeholder="Spécifications, puissance, connectique..."
                  style={{ minHeight: '120px', resize: 'vertical' }}
                />
              </div>
              <div className="form-group">
                <label>URL de l'image</label>
                <input 
                  type="text" 
                  className="admin-input" 
                  value={formData.image_url || ''} 
                  onChange={e => setFormData({...formData, image_url: e.target.value})}
                  placeholder="https://images.unsplash.com/..." 
                />
                {formData.image_url && (
                  <div style={{ marginTop: '12px', position: 'relative' }}>
                    <img 
                      src={formData.image_url} 
                      alt="Preview" 
                      style={{ width: '100%', height: '160px', objectFit: 'cover', borderRadius: '12px', border: '1px solid var(--admin-border)' }} 
                    />
                    <div style={{ position: 'absolute', top: '8px', right: '8px', background: 'rgba(0,0,0,0.5)', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '0.7rem' }}>Aperçu</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="drawer-footer">
          <div>
            {editingItem && (
              <button 
                className="admin-btn" 
                style={{ background: '#fee2e2', color: '#991b1b', boxShadow: 'none' }}
                onClick={() => handleDelete(editingItem.id)}
              >
                <Trash2 size={18} />
              </button>
            )}
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button className="admin-btn admin-btn-outline" onClick={closeDrawer}>Annuler</button>
            <button className="admin-btn" onClick={handleSave} disabled={isSaving}>
              {isSaving ? <Loader2 className="animate-spin" size={18} /> : (editingItem ? 'Mettre à jour' : 'Créer le produit')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
