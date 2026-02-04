import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Send, X, Loader2 } from 'lucide-react';
import { supabase } from '../supabaseClient';

const ChatWindow = ({ applicationId, candidateName, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef(null);
  const [currentUserId, setCurrentUserId] = useState(null);

  const fetchMessages = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('application_id', applicationId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  }, [applicationId]);

  const subscribeToMessages = useCallback(() => {
    return supabase
      .channel(`chat:${applicationId}`)
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'messages', 
        filter: `application_id=eq.${applicationId}` 
      }, (payload) => {
        setMessages(prev => [...prev, payload.new]);
      })
      .subscribe();
  }, [applicationId]);

  const getCurrentUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) setCurrentUserId(user.id);
  };

  useEffect(() => {
    fetchMessages();
    const subscription = subscribeToMessages();
    getCurrentUser();

    return () => {
      subscription.unsubscribe();
    };
  }, [fetchMessages, subscribeToMessages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      setSending(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Get the application details to know who is the receiver
      const { data: application } = await supabase
        .from('applications')
        .select('creator_id, jobs(company_id)')
        .eq('id', applicationId)
        .single();

      if (!application) throw new Error('Application not found');

      // Determine receiver (if I am creator, receiver is company, else receiver is creator)
      const receiverId = user.id === application.creator_id 
        ? application.jobs.company_id 
        : application.creator_id;

      const { error } = await supabase
        .from('messages')
        .insert({
          application_id: applicationId,
          sender_id: user.id,
          receiver_id: receiverId,
          content: newMessage.trim()
        });

      if (error) throw error;
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="fixed bottom-0 right-4 w-96 h-[500px] bg-corporate-card border border-corporate-gold shadow-2xl rounded-t-lg flex flex-col z-50">
      {/* Header */}
      <div className="bg-corporate-gold p-4 rounded-t-lg flex justify-between items-center text-corporate-bg">
        <h3 className="font-bold font-serif">Chat with {candidateName || 'User'}</h3>
        <button onClick={onClose} className="hover:bg-white/20 p-1 rounded-full transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-corporate-bg/95">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <Loader2 className="w-8 h-8 animate-spin text-corporate-gold" />
          </div>
        ) : messages.length === 0 ? (
          <div className="text-center text-corporate-muted mt-10">
            <p>No messages yet. Start the conversation!</p>
          </div>
        ) : (
          messages.map(msg => (
            <div 
              key={msg.id} 
              className={`flex ${msg.sender_id === currentUserId ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] p-3 rounded-lg text-sm ${
                  msg.sender_id === currentUserId 
                    ? 'bg-corporate-gold text-corporate-bg rounded-br-none' 
                    : 'bg-white/10 text-white rounded-bl-none'
                }`}
              >
                <p>{msg.content}</p>
                <p className={`text-xs mt-1 text-right ${
                  msg.sender_id === currentUserId ? 'text-corporate-bg/70' : 'text-corporate-muted'
                }`}>
                  {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={sendMessage} className="p-4 border-t border-corporate-border bg-corporate-card">
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-corporate-bg border border-corporate-border rounded-sm p-2 text-white text-sm focus:border-corporate-gold focus:outline-none"
            disabled={sending}
          />
          <button 
            type="submit" 
            disabled={!newMessage.trim() || sending}
            className="bg-corporate-gold text-corporate-bg p-2 rounded-sm hover:bg-white transition-colors disabled:opacity-50"
          >
            {sending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatWindow;
