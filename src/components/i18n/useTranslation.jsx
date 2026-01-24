import { useState, useEffect, createContext, useContext } from 'react';
import { supabase, subscribeToTable } from '../lib/supabaseClient';
import IntlMessageFormat from 'intl-messageformat';

const TranslationContext = createContext();

export const AVAILABLE_LANGUAGES = [
  { 
    code: 'en', 
    bcp47: 'en-US',
    iso6391: 'en',
    iso6392: 'eng',
    name: 'English', 
    nativeName: 'English',
    direction: 'ltr',
    cldrLocale: 'en-US'
  },
  { 
    code: 'zh', 
    bcp47: 'zh-Hans-CN',
    iso6391: 'zh',
    iso6392: 'zho',
    name: 'Chinese (Simplified)', 
    nativeName: '简体中文',
    direction: 'ltr',
    cldrLocale: 'zh-Hans-CN'
  },
  { 
    code: 'es', 
    bcp47: 'es-419',
    iso6391: 'es',
    iso6392: 'spa',
    name: 'Spanish (Latin America)', 
    nativeName: 'Español',
    direction: 'ltr',
    cldrLocale: 'es-419'
  },
  { 
    code: 'ar', 
    bcp47: 'ar-SA',
    iso6391: 'ar',
    iso6392: 'ara',
    name: 'Arabic', 
    nativeName: 'العربية',
    direction: 'rtl',
    cldrLocale: 'ar-SA'
  },
  { 
    code: 'hi', 
    bcp47: 'hi-IN',
    iso6391: 'hi',
    iso6392: 'hin',
    name: 'Hindi', 
    nativeName: 'हिन्दी',
    direction: 'ltr',
    cldrLocale: 'hi-IN'
  },
  { 
    code: 'pt', 
    bcp47: 'pt-BR',
    iso6391: 'pt',
    iso6392: 'por',
    name: 'Portuguese (Brazil)', 
    nativeName: 'Português',
    direction: 'ltr',
    cldrLocale: 'pt-BR'
  },
  { 
    code: 'ru', 
    bcp47: 'ru-RU',
    iso6391: 'ru',
    iso6392: 'rus',
    name: 'Russian', 
    nativeName: 'Русский',
    direction: 'ltr',
    cldrLocale: 'ru-RU'
  },
  { 
    code: 'ja', 
    bcp47: 'ja-JP',
    iso6391: 'ja',
    iso6392: 'jpn',
    name: 'Japanese', 
    nativeName: '日本語',
    direction: 'ltr',
    cldrLocale: 'ja-JP'
  },
  { 
    code: 'de', 
    bcp47: 'de-DE',
    iso6391: 'de',
    iso6392: 'deu',
    name: 'German', 
    nativeName: 'Deutsch',
    direction: 'ltr',
    cldrLocale: 'de-DE'
  },
  { 
    code: 'fr', 
    bcp47: 'fr-FR',
    iso6391: 'fr',
    iso6392: 'fra',
    name: 'French', 
    nativeName: 'Français',
    direction: 'ltr',
    cldrLocale: 'fr-FR'
  },
  { 
    code: 'ko', 
    bcp47: 'ko-KR',
    iso6391: 'ko',
    iso6392: 'kor',
    name: 'Korean', 
    nativeName: '한국어',
    direction: 'ltr',
    cldrLocale: 'ko-KR'
  },
  { 
    code: 'it', 
    bcp47: 'it-IT',
    iso6391: 'it',
    iso6392: 'ita',
    name: 'Italian', 
    nativeName: 'Italiano',
    direction: 'ltr',
    cldrLocale: 'it-IT'
  },
  { 
    code: 'he', 
    bcp47: 'he-IL',
    iso6391: 'he',
    iso6392: 'heb',
    name: 'Hebrew', 
    nativeName: 'עברית',
    direction: 'rtl',
    cldrLocale: 'he-IL'
  }
];

export function TranslationProvider({ children }) {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [translations, setTranslations] = useState({});
  const [loading, setLoading] = useState(true);

  const currentLangData = AVAILABLE_LANGUAGES.find(l => l.code === currentLanguage) || AVAILABLE_LANGUAGES[0];
  const isRTL = currentLangData.direction === 'rtl';

  useEffect(() => {
    loadTranslations();
    loadUserLanguagePreference();
  }, []);

  useEffect(() => {
    // Real-time translation updates from Supabase
    if (!supabase) return;
    
    const unsubscribe = subscribeToTable('translations', (payload) => {
      if (payload.eventType === 'INSERT' || payload.eventType === 'UPDATE') {
        const translation = payload.new;
        setTranslations(prev => ({
          ...prev,
          [translation.language]: {
            ...prev[translation.language],
            [translation.key]: translation
          }
        }));
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLangData.bcp47;
    document.documentElement.setAttribute('data-locale', currentLangData.cldrLocale);
  }, [currentLanguage, isRTL, currentLangData]);

  const loadUserLanguagePreference = async () => {
    try {
      if (supabase) {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data: profile } = await supabase
            .from('user_profiles')
            .select('language')
            .eq('user_id', user.id)
            .single();
          
          if (profile?.language) {
            setCurrentLanguage(profile.language);
            return;
          }
        }
      }
    } catch (error) {
      console.error('Failed to load user language preference:', error);
    }
    
    const browserLang = navigator.language.split('-')[0];
    const supportedLang = AVAILABLE_LANGUAGES.find(l => l.code === browserLang);
    setCurrentLanguage(supportedLang ? browserLang : 'en');
  };

  const loadTranslations = async () => {
    try {
      if (!supabase) {
        console.warn('Supabase not configured, using empty translations');
        setLoading(false);
        return;
      }

      const { data: allTranslations, error } = await supabase
        .from('translations')
        .select('*');

      if (error) throw error;

      const translationMap = {};
      allTranslations?.forEach(t => {
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
      if (supabase) {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          await supabase
            .from('user_profiles')
            .upsert({ 
              user_id: user.id, 
              language: lang,
              updated_at: new Date().toISOString()
            }, {
              onConflict: 'user_id'
            });
        }
      }
    } catch (error) {
      console.error('Failed to save language preference:', error);
    }
  };

  const t = (key, params = {}) => {
    const langTranslations = translations[currentLanguage] || {};
    const fallbackTranslations = translations['en'] || {};
    
    let translation = langTranslations[key] || fallbackTranslations[key];
    
    if (!translation) {
      return key;
    }

    let messagePattern = translation.value;

    try {
      const msg = new IntlMessageFormat(messagePattern, currentLangData.bcp47);
      return msg.format(params);
    } catch (error) {
      console.error(`Translation error for key "${key}":`, error);
      return messagePattern;
    }
  };

  const formatters = {
    date: (date, options = {}) => {
      const defaults = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Intl.DateTimeFormat(currentLangData.bcp47, { ...defaults, ...options }).format(new Date(date));
    },
    
    time: (date, options = {}) => {
      const defaults = { hour: '2-digit', minute: '2-digit' };
      return new Intl.DateTimeFormat(currentLangData.bcp47, { ...defaults, ...options }).format(new Date(date));
    },
    
    datetime: (date, options = {}) => {
      const defaults = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
      return new Intl.DateTimeFormat(currentLangData.bcp47, { ...defaults, ...options }).format(new Date(date));
    },
    
    number: (value, options = {}) => {
      return new Intl.NumberFormat(currentLangData.bcp47, options).format(value);
    },
    
    currency: (value, currency = 'USD', options = {}) => {
      return new Intl.NumberFormat(currentLangData.bcp47, { 
        style: 'currency', 
        currency, 
        ...options 
      }).format(value);
    },
    
    percent: (value, options = {}) => {
      return new Intl.NumberFormat(currentLangData.bcp47, { 
        style: 'percent', 
        ...options 
      }).format(value);
    },
    
    relativeTime: (value, unit = 'day') => {
      if (typeof Intl.RelativeTimeFormat !== 'undefined') {
        return new Intl.RelativeTimeFormat(currentLangData.bcp47, { numeric: 'auto' }).format(value, unit);
      }
      return `${value} ${unit}${Math.abs(value) !== 1 ? 's' : ''} ago`;
    },
    
    list: (items, options = {}) => {
      if (typeof Intl.ListFormat !== 'undefined') {
        return new Intl.ListFormat(currentLangData.bcp47, options).format(items);
      }
      return items.join(', ');
    }
  };

  return (
    <TranslationContext.Provider value={{ 
      t, 
      currentLanguage,
      currentLocale: currentLangData,
      changeLanguage, 
      isRTL, 
      loading,
      availableLanguages: AVAILABLE_LANGUAGES,
      formatters
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