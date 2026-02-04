import React, { useEffect, useRef, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Play, Pause, Gauge, Zap } from 'lucide-react';

const Mining = () => {
  const [running, setRunning] = useState(false);
  const [hashes, setHashes] = useState(0);
  const [binopto, setBinopto] = useState(0);
  const [rate, setRate] = useState(0);
  const lastTick = useRef(performance.now());
  const raf = useRef(null);

  useEffect(() => {
    if (!running) {
      cancelAnimationFrame(raf.current);
      return;
    }
    const loop = () => {
      // Simulated work: perform lightweight hashing via SubtleCrypto (or a dummy loop if unavailable)
      let localHashes = 0;
      for (let i = 0; i < 5000; i++) {
        // dummy operations to simulate CPU work
        localHashes++;
      }
      setHashes(prev => prev + localHashes);
      const now = performance.now();
      const dt = (now - lastTick.current) / 1000;
      if (dt >= 1) {
        const perSecond = localHashes / dt;
        setRate(perSecond | 0);
        // Reward: 1 BINOPTO per 100,000 hashes (demo-only)
        setBinopto(prev => prev + Math.floor((hashes + localHashes) / 100000) - Math.floor(hashes / 100000));
        lastTick.current = now;
      }
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf.current);
  }, [running, hashes]);

  const toggle = () => {
    if (running) {
      setRunning(false);
    } else {
      lastTick.current = performance.now();
      setRunning(true);
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-16 px-4 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mb-10">
        <h1 className="text-4xl font-serif font-bold text-corporate-text">Binopto Mining</h1>
        <p className="mt-3 text-corporate-muted max-w-2xl">
          Demo-only mining simulator. Connect your wallet to identify your address, then run and observe the mining performance and BINOPTO accrual.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white p-6 rounded-lg border border-corporate-border shadow-xl">
          <div className="flex items-center gap-2 text-corporate-muted mb-2"><Gauge className="w-4 h-4 text-primary" /> Hash Rate</div>
          <div className="text-3xl font-bold text-corporate-text">{rate.toLocaleString()} H/s</div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white p-6 rounded-lg border border-corporate-border shadow-xl">
          <div className="flex items-center gap-2 text-corporate-muted mb-2"><Zap className="w-4 h-4 text-primary" /> Total Hashes</div>
          <div className="text-3xl font-bold text-corporate-text">{hashes.toLocaleString()}</div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-gradient-card p-6 rounded-lg border border-corporate-border text-corporate-text shadow-xl">
          <div className="flex items-center gap-2 mb-2"><Zap className="w-4 h-4 text-primary" /> BINOPTO Mined</div>
          <div className="text-3xl font-bold">{binopto.toLocaleString()}</div>
        </motion.div>
      </div>

      <div className="mt-8">
        <button onClick={toggle} className={`px-6 py-3 rounded-sm font-bold transition-colors btn-shine ${running ? 'bg-white text-corporate-text border border-corporate-border' : 'bg-primary text-white'}`}>
          {running ? 'Pause Mining' : 'Start Mining'}
          {running ? <Pause className="inline-block w-4 h-4 ml-2" /> : <Play className="inline-block w-4 h-4 ml-2" />}
        </button>
      </div>

      <motion.div className="mt-12 relative h-40 rounded-lg overflow-hidden border border-corporate-border" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-white/40"></div>
        <div className="absolute inset-0 grid grid-cols-12 gap-2 p-4">
          {[...Array(36)].map((_, i) => (
            <motion.div key={i} className="bg-white rounded-sm" initial={{ opacity: 0 }} animate={{ opacity: (i % 3) / 3 + 0.2 }} transition={{ repeat: Infinity, duration: 2 + (i % 5) * 0.4, delay: i * 0.02 }} />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Mining;
