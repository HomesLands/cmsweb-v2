import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import enAuth from '@/locales/en/auth.json'
import enSidebar from '@/locales/en/sidebar.json'
import enProductRequisition from '@/locales/en/product-requisition.json'
import enRoles from '@/locales/en/roles.json'
import enTableData from '@/locales/en/table-data.json'
import enToast from '@/locales/en/toast.json'
import enAuthorities from '@/locales/en/authorities.json'
import enPermissions from '@/locales/en/permissions.json'

import viAuth from '@/locales/vi/auth.json'
import viSidebar from '@/locales/vi/sidebar.json'
import viProductRequisition from '@/locales/vi/product-requisition.json'
import viRoles from '@/locales/vi/roles.json'
import viTableData from '@/locales/vi/table-data.json'
import viToast from '@/locales/vi/toast.json'
import viAuthorities from '@/locales/vi/authorities.json'
import viPermissions from '@/locales/vi/permissions.json'

i18n
  .use(LanguageDetector) // Tự động phát hiện ngôn ngữ
  .use(initReactI18next) // Passes i18n down to react-i18next
  .init({
    resources: {
      en: {
        auth: enAuth,
        sidebar: enSidebar,
        productRequisition: enProductRequisition,
        roles: enRoles,
        authorities: enAuthorities,
        tableData: enTableData,
        toast: enToast,
        permissions: enPermissions
      },
      vi: {
        auth: viAuth,
        sidebar: viSidebar,
        productRequisition: viProductRequisition,
        roles: viRoles,
        tableData: viTableData,
        toast: viToast,
        authorities: viAuthorities,
        permissions: viPermissions
      }
    },
    lng: window.localStorage.getItem('i18nextLng') || 'vi',
    fallbackLng: 'vi', // Ngôn ngữ mặc định
    interpolation: {
      escapeValue: false // React đã tự động bảo vệ trước XSS
    },
    //Setup type-safe translation
    ns: ['auth', 'sidebar', 'productRequisition', 'tableData'], //Dùng để phân biệt các phần khác nhau của app
    defaultNS: 'auth' //Ngôn ngữ mặc định
  })

export default i18n
