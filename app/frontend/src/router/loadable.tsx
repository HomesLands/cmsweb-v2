import React from 'react'

// Layouts
export const DashboardLayout = React.lazy(() =>
  import('@/components/app/layouts').then((module) => ({ default: module.DashboardLayout }))
)

// Views
export const LoginPage = React.lazy(() =>
  import('@/views/auth').then((module) => ({
    default: module.LoginPage
  }))
)
export const RegisterPage = React.lazy(() =>
  import('@/views/auth').then((module) => ({
    default: module.RegisterPage
  }))
)
export const EmployeePage = React.lazy(() =>
  import('@/views/employees').then((module) => ({
    default: module.Employees
  }))
)
export const ProjectPage = React.lazy(() =>
  import('@/views/projects').then((module) => ({
    default: module.Projects
  }))
)
export const ProductRequisitionPage = React.lazy(() =>
  import('@/views/product-requisitions').then((module) => ({
    default: module.ProductRequisitions
  }))
)
export const ProductRequisitionListPage = React.lazy(() =>
  import('@/views/product-requisitions').then((module) => ({
    default: module.ProductRequisitions
  }))
)
export const ApprovalProductRequisitionPage = React.lazy(() =>
  import('@/views/product-requisitions').then((module) => ({
    default: module.ApprovalProductRequisitions
  }))
)
export const ApprovalProductRequisitionDetailPage = React.lazy(() =>
  import('@/views/product-requisitions').then((module) => ({
    default: module.ApprovalProductRequisitionDetail
  }))
)
export const ProductRequisitionFormPage = React.lazy(() =>
  import('@/views/product-requisitions').then((module) => ({
    default: module.ProductRequisitionForm
  }))
)
