import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (user?.role !== 'admin') {
      return Response.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
    }

    const translations = [
      // English translations
      { key: 'auth.signin', language: 'en', value: 'Sign In' },
      { key: 'auth.getstarted', language: 'en', value: 'Get Started' },
      { key: 'auth.logout', language: 'en', value: 'Logout' },
      { key: 'nav.home', language: 'en', value: 'Home' },
      { key: 'nav.solutions', language: 'en', value: 'Solutions' },
      { key: 'nav.pricing', language: 'en', value: 'Pricing' },
      { key: 'nav.contact', language: 'en', value: 'Contact' },
      { key: 'nav.dashboard', language: 'en', value: 'Dashboard' },
      { key: 'nav.workflows', language: 'en', value: 'Workflows' },
      { key: 'nav.compliance', language: 'en', value: 'Compliance' },
      { key: 'nav.credentials', language: 'en', value: 'Credentials' },
      { key: 'nav.settings', language: 'en', value: 'Settings' },
      { key: 'nav.analytics', language: 'en', value: 'Analytics' },
      { key: 'nav.users', language: 'en', value: 'Users' },
      
      { key: 'hero.title', language: 'en', value: 'Trust Anchor Service' },
      { key: 'hero.subtitle', language: 'en', value: 'Global interoperability gateway for identity, compliance, and trust services with cryptographic data provenance' },
      { key: 'hero.cta.apply', language: 'en', value: 'Apply for LEI' },
      { key: 'hero.cta.contact', language: 'en', value: 'Contact Sales' },
      { key: 'hero.badge.iso', language: 'en', value: 'ISO Compliant' },
      { key: 'hero.badge.enterprise', language: 'en', value: 'Enterprise Grade' },
      { key: 'hero.badge.global', language: 'en', value: 'Global Coverage' },
      { key: 'hero.services.title', language: 'en', value: 'Enterprise Services' },
      { key: 'hero.services.kyb', language: 'en', value: 'KYB Verification' },
      { key: 'hero.services.aml', language: 'en', value: 'AML Screening' },
      { key: 'hero.services.vlei', language: 'en', value: 'LEI/vLEI Credentials' },
      { key: 'hero.services.did', language: 'en', value: 'Digital Identity (DID)' },
      { key: 'hero.services.tagline', language: 'en', value: 'Cryptographic provenance • Regulatory compliant • API-first' },
      { key: 'hero.poweredby', language: 'en', value: 'POWERED BY' },
      
      { key: 'challenge.title', language: 'en', value: 'The Challenge' },
      { key: 'challenge.fragmented.title', language: 'en', value: 'Fragmented Services' },
      { key: 'challenge.fragmented.desc', language: 'en', value: 'Disconnected identity, compliance, and credential providers increase operational complexity and risk' },
      { key: 'challenge.integration.title', language: 'en', value: 'Integration Burden' },
      { key: 'challenge.integration.desc', language: 'en', value: 'Multiple vendor integrations, slow onboarding, and high maintenance costs limit scalability' },
      { key: 'challenge.solution.title', language: 'en', value: 'TAS Solution' },
      { key: 'challenge.solution.desc', language: 'en', value: 'Unified API gateway with cryptographic provenance and seamless multi-provider orchestration' },
      
      { key: 'services.title', language: 'en', value: 'Enterprise Trust Services' },
      { key: 'services.subtitle', language: 'en', value: 'Complete identity verification and compliance infrastructure via unified API' },

      // Chinese translations
      { key: 'auth.signin', language: 'zh', value: '登录' },
      { key: 'auth.getstarted', language: 'zh', value: '开始使用' },
      { key: 'auth.logout', language: 'zh', value: '登出' },
      { key: 'nav.home', language: 'zh', value: '首页' },
      { key: 'nav.solutions', language: 'zh', value: '解决方案' },
      { key: 'nav.pricing', language: 'zh', value: '定价' },
      { key: 'nav.contact', language: 'zh', value: '联系我们' },
      { key: 'nav.dashboard', language: 'zh', value: '仪表板' },
      { key: 'nav.workflows', language: 'zh', value: '工作流程' },
      { key: 'nav.compliance', language: 'zh', value: '合规性' },
      { key: 'nav.credentials', language: 'zh', value: '凭证' },
      { key: 'nav.settings', language: 'zh', value: '设置' },
      { key: 'nav.analytics', language: 'zh', value: '分析' },
      { key: 'nav.users', language: 'zh', value: '用户' },
      
      { key: 'hero.title', language: 'zh', value: '信任锚服务' },
      { key: 'hero.subtitle', language: 'zh', value: '身份、合规和信任服务的全球互操作网关，具有加密数据来源' },
      { key: 'hero.cta.apply', language: 'zh', value: '申请LEI' },
      { key: 'hero.cta.contact', language: 'zh', value: '联系销售' },
      { key: 'hero.badge.iso', language: 'zh', value: 'ISO合规' },
      { key: 'hero.badge.enterprise', language: 'zh', value: '企业级' },
      { key: 'hero.badge.global', language: 'zh', value: '全球覆盖' },
      { key: 'hero.services.title', language: 'zh', value: '企业服务' },
      { key: 'hero.services.kyb', language: 'zh', value: 'KYB验证' },
      { key: 'hero.services.aml', language: 'zh', value: 'AML筛查' },
      { key: 'hero.services.vlei', language: 'zh', value: 'LEI/vLEI凭证' },
      { key: 'hero.services.did', language: 'zh', value: '数字身份 (DID)' },
      { key: 'hero.services.tagline', language: 'zh', value: '加密来源 • 合规监管 • API优先' },
      { key: 'hero.poweredby', language: 'zh', value: '技术支持' },
      
      { key: 'challenge.title', language: 'zh', value: '挑战' },
      { key: 'challenge.fragmented.title', language: 'zh', value: '服务碎片化' },
      { key: 'challenge.fragmented.desc', language: 'zh', value: '断开的身份、合规和凭证提供商增加了运营复杂性和风险' },
      { key: 'challenge.integration.title', language: 'zh', value: '集成负担' },
      { key: 'challenge.integration.desc', language: 'zh', value: '多个供应商集成、缓慢的入职流程和高维护成本限制了可扩展性' },
      { key: 'challenge.solution.title', language: 'zh', value: 'TAS解决方案' },
      { key: 'challenge.solution.desc', language: 'zh', value: '统一的API网关，具有加密来源和无缝的多提供商编排' },
      
      { key: 'services.title', language: 'zh', value: '企业信任服务' },
      { key: 'services.subtitle', language: 'zh', value: '通过统一API实现完整的身份验证和合规基础设施' },

      // Arabic translations (RTL)
      { key: 'auth.signin', language: 'ar', value: 'تسجيل الدخول' },
      { key: 'auth.getstarted', language: 'ar', value: 'ابدأ' },
      { key: 'auth.logout', language: 'ar', value: 'تسجيل خروج' },
      { key: 'nav.home', language: 'ar', value: 'الرئيسية' },
      { key: 'nav.solutions', language: 'ar', value: 'الحلول' },
      { key: 'nav.pricing', language: 'ar', value: 'التسعير' },
      { key: 'nav.contact', language: 'ar', value: 'اتصل بنا' },
      { key: 'nav.dashboard', language: 'ar', value: 'لوحة التحكم' },
      { key: 'nav.workflows', language: 'ar', value: 'سير العمل' },
      { key: 'nav.compliance', language: 'ar', value: 'الامتثال' },
      { key: 'nav.credentials', language: 'ar', value: 'بيانات الاعتماد' },
      { key: 'nav.settings', language: 'ar', value: 'الإعدادات' },
      
      { key: 'hero.title', language: 'ar', value: 'خدمة نقطة الثقة' },
      { key: 'hero.subtitle', language: 'ar', value: 'بوابة التشغيل البيني العالمية للهوية والامتثال وخدمات الثقة مع أصل البيانات المشفرة' },
      { key: 'hero.cta.apply', language: 'ar', value: 'تقديم طلب LEI' },
      { key: 'hero.cta.contact', language: 'ar', value: 'اتصل بالمبيعات' },
      { key: 'hero.badge.iso', language: 'ar', value: 'متوافق مع ISO' },
      { key: 'hero.badge.enterprise', language: 'ar', value: 'على مستوى المؤسسات' },
      { key: 'hero.badge.global', language: 'ar', value: 'تغطية عالمية' },
      { key: 'hero.services.title', language: 'ar', value: 'خدمات المؤسسات' },
      { key: 'hero.services.kyb', language: 'ar', value: 'التحقق من KYB' },
      { key: 'hero.services.aml', language: 'ar', value: 'فحص AML' },
      { key: 'hero.services.vlei', language: 'ar', value: 'بيانات اعتماد LEI/vLEI' },
      { key: 'hero.services.did', language: 'ar', value: 'الهوية الرقمية (DID)' },
      
      { key: 'challenge.title', language: 'ar', value: 'التحدي' },
      { key: 'challenge.fragmented.title', language: 'ar', value: 'خدمات مجزأة' },
      { key: 'challenge.integration.title', language: 'ar', value: 'عبء التكامل' },
      { key: 'challenge.solution.title', language: 'ar', value: 'حل TAS' },

      // Spanish translations
      { key: 'auth.signin', language: 'es', value: 'Iniciar sesión' },
      { key: 'auth.getstarted', language: 'es', value: 'Comenzar' },
      { key: 'nav.home', language: 'es', value: 'Inicio' },
      { key: 'nav.solutions', language: 'es', value: 'Soluciones' },
      { key: 'nav.pricing', language: 'es', value: 'Precios' },
      { key: 'nav.dashboard', language: 'es', value: 'Panel' },
      { key: 'hero.title', language: 'es', value: 'Servicio de Anclaje de Confianza' },
      { key: 'hero.subtitle', language: 'es', value: 'Puerta de enlace de interoperabilidad global para identidad, cumplimiento y servicios de confianza con procedencia criptográfica de datos' },

      // German translations
      { key: 'auth.signin', language: 'de', value: 'Anmelden' },
      { key: 'nav.home', language: 'de', value: 'Startseite' },
      { key: 'nav.solutions', language: 'de', value: 'Lösungen' },
      { key: 'hero.title', language: 'de', value: 'Trust Anchor Service' },

      // French translations
      { key: 'auth.signin', language: 'fr', value: 'Se connecter' },
      { key: 'nav.home', language: 'fr', value: 'Accueil' },
      { key: 'hero.title', language: 'fr', value: 'Service d\'Ancrage de Confiance' },

      // Japanese translations
      { key: 'auth.signin', language: 'ja', value: 'サインイン' },
      { key: 'nav.home', language: 'ja', value: 'ホーム' },
      { key: 'hero.title', language: 'ja', value: 'トラストアンカーサービス' },

      // Russian translations
      { key: 'auth.signin', language: 'ru', value: 'Войти' },
      { key: 'nav.home', language: 'ru', value: 'Главная' },
      { key: 'hero.title', language: 'ru', value: 'Служба якоря доверия' },
    ];

    await base44.asServiceRole.entities.Translation.bulkCreate(translations);

    return Response.json({ 
      success: true, 
      message: `Seeded ${translations.length} translations across all content sections`,
      count: translations.length
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});