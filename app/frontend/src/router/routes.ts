import type { IRoute, ISidebarSubmenu } from '@/types/route.type'
import { AlignJustify, SquareMenu, FolderOpenDot, Archive } from 'lucide-react'

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
    title: 'Dashboard',
    path: '/employees',
    component: () =>
      import('@/components/app/layouts').then((module) => ({ default: module.DashboardLayout })),
    children: [
      {
        title: 'User List',
        path: 'employee-list',
        component: () => import('@/views/hr/UserList')
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
        path: 'projects',
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
        title: 'Products List',
        path: 'product-list',
        component: () => import('@/views/materials/Materials')
      }
    ]
  }
]

const sidebarSubmenus: ISidebarSubmenu[] = [
  {
    title: 'Quản lý nhân viên',
    path: '/employees',
    icon: SquareMenu,
    component: () =>
      import('@/components/app/layouts').then((module) => ({ default: module.DashboardLayout })),
    children: [
      {
        title: 'Danh sách nhân viên',
        path: '/employees/employee-list',
        icon: AlignJustify,
        component: () => import('@/views/hr/UserList')
      }
    ]
  },
  {
    title: 'Quản lý dự án',
    path: '/projects-manage',
    icon: FolderOpenDot,
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
    icon: Archive,
    component: () =>
      import('@/components/app/layouts').then((module) => ({ default: module.DashboardLayout })),
    children: [
      {
        title: 'Danh sách yêu cầu vật tư',
        path: '/products/product-list',
        icon: Archive,
        component: () => import('@/views/materials/Materials')
      }
    ]
  }
]

export { routes, sidebarSubmenus }
