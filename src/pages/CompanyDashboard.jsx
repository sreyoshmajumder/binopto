import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Plus, Users, Briefcase, Search, CheckCircle, Loader2, User, MessageSquare, XCircle } from 'lucide-react';
import { supabase } from '../supabaseClient';
import ChatWindow from '../components/ChatWindow';

const PostJob = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    job_type: 'Full-time',
    rate: '',
    description: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('jobs')
        .insert([{
          ...formData,
          company_id: user.id,
          status: 'active'
        }]);

      if (error) throw error;
      alert('Job posted successfully!');
      setFormData({ title: '', job_type: 'Full-time', rate: '', description: '' });
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-3xl font-serif font-bold text-white mb-8">Post a New Job</h2>
      <div className="bg-corporate-card p-8 rounded-sm border border-corporate-border shadow-xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-corporate-muted mb-2">Job Title</label>
            <input 
              type="text" 
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              required
              className="w-full bg-corporate-bg border border-corporate-border rounded-sm p-3 text-white focus:border-corporate-gold focus:outline-none placeholder-corporate-muted" 
              placeholder="e.g. Senior Video Editor" 
            />
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-corporate-muted mb-2">Job Type</label>
              <select 
                value={formData.job_type}
                onChange={(e) => setFormData({...formData, job_type: e.target.value})}
                className="w-full bg-corporate-bg border border-corporate-border rounded-sm p-3 text-white focus:border-corporate-gold focus:outline-none"
              >
                <option>Full-time</option>
                <option>Part-time</option>
                <option>Contract</option>
                <option>Freelance</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-corporate-muted mb-2">Budget / Rate</label>
              <input 
                type="text" 
                value={formData.rate}
                onChange={(e) => setFormData({...formData, rate: e.target.value})}
                required
                className="w-full bg-corporate-bg border border-corporate-border rounded-sm p-3 text-white focus:border-corporate-gold focus:outline-none placeholder-corporate-muted" 
                placeholder="e.g. $50/hr or $2000/project" 
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-corporate-muted mb-2">Description</label>
            <textarea 
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              required
              className="w-full bg-corporate-bg border border-corporate-border rounded-sm p-3 h-40 text-white focus:border-corporate-gold focus:outline-none placeholder-corporate-muted" 
              placeholder="Describe the role and requirements..." 
            />
          </div>

          <div className="flex justify-end gap-4">
             <button type="button" className="px-6 py-3 rounded-sm font-bold text-corporate-muted hover:text-white transition-colors">Cancel</button>
             <button 
                type="submit" 
                disabled={loading}
                className="px-6 py-3 bg-corporate-gold text-corporate-bg rounded-sm font-bold hover:bg-white transition-colors flex items-center gap-2 shadow-lg"
             >
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                Post Job
             </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const MyJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyJobs();
  }, []);

  const fetchMyJobs = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('company_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setJobs(data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center p-10"><Loader2 className="animate-spin mx-auto text-corporate-gold" /></div>;

  return (
    <div>
        <h2 className="text-3xl font-serif font-bold text-white mb-6">Active Job Postings</h2>
        {jobs.length === 0 ? (
            <div className="bg-corporate-card p-10 rounded-sm border border-corporate-border text-center">
                <div className="inline-flex p-4 bg-white/5 rounded-full mb-4">
                <Briefcase className="w-8 h-8 text-corporate-muted" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">No active jobs</h3>
                <p className="text-corporate-muted mb-6">Post a job to start finding creators.</p>
                <Link to="/company/post">
                <button className="px-6 py-2 bg-corporate-gold text-corporate-bg rounded-sm font-bold hover:bg-white transition-colors">Create Job Post</button>
                </Link>
            </div>
        ) : (
            <div className="grid gap-4">
                {jobs.map(job => (
                    <div key={job.id} className="bg-corporate-card p-6 rounded-sm border border-corporate-border flex justify-between items-center hover:border-corporate-gold/30 transition-colors">
                        <div>
                            <h3 className="text-xl font-bold text-white">{job.title}</h3>
                            <p className="text-corporate-muted text-sm">{job.job_type} • {job.rate}</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${job.status === 'active' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}>
                                {job.status.toUpperCase()}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        )}
    </div>
  );
};

const Candidates = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeChat, setActiveChat] = useState(null); // { applicationId, candidateName }

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Fetch applications for jobs posted by this company
      // This requires joining tables: applications -> jobs (filter by company_id) -> profiles (candidate info)
      const { data, error } = await supabase
        .from('applications')
        .select(`
          *,
          jobs!inner(title, company_id),
          profiles:creator_id(*)
        `)
        .eq('jobs.company_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setApplications(data);
    } catch (error) {
      console.error('Error fetching candidates:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (appId, newStatus) => {
    try {
      const { error } = await supabase
        .from('applications')
        .update({ status: newStatus })
        .eq('id', appId);

      if (error) throw error;
      
      // Update local state
      setApplications(prev => prev.map(app => 
        app.id === appId ? { ...app, status: newStatus } : app
      ));
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status');
    }
  };

  if (loading) return <div className="text-center p-10"><Loader2 className="animate-spin mx-auto text-corporate-gold" /></div>;

  return (
    <div>
       <h2 className="text-3xl font-serif font-bold text-white mb-8">Candidates</h2>
       {applications.length === 0 ? (
         <div className="bg-corporate-card p-10 rounded-sm border border-corporate-border text-center">
            <h3 className="text-xl font-bold text-white mb-2">No applications yet</h3>
            <p className="text-corporate-muted">When creators apply to your jobs, they will appear here.</p>
         </div>
       ) : (
         <div className="grid gap-4">
           {applications.map(app => (
             <div key={app.id} className="bg-corporate-card p-6 rounded-sm border border-corporate-border flex flex-col md:flex-row md:items-center justify-between hover:border-corporate-gold/30 transition-colors gap-4">
               <div className="flex items-center gap-4">
                 {app.profiles?.avatar_url ? (
                   <img src={app.profiles.avatar_url} alt={app.profiles.full_name} className="w-12 h-12 rounded-full object-cover border border-corporate-gold/20" />
                 ) : (
                   <div className="w-12 h-12 bg-corporate-gold/20 rounded-full flex items-center justify-center text-xl font-bold text-corporate-gold border border-corporate-gold/20">
                     <User className="w-6 h-6" />
                   </div>
                 )}
                 <div>
                   <h3 className="text-lg font-bold text-white">{app.profiles?.full_name || 'Unknown Candidate'}</h3>
                   <p className="text-sm text-corporate-gold mb-1">Applying for: {app.jobs?.title}</p>
                   <div className="flex gap-3 text-xs text-corporate-muted">
                     {app.profiles?.job_title && <span>{app.profiles.job_title}</span>}
                     {app.profiles?.resume_url && (
                        <a href={app.profiles.resume_url} target="_blank" rel="noopener noreferrer" className="text-white underline hover:text-corporate-gold">
                          View Resume
                        </a>
                     )}
                   </div>
                 </div>
               </div>
               
               <div className="flex flex-col md:flex-row items-end md:items-center gap-4">
                 <div className="text-right mr-4">
                   <div className={`text-sm font-bold uppercase tracking-wider px-2 py-1 rounded-sm border ${
                     app.status === 'shortlisted' ? 'text-green-400 border-green-500/30 bg-green-500/10' :
                     app.status === 'rejected' ? 'text-red-400 border-red-500/30 bg-red-500/10' :
                     'text-corporate-muted border-corporate-border'
                   }`}>
                     {app.status}
                   </div>
                   <div className="text-xs text-corporate-muted mt-1">
                     {new Date(app.created_at).toLocaleDateString()}
                   </div>
                 </div>
                 
                 <div className="flex gap-2">
                   <button 
                     onClick={() => setActiveChat({ applicationId: app.id, candidateName: app.profiles?.full_name })}
                     className="p-2 rounded-full hover:bg-white/10 transition-colors text-corporate-muted hover:text-white"
                     title="Message"
                   >
                     <MessageSquare className="w-5 h-5" />
                   </button>
                   
                   {app.status !== 'rejected' && (
                      <button 
                        onClick={() => updateStatus(app.id, 'rejected')}
                        className="p-2 rounded-full hover:bg-red-500/20 transition-colors text-corporate-muted hover:text-red-400"
                        title="Reject"
                      >
                        <XCircle className="w-5 h-5" />
                      </button>
                   )}
                   
                   {app.status !== 'shortlisted' && (
                      <button 
                        onClick={() => updateStatus(app.id, 'shortlisted')}
                        className="p-2 rounded-full hover:bg-green-500/20 transition-colors text-corporate-muted hover:text-green-400"
                        title="Shortlist"
                      >
                        <CheckCircle className="w-5 h-5" />
                      </button>
                   )}
                 </div>
               </div>
             </div>
           ))}
         </div>
       )}
       
       {activeChat && (
         <ChatWindow 
           applicationId={activeChat.applicationId} 
           candidateName={activeChat.candidateName} 
           onClose={() => setActiveChat(null)} 
         />
       )}
    </div>
  );
};

const CompanyDashboard = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen pt-24 pb-10 px-4 max-w-7xl mx-auto">
      <div className="flex gap-8">
        {/* Sidebar */}
        <div className="w-64 flex-shrink-0 hidden md:block">
          <div className="sticky top-24 bg-corporate-card p-4 rounded-sm border border-corporate-border">
              <Link to="/company/post" className="block w-full mb-6">
              <button className="w-full py-3 bg-corporate-gold text-corporate-bg rounded-sm font-bold flex items-center justify-center gap-2 hover:bg-white transition-colors shadow-lg btn-shine">
                <Plus className="w-5 h-5" /> Post Job
              </button>
            </Link>
            <nav className="space-y-2">
              <Link to="/company" className={`flex items-center gap-3 px-4 py-3 rounded-sm transition-colors font-medium ${location.pathname === '/company' ? 'bg-white/10 text-white' : 'text-corporate-muted hover:text-white hover:bg-white/5'}`}>
                <Briefcase className="w-5 h-5" />
                My Jobs
              </Link>
              <Link to="/company/candidates" className={`flex items-center gap-3 px-4 py-3 rounded-sm transition-colors font-medium ${location.pathname === '/company/candidates' ? 'bg-white/10 text-white' : 'text-corporate-muted hover:text-white hover:bg-white/5'}`}>
                <Users className="w-5 h-5" />
                Candidates
              </Link>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<MyJobs />} />
            <Route path="/post" element={<PostJob />} />
            <Route path="/candidates" element={<Candidates />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;
