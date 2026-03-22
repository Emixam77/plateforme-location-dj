import { BrowserRouter as Router, Routes, Route, Link, Outlet } from 'react-router-dom';
import { ShoppingCart, User } from 'lucide-react';
import { Catalog } from './pages/Catalog';
import { ProductDetail } from './pages/ProductDetail';
import { Cart } from './pages/Cart';
import { Packs } from './pages/Packs';
import { Services } from './pages/Services';
import { CartProvider, useCart } from './context/CartContext';
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
  const { totalItems } = useCart();
  
  return (
    <div className="app-container">
      <header className="header" style={{ borderBottom: '3px solid var(--accent)' }}>
        <Link to="/" className="logo">
          AUDIO<span style={{ color: 'var(--accent)' }}>RENT</span>
        </Link>
        
        <nav className="nav-links">
          <Link to="/catalog">Matériel</Link>
          <Link to="/packs">Packs</Link>
          <Link to="/services">Services</Link>
        </nav>
        
        <div className="nav-links">
          <Link to="/login"><User size={20} /></Link>
          <Link to="/cart" style={{ position: 'relative' }}>
            <ShoppingCart size={20} />
            {totalItems > 0 && (
              <span style={{ position: 'absolute', top: '-8px', right: '-12px', background: 'var(--accent)', color: '#000', fontSize: '0.7rem', padding: '2px 6px', borderRadius: '10px', fontWeight: 'bold' }}>
                {totalItems}
              </span>
            )}
          </Link>
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
      <CartProvider>
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
            <Route path="/cart" element={<Cart />} />
            <Route path="/packs" element={<Packs />} />
            <Route path="/services" element={<Services />} />
          </Route>
        </Routes>
      </CartProvider>
    </Router>
  );
}

export default App;
