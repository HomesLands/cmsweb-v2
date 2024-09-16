import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import enAuth from '@/locales/en/auth.json'
import enSidebar from '@/locales/en/sidebar.json'
import enProductRequisition from '@/locales/en/product-requisition.json'
import enTablePaging from '@/locales/en/table-paging.json'

import viAuth from '@/locales/vi/auth.json'
import viSidebar from '@/locales/vi/sidebar.json'
import viProductRequisition from '@/locales/vi/product-requisition.json'
import viTablePaging from '@/locales/vi/table-paging.json'

i18n
  .use(LanguageDetector) // Tự động phát hiện ngôn ngữ
  .use(initReactI18next) // Passes i18n down to react-i18next
  .init({
    resources: {
      en: {
        auth: enAuth,
        sidebar: enSidebar,
        productRequisition: enProductRequisition,
        tablePaging: enTablePaging
      },
      vi: {
        auth: viAuth,
        sidebar: viSidebar,
        productRequisition: viProductRequisition,
        tablePaging: viTablePaging
      }
    },
    lng: 'vi',
    fallbackLng: 'vi', // Ngôn ngữ mặc định
    interpolation: {
      escapeValue: false // React đã tự động bảo vệ trước XSS
    }
  })

export default i18n
