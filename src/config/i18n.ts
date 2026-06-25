import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import viTranslation from '../locales/vi.json';
import enTranslation from '../locales/en.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: enTranslation,
      vi: viTranslation
    },
    lng: 'vi', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
