import { KeyRoundIcon, ScanFaceIcon, UserCheckIcon, UserCogIcon } from 'lucide-react'

import type { ISidebarRoute } from '@/types'
import { ROUTE } from '@/constants'
import { FileIcon, ReaderIcon } from '@radix-ui/react-icons'

export const adminRoutes: ISidebarRoute[] = [
  {
    title: 'sidebar.backup',
    path: ROUTE.BACKUP,
    icon: FileIcon
  },
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
    icon: ScanFaceIcon
  },
  {
    title: 'sidebar.assignedApprover',
    path: ROUTE.ASSIGNED_APPROVER,
    icon: UserCheckIcon
  },
  {
    title: 'sidebar.resources',
    path: ROUTE.RESOURCE,
    icon: ReaderIcon
  }
]
