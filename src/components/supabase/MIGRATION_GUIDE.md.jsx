# 🚀 Supabase Migration Guide

## Step 1: Create Supabase Project
1. Go to https://supabase.com and sign up
2. Create new project
3. Note your **Project URL** and **anon key**

## Step 2: Set Environment Variables
Add to Base44 dashboard or create `.env`:
```
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...
```

## Step 3: Run Database Schema
1. Open Supabase Dashboard → SQL Editor
2. Copy entire content from `components/supabase/schema.sql`
3. Paste and click "Run"

## Step 4: Verify Tables Created
Check Database → Tables for:
- translations
- providers  
- workflows
- user_profiles

## Step 5: Seed Translations
Run this SQL in Supabase SQL Editor:

```sql
INSERT INTO translations (key, language, value, context) VALUES
  ('auth.signin', 'en', 'Sign In', 'authentication'),
  ('auth.getstarted', 'en', 'Get Started', 'authentication'),
  ('hero.title', 'en', 'Trust Anchor Service', 'homepage'),
  ('hero.subtitle', 'en', 'Global interoperability gateway for identity, compliance, and trust services with cryptographic data provenance', 'homepage'),
  ('nav.home', 'en', 'Home', 'navigation'),
  ('nav.solutions', 'en', 'Solutions', 'navigation'),
  ('nav.pricing', 'en', 'Pricing', 'navigation'),
  ('nav.contact', 'en', 'Contact', 'navigation'),
  
  -- Chinese
  ('auth.signin', 'zh', '登录', 'authentication'),
  ('hero.title', 'zh', '信任锚服务', 'homepage'),
  ('nav.home', 'zh', '首页', 'navigation'),
  
  -- Arabic
  ('auth.signin', 'ar', 'تسجيل الدخول', 'authentication'),
  ('hero.title', 'ar', 'خدمة نقطة الثقة', 'homepage'),
  ('nav.home', 'ar', 'الرئيسية', 'navigation');
```

## Step 6: Test
Switch languages in app and verify translations load from Supabase.

## AWS Production Deployment

### Build & Deploy to S3 + CloudFront
```bash
npm run build
aws s3 sync dist/ s3://your-bucket --delete
```

Configure CloudFront with S3 origin and SSL certificate.

## Migration from Base44 Entities

Replace Base44 calls with Supabase:

```javascript
// OLD
await base44.entities.Provider.list()

// NEW  
const { data } = await supabase.from('providers').select('*')
``