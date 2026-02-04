import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { User, Briefcase, Upload, FileText, Camera, Loader2, DollarSign, Clock, MessageSquare } from 'lucide-react';
import { supabase } from '../supabaseClient';
import ChatWindow from '../components/ChatWindow';

const CreatorProfile = () => {
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [profile, setProfile] = useState({
    full_name: '',
    job_title: '',
    bio: '',
    avatar_url: null,
    resume_url: null
  });

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error && error.code !== 'PGRST116') throw error;
        if (data) setProfile(data);
      }
    } catch (error) {
      console.error('Error loading user data!', error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates) => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();

      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          ...updates,
          updated_at: new Date(),
        });

      if (error) throw error;
      setProfile(prev => ({ ...prev, ...updates }));
      alert('Profile updated!');
    } catch (error) {
      alert('Error updating the data!');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const uploadAvatar = async (event) => {
    try {
      setUploading(true);
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(filePath);
      
      await updateProfile({ avatar_url: publicUrl });
    } catch (error) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  };

  if (loading) return <div className="text-center p-10"><Loader2 className="animate-spin mx-auto text-corporate-gold" /></div>;

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-serif font-bold text-white mb-8">Your Profile</h2>
      
      <div className="bg-corporate-card p-8 rounded-sm border border-corporate-border shadow-xl">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Selfie Upload */}
          <div className="flex-shrink-0">
            <label className="block text-sm font-medium text-corporate-muted mb-2">Profile Picture</label>
            <label className="relative block w-40 h-40 rounded-full overflow-hidden bg-corporate-bg border-2 border-dashed border-corporate-border group hover:border-corporate-gold transition-colors cursor-pointer">
              {profile.avatar_url ? (
                <img src={profile.avatar_url} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-corporate-muted group-hover:text-corporate-gold">
                  <Camera className="w-8 h-8 mb-2" />
                  <span className="text-xs">Upload Selfie</span>
                </div>
              )}
              {uploading && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <Loader2 className="w-8 h-8 animate-spin text-white" />
                </div>
              )}
              <input 
                type="file" 
                className="hidden" 
                accept="image/*" 
                onChange={uploadAvatar}
                disabled={uploading}
              />
            </label>
          </div>

          {/* Details Form */}
          <div className="flex-grow space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-corporate-muted mb-2">Full Name</label>
                <input 
                  type="text" 
                  value={profile.full_name || ''}
                  onChange={(e) => setProfile({...profile, full_name: e.target.value})}
                  className="w-full bg-corporate-bg border border-corporate-border rounded-sm p-3 text-white focus:border-corporate-gold focus:outline-none placeholder-corporate-muted" 
                  placeholder="Jane Doe" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-corporate-muted mb-2">Job Title</label>
                <input 
                  type="text" 
                  value={profile.job_title || ''}
                  onChange={(e) => setProfile({...profile, job_title: e.target.value})}
                  className="w-full bg-corporate-bg border border-corporate-border rounded-sm p-3 text-white focus:border-corporate-gold focus:outline-none placeholder-corporate-muted" 
                  placeholder="Video Editor / Motion Designer" 
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-corporate-muted mb-2">Bio</label>
              <textarea 
                value={profile.bio || ''}
                onChange={(e) => setProfile({...profile, bio: e.target.value})}
                className="w-full bg-corporate-bg border border-corporate-border rounded-sm p-3 h-32 text-white focus:border-corporate-gold focus:outline-none placeholder-corporate-muted" 
                placeholder="Tell companies about your style and experience..." 
              />
            </div>

            {/* Resume Upload - Simplified for now */}
            <div>
               <label className="block text-sm font-medium text-corporate-muted mb-2">Resume URL (Portfolio Link)</label>
               <input 
                  type="text" 
                  value={profile.resume_url || ''}
                  onChange={(e) => setProfile({...profile, resume_url: e.target.value})}
                  className="w-full bg-corporate-bg border border-corporate-border rounded-sm p-3 text-white focus:border-corporate-gold focus:outline-none placeholder-corporate-muted" 
                  placeholder="https://drive.google.com/..." 
                />
            </div>

            <div className="flex justify-end">
              <button 
                onClick={() => updateProfile(profile)}
                disabled={loading}
                className="px-6 py-3 bg-corporate-gold text-corporate-bg rounded-sm font-bold hover:bg-white transition-colors disabled:opacity-50 shadow-lg"
              >
                {loading ? 'Saving...' : 'Save Profile'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [appliedJobIds, setAppliedJobIds] = useState(new Set());

  useEffect(() => {
    fetchInitial();
  }, []);

  const fetchInitial = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        const { data: myApplications } = await supabase
          .from('applications')
          .select('job_id')
          .eq('creator_id', user.id);
        if (myApplications) {
          setAppliedJobIds(new Set(myApplications.map(a => a.job_id)));
        }
      }

      const { data, error } = await supabase
        .from('jobs')
        .select(`
          *,
          profiles:company_id (full_name, avatar_url)
        `)
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setJobs(data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyToJob = async (jobId) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        alert('Please sign in to apply.');
        return;
      }
      const existing = await supabase
        .from('profiles')
        .select('id')
        .eq('id', user.id)
        .single();
      if (existing.error && existing.error.code === 'PGRST116') {
        await supabase
          .from('profiles')
          .upsert({ id: user.id, role: 'creator', updated_at: new Date() });
      }
      const { error } = await supabase
        .from('applications')
        .insert({
          job_id: jobId,
          creator_id: user.id,
          status: 'applied'
        });
      if (error) {
        if (String(error.code) === '23505') {
          alert('Already applied to this job.');
          return;
        }
        if (String(error.code) === '23503') {
          await supabase
            .from('profiles')
            .upsert({ id: user.id, role: 'creator', updated_at: new Date() });
          const retry = await supabase
            .from('applications')
            .insert({ job_id: jobId, creator_id: user.id, status: 'applied' });
          if (retry.error) throw retry.error;
        } else {
          throw error;
        }
      }
      setAppliedJobIds(prev => new Set([...prev, jobId]));
      alert('Applied successfully.');
    } catch (e) {
      alert(e.message || 'Unable to apply right now.');
    }
  };

  if (loading) return <div className="text-center p-10"><Loader2 className="animate-spin mx-auto text-corporate-gold" /></div>;

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-serif font-bold text-white mb-6">Explore Jobs</h2>
      {jobs.length === 0 ? (
        <div className="text-center py-10 text-corporate-muted bg-corporate-card rounded-sm border border-corporate-border">
            <p>No active jobs found at the moment.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {jobs.map(job => (
            <motion.div 
              key={job.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-corporate-card p-6 rounded-sm border border-corporate-border hover:border-corporate-gold/50 transition-colors cursor-pointer group"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-corporate-gold transition-colors">{job.title}</h3>
                  <p className="text-corporate-muted flex items-center gap-2">
                    {job.profiles?.full_name || 'Unknown Company'}
                  </p>
                </div>
                <span className="bg-corporate-gold/10 text-corporate-gold px-3 py-1 rounded-full text-sm font-medium border border-corporate-gold/20">{job.job_type}</span>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex gap-4 text-sm text-corporate-muted">
                    <span className="flex items-center gap-1"><DollarSign className="w-4 h-4" /> {job.rate}</span>
                    <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {new Date(job.created_at).toLocaleDateString()}</span>
                </div>
                <button 
                  onClick={() => applyToJob(job.id)}
                  disabled={appliedJobIds.has(job.id)}
                  className={`text-sm font-medium px-4 py-2 rounded-sm transition-opacity font-bold ${
                    appliedJobIds.has(job.id) 
                      ? 'bg-corporate-bg text-corporate-muted border border-corporate-border cursor-not-allowed'
                      : 'text-corporate-bg bg-corporate-gold opacity-0 group-hover:opacity-100 btn-shine'
                  }`}
                >
                  {appliedJobIds.has(job.id) ? 'Applied' : 'Apply Now'}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

const AppliedJobs = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeChat, setActiveChat] = useState(null); // { applicationId, companyName }

  useEffect(() => {
    const fetchApplied = async () => {
      try {
        setLoading(true);
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          setItems([]);
        } else {
          const { data } = await supabase
            .from('applications')
            .select(`
              id, status, created_at,
              jobs:job_id (
                id, title, created_at, job_type, rate,
                profiles:company_id (full_name)
              )
            `)
            .eq('creator_id', user.id)
            .order('created_at', { ascending: false });
          setItems(data || []);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchApplied();
  }, []);

  if (loading) return <div className="text-center p-10"><Loader2 className="animate-spin mx-auto text-corporate-gold" /></div>;

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-serif font-bold text-white mb-6">My Applications</h2>
      {(!items || items.length === 0) ? (
        <div className="text-center py-10 text-corporate-muted bg-corporate-card rounded-sm border border-corporate-border">
          <p>No applications yet.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {items.map(app => (
            <div key={app.id} className="bg-corporate-card p-6 rounded-sm border border-corporate-border hover:border-corporate-gold/30 transition-colors">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-white">{app.jobs?.title}</h3>
                  <p className="text-corporate-muted">{app.jobs?.profiles?.full_name || 'Unknown Company'}</p>
                </div>
                <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-sm text-xs font-bold uppercase tracking-wider border ${
                        app.status === 'shortlisted' ? 'text-green-400 border-green-500/30 bg-green-500/10' :
                        app.status === 'rejected' ? 'text-red-400 border-red-500/30 bg-red-500/10' :
                        'text-corporate-muted border-corporate-border'
                    }`}>
                        {app.status}
                    </span>
                    <button 
                        onClick={() => setActiveChat({ applicationId: app.id, companyName: app.jobs?.profiles?.full_name })}
                        className="p-2 rounded-full hover:bg-white/10 transition-colors text-corporate-muted hover:text-white"
                        title="Message Company"
                    >
                        <MessageSquare className="w-5 h-5" />
                    </button>
                </div>
              </div>
              <div className="mt-4 flex gap-4 text-sm text-corporate-muted">
                <span className="flex items-center gap-1"><DollarSign className="w-4 h-4" /> {app.jobs?.rate}</span>
                <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {new Date(app.created_at).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {activeChat && (
        <ChatWindow 
          applicationId={activeChat.applicationId} 
          candidateName={activeChat.companyName} 
          onClose={() => setActiveChat(null)} 
        />
      )}
    </div>
  );
};

const CreatorDashboard = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen pt-24 pb-10 px-4 max-w-7xl mx-auto">
      <div className="flex gap-8">
        {/* Sidebar */}
        <div className="w-64 flex-shrink-0 hidden md:block">
          <div className="sticky top-24 bg-corporate-card p-4 rounded-sm border border-corporate-border">
            <nav className="space-y-2">
              <Link to="/creator" className={`flex items-center gap-3 px-4 py-3 rounded-sm transition-colors font-medium ${location.pathname === '/creator' ? 'bg-corporate-gold text-corporate-bg font-bold' : 'text-corporate-muted hover:text-white hover:bg-white/5'}`}>
                <Briefcase className="w-5 h-5" />
                Find Work
              </Link>
              <Link to="/creator/profile" className={`flex items-center gap-3 px-4 py-3 rounded-sm transition-colors font-medium ${location.pathname === '/creator/profile' ? 'bg-corporate-gold text-corporate-bg font-bold' : 'text-corporate-muted hover:text-white hover:bg-white/5'}`}>
                <User className="w-5 h-5" />
                My Profile
              </Link>
              <Link to="/creator/applied" className={`flex items-center gap-3 px-4 py-3 rounded-sm transition-colors font-medium ${location.pathname === '/creator/applied' ? 'bg-corporate-gold text-corporate-bg font-bold' : 'text-corporate-muted hover:text-white hover:bg-white/5'}`}>
                <FileText className="w-5 h-5" />
                My Applications
              </Link>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<JobList />} />
            <Route path="/profile" element={<CreatorProfile />} />
            <Route path="/applied" element={<AppliedJobs />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default CreatorDashboard;
