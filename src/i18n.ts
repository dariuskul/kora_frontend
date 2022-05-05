import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import localeEn from './locales/EN/translations.json';
import localeLt from './locales/LT/translations.json';
import { LANGUAGES } from 'constants/languages';
import { TokenStorage } from 'constants/tokenStorage';

const resources = {
  LT: {
    translation: localeLt,
  },
  EN: {
    translation: localeEn,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: TokenStorage.getLanguage(),
  initImmediate: true,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
