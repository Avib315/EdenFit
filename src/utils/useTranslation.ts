import translations from '../assets/Text/translations.json';

export type Language = 'en' | 'he';

export const useTranslation = (language: Language = 'en') => {
  const getText = (path: string): string => {
    const keys = path.split('.');
    let current: any = translations[language];
    
    for (const key of keys) {
      if (current && typeof current === 'object') {
        current = current[key];
      } else {
        return path; // Return path if not found
      }
    }
    
    return typeof current === 'string' ? current : path;
  };

  return { getText, language };
};

export const getNestedValue = (obj: any, path: string): any => {
  const keys = path.split('.');
  let current = obj;
  
  for (const key of keys) {
    if (current && typeof current === 'object') {
      current = current[key];
    } else {
      return null;
    }
  }
  
  return current;
};
