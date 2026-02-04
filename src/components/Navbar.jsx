import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import WalletConnect from './WalletConnect';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Mining', path: '/mining' },
  ];

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled || location.pathname !== '/' 
          ? 'bg-corporate-bg/90 backdrop-blur-md border-b border-corporate-border shadow-lg' 
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-corporate-gold flex items-center justify-center rounded-sm">
                <span className="text-white font-serif font-bold text-xl">B</span>
              </div>
              <span className="text-2xl font-serif font-bold tracking-tight text-corporate-text">
                Binopto
              </span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link) => (
                <Link 
                  key={link.name}
                  to={link.path} 
                  className="text-sm font-medium transition-colors text-corporate-muted hover:text-corporate-text"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Wallet + Auth */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login">
              <button className="px-5 py-2 rounded-full text-sm font-semibold transition-all text-corporate-text hover:bg-white">
                Sign In
              </button>
            </Link>
            <Link to="/signup">
              <button className="px-6 py-2.5 rounded-sm bg-primary text-white text-sm font-bold hover:bg-primary-light transition-all">
                Create Account
              </button>
            </Link>
            <WalletConnect />
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-corporate-muted hover:text-corporate-text focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-corporate-bg border-b border-corporate-border overflow-hidden"
          >
            <div className="px-4 pt-4 pb-6 space-y-2">
              {navLinks.map((link) => (
                <Link 
                  key={link.name}
                  to={link.path} 
                  className="block px-3 py-3 rounded-md text-base font-medium text-corporate-muted hover:bg-white hover:text-corporate-text"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 flex flex-col gap-3">
                <Link to="/login" onClick={() => setIsOpen(false)}>
                  <button className="w-full py-3 rounded-sm border border-corporate-border text-corporate-text font-semibold hover:bg-white">
                    Sign In
                  </button>
                </Link>
                <Link to="/signup" onClick={() => setIsOpen(false)}>
                  <button className="w-full py-3 rounded-sm bg-primary text-white font-bold hover:bg-primary-light">
                    Get Started
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
