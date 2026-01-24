import React from 'react';
import { useTranslation, AVAILABLE_LANGUAGES } from './useTranslation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Globe } from 'lucide-react';

export default function LanguageSelector({ variant = 'default' }) {
  const { currentLanguage, changeLanguage } = useTranslation();

  const currentLangData = AVAILABLE_LANGUAGES.find(l => l.code === currentLanguage);

  return (
    <Select value={currentLanguage} onValueChange={changeLanguage}>
      <SelectTrigger className={
        variant === 'minimal' 
          ? 'w-32 bg-white/10 border-white/20 text-white hover:bg-white/20' 
          : 'w-40'
      }>
        <div className="flex items-center gap-2">
          <Globe className="h-4 w-4" />
          <SelectValue>{currentLangData?.nativeName || 'English'}</SelectValue>
        </div>
      </SelectTrigger>
      <SelectContent>
        {AVAILABLE_LANGUAGES.map(lang => (
          <SelectItem key={lang.code} value={lang.code}>
            <div className="flex items-center gap-2">
              <span className="font-medium">{lang.nativeName}</span>
              <span className="text-xs text-gray-500">({lang.name})</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}