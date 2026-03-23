// src/stores/useTranslationStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import translations from '../assets/Text/translations.json';

export type Language = 'en' | 'he';

interface TranslationStore {
  currentLang: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  getText: (path: string) => string;
  isEnglish: boolean;
  isHebrew: boolean;
}

// ============================================
// ZUSTAND STORE
// ============================================
export const useTranslationStore = create<TranslationStore>()(
  persist(
    (set, get) => ({
      currentLang: 'he',
      isEnglish: false,
      isHebrew: true,

      setLanguage: (lang: Language) => {
        set({
          currentLang: lang,
          isEnglish: lang === 'en',
          isHebrew: lang === 'he',
        });
      },

      toggleLanguage: () => {
        const nextLang = get().currentLang === 'en' ? 'he' : 'en';
        get().setLanguage(nextLang);
      },

      getText: (path: string) => {
        const keys = path.split('.');
        const lang = get().currentLang;
        let current: any = translations[lang as keyof typeof translations];

        for (const key of keys) {
          if (current && typeof current === 'object') {
            current = current[key];
          } else {
            return path;
          }
        }

        return typeof current === 'string' ? current : path;
      },
    }),
    {
      name: 'translation-store',
    }
  )
);

// ============================================
// HOOKS FOR CONVENIENCE
// ============================================

// Get current language
export const useCurrentLang = () => useTranslationStore((state) => state.currentLang);

// Get text by path
export const useGetText = () => useTranslationStore((state) => state.getText);

// Get setLanguage function
export const useSetLanguage = () => useTranslationStore((state) => state.setLanguage);

// Get toggleLanguage function
export const useToggleLanguage = () => useTranslationStore((state) => state.toggleLanguage);

// Get language flags
export const useIsEnglish = () => useTranslationStore((state) => state.isEnglish);
export const useIsHebrew = () => useTranslationStore((state) => state.isHebrew);