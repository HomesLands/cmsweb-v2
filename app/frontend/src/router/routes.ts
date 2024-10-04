import { KeyRoundIcon, ScanFaceIcon, UserCogIcon, UserIcon, UsersIcon } from 'lucide-react'
import { ArchiveIcon, CubeIcon } from '@radix-ui/react-icons'

import type { ISidebarRoute } from '@/types'
import { Authority, ROUTE } from '@/constants'

export const sidebarRoutes: ISidebarRoute[] = [
  {
    title: 'sidebar.productRequisitions',
    path: ROUTE.PRODUCT_REQUISITIONS,
    icon: ArchiveIcon,
    authorities: [Authority.READ_PRODUCT_REQUISITION],
    children: [
      {
        title: 'sidebar.productRequisitionsList',
        path: ROUTE.PRODUCT_REQUISITIONS,
        authorities: [Authority.READ_PRODUCT_REQUISITION]
      },
      {
        title: 'sidebar.createProductRequisitions',
        path: ROUTE.ADD_PRODUCT_REQUISITIONS,
        authorities: [Authority.CREATE_PRODUCT_REQUISITION]
      },
      {
        title: 'sidebar.approvalProductRequisitions',
        path: '/product-requisitions/approval',
        authorities: [Authority.APPROVE_PRODUCT_REQUISITION]
      }
    ]
  },
  // {
  //   title: 'sidebar.warehouses',
  //   path: '/warehouse',
  //   icon: CubeIcon,
  //   children: [
  //     {
  //       title: 'sidebar.warehouses',
  //       path: '/warehouses'
  //     },
  //     {
  //       title: 'sidebar.createWarehouse',
  //       path: '/warehouse/add'
  //     }
  //   ]
  // },
  {
    title: 'sidebar.employees',
    path: ROUTE.EMPLOYEE,
    icon: UsersIcon,
    authorities: [Authority.READ_USER],
    children: [
      {
        title: 'sidebar.employees',
        path: ROUTE.EMPLOYEE,
        authorities: [Authority.READ_USER]
      }
    ]
  },
  {
    title: 'sidebar.roles',
    path: ROUTE.ROLE,
    icon: UserCogIcon,
    authorities: [Authority.READ_ROLE],
    children: [
      {
        title: 'sidebar.roles',
        path: ROUTE.ROLE,
        authorities: [Authority.READ_ROLE]
      },
      {
        title: 'sidebar.createRole',
        path: ROUTE.ADD_ROLE,
        authorities: [Authority.CREATE_ROLE]
      }
    ]
  },
  {
    title: 'sidebar.permissions',
    path: ROUTE.PERMISSION,
    icon: KeyRoundIcon,
    authorities: [Authority.READ_PERMISSION],
    children: [
      {
        title: 'sidebar.permissions',
        path: ROUTE.PERMISSION,
        authorities: [Authority.READ_PERMISSION]
      },
      {
        title: 'sidebar.createPermission',
        path: ROUTE.ADD_PERMISSION,
        authorities: [Authority.CREATE_PERMISSION]
      }
    ]
  },
  {
    title: 'sidebar.authorities',
    path: ROUTE.AUTHORITY,
    icon: ScanFaceIcon,
    authorities: [Authority.READ_AUTHORITY],
    children: [
      {
        title: 'sidebar.authorities',
        path: ROUTE.AUTHORITY,
        authorities: [Authority.READ_AUTHORITY]
      },
      {
        title: 'sidebar.createAuthority',
        path: ROUTE.ADD_AUTHORITY,
        authorities: [Authority.CREATE_AUTHORITY]
      }
    ]
  }
]
