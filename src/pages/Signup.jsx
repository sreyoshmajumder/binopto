import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { User, Mail, Lock, Building, Loader2 } from 'lucide-react';
import { supabase } from '../supabaseClient';

const Signup = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState('creator');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
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

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role: role,
          },
        },
      });

      if (authError) throw authError;

      if (data?.user) {
        await supabase
          .from('profiles')
          .insert([
            {
              id: data.user.id,
              full_name: fullName,
              role: role,
            }
          ]);
        
        if (role === 'creator') {
          navigate('/creator/profile');
        } else {
          navigate('/company');
        }
      }
    } catch (err) {
      console.error("Signup error:", err);
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
          <h2 className="text-3xl font-serif font-bold text-white">Join FrameHive</h2>
          <p className="text-corporate-muted mt-2 text-sm">Select your account type to get started</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <button
            type="button"
            onClick={() => setRole('creator')}
            className={`p-4 rounded-sm border transition-all text-left group ${
              role === 'creator' 
                ? 'bg-corporate-gold/10 border-corporate-gold text-corporate-gold' 
                : 'bg-corporate-bg border-corporate-border text-corporate-muted hover:border-white/20 hover:text-white'
            }`}
          >
            <User className={`w-5 h-5 mb-2 ${role === 'creator' ? 'text-corporate-gold' : 'text-corporate-muted group-hover:text-white'}`} />
            <span className="block text-sm font-bold">I'm a Creator</span>
          </button>
          <button
            type="button"
            onClick={() => setRole('company')}
            className={`p-4 rounded-sm border transition-all text-left group ${
              role === 'company' 
                ? 'bg-corporate-gold/10 border-corporate-gold text-corporate-gold' 
                : 'bg-corporate-bg border-corporate-border text-corporate-muted hover:border-white/20 hover:text-white'
            }`}
          >
            <Building className={`w-5 h-5 mb-2 ${role === 'company' ? 'text-corporate-gold' : 'text-corporate-muted group-hover:text-white'}`} />
            <span className="block text-sm font-bold">I'm a Company</span>
          </button>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-sm mb-6 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-corporate-text mb-1">Full Name</label>
            <input 
              type="text" 
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="w-full bg-corporate-bg border border-corporate-border rounded-sm py-3 px-4 focus:outline-none focus:border-corporate-gold focus:ring-1 focus:ring-corporate-gold transition-colors text-white placeholder-gray-600"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-corporate-text mb-1">Email Address</label>
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
            <label className="block text-sm font-semibold text-corporate-text mb-1">Password</label>
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
            className="w-full py-3 rounded-sm font-bold text-corporate-bg bg-corporate-gold hover:bg-white transition-all flex items-center justify-center gap-2 shadow-lg shadow-yellow-900/10 mt-2"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
          
          <p className="text-center text-sm text-corporate-muted mt-6">
            Already have an account? <Link to="/login" className="text-corporate-gold font-semibold hover:underline">Sign in</Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default Signup;
