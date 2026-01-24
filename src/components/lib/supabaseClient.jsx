import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase credentials. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
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
});

// Real-time subscription helper
export const subscribeToTable = (table, callback, filter = '*') => {
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