import { KeyRoundIcon, ScanFaceIcon, UserCheckIcon, UserCogIcon, UsersIcon } from 'lucide-react'
import { ArchiveIcon } from '@radix-ui/react-icons'

import type { ISidebarRoute } from '@/types'
import { Authority, Resource, ROUTE } from '@/constants'

export const sidebarRoutes: ISidebarRoute[] = [
  {
    title: 'sidebar.productRequisitions',
    path: ROUTE.PRODUCT_REQUISITIONS,
    icon: ArchiveIcon,
    permission: { authority: Authority.READ, resource: Resource.PRODUCT_REQUISITION_FORM },
    children: [
      {
        title: 'sidebar.productRequisitionsList',
        path: ROUTE.PRODUCT_REQUISITIONS,
        permission: { authority: Authority.READ, resource: Resource.PRODUCT_REQUISITION_FORM }
      },
      {
        title: 'sidebar.createProductRequisitions',
        path: ROUTE.ADD_PRODUCT_REQUISITIONS,
        permission: { authority: Authority.CREATE, resource: Resource.PRODUCT_REQUISITION_FORM }
      },
      {
        title: 'sidebar.approvalProductRequisitions',
        path: '/product-requisitions/approval',
        permission: { authority: Authority.UPDATE, resource: Resource.PRODUCT_REQUISITION_FORM }
      }
    ]
  },
  {
    title: 'sidebar.employees',
    path: ROUTE.EMPLOYEE,
    icon: UsersIcon,
    // authorities: [Authority.READ_USER],
    children: [
      {
        title: 'sidebar.employees',
        path: ROUTE.EMPLOYEE
        // authorities: [Authority.READ_USER]
      }
    ]
  },
  {
    title: 'sidebar.roles',
    path: ROUTE.ROLE,
    icon: UserCogIcon,
    // authorities: [Authority.READ_ROLE],
    children: [
      {
        title: 'sidebar.roles',
        path: ROUTE.ROLE
        // authorities: [Authority.READ_ROLE]
      },
      {
        title: 'sidebar.createRole',
        path: ROUTE.ADD_ROLE
        // authorities: [Authority.CREATE_ROLE]
      }
    ]
  },
  {
    title: 'sidebar.permissions',
    path: ROUTE.PERMISSION,
    icon: KeyRoundIcon,
    // authorities: [Authority.READ_PERMISSION],
    children: [
      {
        title: 'sidebar.permissions',
        path: ROUTE.PERMISSION
        // authorities: [Authority.READ_PERMISSION]
      },
      {
        title: 'sidebar.createPermission',
        path: ROUTE.ADD_PERMISSION
        // authorities: [Authority.CREATE_PERMISSION]
      }
    ]
  },
  {
    title: 'sidebar.authorities',
    path: ROUTE.AUTHORITY,
    icon: ScanFaceIcon,
    // authorities: [Authority.READ_AUTHORITY],
    children: [
      {
        title: 'sidebar.authorities',
        path: ROUTE.AUTHORITY
        // authorities: [Authority.READ_AUTHORITY]
      },
      {
        title: 'sidebar.createAuthority',
        path: ROUTE.ADD_AUTHORITY
        // authorities: [Authority.CREATE_AUTHORITY]
      }
    ]
  },
  {
    title: 'sidebar.assignedApprover',
    path: ROUTE.ASSIGNED_APPROVER,
    icon: UserCheckIcon,
    // authorities: [Authority.READ_PERMISSION],
    children: [
      {
        title: 'sidebar.assignedApprover',
        path: ROUTE.ASSIGNED_APPROVER
        // authorities: [Authority.READ_PERMISSION]
      },
      {
        title: 'sidebar.createAssignedApprover',
        path: ROUTE.ADD_ASSIGNED_APPROVER
        // authorities: [Authority.CREATE_PERMISSION]
      }
    ]
  }
]
