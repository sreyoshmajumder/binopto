import React, { useMemo, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';

const fakeTalents = [
  { name: 'Ava Martin', role: 'Senior Video Editor', tag: 'Cinematic', color: 'from-white/10 to-corporate-gold/10' },
  { name: 'Noah Patel', role: 'Motion Designer', tag: 'Product', color: 'from-blue-500/10 to-white/5' },
  { name: 'Mia Chen', role: 'Graphic Designer', tag: 'Brand', color: 'from-corporate-gold/10 to-white/5' },
  { name: 'Leo Silva', role: 'Colorist', tag: 'Film', color: 'from-purple-500/10 to-white/5' },
  { name: 'Sara Ahmed', role: 'Storyboard Artist', tag: 'Narrative', color: 'from-green-500/10 to-white/5' },
  { name: 'Daniel Kim', role: '3D Generalist', tag: 'CGI', color: 'from-pink-500/10 to-white/5' },
];

const Talents = () => {
  const [search, setSearch] = useState('');
  const [tag, setTag] = useState('All');
  const [active, setActive] = useState(null);
  const tags = ['All', 'Cinematic', 'Product', 'Brand', 'Film', 'Narrative', 'CGI'];
  const filtered = useMemo(() => {
    return fakeTalents.filter(t => 
      (tag === 'All' || t.tag === tag) &&
      (t.name.toLowerCase().includes(search.toLowerCase()) || t.role.toLowerCase().includes(search.toLowerCase()))
    );
  }, [search, tag]);
  return (
    <div className="min-h-screen pt-28 pb-16 px-4 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mb-10">
        <h1 className="text-4xl font-serif font-bold text-white">Talent</h1>
        <p className="mt-3 text-corporate-muted max-w-2xl">
          A curated showcase of excellence. Discover specialists across editing, motion, branding, and 3D.
        </p>
      </motion.div>
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <div className="relative">
          <Search className="w-4 h-4 text-corporate-muted absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search talent or role"
            className="pl-9 pr-3 py-2 bg-corporate-bg border border-corporate-border rounded-sm text-sm text-white focus:border-corporate-gold"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {tags.map(t => (
            <button
              key={t}
              onClick={() => setTag(t)}
              className={`px-3 py-1 rounded-full text-xs border ${tag === t ? 'bg-corporate-gold text-corporate-bg border-corporate-gold' : 'border-corporate-border text-corporate-muted hover:text-white hover:bg-white/5'}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: i * 0.05 }}
            className="group bg-corporate-card rounded-sm border border-corporate-border overflow-hidden"
            onClick={() => setActive(t)}
          >
            <div className={`h-32 bg-gradient-to-r ${t.color}`}></div>
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-corporate-gold transition-colors">{t.name}</h3>
                  <p className="text-corporate-muted text-sm">{t.role}</p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs border border-corporate-border text-corporate-muted">{t.tag}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <AnimatePresence>
        {active && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 12, opacity: 0 }} className="bg-corporate-card rounded-lg border border-corporate-border w-full max-w-2xl overflow-hidden">
              <div className="p-4 flex items-center justify-between border-b border-corporate-border">
                <div className="text-white font-bold">{active.name}</div>
                <button onClick={() => setActive(null)} className="p-2 rounded-full hover:bg-white/10 text-corporate-muted hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="grid md:grid-cols-2 gap-2 p-4">
                <img src="https://images.unsplash.com/photo-1520974735194-1b2a81f8dfc6?q=80&w=1200&auto=format&fit=crop" alt="Portfolio 1" className="w-full h-40 object-cover rounded-sm border border-corporate-border" loading="lazy" />
                <img src="https://images.unsplash.com/photo-1516944756497-4f22873e4ea9?q=80&w=1200&auto=format&fit=crop" alt="Portfolio 2" className="w-full h-40 object-cover rounded-sm border border-corporate-border" loading="lazy" />
                <img src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=1200&auto=format&fit=crop" alt="Portfolio 3" className="w-full h-40 object-cover rounded-sm border border-corporate-border" loading="lazy" />
                <img src="https://images.unsplash.com/photo-1552581234-26160f608093?q=80&w=1200&auto=format&fit=crop" alt="Portfolio 4" className="w-full h-40 object-cover rounded-sm border border-corporate-border" loading="lazy" />
              </div>
              <div className="p-4 border-t border-corporate-border text-sm text-corporate-muted">
                {active.name} — {active.role}. Engage for projects in {active.tag}. Sign in to contact or invite.
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Talents;
