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
  CreateAssignedApproverPage,
  CompanyPage,
  CreateCompanyPage,
  SitePage,
  CreateSitePage,
  DepartmentPage,
  CreateDepartmentPage,
  ProjectPage,
  CreateProjectPage,
  AdministrationPage,
  ResourcePage,
  CreateResourcePage,
  ProductPage,
  CreateProductPage,
  WarehousePage,
  CreateEmployeePage,
  BackupPage,
  NotificationPage
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
      },
      {
        path: 'add',
        element: (
          <ProtectedElement
            allowedAuthorities={[Authority.READ_USER]}
            element={<SuspenseElement component={CreateEmployeePage} />}
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
    path: ROUTE.RESOURCE,
    element: <SuspenseElement component={DashboardLayout} />,
    children: [
      {
        index: true,
        element: <SuspenseElement component={ResourcePage} />
      },
      {
        path: 'add',
        element: <SuspenseElement component={CreateResourcePage} />
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
  },
  {
    path: ROUTE.COMPANY,
    element: <SuspenseElement component={DashboardLayout} />,
    children: [
      {
        index: true,
        element: <CompanyPage />
      },
      {
        path: 'add',
        element: <CreateCompanyPage />
      }
    ]
  },
  {
    path: ROUTE.SITE,
    element: <SuspenseElement component={DashboardLayout} />,
    children: [
      {
        index: true,
        element: <SitePage />
      },
      {
        path: 'add',
        element: <CreateSitePage />
      }
    ]
  },
  {
    path: ROUTE.DEPARTMENT,
    element: <SuspenseElement component={DashboardLayout} />,
    children: [
      {
        index: true,
        element: <DepartmentPage />
      },
      {
        path: 'add',
        element: <CreateDepartmentPage />
      }
    ]
  },
  {
    path: ROUTE.PROJECT,
    element: <SuspenseElement component={DashboardLayout} />,
    children: [
      {
        index: true,
        element: <ProjectPage />
      },
      {
        path: 'add',
        element: <CreateProjectPage />
      }
    ]
  },
  {
    path: ROUTE.PRODUCT,
    element: <SuspenseElement component={DashboardLayout} />,
    children: [
      {
        index: true,
        element: <ProductPage />
      },
      {
        path: 'add',
        element: <CreateProductPage />
      }
    ]
  },
  {
    path: ROUTE.ADMIN,
    element: <SuspenseElement component={DashboardLayout} />,
    children: [
      {
        index: true,
        element: (
          <ProtectedElement
            allowedAuthorities={[]}
            element={<SuspenseElement component={AdministrationPage} />}
          />
        )
      }
    ]
  },
  {
    path: ROUTE.WAREHOUSE,
    element: <SuspenseElement component={DashboardLayout} />,
    children: [
      {
        index: true,
        element: <WarehousePage />
      }
    ]
  },
  {
    path: ROUTE.BACKUP,
    element: <SuspenseElement component={DashboardLayout} />,
    children: [
      {
        index: true,
        element: <BackupPage />
      }
    ]
  },
  {
    path: ROUTE.NOTIFICATION,
    element: <SuspenseElement component={DashboardLayout} />,
    children: [
      {
        index: true,
        element: (
          <ProtectedElement
            allowedAuthorities={[]}
            element={<SuspenseElement component={NotificationPage} />}
          />
        )
      }
    ]
  }
])
