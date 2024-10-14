import { KeyRoundIcon, ScanFaceIcon, UserCheckIcon, UserCogIcon } from 'lucide-react'

import type { ISidebarRoute } from '@/types'
import { ROUTE } from '@/constants'

export const adminRoutes: ISidebarRoute[] = [
  {
    title: 'sidebar.roles',
    path: ROUTE.ROLE,
    icon: UserCogIcon
  },
  {
    title: 'sidebar.permissions',
    path: ROUTE.PERMISSION,
    icon: KeyRoundIcon,
    children: [
      {
        title: 'sidebar.permissions',
        path: ROUTE.PERMISSION
      },
      {
        title: 'sidebar.createPermission',
        path: ROUTE.ADD_PERMISSION
      }
    ]
  },
  {
    title: 'sidebar.authorities',
    path: ROUTE.AUTHORITY,
    icon: ScanFaceIcon,
    children: [
      {
        title: 'sidebar.authorities',
        path: ROUTE.AUTHORITY
      },
      {
        title: 'sidebar.createAuthority',
        path: ROUTE.ADD_AUTHORITY
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
