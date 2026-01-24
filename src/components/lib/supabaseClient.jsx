import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

const isConfigured = import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!isConfigured) {
  console.warn('⚠️ Supabase not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment variables.');
}

export const supabase = isConfigured ? createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  },
  db: {
    schema: 'public'
  },
  global: {
    headers: {
      'x-application-name': 'TAS-Platform'
    }
  }
}) : null;

// Real-time subscription helper
export const subscribeToTable = (table, callback, filter = '*') => {
  if (!supabase) {
    console.warn('Supabase not configured, skipping subscription');
    return () => {};
  }
  
  const subscription = supabase
    .channel(`${table}_changes`)
    .on('postgres_changes', 
      { 
        event: filter, 
        schema: 'public', 
        table: table 
      }, 
      callback
    )
    .subscribe();

  return () => {
    subscription.unsubscribe();
  };
};

export const isSupabaseConfigured = isConfigured;