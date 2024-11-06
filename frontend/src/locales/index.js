import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from './resources.js';

i18next
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false, // экранирование уже есть в React, поэтому отключаем
    },
    debug: true,
  });

export default i18next;
