import { BrowserRouter as Router, Routes, Route, Link, Outlet } from 'react-router-dom';
import { ShoppingCart, User } from 'lucide-react';
import { Catalog } from './pages/Catalog';
import { ProductDetail } from './pages/ProductDetail';
import { ProductDetail } from './pages/ProductDetail';
import { Packs } from './pages/Packs';
import { Services } from './pages/Services';
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminProducts } from './pages/admin/AdminProducts';
import { AdminSettings } from './pages/admin/AdminSettings';
import './index.css';


function Home() {
  // Rendu simplifié d'accueil avec Background Image a 40%
  return (
    <div className="main-content" style={{ position: 'relative', overflow: 'hidden' }}>
      
      {/* Background Image Layer */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: "url('/studio-bg.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.2,
        zIndex: 0
      }} />

      {/* Content Layer */}
      <section className="hero" style={{ position: 'relative', zIndex: 1 }}>
        <h1>Équipement Pro. <br/>Sans compromis.</h1>
        <p>Location de matériel audiovisuel haute fidélité pour vos événements professionnels et privés.</p>
        <span className="signature-text">Testé et approuvé par nos techniciens</span>
        
        <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Link to="/catalog" className="btn-primary">Voir le Catalogue <ShoppingCart size={18}/></Link>
        </div>
      </section>
    </div>
  );
}

function Layout() {
  
  return (
    <div className="app-container">
      <header className="header" style={{ borderBottom: '3px solid var(--accent)' }}>
        <Link to="/" className="logo" style={{ display: 'flex', flexDirection: 'column', lineHeight: '1.1', textDecoration: 'none' }}>
          <div style={{ fontWeight: 'bold' }}>AUDIO<span style={{ color: 'var(--accent)' }}>RENT</span></div>
          <span style={{ fontSize: '0.55rem', fontWeight: 'bold', letterSpacing: '1.5px', opacity: 0.9, color: 'var(--text-main)', marginTop: '2px' }}>ANGELO ENTERTAINMENT</span>
        </Link>
        
        <nav className="nav-links">
          <Link to="/catalog">Matériel</Link>
          <Link to="/packs">Packs</Link>
          <Link to="/services">Services</Link>
        </nav>
        
        <div className="nav-links">
          <Link title="Administration" to="/admin"><User size={20} /></Link>
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
    </Router>
  );
}

export default App;
