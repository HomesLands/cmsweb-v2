import {
  Building2Icon,
  Component,
  FolderOpenIcon,
  MapPinIcon,
  UserCheckIcon,
  UsersIcon
} from 'lucide-react'
import { ArchiveIcon } from '@radix-ui/react-icons'

import type { ISidebarRoute } from '@/types'
import { Authority, Resource, ROUTE } from '@/constants'

export const sidebarRoutes: ISidebarRoute[] = [
  // {
  //   title: 'sidebar.productRequisitions',
  //   path: ROUTE.PRODUCT_REQUISITIONS,
  //   icon: ArchiveIcon,
  //   permission: { authority: Authority.READ, resource: Resource.PRODUCT_REQUISITION_FORM },
  //   children: [
  //     {
  //       title: 'sidebar.productRequisitionsList',
  //       path: ROUTE.PRODUCT_REQUISITIONS,
  //       permission: { authority: Authority.READ, resource: Resource.PRODUCT_REQUISITION_FORM }
  //     },
  //     {
  //       title: 'sidebar.createProductRequisitions',
  //       path: ROUTE.ADD_PRODUCT_REQUISITIONS,
  //       permission: { authority: Authority.CREATE, resource: Resource.PRODUCT_REQUISITION_FORM }
  //     },
  //     {
  //       title: 'sidebar.approvalProductRequisitions',
  //       path: '/product-requisitions/approval',
  //       permission: { authority: Authority.UPDATE, resource: Resource.PRODUCT_REQUISITION_FORM }
  //     }
  //   ]
  // },
  {
    title: 'sidebar.employees',
    path: ROUTE.EMPLOYEE,
    icon: UsersIcon,
    permission: { authority: Authority.READ, resource: Resource.USER },
    children: [
      {
        title: 'sidebar.employees',
        path: ROUTE.EMPLOYEE,
        permission: { authority: Authority.READ, resource: Resource.USER }
      }
    ]
  },
  {
    title: 'sidebar.companies',
    path: ROUTE.COMPANY,
    icon: Building2Icon,
    permission: { authority: Authority.READ, resource: Resource.COMPANY },
    children: [
      {
        title: 'sidebar.companies',
        path: ROUTE.COMPANY,
        permission: { authority: Authority.READ, resource: Resource.COMPANY }
      },
      {
        title: 'sidebar.createCompany',
        path: ROUTE.ADD_COMPANY,
        permission: { authority: Authority.CREATE, resource: Resource.COMPANY }
      }
    ]
  },
  {
    title: 'sidebar.sites',
    path: ROUTE.SITE,
    icon: MapPinIcon,
    permission: { authority: Authority.READ, resource: Resource.SITE },
    children: [
      {
        title: 'sidebar.sites',
        path: ROUTE.SITE,
        permission: { authority: Authority.READ, resource: Resource.SITE }
      },
      {
        title: 'sidebar.createSite',
        path: ROUTE.ADD_SITE,
        permission: { authority: Authority.CREATE, resource: Resource.SITE }
      }
    ]
  },
  {
    title: 'sidebar.departments',
    path: ROUTE.DEPARTMENT,
    icon: Component,
    permission: { authority: Authority.READ, resource: Resource.DEPARTMENT },
    children: [
      {
        title: 'sidebar.departments',
        path: ROUTE.DEPARTMENT,
        permission: { authority: Authority.READ, resource: Resource.DEPARTMENT }
      },
      {
        title: 'sidebar.createDepartment',
        path: ROUTE.ADD_DEPARTMENT,
        permission: { authority: Authority.CREATE, resource: Resource.DEPARTMENT }
      }
    ]
  },
  {
    title: 'sidebar.projects',
    path: ROUTE.PROJECT,
    icon: FolderOpenIcon,
    permission: { authority: Authority.READ, resource: Resource.PROJECT },
    children: [
      {
        title: 'sidebar.projects',
        path: ROUTE.PROJECT,
        permission: { authority: Authority.READ, resource: Resource.PROJECT }
      },
      {
        title: 'sidebar.createProject',
        path: ROUTE.ADD_PROJECT,
        permission: { authority: Authority.CREATE, resource: Resource.PROJECT }
      }
    ]
  },
  {
    title: 'sidebar.assignedApprover',
    path: ROUTE.ASSIGNED_APPROVER,
    icon: UserCheckIcon,
    permission: { authority: Authority.READ, resource: Resource.ASSIGNED_APPROVAL },
    children: [
      {
        title: 'sidebar.assignedApprover',
        path: ROUTE.ASSIGNED_APPROVER,
        permission: { authority: Authority.READ, resource: Resource.ASSIGNED_APPROVAL }
      },
      {
        title: 'sidebar.createAssignedApprover',
        path: ROUTE.ADD_ASSIGNED_APPROVER,
        permission: { authority: Authority.CREATE, resource: Resource.ASSIGNED_APPROVAL }
      }
    ]
  }
]
