import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Shield, Users, Briefcase, Sparkles } from 'lucide-react';

const Solutions = () => {
  return (
    <div className="min-h-screen pt-28 pb-16 px-4 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mb-10">
        <h1 className="text-4xl font-serif font-bold text-white">Solutions</h1>
        <p className="mt-3 text-corporate-muted max-w-2xl">
          Enterprise-grade workflows connecting companies with top video editors and graphic designers. Built for quality, scale, and speed.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6 relative">
        <motion.div whileHover={{ y: -6 }} className="bg-corporate-card p-6 rounded-sm border border-corporate-border shadow-lg">
          <div className="inline-flex p-3 bg-white/5 rounded-full mb-4">
            <Shield className="w-6 h-6 text-corporate-gold" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Verified Talent</h3>
          <p className="text-corporate-muted text-sm">Rigorous screening ensures every creative meets professional standards.</p>
          <div className="mt-4">
            <img src="https://images.unsplash.com/photo-1557800636-894a64c1696f?q=80&w=1200&auto=format&fit=crop" alt="Verified" className="w-full h-28 object-cover rounded-sm border border-corporate-border" loading="lazy" />
          </div>
        </motion.div>

        <motion.div whileHover={{ y: -6 }} className="bg-corporate-card p-6 rounded-sm border border-corporate-border shadow-lg">
          <div className="inline-flex p-3 bg-white/5 rounded-full mb-4">
            <Users className="w-6 h-6 text-corporate-gold" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Team Augmentation</h3>
          <p className="text-corporate-muted text-sm">Scale design capacity instantly with curated specialists.</p>
          <div className="mt-4">
            <img src="https://images.unsplash.com/photo-1552581234-26160f608093?q=80&w=1200&auto=format&fit=crop" alt="Team" className="w-full h-28 object-cover rounded-sm border border-corporate-border" loading="lazy" />
          </div>
        </motion.div>

        <motion.div whileHover={{ y: -6 }} className="bg-corporate-card p-6 rounded-sm border border-corporate-border shadow-lg">
          <div className="inline-flex p-3 bg-white/5 rounded-full mb-4">
            <Briefcase className="w-6 h-6 text-corporate-gold" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Managed Projects</h3>
          <p className="text-corporate-muted text-sm">From brief to delivery, end-to-end creative operations done right.</p>
          <div className="mt-4">
            <img src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=1200&auto=format&fit=crop" alt="Projects" className="w-full h-28 object-cover rounded-sm border border-corporate-border" loading="lazy" />
          </div>
        </motion.div>

        <motion.div
          className="absolute -z-10 top-10 left-1/3 w-72 h-72 rounded-full blur-3xl"
          initial={{ opacity: 0.2 }}
          animate={{ opacity: [0.2, 0.35, 0.2] }}
          transition={{ duration: 6, repeat: Infinity }}
          style={{ background: 'radial-gradient(60% 60% at 50% 50%, rgba(234,179,8,0.25), transparent)' }}
        />
      </div>

      <div className="mt-16 grid md:grid-cols-2 gap-8">
        <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="bg-gradient-card p-8 rounded-sm border border-corporate-border text-white">
          <h3 className="text-2xl font-serif font-bold mb-3">For Companies</h3>
          <p className="text-corporate-muted mb-6">Accelerate campaigns and content production with vetted creatives and streamlined workflows.</p>
          <div className="flex items-center gap-2 text-corporate-gold">
            <Sparkles className="w-5 h-5" />
            <span className="text-sm font-medium">Quality assurance built-in</span>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="bg-corporate-card p-8 rounded-sm border border-corporate-border text-white">
          <h3 className="text-2xl font-serif font-bold mb-3">For Creators</h3>
          <p className="text-corporate-muted mb-6">Get matched with brands that value craft. Showcase work, collaborate, and grow.</p>
          <div className="flex items-center gap-2 text-corporate-gold">
            <Sparkles className="w-5 h-5" />
            <span className="text-sm font-medium">Fair rates and clear briefs</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Solutions;
