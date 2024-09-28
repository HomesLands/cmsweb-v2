import { Archive } from 'lucide-react'
import i18next from 'i18next'
import { ArchiveIcon, CubeIcon } from '@radix-ui/react-icons'

import type { ISidebarRoute } from '@/types'
import { Authority, ROUTE } from '@/constants'

export const sidebarRoutes: ISidebarRoute[] = [
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
    path: ROUTE.PRODUCT_REQUSITIONS,
    icon: ArchiveIcon,
    children: [
      {
        title: i18next.t('sidebar.productRequisitionsList'),
        path: ROUTE.PRODUCT_REQUSITIONS,
        icon: Archive,
        authorities: [Authority.READ_PRODUCT_REQUISITION]
      },
      {
        title: i18next.t('sidebar.createProductRequisitions'),
        path: ROUTE.ADD_PRODUCT_REQUSITIONS,
        icon: Archive,
        authorities: [Authority.CREATE_PRODUCT_REQUISITION]
      },
      {
        title: i18next.t('sidebar.approvalProductRequisitions'),
        path: '/product-requisitions/approval',
        icon: Archive,
        authorities: [Authority.APPROVE_PRODUCT_REQUISITION]
      }
    ]
  },
  {
    title: 'Kho',
    path: '/warehouse',
    icon: CubeIcon,
    children: [
      {
        title: 'Thêm vật tư',
        path: '/warehouse/add',
        icon: Archive
      },
      {
        title: 'Danh sách vật tư',
        path: '/warehouse/list',
        icon: Archive
      }
    ]
  }
]
