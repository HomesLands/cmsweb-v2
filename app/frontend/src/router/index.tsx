import { createBrowserRouter } from 'react-router-dom'

import { Authority, ROUTE } from '@/constants'
import { SuspenseElement, ProtectedElement } from '@/components/app/elements'

import {
  DashboardLayout,
  LoginPage,
  RegisterPage,
  ProductRequisitionPage,
  ProductRequisitionFormPage,
  UpdateProductRequisitionPage,
  ApprovalProductRequisitionPage,
  ApprovalProductRequisitionDetailPage,
  HomePage,
  RolePage,
  CreateRolePage,
  AuthorityPage,
  CreateAuthorityPage,
  PermissionPage,
  CreatePermissionPage,
  EmployeePage,
  PersonalAccountPage,
  AssignedApproverPage,
  CreateAssignedApproverPage
} from './loadable'

export const router = createBrowserRouter([
  { path: ROUTE.LOGIN, element: <SuspenseElement component={LoginPage} /> },
  { path: ROUTE.REGISTER, element: <SuspenseElement component={RegisterPage} /> },
  {
    path: ROUTE.PERSONAL_ACCOUNT,
    element: <SuspenseElement component={DashboardLayout} />,
    children: [
      {
        index: true,
        element: (
          <ProtectedElement
            allowedAuthorities={[Authority.READ_USER]}
            element={<SuspenseElement component={PersonalAccountPage} />}
          />
        )
      }
    ]
  },
  {
    path: ROUTE.HOME,
    element: <SuspenseElement component={DashboardLayout} />,
    children: [
      {
        index: true,
        element: <HomePage />
      }
    ]
  },
  {
    path: ROUTE.PRODUCT_REQUISITIONS,
    element: <SuspenseElement component={DashboardLayout} />,
    children: [
      {
        index: true,
        element: (
          <ProtectedElement
            allowedAuthorities={[Authority.READ_PRODUCT_REQUISITION]}
            element={<SuspenseElement component={ProductRequisitionPage} />}
          />
        )
      },
      {
        path: 'add',
        element: (
          <ProtectedElement
            element={<SuspenseElement component={ProductRequisitionFormPage} />}
            allowedAuthorities={[Authority.CREATE_PRODUCT_REQUISITION]}
          />
        )
      },
      {
        path: 'approval',
        element: (
          <ProtectedElement
            element={<SuspenseElement component={ApprovalProductRequisitionPage} />}
            allowedAuthorities={[Authority.APPROVE_PRODUCT_REQUISITION]}
          />
        )
      },
      {
        path: 'approval/:slug',
        element: (
          <ProtectedElement
            element={<SuspenseElement component={ApprovalProductRequisitionDetailPage} />}
            allowedAuthorities={[Authority.APPROVE_PRODUCT_REQUISITION]}
          />
        )
      },
      {
        path: 'edit/:slug',
        element: (
          <ProtectedElement
            element={<SuspenseElement component={UpdateProductRequisitionPage} />}
            allowedAuthorities={[Authority.UPDATE_PRODUCT_REQUISITION]}
          />
        )
      }
    ]
  },
  {
    path: ROUTE.EMPLOYEE,
    element: <SuspenseElement component={DashboardLayout} />,
    children: [
      {
        index: true,
        element: (
          <ProtectedElement
            allowedAuthorities={[Authority.READ_USER]}
            element={<SuspenseElement component={EmployeePage} />}
          />
        )
      }
    ]
  },
  {
    path: ROUTE.ROLE,
    element: <SuspenseElement component={DashboardLayout} />,
    children: [
      {
        index: true,
        element: (
          <ProtectedElement
            allowedAuthorities={[Authority.READ_ROLE]}
            element={<SuspenseElement component={RolePage} />}
          />
        )
      },
      {
        path: 'add',
        element: (
          <ProtectedElement
            element={<SuspenseElement component={CreateRolePage} />}
            allowedAuthorities={[Authority.CREATE_ROLE]}
          />
        )
      }
    ]
  },
  {
    path: ROUTE.AUTHORITY,
    element: <SuspenseElement component={DashboardLayout} />,
    children: [
      {
        index: true,
        element: (
          <ProtectedElement
            allowedAuthorities={[Authority.READ_AUTHORITY]}
            element={<SuspenseElement component={AuthorityPage} />}
          />
        )
      },
      {
        path: 'add',
        element: (
          <ProtectedElement
            element={<SuspenseElement component={CreateAuthorityPage} />}
            allowedAuthorities={[Authority.CREATE_AUTHORITY]}
          />
        )
      }
    ]
  },
  {
    path: ROUTE.PERMISSION,
    element: <SuspenseElement component={DashboardLayout} />,
    children: [
      {
        index: true,
        element: (
          <ProtectedElement
            allowedAuthorities={[Authority.READ_PERMISSION]}
            element={<SuspenseElement component={PermissionPage} />}
          />
        )
      },
      {
        path: 'add',
        element: (
          <ProtectedElement
            element={<SuspenseElement component={CreatePermissionPage} />}
            allowedAuthorities={[Authority.CREATE_PERMISSION]}
          />
        )
      }
    ]
  },
  {
    path: ROUTE.ASSIGNED_APPROVER,
    element: <SuspenseElement component={DashboardLayout} />,
    children: [
      {
        index: true,
        element: <AssignedApproverPage />
      },
      {
        path: 'add',
        element: <CreateAssignedApproverPage />
      }
    ]
  }
])
