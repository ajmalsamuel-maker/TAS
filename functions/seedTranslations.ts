import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (user?.role !== 'admin') {
      return Response.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
    }

    // Enterprise-grade multilingual translations with ICU MessageFormat support
    const translations = [
      // Authentication & Navigation
      { key: 'auth.signin', language: 'en', value: 'Sign In', context: 'authentication' },
      { key: 'auth.getstarted', language: 'en', value: 'Get Started', context: 'authentication' },
      { key: 'auth.logout', language: 'en', value: 'Logout', context: 'authentication' },
      
      { key: 'nav.home', language: 'en', value: 'Home', context: 'navigation' },
      { key: 'nav.solutions', language: 'en', value: 'Solutions', context: 'navigation' },
      { key: 'nav.pricing', language: 'en', value: 'Pricing', context: 'navigation' },
      { key: 'nav.contact', language: 'en', value: 'Contact', context: 'navigation' },
      { key: 'nav.dashboard', language: 'en', value: 'Dashboard', context: 'navigation' },
      { key: 'nav.workflows', language: 'en', value: 'Workflows', context: 'navigation' },
      { key: 'nav.compliance', language: 'en', value: 'Compliance', context: 'navigation' },
      { key: 'nav.credentials', language: 'en', value: 'Credentials', context: 'navigation' },
      { key: 'nav.settings', language: 'en', value: 'Settings', context: 'navigation' },
      { key: 'nav.analytics', language: 'en', value: 'Analytics', context: 'navigation' },
      { key: 'nav.users', language: 'en', value: 'Users', context: 'navigation' },

      // Hero Section
      { key: 'hero.title', language: 'en', value: 'Trust Anchor Service', context: 'homepage' },
      { key: 'hero.subtitle', language: 'en', value: 'Global interoperability gateway for identity, compliance, and trust services with cryptographic data provenance', context: 'homepage' },
      { key: 'hero.cta.apply', language: 'en', value: 'Apply for LEI', context: 'homepage' },
      { key: 'hero.cta.contact', language: 'en', value: 'Contact Sales', context: 'homepage' },

      // Common UI
      { key: 'common.loading', language: 'en', value: 'Loading...', context: 'common' },
      { key: 'common.save', language: 'en', value: 'Save', context: 'common' },
      { key: 'common.cancel', language: 'en', value: 'Cancel', context: 'common' },
      { key: 'common.submit', language: 'en', value: 'Submit', context: 'common' },
      { key: 'common.success', language: 'en', value: 'Success', context: 'common' },
      { key: 'common.error', language: 'en', value: 'Error', context: 'common' },

      // ICU Pluralization examples
      { 
        key: 'workflow.count', 
        language: 'en', 
        value: '{count, plural, =0 {No workflows} one {1 workflow} other {# workflows}}',
        context: 'workflows',
        plural_forms: { zero: 'No workflows', one: '1 workflow', other: '{count} workflows' }
      },

      // Chinese (Simplified) - zh
      { key: 'auth.signin', language: 'zh', value: '登录', context: 'authentication' },
      { key: 'auth.getstarted', language: 'zh', value: '开始使用', context: 'authentication' },
      { key: 'auth.logout', language: 'zh', value: '登出', context: 'authentication' },
      
      { key: 'nav.home', language: 'zh', value: '首页', context: 'navigation' },
      { key: 'nav.solutions', language: 'zh', value: '解决方案', context: 'navigation' },
      { key: 'nav.pricing', language: 'zh', value: '定价', context: 'navigation' },
      { key: 'nav.contact', language: 'zh', value: '联系我们', context: 'navigation' },
      { key: 'nav.dashboard', language: 'zh', value: '仪表板', context: 'navigation' },
      { key: 'nav.workflows', language: 'zh', value: '工作流程', context: 'navigation' },
      { key: 'nav.compliance', language: 'zh', value: '合规性', context: 'navigation' },
      { key: 'nav.credentials', language: 'zh', value: '凭证', context: 'navigation' },
      { key: 'nav.settings', language: 'zh', value: '设置', context: 'navigation' },
      { key: 'nav.analytics', language: 'zh', value: '分析', context: 'navigation' },
      { key: 'nav.users', language: 'zh', value: '用户', context: 'navigation' },

      { key: 'hero.title', language: 'zh', value: '信任锚服务', context: 'homepage' },
      { key: 'hero.subtitle', language: 'zh', value: '身份、合规和信任服务的全球互操作网关，具有加密数据来源', context: 'homepage' },
      
      { key: 'common.loading', language: 'zh', value: '加载中...', context: 'common' },
      { key: 'common.save', language: 'zh', value: '保存', context: 'common' },
      { key: 'common.cancel', language: 'zh', value: '取消', context: 'common' },
      { key: 'common.submit', language: 'zh', value: '提交', context: 'common' },

      // Arabic - ar (RTL language)
      { key: 'auth.signin', language: 'ar', value: 'تسجيل الدخول', context: 'authentication' },
      { key: 'auth.getstarted', language: 'ar', value: 'ابدأ', context: 'authentication' },
      { key: 'auth.logout', language: 'ar', value: 'تسجيل خروج', context: 'authentication' },
      
      { key: 'nav.home', language: 'ar', value: 'الرئيسية', context: 'navigation' },
      { key: 'nav.solutions', language: 'ar', value: 'الحلول', context: 'navigation' },
      { key: 'nav.pricing', language: 'ar', value: 'التسعير', context: 'navigation' },
      { key: 'nav.contact', language: 'ar', value: 'اتصل بنا', context: 'navigation' },
      { key: 'nav.dashboard', language: 'ar', value: 'لوحة التحكم', context: 'navigation' },
      { key: 'nav.workflows', language: 'ar', value: 'سير العمل', context: 'navigation' },
      { key: 'nav.compliance', language: 'ar', value: 'الامتثال', context: 'navigation' },
      { key: 'nav.credentials', language: 'ar', value: 'بيانات الاعتماد', context: 'navigation' },
      { key: 'nav.settings', language: 'ar', value: 'الإعدادات', context: 'navigation' },

      { key: 'hero.title', language: 'ar', value: 'خدمة نقطة الثقة', context: 'homepage' },
      
      { key: 'common.loading', language: 'ar', value: 'جاري التحميل...', context: 'common' },
      { key: 'common.save', language: 'ar', value: 'حفظ', context: 'common' },
      { key: 'common.cancel', language: 'ar', value: 'إلغاء', context: 'common' },

      // Spanish (Latin America) - es
      { key: 'auth.signin', language: 'es', value: 'Iniciar sesión', context: 'authentication' },
      { key: 'auth.getstarted', language: 'es', value: 'Comenzar', context: 'authentication' },
      { key: 'auth.logout', language: 'es', value: 'Cerrar sesión', context: 'authentication' },
      
      { key: 'nav.home', language: 'es', value: 'Inicio', context: 'navigation' },
      { key: 'nav.solutions', language: 'es', value: 'Soluciones', context: 'navigation' },
      { key: 'nav.pricing', language: 'es', value: 'Precios', context: 'navigation' },
      { key: 'nav.contact', language: 'es', value: 'Contacto', context: 'navigation' },
      { key: 'nav.dashboard', language: 'es', value: 'Panel', context: 'navigation' },
      { key: 'nav.settings', language: 'es', value: 'Configuración', context: 'navigation' },

      { key: 'hero.title', language: 'es', value: 'Servicio de Anclaje de Confianza', context: 'homepage' },

      // German - de
      { key: 'auth.signin', language: 'de', value: 'Anmelden', context: 'authentication' },
      { key: 'auth.getstarted', language: 'de', value: 'Loslegen', context: 'authentication' },
      { key: 'nav.home', language: 'de', value: 'Startseite', context: 'navigation' },
      { key: 'nav.solutions', language: 'de', value: 'Lösungen', context: 'navigation' },
      { key: 'nav.pricing', language: 'de', value: 'Preise', context: 'navigation' },

      // French - fr
      { key: 'auth.signin', language: 'fr', value: 'Se connecter', context: 'authentication' },
      { key: 'auth.getstarted', language: 'fr', value: 'Commencer', context: 'authentication' },
      { key: 'nav.home', language: 'fr', value: 'Accueil', context: 'navigation' },
      { key: 'nav.solutions', language: 'fr', value: 'Solutions', context: 'navigation' },

      // Japanese - ja
      { key: 'auth.signin', language: 'ja', value: 'サインイン', context: 'authentication' },
      { key: 'nav.home', language: 'ja', value: 'ホーム', context: 'navigation' },
      { key: 'nav.dashboard', language: 'ja', value: 'ダッシュボード', context: 'navigation' },

      // Russian - ru
      { key: 'auth.signin', language: 'ru', value: 'Войти', context: 'authentication' },
      { key: 'nav.home', language: 'ru', value: 'Главная', context: 'navigation' },
      { key: 'nav.dashboard', language: 'ru', value: 'Панель управления', context: 'navigation' },
    ];

    await base44.asServiceRole.entities.Translation.bulkCreate(translations);

    return Response.json({ 
      success: true, 
      message: `Seeded ${translations.length} enterprise-grade translations with ICU MessageFormat support`,
      count: translations.length,
      languages: ['en', 'zh', 'ar', 'es', 'de', 'fr', 'ja', 'ru'],
      standards: ['ISO 639-1', 'ISO 639-2', 'BCP 47', 'CLDR', 'ICU MessageFormat', 'UTF-8']
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});