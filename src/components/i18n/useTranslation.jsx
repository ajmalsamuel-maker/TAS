import { useState, useEffect, createContext, useContext } from 'react';
import { base44 } from '@/api/base44Client';

const TranslationContext = createContext();

export function TranslationProvider({ children }) {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [translations, setTranslations] = useState({});
  const [isRTL, setIsRTL] = useState(false);
  const [loading, setLoading] = useState(true);

  // RTL languages per ISO 639-1
  const RTL_LANGUAGES = ['ar', 'he', 'fa', 'ur', 'yi', 'arc'];

  useEffect(() => {
    loadTranslations();
    loadUserLanguagePreference();
  }, []);

  useEffect(() => {
    setIsRTL(RTL_LANGUAGES.includes(currentLanguage));
    document.documentElement.dir = RTL_LANGUAGES.includes(currentLanguage) ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLanguage;
  }, [currentLanguage]);

  const loadUserLanguagePreference = async () => {
    try {
      const user = await base44.auth.me();
      if (user?.language) {
        setCurrentLanguage(user.language);
      } else {
        const browserLang = navigator.language.split('-')[0];
        setCurrentLanguage(browserLang || 'en');
      }
    } catch {
      const browserLang = navigator.language.split('-')[0];
      setCurrentLanguage(browserLang || 'en');
    }
  };

  const loadTranslations = async () => {
    try {
      const allTranslations = await base44.entities.Translation.list();
      const translationMap = {};
      
      allTranslations.forEach(t => {
        if (!translationMap[t.language]) {
          translationMap[t.language] = {};
        }
        translationMap[t.language][t.key] = t;
      });
      
      setTranslations(translationMap);
      setLoading(false);
    } catch (error) {
      console.error('Failed to load translations:', error);
      setLoading(false);
    }
  };

  const changeLanguage = async (lang) => {
    setCurrentLanguage(lang);
    try {
      const user = await base44.auth.me();
      if (user) {
        await base44.auth.updateMe({ language: lang });
      }
    } catch (error) {
      console.error('Failed to save language preference:', error);
    }
  };

  const t = (key, params = {}, count = null) => {
    const langTranslations = translations[currentLanguage] || {};
    const fallbackTranslations = translations['en'] || {};
    
    let translation = langTranslations[key] || fallbackTranslations[key];
    
    if (!translation) {
      return key;
    }

    let text = translation.value;

    // Pluralization support
    if (count !== null && translation.plural_forms) {
      if (count === 0 && translation.plural_forms.zero) {
        text = translation.plural_forms.zero;
      } else if (count === 1 && translation.plural_forms.one) {
        text = translation.plural_forms.one;
      } else if (translation.plural_forms.other) {
        text = translation.plural_forms.other;
      }
    }

    // Interpolation support
    Object.keys(params).forEach(param => {
      text = text.replace(new RegExp(`{{${param}}}`, 'g'), params[param]);
    });

    return text;
  };

  return (
    <TranslationContext.Provider value={{ 
      t, 
      currentLanguage, 
      changeLanguage, 
      isRTL, 
      loading,
      availableLanguages: AVAILABLE_LANGUAGES 
    }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within TranslationProvider');
  }
  return context;
}

// ISO 639-1 primary languages with ISO 639-2 fallback
export const AVAILABLE_LANGUAGES = [
  { code: 'en', name: 'English', nativeName: 'English', iso6392: 'eng' },
  { code: 'zh', name: 'Chinese', nativeName: '中文', iso6392: 'zho' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', iso6392: 'spa' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', iso6392: 'ara', rtl: true },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', iso6392: 'hin' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', iso6392: 'por' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', iso6392: 'rus' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', iso6392: 'jpn' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', iso6392: 'deu' },
  { code: 'fr', name: 'French', nativeName: 'Français', iso6392: 'fra' },
  { code: 'ko', name: 'Korean', nativeName: '한국어', iso6392: 'kor' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', iso6392: 'ita' },
  { code: 'he', name: 'Hebrew', nativeName: 'עברית', iso6392: 'heb', rtl: true }
];