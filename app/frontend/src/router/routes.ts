import { AlignJustify, SquareMenu, FolderOpenDot, Archive } from 'lucide-react'
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
        path: 'employee-list',
        component: () => import('@/views/employees-manage/Employees')
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
        component: () => import('@/views/products/Products')
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
        component: () => import('@/views/employees-manage/Employees')
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
  }
]

export { routes, sidebarSubmenus }
