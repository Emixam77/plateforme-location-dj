import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';

export function Home() {
  return (
    <div className="main-content" style={{ position: 'relative', overflow: 'hidden' }}>
      
      {/* Background Image Layer */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: "url('/angelo-hero.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.4,
        zIndex: 0
      }} />

      {/* Content Layer */}
      <section className="hero" style={{ position: 'relative', zIndex: 1 }}>
        <img 
          src="/angelo-logo-hero.png" 
          alt="Angelo Entertainment" 
          style={{ 
            maxWidth: '500px', 
            width: '90%', 
            height: 'auto',
            marginBottom: '1rem',
            filter: 'drop-shadow(0 0 15px rgba(255,255,255,0.3))'
          }} 
        />
        <p>SOLUTION AUDIO - VISUELLE SUR MESURE</p>
        
        <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Link to="/catalog" className="btn-primary">Voir le matériel <ShoppingCart size={18}/></Link>
        </div>
      </section>
    </div>
  );
}
