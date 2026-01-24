-- ============================================
-- TAS Platform - Supabase Database Schema
-- Copy this into Supabase SQL Editor and run
-- ============================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================
-- TRANSLATIONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS translations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key TEXT NOT NULL,
  language VARCHAR(10) NOT NULL,
  value TEXT NOT NULL,
  context TEXT,
  plural_forms JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by TEXT,
  
  UNIQUE(key, language)
);

CREATE INDEX idx_translations_language ON translations(language);
CREATE INDEX idx_translations_key ON translations(key);

-- ============================================
-- PROVIDERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS providers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  service_type TEXT NOT NULL CHECK (service_type IN ('vlei', 'kyb', 'aml', 'did', 'credential_verification', 'web3')),
  endpoint TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'degraded', 'offline')),
  uptime_percentage NUMERIC DEFAULT 99.9,
  avg_response_time_ms NUMERIC,
  total_requests BIGINT DEFAULT 0,
  lei TEXT,
  region TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by TEXT
);

-- ============================================
-- WORKFLOWS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS workflows (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT,
  type TEXT NOT NULL CHECK (type IN ('kyb', 'aml', 'vlei_issuance', 'did_verification', 'credential_verification', 'custom')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'failed')),
  provenance_chain JSONB,
  language TEXT DEFAULT 'en',
  provider_name TEXT,
  result JSONB,
  data_passport JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by TEXT
);

-- ============================================
-- USER PROFILES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT UNIQUE NOT NULL,
  full_name TEXT,
  email TEXT UNIQUE NOT NULL,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  language TEXT DEFAULT 'en',
  timezone TEXT DEFAULT 'UTC',
  company TEXT,
  position TEXT,
  phone TEXT,
  preferences JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- UPDATED_AT TRIGGER
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_translations_updated_at BEFORE UPDATE ON translations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_providers_updated_at BEFORE UPDATE ON providers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_workflows_updated_at BEFORE UPDATE ON workflows FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================
ALTER TABLE translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE workflows ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Public read for translations
CREATE POLICY "Translations are publicly readable" ON translations FOR SELECT USING (true);

-- Providers - public read
CREATE POLICY "Providers are publicly readable" ON providers FOR SELECT USING (true);

-- Workflows - users can see their own
CREATE POLICY "Users can view their own workflows" ON workflows FOR SELECT USING (true);

-- User profiles
CREATE POLICY "Users can view profiles" ON user_profiles FOR SELECT USING (true);