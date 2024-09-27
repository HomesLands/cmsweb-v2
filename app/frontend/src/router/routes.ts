import { Archive } from 'lucide-react'
import i18next from 'i18next'
import { ArchiveIcon, CubeIcon } from '@radix-ui/react-icons'

import type { IRoute, ISidebarSubmenu } from '@/types'
import React from 'react'
import { ROUTE } from '@/constants'

// Layouts
const DashboardLayout = React.lazy(() =>
  import('@/components/app/layouts').then((module) => ({ default: module.DashboardLayout }))
)

// Views
const LoginPage = React.lazy(() =>
  import('@/views/auth').then((module) => ({
    default: module.LoginPage
  }))
)
const RegisterPage = React.lazy(() =>
  import('@/views/auth').then((module) => ({
    default: module.RegisterPage
  }))
)
const EmployeePage = React.lazy(() =>
  import('@/views/employees').then((module) => ({
    default: module.Employees
  }))
)
const ProjectPage = React.lazy(() =>
  import('@/views/projects').then((module) => ({
    default: module.Projects
  }))
)
const ProductRequisitionPage = React.lazy(() =>
  import('@/views/product-requisitions').then((module) => ({
    default: module.ProductRequisitions
  }))
)
const ProductRequisitionFormPage = React.lazy(() =>
  import('@/views/product-requisitions').then((module) => ({
    default: module.ProductRequisitionForm
  }))
)

const routes: IRoute[] = [
  {
    title: 'Login',
    path: ROUTE.LOGIN,
    component: LoginPage
  },
  {
    title: 'Register',
    path: ROUTE.REGISTER,
    component: RegisterPage
  },
  {
    title: 'Quản lý nhân viên',
    path: '/employees',
    component: DashboardLayout,
    children: [
      {
        title: 'Danh sách nhân viên',
        path: 'list',
        component: EmployeePage
      }
    ]
  },
  {
    title: 'Project',
    path: '/projects',
    component: DashboardLayout,
    children: [
      {
        title: 'Projects',
        path: 'list',
        component: ProjectPage
      }
    ]
  },
  {
    title: i18next.t('sidebar.productRequisitions'),
    path: '/product-requisitions',
    component: DashboardLayout,
    children: [
      {
        title: i18next.t('sidebar.productRequisitionsList'),
        path: 'list',
        index: true,
        authorities: ['APPROVE_PRODUCT_REQUISITION'], // Giữ nguyên ở đây
        component: ProductRequisitionPage
      },
      {
        title: i18next.t('sidebar.createProductRequisitions'),
        path: 'add',
        component: ProductRequisitionFormPage
      }
    ]
  },
  {
    title: 'Warehouse',
    path: '/warehouse',
    component: DashboardLayout,
    children: [
      // {
      //   title: 'Thêm vật tư',
      //   path: 'add',
      //   component:
      // },
      // {
      //   title: 'Danh sách vật tư',
      //   path: 'list',
      //   component: () => import('@/views/warehouse/Warehouse')
      // }
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
        path: '/product-requisitions',
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
