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
export const PersonalAccountPage = React.lazy(() =>
  import('@/views/account').then((module) => ({
    default: module.PersonalAccount
  }))
)
export const EmployeePage = React.lazy(() =>
  import('@/views/employees').then((module) => ({
    default: module.Employees
  }))
)
export const CreateEmployeePage = React.lazy(() =>
  import('@/views/employees').then((module) => ({
    default: module.CreateEmployee
  }))
)
export const ProjectPage = React.lazy(() =>
  import('@/views/projects').then((module) => ({
    default: module.Projects
  }))
)

export const CreateProjectPage = React.lazy(() =>
  import('@/views/projects').then((module) => ({
    default: module.CreateProject
  }))
)

export const ProductRequisitionPage = React.lazy(() =>
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
export const UpdateProductRequisitionPage = React.lazy(() =>
  import('@/views/product-requisitions').then((module) => ({
    default: module.UpdateProductRequisition
  }))
)
export const HomePage = React.lazy(() =>
  import('@/views/home').then((module) => ({
    default: module.HomePage
  }))
)
export const RolePage = React.lazy(() =>
  import('@/views/roles').then((module) => ({
    default: module.Roles
  }))
)
export const CreateRolePage = React.lazy(() =>
  import('@/views/roles').then((module) => ({
    default: module.CreateRole
  }))
)
export const AuthorityPage = React.lazy(() =>
  import('@/views/authorities').then((module) => ({
    default: module.Authorities
  }))
)
export const CreateAuthorityPage = React.lazy(() =>
  import('@/views/authorities').then((module) => ({
    default: module.CreateAuthority
  }))
)
export const PermissionPage = React.lazy(() =>
  import('@/views/permissions').then((module) => ({
    default: module.Permissions
  }))
)
export const CreatePermissionPage = React.lazy(() =>
  import('@/views/permissions').then((module) => ({
    default: module.CreatePermission
  }))
)

export const AssignedApproverPage = React.lazy(() =>
  import('@/views/assigned-approver').then((module) => ({
    default: module.AssignedApprover
  }))
)

export const CreateAssignedApproverPage = React.lazy(() =>
  import('@/views/assigned-approver').then((module) => ({
    default: module.CreateAssignedApprover
  }))
)

export const CompanyPage = React.lazy(() =>
  import('@/views/companies').then((module) => ({
    default: module.Companies
  }))
)

export const CreateCompanyPage = React.lazy(() =>
  import('@/views/companies').then((module) => ({
    default: module.CreateCompany
  }))
)

export const SitePage = React.lazy(() =>
  import('@/views/sites').then((module) => ({
    default: module.Sites
  }))
)

export const CreateSitePage = React.lazy(() =>
  import('@/views/sites').then((module) => ({
    default: module.CreateSite
  }))
)

export const DepartmentPage = React.lazy(() =>
  import('@/views/departments').then((module) => ({
    default: module.Departments
  }))
)

export const CreateDepartmentPage = React.lazy(() =>
  import('@/views/departments').then((module) => ({
    default: module.CreateDepartment
  }))
)

export const AdministrationPage = React.lazy(() =>
  import('@/views/admin').then((module) => ({
    default: module.Administration
  }))
)

export const ResourcePage = React.lazy(() =>
  import('@/views/resource').then((module) => ({
    default: module.Resources
  }))
)

export const CreateResourcePage = React.lazy(() =>
  import('@/views/resource').then((module) => ({
    default: module.CreateResource
  }))
)

export const ProductPage = React.lazy(() =>
  import('@/views/products').then((module) => ({
    default: module.Products
  }))
)

export const CreateProductPage = React.lazy(() =>
  import('@/views/products').then((module) => ({
    default: module.AddProduct
  }))
)

export const WarehousePage = React.lazy(() =>
  import('@/views/warehouse').then((module) => ({
    default: module.Warehouse
  }))
)

export const BackupPage = React.lazy(() =>
  import('@/views/backups').then((module) => ({
    default: module.Backups
  }))
)

export const NotificationPage = React.lazy(() =>
  import('@/views/notifications').then((module) => ({
    default: module.Notifications
  }))
)
