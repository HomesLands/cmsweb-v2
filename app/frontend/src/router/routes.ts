import {
  Building2Icon,
  Component,
  FileTextIcon,
  FolderOpenIcon,
  MapPinIcon,
  UserCheckIcon,
  UsersIcon,
  WarehouseIcon,
  ArchiveIcon
} from 'lucide-react'

import type { ISidebarRoute } from '@/types'
import { Authority, Resource, ROUTE } from '@/constants'
import { BellIcon } from '@radix-ui/react-icons'

export const sidebarRoutes: ISidebarRoute[] = [
  {
    title: 'sidebar.products',
    path: ROUTE.PRODUCT,
    icon: ArchiveIcon,
    permission: { authority: Authority.VIEW, resource: Resource.PRODUCT },
    children: [
      {
        title: 'sidebar.products',
        path: ROUTE.PRODUCT,
        permission: { authority: Authority.READ, resource: Resource.PRODUCT }
      },
      {
        title: 'sidebar.createProduct',
        path: ROUTE.ADD_PRODUCT,
        permission: { authority: Authority.CREATE, resource: Resource.PRODUCT }
      }
    ]
  },
  {
    title: 'sidebar.warehouses',
    path: ROUTE.WAREHOUSE,
    icon: WarehouseIcon,
    permission: { authority: Authority.VIEW, resource: Resource.WAREHOUSE },
    children: [
      {
        title: 'sidebar.warehouses',
        path: ROUTE.WAREHOUSE,
        permission: { authority: Authority.READ, resource: Resource.WAREHOUSE }
      },
      {
        title: 'sidebar.createWarehouse',
        path: ROUTE.ADD_WAREHOUSE,
        permission: { authority: Authority.CREATE, resource: Resource.WAREHOUSE }
      }
    ]
  },
  {
    title: 'sidebar.productRequisitions',
    path: ROUTE.PRODUCT_REQUISITIONS,
    icon: FileTextIcon,
    permission: { authority: Authority.VIEW, resource: Resource.PRODUCT_REQUISITION_FORM },
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
        path: ROUTE.APPROVAL_PRODUCT_REQUISITIONS,
        permission: { authority: Authority.APPROVE, resource: Resource.PRODUCT_REQUISITION_FORM }
      }
    ]
  },
  {
    title: 'sidebar.employees',
    path: ROUTE.EMPLOYEE,
    icon: UsersIcon,
    permission: { authority: Authority.READ, resource: Resource.USER },
    children: [
      {
        title: 'sidebar.employeeList',
        path: ROUTE.EMPLOYEE,
        permission: { authority: Authority.READ, resource: Resource.USER }
      },
      {
        title: 'sidebar.createEmployee',
        path: ROUTE.ADD_EMPLOYEE,
        permission: { authority: Authority.CREATE, resource: Resource.USER }
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
        title: 'sidebar.companyList',
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
        title: 'sidebar.siteList',
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
        title: 'sidebar.departmentList',
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
        title: 'sidebar.projectList',
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
        title: 'sidebar.assignedApproverList',
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
