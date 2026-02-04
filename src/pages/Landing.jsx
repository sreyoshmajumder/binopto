import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Wallet, Gauge, Shield, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const Landing = () => {
  const MDiv = motion.div;
  return (
    <div className="bg-corporate-bg min-h-screen">
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <MDiv
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0.6 }}
          animate={{ opacity: [0.6, 0.8, 0.6] }}
          transition={{ duration: 8, repeat: Infinity }}
        >
          <div className="absolute -top-24 -left-20 w-80 h-80 bg-gradient-to-br from-primary/20 to-white rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -right-20 w-96 h-96 bg-gradient-to-tr from-secondary/15 to-white rounded-full blur-3xl" />
        </MDiv>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <MDiv initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-corporate-border text-primary text-xs font-bold tracking-wider uppercase mb-6">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                Demo Mining Simulator
              </div>
              <h1 className="text-5xl lg:text-7xl font-serif font-bold leading-[1.1] mb-6">
                Mine
                <span className="ml-3 text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                  Binopto
                </span>
              </h1>
              <p className="text-xl text-corporate-muted mb-8 max-w-lg leading-relaxed border-l-2 border-primary/30 pl-6">
                Bitcoin-style mining demo for a test-only currency named Binopto. Connect a wallet to identify your address and run the client-side miner. No real transactions.
              </p>

              <MDiv className="flex flex-col sm:flex-row gap-4" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.5 }}>
                <Link to="/mining">
                  <button className="px-8 py-4 bg-primary text-white font-bold rounded-sm hover:bg-primary-light transition-all shadow-lg flex items-center justify-center gap-2 min-w-[180px] btn-shine">
                    Start Mining <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
                <Link to="/mining">
                  <button className="px-8 py-4 bg-white border border-corporate-border text-corporate-text font-semibold rounded-sm hover:bg-white transition-all flex items-center justify-center gap-2 min-w-[180px]">
                    Connect Wallet <Wallet className="w-4 h-4" />
                  </button>
                </Link>
              </MDiv>

              <div className="mt-12 grid grid-cols-3 gap-6">
                <div className="bg-white rounded-lg border border-corporate-border p-5">
                  <div className="flex items-center gap-2 text-corporate-muted mb-1"><Shield className="w-4 h-4 text-primary" /> Test-only</div>
                  <div className="text-corporate-text font-semibold">No real transactions</div>
                </div>
                <div className="bg-white rounded-lg border border-corporate-border p-5">
                  <div className="flex items-center gap-2 text-corporate-muted mb-1"><Gauge className="w-4 h-4 text-primary" /> Hashrate</div>
                  <div className="text-corporate-text font-semibold">Live performance</div>
                </div>
                <div className="bg-white rounded-lg border border-corporate-border p-5">
                  <div className="flex items-center gap-2 text-corporate-muted mb-1"><Zap className="w-4 h-4 text-primary" /> Rewards</div>
                  <div className="text-corporate-text font-semibold">BINOPTO accrual</div>
                </div>
              </div>
            </MDiv>

            <MDiv initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative hidden lg:block">
              <div className="relative grid grid-cols-2 gap-4">
                <MDiv whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }} className="bg-white p-6 rounded-lg shadow-2xl border border-corporate-border relative overflow-hidden">
                  <div className="h-2 w-12 bg-primary/15 rounded mb-4"></div>
                  <h3 className="font-serif text-xl font-bold text-corporate-text mb-2">Client Miner</h3>
                  <p className="text-sm text-corporate-muted">Runs in your browser with visual feedback.</p>
                </MDiv>
                <MDiv whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }} className="bg-gradient-card p-6 rounded-lg shadow-2xl border border-corporate-border">
                  <div className="flex justify-between items-start mb-4">
                    <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <Gauge className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-xs font-mono text-primary">Realtime</span>
                  </div>
                  <div className="text-2xl font-bold text-corporate-text mb-1">Hash Rate</div>
                  <div className="text-xs text-corporate-muted">Updated per second</div>
                </MDiv>
                <MDiv whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }} className="bg-white p-6 rounded-lg shadow-2xl border border-corporate-border col-span-2">
                  <h3 className="font-serif text-xl font-bold text-corporate-text mb-2">Wallet Ready</h3>
                  <div className="flex items-center gap-2 text-sm text-corporate-muted">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    Works with MetaMask-compatible wallets
                  </div>
                </MDiv>
              </div>
            </MDiv>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
