import { useEffect } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, Settings, LogOut, Activity } from 'lucide-react';
import '../../admin.css'; // Import specific admin styles

export function AdminLayout() {
  const location = useLocation();
  
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

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <NavLink to="/admin" className="admin-logo">
          <Activity size={28} color="var(--admin-accent)" />
          AUDIO<span>ADMIN</span>
        </NavLink>
        
        <nav className="admin-nav">
          <NavLink 
            to="/admin" 
            end
            className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
          >
            <LayoutDashboard size={20} />
            Vue d'ensemble
          </NavLink>
          
          <NavLink 
            to="/admin/products" 
            className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
          >
            <Package size={20} />
            Inventaire
          </NavLink>
          
          <NavLink 
            to="/admin/settings" 
            className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
          >
            <Settings size={20} />
            Paramètres
          </NavLink>
        </nav>
        
        <div style={{ marginTop: 'auto' }}>
          <NavLink to="/" className="admin-nav-item" style={{ color: 'var(--admin-danger)' }}>
            <LogOut size={20} />
            Quitter l'Admin
          </NavLink>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="admin-main">
        <header className="admin-topbar">
          <h1>{getHeaderTitle()}</h1>
          
          <div className="admin-user">
            <span style={{ color: 'var(--admin-text-muted)', fontSize: '0.9rem' }}>Admin Principal</span>
            <div className="admin-avatar">A</div>
          </div>
        </header>
        
        <div className="admin-content-inner">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
