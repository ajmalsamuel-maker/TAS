import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (user?.role !== 'admin') {
      return Response.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
    }

    const translations = [
      // Navigation - English
      { key: 'nav.home', language: 'en', value: 'Home', context: 'navigation' },
      { key: 'nav.solutions', language: 'en', value: 'Solutions', context: 'navigation' },
      { key: 'nav.pricing', language: 'en', value: 'Pricing', context: 'navigation' },
      { key: 'nav.contact', language: 'en', value: 'Contact', context: 'navigation' },
      { key: 'nav.dashboard', language: 'en', value: 'Dashboard', context: 'navigation' },
      { key: 'nav.workflows', language: 'en', value: 'Workflows', context: 'navigation' },
      { key: 'nav.compliance', language: 'en', value: 'Compliance', context: 'navigation' },
      { key: 'nav.credentials', language: 'en', value: 'Credentials', context: 'navigation' },
      { key: 'nav.settings', language: 'en', value: 'Settings', context: 'navigation' },

      // Hero Section - English
      { key: 'hero.title', language: 'en', value: 'Trust Anchor Service', context: 'homepage' },
      { key: 'hero.subtitle', language: 'en', value: 'Global interoperability gateway for identity, compliance, and trust services with cryptographic data provenance', context: 'homepage' },
      { key: 'hero.cta.apply', language: 'en', value: 'Apply for LEI', context: 'homepage' },
      { key: 'hero.cta.contact', language: 'en', value: 'Contact Sales', context: 'homepage' },

      // Navigation - Chinese
      { key: 'nav.home', language: 'zh', value: '首页', context: 'navigation' },
      { key: 'nav.solutions', language: 'zh', value: '解决方案', context: 'navigation' },
      { key: 'nav.pricing', language: 'zh', value: '定价', context: 'navigation' },
      { key: 'nav.contact', language: 'zh', value: '联系我们', context: 'navigation' },
      { key: 'nav.dashboard', language: 'zh', value: '仪表板', context: 'navigation' },
      { key: 'nav.workflows', language: 'zh', value: '工作流程', context: 'navigation' },
      { key: 'nav.compliance', language: 'zh', value: '合规', context: 'navigation' },
      { key: 'nav.credentials', language: 'zh', value: '凭证', context: 'navigation' },
      { key: 'nav.settings', language: 'zh', value: '设置', context: 'navigation' },

      // Hero - Chinese
      { key: 'hero.title', language: 'zh', value: '信任锚服务', context: 'homepage' },
      { key: 'hero.subtitle', language: 'zh', value: '全球身份、合规和信任服务互操作性网关，具有加密数据来源', context: 'homepage' },
      { key: 'hero.cta.apply', language: 'zh', value: '申请LEI', context: 'homepage' },
      { key: 'hero.cta.contact', language: 'zh', value: '联系销售', context: 'homepage' },

      // Navigation - Arabic
      { key: 'nav.home', language: 'ar', value: 'الرئيسية', context: 'navigation' },
      { key: 'nav.solutions', language: 'ar', value: 'الحلول', context: 'navigation' },
      { key: 'nav.pricing', language: 'ar', value: 'التسعير', context: 'navigation' },
      { key: 'nav.contact', language: 'ar', value: 'اتصل بنا', context: 'navigation' },
      { key: 'nav.dashboard', language: 'ar', value: 'لوحة التحكم', context: 'navigation' },
      
      // Common - English
      { key: 'common.loading', language: 'en', value: 'Loading...', context: 'common' },
      { key: 'common.save', language: 'en', value: 'Save', context: 'common' },
      { key: 'common.cancel', language: 'en', value: 'Cancel', context: 'common' },
      { key: 'common.submit', language: 'en', value: 'Submit', context: 'common' },
      { key: 'common.success', language: 'en', value: 'Success', context: 'common' },
      { key: 'common.error', language: 'en', value: 'Error', context: 'common' },

      // Common - Chinese
      { key: 'common.loading', language: 'zh', value: '加载中...', context: 'common' },
      { key: 'common.save', language: 'zh', value: '保存', context: 'common' },
      { key: 'common.cancel', language: 'zh', value: '取消', context: 'common' },
      { key: 'common.submit', language: 'zh', value: '提交', context: 'common' },
      { key: 'common.success', language: 'zh', value: '成功', context: 'common' },
      { key: 'common.error', language: 'zh', value: '错误', context: 'common' },

      // Common - Arabic
      { key: 'common.loading', language: 'ar', value: 'جاري التحميل...', context: 'common' },
      { key: 'common.save', language: 'ar', value: 'حفظ', context: 'common' },
      { key: 'common.cancel', language: 'ar', value: 'إلغاء', context: 'common' },
      { key: 'common.submit', language: 'ar', value: 'إرسال', context: 'common' },
    ];

    await base44.asServiceRole.entities.Translation.bulkCreate(translations);

    return Response.json({ 
      success: true, 
      message: `Seeded ${translations.length} translations`,
      count: translations.length 
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});