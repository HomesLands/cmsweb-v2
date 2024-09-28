import React from 'react'
import { createBrowserRouter } from 'react-router-dom'

import { Authority, ROUTE } from '@/constants'
import { SuspenseElement, ProtectedElement } from '@/components/app/elements'

import {
  DashboardLayout,
  LoginPage,
  RegisterPage,
  ProductRequisitionPage,
  ProductRequisitionFormPage
} from './loadable'

export const router = createBrowserRouter([
  { path: ROUTE.LOGIN, element: <SuspenseElement component={LoginPage} /> },
  { path: ROUTE.REGISTER, element: <SuspenseElement component={RegisterPage} /> },
  { path: ROUTE.HOME, element: <SuspenseElement component={DashboardLayout} /> },
  {
    path: ROUTE.PRODUCT_REQUSITIONS,
    element: <SuspenseElement component={DashboardLayout} />,
    children: [
      {
        index: true,
        element: (
          <ProtectedElement
            allowedAuthorities={[Authority.APPROVE_PRODUCT_REQUISITION]}
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
      }
    ]
  }
])
