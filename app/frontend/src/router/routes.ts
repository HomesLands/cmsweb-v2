import { Archive } from 'lucide-react'
import i18next from 'i18next'
import { ArchiveIcon, CubeIcon } from '@radix-ui/react-icons'

import type { IRoute, ISidebarSubmenu } from '@/types'
import ProtectedRoute from '@/views/auth/ProtectedRoute'

const routes: IRoute[] = [
  {
    title: 'Login',
    path: '/auth/login',
    component: () =>
      import('@/views/auth').then((module) => ({
        default: module.LoginPage
      }))
  },
  {
    title: 'Register',
    path: '/auth/register',
    component: () =>
      import('@/views/auth').then((module) => ({
        default: module.RegisterPage
      }))
  },
  {
    title: 'Home',
    path: '/',
    redirect: 'employees',
    component: () =>
      import('@/components/app/layouts').then((module) => ({ default: module.DashboardLayout }))
  },
  {
    title: 'Quản lý nhân viên',
    path: '/employees',
    component: () =>
      import('@/components/app/layouts').then((module) => ({ default: module.DashboardLayout })),
    children: [
      {
        title: 'Danh sách nhân viên',
        path: 'list',
        component: () =>
          import('@/views/employees').then((module) => ({
            default: module.Employees
          }))
      }
    ]
  },
  {
    title: 'Project Subsystem',
    path: '/projects',
    component: () =>
      import('@/components/app/layouts').then((module) => ({ default: module.DashboardLayout })),
    children: [
      {
        title: 'Projects',
        path: 'list',
        component: () =>
          import('@/views/projects').then((module) => ({
            default: module.Projects
          }))
      }
    ]
  },
  {
    title: i18next.t('sidebar.productRequisitions'),
    path: '/product-requisitions',
    // Đã xóa authorities ở đây
    component: () =>
      import('@/components/app/layouts').then((module) => ({
        default: module.DashboardLayout
      })),
    children: [
      {
        title: i18next.t('sidebar.productRequisitionsList'),
        path: 'list',
        authorities: ['APPROVE_PRODUCT_REQUISITION'], // Giữ nguyên ở đây
        component: () =>
          import('@/views/product-requisitions').then((module) => ({
            default: module.ProductRequisitions
          }))
      },
      {
        title: i18next.t('sidebar.createProductRequisitions'),
        path: 'add',
        component: () =>
          import('@/views/product-requisitions').then((module) => ({
            default: module.ProductRequisitionForm
          }))
      }
    ]
  },
  {
    title: 'Warehouse',
    path: '/warehouse',
    component: () =>
      import('@/components/app/layouts').then((module) => ({ default: module.DashboardLayout })),
    children: [
      {
        title: 'Thêm vật tư',
        path: 'add',
        component: () => import('@/views/warehouse/Warehouse')
      },
      {
        title: 'Danh sách vật tư',
        path: 'list',
        component: () => import('@/views/warehouse/Warehouse')
      }
    ]
  }
]

const sidebarSubmenus: ISidebarSubmenu[] = [
  // {
  //   title: 'Quản lý nhân viên',
  //   path: '/employees',
  //   icon: PersonIcon,
  //   component: () =>
  //     import('@/components/app/layouts').then((module) => ({ default: module.DashboardLayout })),
  //   children: [
  //     {
  //       title: 'Danh sách nhân viên',
  //       path: '/employees/list',
  //       icon: AlignJustify,
  //       component: () =>
  //         import('@/views/employees').then((module) => ({
  //           default: module.Employees
  //         }))
  //     }
  //   ]
  // },
  // {
  //   title: 'Quản lý dự án',
  //   path: '/projects',
  //   icon: FileTextIcon,
  //   component: () =>
  //     import('@/components/app/layouts').then((module) => ({ default: module.DashboardLayout })),
  //   children: [
  //     {
  //       title: 'Danh sách dự án',
  //       path: '/projects/list',
  //       icon: Archive,
  //       component: () =>
  //         import('@/views/projects').then((module) => ({
  //           default: module.Projects
  //         }))
  //     }
  //   ]
  // },
  {
    title: i18next.t('sidebar.productRequisitions'),
    path: '/product-requisitions',
    icon: ArchiveIcon,
    component: () =>
      import('@/components/app/layouts').then((module) => ({ default: module.DashboardLayout })),
    children: [
      {
        title: i18next.t('sidebar.productRequisitionsList'),
        path: '/product-requisitions/list',
        icon: Archive,
        authorities: ['APPROVE_PRODUCT_REQUISITION'],
        component: () =>
          import('@/views/product-requisitions').then((module) => ({
            default: module.ProductRequisitions
          }))
      },
      {
        title: i18next.t('sidebar.createProductRequisitions'),
        path: '/product-requisitions/add',
        icon: Archive,
        component: () =>
          import('@/views/product-requisitions').then((module) => ({
            default: module.ProductRequisitionForm
          }))
      }
    ]
  },
  {
    title: 'Kho',
    path: '/warehouse',
    icon: CubeIcon,
    component: () =>
      import('@/components/app/layouts').then((module) => ({ default: module.DashboardLayout })),
    children: [
      {
        title: 'Thêm vật tư',
        path: '/warehouse/add',
        icon: Archive,
        component: () => import('@/views/warehouse/Warehouse')
      },
      {
        title: 'Danh sách vật tư',
        path: '/warehouse/list',
        icon: Archive,
        component: () => import('@/views/warehouse/Warehouse')
      }
    ]
  }
]

export { routes, sidebarSubmenus }
