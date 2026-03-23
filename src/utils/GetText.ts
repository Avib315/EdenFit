// GetTranslations.ts
import translations from '../assets/Text/translations.json';

export type Language = 'en' | 'he';

export function GetTranslationsPerWord(path: string, lang: Language = 'en'): string {
  const keys = path.split('.');
  let current: any = translations[lang as keyof typeof translations];

  for (const key of keys) {
    if (current && typeof current === 'object') {
      current = current[key];
    } else {
      return path;
    }
  }

  return typeof current === 'string' ? current : path;
}

export function GetAllTextByTranslations(lang: Language = 'en') {
  return translations[lang as keyof typeof translations] || translations['en' as keyof typeof translations];
}
