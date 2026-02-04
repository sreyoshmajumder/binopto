import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const articles = [
  { title: 'Scaling Creative Ops: A Modern Playbook', snippet: 'Frameworks for high-throughput content with uncompromised quality.' },
  { title: 'The ROI of Outsourced Design', snippet: 'Measuring impact beyond cost: velocity, reach, and brand lift.' },
  { title: 'Motion Design Standards for Product', snippet: 'Consistency and craft in micro-interactions and onboarding.' },
];

const Insights = () => {
  return (
    <div className="min-h-screen pt-28 pb-16 px-4 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mb-10">
        <h1 className="text-4xl font-serif font-bold text-white">Insights</h1>
        <p className="mt-3 text-corporate-muted max-w-2xl">
          Thought leadership on creative operations, motion systems, and design at scale.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        {articles.map((a, i) => (
          <motion.div
            key={a.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: i * 0.05 }}
            className="bg-corporate-card p-6 rounded-sm border border-corporate-border hover:border-corporate-gold/40 transition-colors"
          >
            <h3 className="text-xl font-bold text-white mb-2">{a.title}</h3>
            <p className="text-corporate-muted text-sm mb-4">{a.snippet}</p>
            <button className="px-4 py-2 bg-corporate-gold text-corporate-bg rounded-sm font-bold hover:bg-white transition-colors btn-shine flex items-center gap-2">
              Read <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }} className="mt-14 bg-gradient-card p-8 rounded-sm border border-corporate-border text-white">
        <h3 className="text-2xl font-serif font-bold mb-2">Founder’s Note</h3>
        <p className="text-corporate-muted">
          I’m Sreyosh. Our mission is to empower video editors and graphic designers by connecting them with companies that value world-class craft. We build a platform where talent meets opportunity, and great stories find their audience.
        </p>
      </motion.div>
    </div>
  );
};

export default Insights;
