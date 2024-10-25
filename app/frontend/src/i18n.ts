import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import enAuth from '@/locales/en/auth.json'
import enAccount from '@/locales/en/account.json'
import enSidebar from '@/locales/en/sidebar.json'
import enProductRequisition from '@/locales/en/product-requisition.json'
import enRoles from '@/locales/en/roles.json'
import enTableData from '@/locales/en/table-data.json'
import enToast from '@/locales/en/toast.json'
import enAuthorities from '@/locales/en/authorities.json'
import enPermissions from '@/locales/en/permissions.json'
import enUsers from '@/locales/en/users.json'
import enSetting from '@/locales/en/setting.json'
import enAssignedApprover from '@/locales/en/assigned-approver.json'
import enCompanies from '@/locales/en/companies.json'
import enSites from '@/locales/en/sites.json'
import enDepartment from '@/locales/en/departments.json'
import enProject from '@/locales/en/projects.json'
import enEmployees from '@/locales/en/employees.json'
import enResources from '@/locales/en/resources.json'
import enWarehouse from '@/locales/en/warehouse.json'
import enProducts from '@/locales/en/products.json'
import enBackups from '@/locales/en/backups.json'
import enNotifications from '@/locales/en/notifications.json'

import viAuth from '@/locales/vi/auth.json'
import viAccount from '@/locales/vi/account.json'
import viSidebar from '@/locales/vi/sidebar.json'
import viProductRequisition from '@/locales/vi/product-requisition.json'
import viRoles from '@/locales/vi/roles.json'
import viTableData from '@/locales/vi/table-data.json'
import viToast from '@/locales/vi/toast.json'
import viAuthorities from '@/locales/vi/authorities.json'
import viPermissions from '@/locales/vi/permissions.json'
import viUsers from '@/locales/vi/users.json'
import viSetting from '@/locales/vi/setting.json'
import viAssignedApprover from '@/locales/vi/assigned-approver.json'
import viCompanies from '@/locales/vi/companies.json'
import viSites from '@/locales/vi/sites.json'
import viDepartment from '@/locales/vi/departments.json'
import viProject from '@/locales/vi/projects.json'
import viEmployees from '@/locales/vi/employees.json'
import viResources from '@/locales/vi/resources.json'
import viWarehouse from '@/locales/vi/warehouse.json'
import viProducts from '@/locales/vi/products.json'
import viBackups from '@/locales/vi/backups.json'
import viNotifications from '@/locales/vi/notifications.json'

i18n
  .use(LanguageDetector) // Tự động phát hiện ngôn ngữ
  .use(initReactI18next) // Passes i18n down to react-i18next
  .init({
    resources: {
      en: {
        auth: enAuth,
        account: enAccount,
        sidebar: enSidebar,
        productRequisition: enProductRequisition,
        roles: enRoles,
        authorities: enAuthorities,
        tableData: enTableData,
        toast: enToast,
        permissions: enPermissions,
        users: enUsers,
        setting: enSetting,
        assignedApprover: enAssignedApprover,
        companies: enCompanies,
        sites: enSites,
        department: enDepartment,
        projects: enProject,
        employees: enEmployees,
        resources: enResources,
        warehouse: enWarehouse,
        products: enProducts,
        backups: enBackups,
        notifications: enNotifications
      },
      vi: {
        auth: viAuth,
        account: viAccount,
        sidebar: viSidebar,
        productRequisition: viProductRequisition,
        roles: viRoles,
        tableData: viTableData,
        toast: viToast,
        authorities: viAuthorities,
        permissions: viPermissions,
        users: viUsers,
        setting: viSetting,
        assignedApprover: viAssignedApprover,
        companies: viCompanies,
        sites: viSites,
        department: viDepartment,
        projects: viProject,
        employees: viEmployees,
        resources: viResources,
        warehouse: viWarehouse,
        products: viProducts,
        backups: viBackups,
        notifications: viNotifications
      }
    },
    lng: window.localStorage.getItem('i18nextLng') || 'vi',
    fallbackLng: 'vi', // Ngôn ngữ mặc định
    interpolation: {
      escapeValue: false // React đã tự động bảo vệ trước XSS
    },
    //Setup type-safe translation
    ns: [
      'auth',
      'sidebar',
      'productRequisition',
      'tableData',
      'setting',
      'department',
      'projects',
      'employees',
      'products',
      'warehouse',
      'resources',
      'companies',
      'sites',
      'assignedApprover',
      'notifications'
    ], //Dùng để phân biệt các phần khác nhau của app
    defaultNS: 'auth' //Ngôn ngữ mặc định
  })

export default i18n
