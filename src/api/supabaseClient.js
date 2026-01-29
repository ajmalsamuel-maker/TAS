import { Bolt Database } from '../lib/supabase';

const supabaseClient = {
  auth: {
    signUp: async ({ email, password, options = {} }) => {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: options.data || {}
        }
      });
      if (error) throw error;
      return data;
    },

    signIn: async ({ email, password }) => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      if (error) throw error;
      return data;
    },

    signOut: async () => {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    },

    me: async () => {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;
      if (!user) return null;

      const { data: profile, error: profileError } = await Bolt Database
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();

      if (profileError) throw profileError;

      return {
        ...user,
        profile
      };
    },

    getSession: async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) throw error;
      return session;
    },

    onAuthStateChange: (callback) => {
      return supabase.auth.onAuthStateChange((event, session) => {
        (async () => {
          callback(event, session);
        })();
      });
    },

    updateUser: async (updates) => {
      const { data, error } = await supabase.auth.updateUser(updates);
      if (error) throw error;
      return data;
    },

    resetPassword: async (email) => {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) throw error;
      return data;
    }
  },

  profiles: {
    get: async (id) => {
      const { data, error } = await Bolt Database
        .from('profiles')
        .select('*, organization:organizations(*)')
        .eq('id', id)
        .maybeSingle();
      if (error) throw error;
      return data;
    },

    update: async (id, updates) => {
      const { data, error } = await Bolt Database
        .from('profiles')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },

    list: async (filters = {}) => {
      let query = supabase.from('profiles').select('*, organization:organizations(*)');

      if (filters.role) {
        query = query.eq('role', filters.role);
      }
      if (filters.organization_id) {
        query = query.eq('organization_id', filters.organization_id);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    }
  },

  organizations: {
    get: async (id) => {
      const { data, error } = await Bolt Database
        .from('organizations')
        .select('*')
        .eq('id', id)
        .maybeSingle();
      if (error) throw error;
      return data;
    },

    list: async () => {
      const { data, error } = await Bolt Database
        .from('organizations')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },

    create: async (organization) => {
      const { data, error } = await Bolt Database
        .from('organizations')
        .insert(organization)
        .select()
        .single();
      if (error) throw error;
      return data;
    },

    update: async (id, updates) => {
      const { data, error } = await Bolt Database
        .from('organizations')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return data;
    }
  },

  onboardingApplications: {
    get: async (id) => {
      const { data, error } = await Bolt Database
        .from('onboarding_applications')
        .select('*')
        .eq('id', id)
        .maybeSingle();
      if (error) throw error;
      return data;
    },

    list: async (filters = {}) => {
      let query = supabase.from('onboarding_applications').select('*');

      if (filters.user_id) {
        query = query.eq('user_id', filters.user_id);
      }
      if (filters.application_type) {
        query = query.eq('application_type', filters.application_type);
      }
      if (filters.status) {
        query = query.eq('status', filters.status);
      }

      query = query.order('created_at', { ascending: false });

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },

    create: async (application) => {
      const { data, error } = await Bolt Database
        .from('onboarding_applications')
        .insert(application)
        .select()
        .single();
      if (error) throw error;
      return data;
    },

    update: async (id, updates) => {
      const { data, error } = await Bolt Database
        .from('onboarding_applications')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },

    delete: async (id) => {
      const { error } = await Bolt Database
        .from('onboarding_applications')
        .delete()
        .eq('id', id);
      if (error) throw error;
    }
  },

  workflows: {
    get: async (id) => {
      const { data, error } = await Bolt Database
        .from('workflows')
        .select('*, user:profiles(*), organization:organizations(*)')
        .eq('id', id)
        .maybeSingle();
      if (error) throw error;
      return data;
    },

    list: async (filters = {}) => {
      let query = supabase.from('workflows').select('*, user:profiles(*), organization:organizations(*)');

      if (filters.user_id) {
        query = query.eq('user_id', filters.user_id);
      }
      if (filters.organization_id) {
        query = query.eq('organization_id', filters.organization_id);
      }
      if (filters.status) {
        query = query.eq('status', filters.status);
      }
      if (filters.type) {
        query = query.eq('type', filters.type);
      }
      query = query.order('created_at', { ascending: false });

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },

    create: async (workflow) => {
      const { data, error } = await Bolt Database
        .from('workflows')
        .insert(workflow)
        .select()
        .single();

      if (error) throw error;
      return data;
    },

    update: async (id, updates) => {
      const { data, error } = await Bolt Database
        .from('workflows')
        .update(updates)

        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },

    delete: async (id) => {
      const { error } = await Bolt Database
        .from('workflows')
        .delete()
        .eq('id', id);
      if (error) throw error;
    }
  },

  amlAlerts: {
    get: async (id) => {
      const { data, error } = await Bolt Database
        .from('aml_alerts')
        .select('*, user:profiles(*), organization:organizations(*), transaction:transactions(*)')
        .eq('id', id)
        .maybeSingle();
      if (error) throw error;
      return data;
    },

    list: async (filters = {}) => {
      let query = supabase.from('aml_alerts').select('*, user:profiles(*), organization:organizations(*), transaction:transactions(*)');

      if (filters.user_id) {
        query = query.eq('user_id', filters.user_id);
      }
      if (filters.organization_id) {
        query = query.eq('organization_id', filters.organization_id);
      }
      if (filters.status) {
        query = query.eq('status', filters.status);
      }
      if (filters.severity) {
        query = query.eq('severity', filters.severity);
      }

      query = query.order('created_at', { ascending: false });

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },

    create: async (alert) => {
      const { data, error } = await Bolt Database
        .from('aml_alerts')
      if (error) throw error;
      return data;
    },

    update: async (id, updates) => {
      if (error) throw error;
      return data;
    },

    delete: async (id) => {
        .eq('id', id);
      if (error) throw error;
    }
  },

  transactions: {
    get: async (id) => {
      const { data, error } = await Bolt Database
        .from('transactions')
        .select('*, organization:organizations(*)')
        .eq('id', id)
        .maybeSingle();
      if (error) throw error;
      return data;
    },

    list: async (filters = {}) => {
      let query = supabase.from('transactions').select('*, organization:organizations(*)');

      if (filters.organization_id) {
        query = query.eq('organization_id', filters.organization_id);
      }
      if (filters.status) {
        query = query.eq('status', filters.status);
      }
      if (filters.min_amount) {
        query = query.gte('amount', filters.min_amount);
      }
      if (filters.max_amount) {
        query = query.lte('amount', filters.max_amount);
      }

      query = query.order('created_at', { ascending: false });

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },

    create: async (transaction) => {
      const { data, error } = await Bolt Database
        .from('transactions')
        .insert(transaction)
        .select()
        .single();
      if (error) throw error;
      return data;
    },

    update: async (id, updates) => {
      const { data, error } = await Bolt Database
        .from('transactions')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return data;
    }
  },

  cases: {
    get: async (id) => {
      const { data, error } = await Bolt Database
        .from('cases')
        .select('*, organization:organizations(*), assignee:assigned_to(full_name, email)')
        .eq('id', id)
        .maybeSingle();
      if (error) throw error;
      return data;
    },

    list: async (filters = {}) => {
      let query = supabase.from('cases').select('*, organization:organizations(*), assignee:assigned_to(full_name, email)');

      if (filters.organization_id) {
        query = query.eq('organization_id', filters.organization_id);
      }
      if (filters.assigned_to) {
        query = query.eq('assigned_to', filters.assigned_to);
      }
      if (filters.status) {
        query = query.eq('status', filters.status);
      }
      if (filters.priority) {
        query = query.eq('priority', filters.priority);
      }

      query = query.order('created_at', { ascending: false });

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },

    create: async (caseData) => {
      const { data, error } = await Bolt Database
        .from('cases')
        .insert(caseData)
        .select()
        .single();
      if (error) throw error;
      return data;
    },

    update: async (id, updates) => {
      const { data, error } = await Bolt Database
        .from('cases')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },

    delete: async (id) => {
      const { error } = await Bolt Database
        .from('cases')
        .delete()
        .eq('id', id);
      if (error) throw error;
    }
  },

  policies: {
    get: async (id) => {
      const { data, error } = await Bolt Database
        .from('policies')
        .select('*, organization:organizations(*), creator:created_by(full_name, email)')
        .eq('id', id)
        .maybeSingle();
      if (error) throw error;
      return data;
    },

    list: async (filters = {}) => {
      let query = supabase.from('policies').select('*, organization:organizations(*), creator:created_by(full_name, email)');

      if (filters.organization_id) {
        query = query.eq('organization_id', filters.organization_id);
      }
      if (filters.status) {
        query = query.eq('status', filters.status);
      }
      if (filters.policy_type) {
        query = query.eq('policy_type', filters.policy_type);
      }

      query = query.order('created_at', { ascending: false });

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },

    create: async (policy) => {
      const { data, error } = await Bolt Database
        .from('policies')
        .insert(policy)
        .select()
        .single();
      if (error) throw error;
      return data;
    },

    update: async (id, updates) => {
      const { data, error } = await Bolt Database
        .from('policies')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },

    delete: async (id) => {
      const { error } = await Bolt Database
        .from('policies')
        .delete()
        .eq('id', id);
      if (error) throw error;
    }
  },

  subscriptions: {
    get: async (organizationId) => {
      const { data, error } = await Bolt Database
        .from('subscriptions')
        .select('*, plan:subscription_plans(*)')
        .eq('organization_id', organizationId)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();
      if (error) throw error;
      return data;
    },

    list: async (filters = {}) => {
      let query = supabase.from('subscriptions').select('*, organization:organizations(*), plan:subscription_plans(*)');

      if (filters.organization_id) {
        query = query.eq('organization_id', filters.organization_id);
      }
      if (filters.status) {
        query = query.eq('status', filters.status);
      }

      query = query.order('created_at', { ascending: false });

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },

    create: async (subscription) => {
      const { data, error } = await Bolt Database
        .from('subscriptions')
        .insert(subscription)
        .select()
        .single();
      if (error) throw error;
      return data;
    },

    update: async (id, updates) => {
      const { data, error } = await Bolt Database
        .from('subscriptions')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return data;
    }
  },

  subscriptionPlans: {
    list: async () => {
      const { data, error } = await Bolt Database
        .from('subscription_plans')
        .select('*')
        .eq('is_active', true)
        .order('price_monthly', { ascending: true });
      if (error) throw error;
      return data;
    },

    get: async (id) => {
      const { data, error } = await Bolt Database
        .from('subscription_plans')
        .select('*')
        .eq('id', id)
        .maybeSingle();
      if (error) throw error;
      return data;
    }
  },

  invoices: {
    list: async (filters = {}) => {
      let query = supabase.from('invoices').select('*, organization:organizations(*)');

      if (filters.organization_id) {
        query = query.eq('organization_id', filters.organization_id);
      }
      if (filters.status) {
        query = query.eq('status', filters.status);
      }

      query = query.order('created_at', { ascending: false });

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },

    get: async (id) => {
      const { data, error } = await Bolt Database
        .from('invoices')
        .select('*, organization:organizations(*)')
        .eq('id', id)
        .maybeSingle();
      if (error) throw error;
      return data;
    }
  },

  auditLogs: {
    list: async (filters = {}) => {
      let query = supabase.from('audit_logs').select('*, user:profiles(full_name, email), organization:organizations(name)');

      if (filters.user_id) {
        query = query.eq('user_id', filters.user_id);
      }
      if (filters.organization_id) {
        query = query.eq('organization_id', filters.organization_id);
      }
      if (filters.entity_type) {
        query = query.eq('entity_type', filters.entity_type);
      }

      query = query.order('created_at', { ascending: false }).limit(100);

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },

    create: async (log) => {
      const { data, error } = await Bolt Database
        .from('audit_logs')
        .insert(log)
        .select()
        .single();
      if (error) throw error;
      return data;
    }
  },

  usageTracking: {
    list: async (filters = {}) => {
      let query = supabase.from('usage_tracking').select('*');

      if (filters.organization_id) {
        query = query.eq('organization_id', filters.organization_id);
      }
      if (filters.feature_type) {
        query = query.eq('feature_type', filters.feature_type);
      }

      query = query.order('created_at', { ascending: false });

      const { data, error } = await query;
      if (error) throw error;
      return data;
    }
  }
};

export default supabaseClient;
      const { error } = await Bolt Database
        .from('aml_alerts')
        .delete()
        .eq('id', id)
        .select()
        .single();
      const { data, error } = await Bolt Database
        .from('aml_alerts')
        .update(updates)
        .insert(alert)
        .select()
        .single();

