import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Activity, Mail, Lock, LogIn, UserPlus } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import '../../admin.css';

export function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/admin';

  useEffect(() => {
    // If already logged in, redirect
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) navigate(from, { replace: true });
    });
  }, [navigate, from]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err.message || 'Erreur lors de la connexion');
    } finally {
      setLoading(false);
    }
  };

  const createTestAdmin = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Trying to sign up a test user
      // Note: This requires "Allow Signup" to be enabled in Supabase settings
      const { error } = await supabase.auth.signUp({
        email: 'admin@test.com',
        password: 'password123',
      });

      if (error) throw error;
      
      setSuccess('Compte test créé ! Identifiants : admin@test.com / password123 (Vérifiez vos emails si la confirmation est activée)');
      setEmail('admin@test.com');
      setPassword('password123');
    } catch (err: any) {
      setError(err.message || 'Erreur lors de la création du compte test');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">
            <Activity size={32} color="var(--admin-accent)" />
            AUDIO<span>ADMIN</span>
          </div>
          <p className="auth-subtitle">Espace d'administration sécurisé</p>
        </div>

        {error && <div className="auth-error">{error}</div>}
        {success && <div className="auth-success">{success}</div>}

        <form className="auth-form" onSubmit={handleLogin}>
          <div className="auth-field">
            <label className="auth-label" htmlFor="email">Email</label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--admin-text-muted)' }} />
              <input
                id="email"
                type="email"
                className="admin-input"
                style={{ paddingLeft: '40px' }}
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="auth-field">
            <label className="auth-label" htmlFor="password">Mot de passe</label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--admin-text-muted)' }} />
              <input
                id="password"
                type="password"
                className="admin-input"
                style={{ paddingLeft: '40px' }}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="admin-btn" 
            style={{ width: '100%', justifyContent: 'center', marginTop: '10px' }}
            disabled={loading}
          >
            {loading ? <Activity size={20} className="animate-spin" /> : <LogIn size={20} />}
            Se connecter
          </button>
        </form>

        <div style={{ marginTop: '24px', borderTop: '1px solid var(--admin-border)', paddingTop: '20px' }}>
          <p style={{ fontSize: '0.8rem', color: 'var(--admin-text-muted)', textAlign: 'center', marginBottom: '12px' }}>
            Besoin d'un compte test ?
          </p>
          <button 
            type="button" 
            className="admin-btn admin-btn-outline" 
            style={{ width: '100%', justifyContent: 'center', fontSize: '0.8rem' }}
            onClick={createTestAdmin}
            disabled={loading}
          >
            <UserPlus size={16} />
            Créer admin@test.com
          </button>
        </div>
      </div>
    </div>
  );
}
