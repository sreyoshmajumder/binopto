import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Mail, Lock, Loader2 } from 'lucide-react';
import { supabase } from '../supabaseClient';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /*
  useEffect(() => {
    // Check if user is already logged in
    const checkUser = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        if (data?.session?.user) {
          const role = data.session.user.user_metadata?.role || 'creator';
          navigate(role === 'creator' ? '/creator' : '/company');
        }
      } catch (error) {
        console.error("Error checking session:", error);
      }
    };
    checkUser();
  }, [navigate]);
  */

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        // Check user role from metadata or profiles table
        const role = data.user.user_metadata?.role || 'creator';
        
        if (role === 'creator') {
          navigate('/creator');
        } else {
          navigate('/company');
        }
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center px-4 bg-corporate-bg">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-corporate-card p-8 rounded-sm shadow-2xl border border-corporate-border"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-serif font-bold text-white">Welcome Back</h2>
          <p className="text-corporate-muted mt-2 text-sm">Sign in to access your dashboard</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-sm mb-6 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-corporate-text mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-corporate-muted" />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-corporate-bg border border-corporate-border rounded-sm py-3 pl-10 px-4 focus:outline-none focus:border-corporate-gold focus:ring-1 focus:ring-corporate-gold transition-colors text-white placeholder-gray-600"
                placeholder="name@company.com"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-corporate-text mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-corporate-muted" />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-corporate-bg border border-corporate-border rounded-sm py-3 pl-10 px-4 focus:outline-none focus:border-corporate-gold focus:ring-1 focus:ring-corporate-gold transition-colors text-white placeholder-gray-600"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-sm font-bold text-corporate-bg bg-corporate-gold hover:bg-white transition-all flex items-center justify-center gap-2 shadow-lg shadow-yellow-900/10"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
          
          <p className="text-center text-sm text-corporate-muted mt-6">
            Don't have an account? <Link to="/signup" className="text-corporate-gold font-semibold hover:underline">Sign up</Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
