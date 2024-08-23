import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// Import các file JSON chứa bản dịch
import enTranslation from './locales/en/translation.json'
import viTranslation from './locales/vi/translation.json'

i18n
  .use(LanguageDetector) // Tự động phát hiện ngôn ngữ
  .use(initReactI18next) // Passes i18n down to react-i18next
  .init({
    resources: {
        en: {
          translation: enTranslation,
        },
        vi: {
          translation: viTranslation,
        },
      },
    fallbackLng: 'en', // Ngôn ngữ mặc định
    interpolation: {
      escapeValue: false, // React đã tự động bảo vệ trước XSS
    },
  })

export default i18n
