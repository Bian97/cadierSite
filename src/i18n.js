import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

// Pega do localStorage ou define padrão
const savedLng = localStorage.getItem('i18nextLng') || 'pt_BR';

i18n
  .use(Backend)
  .use(LanguageDetector) // Detecta automaticamente se não houver valor salvo
  .use(initReactI18next)
  .init({
    lng: savedLng,        // <-- define o idioma inicial
    fallbackLng: 'pt_BR', // idioma padrão se não houver tradução
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
