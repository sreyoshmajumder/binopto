import React, { useEffect, useRef, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Loader2 } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';

const presets = [
  { q: 'How do I hire talent?', a: 'Go to Solutions for overview, or Talent to browse. Use Sign Up to create a company account, then post a job in Company Dashboard.' },
  { q: 'How do I apply to jobs?', a: 'Create a creator profile in Creator Dashboard, then open Find Work and click Apply on any job.' },
  { q: 'How does messaging work?', a: 'Once you apply or shortlist, open the chat icon on the application or candidate to exchange messages in real time.' },
];

function answerFor(pathname, text) {
  const lower = text.toLowerCase();
  if (lower.includes('talent')) {
    return 'Open Talent to browse curated profiles. Use filters and search to refine. Sign in to contact or invite.';
  }
  if (lower.includes('solution') || pathname === '/solutions') {
    return 'Solutions explains verified talent, team augmentation, and managed projects. Use Get Started to talk to us.';
  }
  if (lower.includes('insight') || pathname === '/insights') {
    return 'Insights publishes guidance on creative ops, motion systems, and design at scale. Explore articles and the founder’s note.';
  }
  if (lower.includes('apply') || pathname.startsWith('/creator')) {
    return 'Open Creator Dashboard, complete your profile, then apply to jobs in Find Work. Track status under My Applications.';
  }
  if (lower.includes('post job') || pathname.startsWith('/company')) {
    return 'Open Company Dashboard and click Post Job. Set title, type, rate, and description. Candidates appear under Candidates.';
  }
  if (lower.includes('message') || lower.includes('chat')) {
    return 'Use the chat icon next to applications or candidates. Messages sync instantly and are stored securely.';
  }
  return 'I can help with navigation and workflows. Ask about hiring, applying, messaging, dashboards, or browse Solutions, Talent, and Insights.';
}

const AssistantWidget = () => {
  const [open, setOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Welcome to FrameHive. How can I help you today?' }
  ]);
  const location = useLocation();
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  const send = async (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    setSending(true);
    setMessages(prev => [...prev, { role: 'user', content: text }]);
    await new Promise(r => setTimeout(r, 300));
    const response = answerFor(location.pathname, text);
    setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    setInput('');
    setSending(false);
  };

  return (
    <>
      <button
        aria-label="Assistant"
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 bg-secondary text-white p-3 rounded-full shadow-2xl hover:bg-secondary-light transition-colors"
      >
        <MessageSquare className="w-5 h-5" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            className="fixed bottom-20 right-6 w-[380px] bg-corporate-card border border-corporate-gold rounded-lg shadow-2xl overflow-hidden z-50"
          >
            <div className="bg-corporate-gold p-4 flex items-center justify-between text-corporate-bg">
              <div className="font-serif font-bold">Assistant</div>
              <button onClick={() => setOpen(false)} className="p-1 rounded-full hover:bg-white/20 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="max-h-[340px] overflow-y-auto p-4 space-y-3 bg-corporate-bg/95">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-lg text-sm ${m.role === 'user' ? 'bg-corporate-gold text-corporate-bg rounded-br-none' : 'bg-white/10 text-white rounded-bl-none'}`}>
                    <p>{m.content}</p>
                  </div>
                </div>
              ))}
              <div className="grid grid-cols-3 gap-2">
                {presets.map((p) => (
                  <button
                    key={p.q}
                    onClick={() => setInput(p.q)}
                    className="px-2 py-2 text-xs bg-white/5 border border-corporate-border rounded-md text-white hover:bg-white/10 transition-colors"
                  >
                    {p.q}
                  </button>
                ))}
              </div>
              <div className="text-xs text-corporate-muted">
                Quick links: <Link to="/solutions" className="underline hover:text-white">Solutions</Link> • <Link to="/talents" className="underline hover:text-white">Talent</Link> • <Link to="/insights" className="underline hover:text-white">Insights</Link>
              </div>
              <div ref={endRef} />
            </div>

            <form onSubmit={send} className="p-3 border-t border-corporate-border bg-corporate-card">
              <div className="flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about hiring, applying, messaging..."
                  className="flex-1 bg-corporate-bg border border-corporate-border rounded-sm p-2 text-white text-sm focus:border-corporate-gold focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={sending}
                  className="bg-corporate-gold text-corporate-bg p-2 rounded-sm hover:bg-white transition-colors"
                >
                  {sending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AssistantWidget;
