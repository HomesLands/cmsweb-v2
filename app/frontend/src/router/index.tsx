import { createBrowserRouter } from 'react-router-dom'

import { Authority, ROUTE } from '@/constants'
import { SuspenseElement, ProtectedElement } from '@/components/app/elements'

import {
  DashboardLayout,
  LoginPage,
  RegisterPage,
  ProductRequisitionPage,
  ProductRequisitionFormPage,
  ApprovalProductRequisitionPage,
  ApprovalProductRequisitionDetailPage,
  HomePage,
  RolePage,
  CreateRolePage
} from './loadable'

export const router = createBrowserRouter([
  { path: ROUTE.LOGIN, element: <SuspenseElement component={LoginPage} /> },
  { path: ROUTE.REGISTER, element: <SuspenseElement component={RegisterPage} /> },
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
      }
    ]
  }
])
