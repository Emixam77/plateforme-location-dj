import { BrowserRouter as Router, Routes, Route, Link, Outlet } from 'react-router-dom';
import { User } from 'lucide-react';
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
