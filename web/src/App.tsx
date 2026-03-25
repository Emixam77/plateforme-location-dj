import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Outlet } from 'react-router-dom';
import { User, Menu as MenuIcon, X } from 'lucide-react';
import { Home } from './pages/Home';
import { Catalog } from './pages/Catalog';
import { Packs } from './pages/Packs';
import { Services } from './pages/Services';
import { ProductDetail } from './pages/ProductDetail';
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminProducts } from './pages/admin/AdminProducts';
import { AdminSettings } from './pages/admin/AdminSettings';
import { QuoteProvider } from './context/QuoteContext';
import { QuoteModal } from './components/QuoteModal';
import './index.css';

function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="app-container">
      <header className="header" style={{ borderBottom: '3px solid var(--accent)' }}>
        <Link to="/" className="logo" onClick={() => setIsMenuOpen(false)} style={{ display: 'flex', flexDirection: 'column', lineHeight: '1.1', textDecoration: 'none' }}>
          <div style={{ fontWeight: 'bold' }}>AUDIO<span style={{ color: 'var(--accent)' }}>RENT</span></div>
          <span style={{ fontSize: '0.55rem', fontWeight: 'bold', letterSpacing: '1.5px', opacity: 0.9, color: 'var(--text-main)', marginTop: '2px' }}>ANGELO ENTERTAINMENT</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="nav-links desktop-only">
          <Link to="/catalog">Matériel</Link>
          <Link to="/packs">Packs</Link>
          <Link to="/services">Services</Link>
          <Link title="Administration" to="/admin"><User size={20} /></Link>
        </nav>

        {/* Hamburger Button (Mobile Only) */}
        <button 
          className="mobile-menu-btn mobile-only" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={28} /> : <MenuIcon size={28} />}
        </button>

        {/* Mobile Navigation Overlay */}
        <div className={`mobile-menu-overlay ${isMenuOpen ? 'open' : ''}`}>
          <nav className="mobile-nav-links">
            <Link to="/catalog" onClick={() => setIsMenuOpen(false)}>Matériel</Link>
            <Link to="/packs" onClick={() => setIsMenuOpen(false)}>Packs</Link>
            <Link to="/services" onClick={() => setIsMenuOpen(false)}>Services</Link>
            <Link to="/admin" onClick={() => setIsMenuOpen(false)}>Administration</Link>
          </nav>
        </div>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}

function App() {
  return (
    <QuoteProvider>
      <Router>
        <Routes>
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>

            {/* Public Routes */}
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/catalog" element={<Catalog />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/packs" element={<Packs />} />
              <Route path="/services" element={<Services />} />
            </Route>
        </Routes>
        <QuoteModal />
      </Router>
    </QuoteProvider>
  );
}

export default App;
