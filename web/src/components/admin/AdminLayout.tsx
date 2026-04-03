import { useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, Settings, LogOut, Activity, Menu, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import '../../admin.css'; // Import specific admin styles

export function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Add dark mode body class on mount
  useEffect(() => {
    document.body.classList.add('admin-mode');
    return () => {
      document.body.classList.remove('admin-mode');
    };
  }, []);

  // Determine the title based on path
  const getHeaderTitle = () => {
    if (location.pathname.includes('/admin/products')) return 'Inventaire Matériel';
    if (location.pathname.includes('/admin/settings')) return 'Paramètres';
    return 'Tableau de Bord';
  };

  const closeSidebar = () => setIsSidebarOpen(false);

  const handleSignOut = async (e: React.MouseEvent) => {
    e.preventDefault();
    await signOut();
    navigate('/');
  };

  return (
    <div className="admin-container">
      {/* Sidebar Overlay (Mobile Only) */}
      <div 
        className={`admin-sidebar-overlay ${isSidebarOpen ? 'open' : ''}`} 
        onClick={closeSidebar}
      />

      {/* Sidebar */}
      <aside className={`admin-sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="admin-sidebar-header">
          <NavLink to="/admin" className="admin-logo" onClick={closeSidebar}>
            <Activity size={28} color="var(--admin-accent)" />
            AUDIO<span>ADMIN</span>
          </NavLink>
          <button className="admin-close-btn mobile-only" onClick={closeSidebar}>
            <X size={24} />
          </button>
        </div>
        
        <nav className="admin-nav">
          <NavLink 
            to="/admin" 
            end
            className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
            onClick={closeSidebar}
          >
            <LayoutDashboard size={20} />
            Vue d'ensemble
          </NavLink>
          
          <NavLink 
            to="/admin/products" 
            className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
            onClick={closeSidebar}
          >
            <Package size={20} />
            Inventaire
          </NavLink>
          
          <NavLink 
            to="/admin/settings" 
            className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
            onClick={closeSidebar}
          >
            <Settings size={20} />
            Paramètres
          </NavLink>
        </nav>
        
        <div style={{ marginTop: 'auto' }}>
          <button 
            onClick={handleSignOut} 
            className="admin-nav-item" 
            style={{ 
              color: 'var(--admin-danger)', 
              width: '100%', 
              background: 'none', 
              border: 'none', 
              cursor: 'pointer',
              textAlign: 'left'
            }}
          >
            <LogOut size={20} />
            Déconnexion
          </button>
          
          <NavLink to="/" className="admin-nav-item" onClick={closeSidebar}>
            <LogOut size={20} style={{ transform: 'rotate(180deg)' }} />
            Retour au site
          </NavLink>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="admin-main">
        <header className="admin-topbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button className="admin-menu-toggle mobile-only" onClick={() => setIsSidebarOpen(true)}>
              <Menu size={24} />
            </button>
            <h1>{getHeaderTitle()}</h1>
          </div>
          
          <div className="admin-user">
            <span style={{ color: 'var(--admin-text-muted)', fontSize: '0.9rem' }} className="desktop-only">
              {user?.email || 'Administrateur'}
            </span>
            <div className="admin-avatar">
              {user?.email ? user.email[0].toUpperCase() : 'A'}
            </div>
          </div>
        </header>
        
        <div className="admin-content-inner">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
