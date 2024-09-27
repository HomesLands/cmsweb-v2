import React, { Suspense } from 'react'
import { createBrowserRouter, RouteObject } from 'react-router-dom'

import { routes } from '@/router/routes'
import { IRoute } from '@/types'
import { Authority, ROUTE } from '@/constants'
import { ProtectedRoute } from '@/components/app/protected-route'

// Layouts
const DashboardLayout = React.lazy(() =>
  import('@/components/app/layouts').then((module) => ({ default: module.DashboardLayout }))
)

// Views
const LoginPage = React.lazy(() =>
  import('@/views/auth').then((module) => ({
    default: module.LoginPage
  }))
)
const RegisterPage = React.lazy(() =>
  import('@/views/auth').then((module) => ({
    default: module.RegisterPage
  }))
)
const EmployeePage = React.lazy(() =>
  import('@/views/employees').then((module) => ({
    default: module.Employees
  }))
)
const ProjectPage = React.lazy(() =>
  import('@/views/projects').then((module) => ({
    default: module.Projects
  }))
)
const ProductRequisitionPage = React.lazy(() =>
  import('@/views/product-requisitions').then((module) => ({
    default: module.ProductRequisitions
  }))
)
const ProductRequisitionFormPage = React.lazy(() =>
  import('@/views/product-requisitions').then((module) => ({
    default: module.ProductRequisitionForm
  }))
)

export const Element = ({ component }: { component: React.FC }) => {
  const Component = component
  return (
    <Suspense>
      <Component />
    </Suspense>
  )
}

export const router = createBrowserRouter([
  { path: ROUTE.LOGIN, element: <Element component={LoginPage} /> },
  { path: ROUTE.REGISTER, element: <Element component={RegisterPage} /> },
  { path: ROUTE.HOME, element: <Element component={DashboardLayout} /> },
  {
    path: ROUTE.PRODUCT_REQUSITIONS,
    element: <Element component={DashboardLayout} />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute
            allowedAuthorities={[Authority.APPROVE_PRODUCT_REQUISITION]}
            element={<Element component={ProductRequisitionPage} />}
          />
        )
      },
      {
        path: 'add',
        element: (
          <ProtectedRoute
            element={<Element component={ProductRequisitionFormPage} />}
            allowedAuthorities={[Authority.CREATE_PRODUCT_REQUISITION]}
          />
        )
      }
    ]
  }
])
