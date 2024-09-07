import { AlignJustify, Archive } from 'lucide-react'
import { PersonIcon, ArchiveIcon, FileTextIcon, CubeIcon } from '@radix-ui/react-icons'
import type { IRoute, ISidebarSubmenu } from '@/types'

const routes: IRoute[] = [
  {
    title: 'Login',
    path: '/auth/login',
    component: () => import('@/views/auth/Login')
  },
  {
    title: 'Register',
    path: '/auth/register',
    component: () => import('@/views/auth/Register')
  },
  {
    title: 'Home',
    path: '/',
    redirect: '/employees',
    component: () =>
      import('@/components/app/layouts').then((module) => ({ default: module.DashboardLayout }))
  },
  {
    title: 'Quản lý nhân viên',
    path: '/employees',
    component: () =>
      import('@/components/app/layouts').then((module) => ({ default: module.DashboardLayout })),
    children: [
      {
        title: 'Danh sách nhân viên',
        path: 'list',
        component: () => import('@/views/employees/Employees')
      }
    ]
  },
  {
    title: 'Project Subsystem',
    path: '/projects-manage',
    component: () =>
      import('@/components/app/layouts').then((module) => ({ default: module.DashboardLayout })),
    children: [
      {
        title: 'Projects',
        path: 'project-list',
        component: () => import('@/views/projects/Projects')
      }
    ]
  },
  {
    title: 'Yêu cầu vật tư',
    path: '/products',
    component: () =>
      import('@/components/app/layouts').then((module) => ({
        default: module.DashboardLayout
      })),
    children: [
      {
        title: 'Danh sách yêu cầu vật tư',
        path: 'list',
        component: () => import('@/views/products/Products')
      },
      {
        title: 'Thêm yêu cầu vật tư',
        path: 'add',
        component: () => import('@/views/products/CreateNewProductRequirement')
      }
    ]
  },
  {
    title: 'Warehouse',
    path: '/warehouse',
    component: () =>
      import('@/components/app/layouts').then((module) => ({ default: module.DashboardLayout })),
    children: [
      {
        title: 'Add Product',
        path: 'add',
        component: () => import('@/views/warehouse/AddProduct')
      },
      {
        title: 'Product List',
        path: 'list',
        component: () => import('@/views/warehouse/Warehouse')
      }
    ]
  }
]

const sidebarSubmenus: ISidebarSubmenu[] = [
  {
    title: 'Quản lý nhân viên',
    path: '/employees',
    icon: PersonIcon,
    component: () =>
      import('@/components/app/layouts').then((module) => ({ default: module.DashboardLayout })),
    children: [
      {
        title: 'Danh sách nhân viên',
        path: '/employees/list',
        icon: AlignJustify,
        component: () => import('@/views/employees/Employees')
      }
    ]
  },
  {
    title: 'Quản lý dự án',
    path: '/projects-manage',
    icon: FileTextIcon,
    component: () =>
      import('@/components/app/layouts').then((module) => ({ default: module.DashboardLayout })),
    children: [
      {
        title: 'Danh sách dự án',
        path: '/projects-manage/projects',
        icon: Archive,
        component: () => import('@/views/projects/Projects')
      }
    ]
  },
  {
    title: 'Yêu cầu vật tư',
    path: '/products',
    icon: ArchiveIcon,
    component: () =>
      import('@/components/app/layouts').then((module) => ({ default: module.DashboardLayout })),
    children: [
      {
        title: 'Danh sách yêu cầu vật tư',
        path: '/products/list',
        icon: Archive,
        component: () => import('@/views/products/Products')
      },
      {
        title: 'Thêm yêu cầu vật tư',
        path: '/products/add',
        icon: Archive,
        component: () => import('@/views/products/Products')
      }
    ]
  },
  {
    title: 'Kho',
    path: '/warehouse',
    icon: CubeIcon,
    component: () =>
      import('@/components/app/layouts').then((module) => ({ default: module.DashboardLayout })),
    children: [
      {
        title: 'Thêm vật tư',
        path: '/warehouse/add',
        icon: Archive,
        component: () => import('@/views/warehouse/AddProduct')
      },
      {
        title: 'Danh sách vật tư',
        path: '/warehouse/list',
        icon: Archive,
        component: () => import('@/views/warehouse/Warehouse')
      }
    ]
  }
]

export { routes, sidebarSubmenus }
