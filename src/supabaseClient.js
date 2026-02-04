import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

let supabaseInstance;

if (supabaseUrl && supabaseAnonKey) {
  supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
} else {
  console.warn('Missing Supabase environment variables. App is running in UI-only mode.');
  // Mock supabase client to prevent crashes during UI development
  supabaseInstance = {
    auth: {
      getUser: async () => ({ data: { user: null }, error: null }),
      getSession: async () => ({ data: { session: null }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      signInWithPassword: async () => ({ data: {}, error: { message: 'Supabase keys missing' } }),
      signUp: async () => ({ data: {}, error: { message: 'Supabase keys missing' } }),
    },
    from: () => ({
      select: () => ({ eq: () => ({ single: () => ({ data: null, error: null }) }) }),
      insert: () => ({ error: { message: 'Supabase keys missing' } }),
      upsert: () => ({ error: { message: 'Supabase keys missing' } }),
    }),
    storage: {
      from: () => ({
        upload: async () => ({ error: { message: 'Supabase keys missing' } }),
        getPublicUrl: () => ({ data: { publicUrl: '' } })
      })
    }
  };
}

export const supabase = supabaseInstance;
