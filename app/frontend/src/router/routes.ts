import { AlignJustify, SquareMenu, FolderOpenDot, Archive } from 'lucide-react'
import type { IRoute, SidebarSubmenu } from '@/types'

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
    redirect: '/hr-subsystem',
    component: () =>
      import('@/components/app/layouts').then((module) => ({ default: module.DashboardLayout }))
  },
  {
    title: 'Dashboard',
    path: '/hr-subsystem',
    component: () =>
      import('@/components/app/layouts').then((module) => ({ default: module.DashboardLayout })),
    children: [
      {
        title: 'User List',
        path: 'user-list',
        component: () => import('@/views/hr/UserList')
      }
    ]
  },
  {
    title: 'Project Subsystem',
    path: '/project-subsystem',
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
    title: 'Phân hệ YCVT',
    path: '/ycvt-subsystem',
    component: () =>
      import('@/components/app/layouts').then((module) => ({
        default: module.DashboardLayout
      })),
    children: [
      {
        title: 'Materials',
        path: 'materials',
        component: () => import('@/views/materials/Materials')
      }
    ]
  }
]

const sidebarSubmenus: SidebarSubmenu[] = [
  {
    title: 'Phân hệ HR',
    path: '/hr-subsystem',
    icon: SquareMenu,
    component: () =>
      import('@/components/app/layouts').then((module) => ({ default: module.DashboardLayout })),
    children: [
      {
        title: 'User List',
        path: '/hr-subsystem/user-list',
        icon: AlignJustify,
        component: () => import('@/views/hr/UserList')
      }
    ]
  },
  {
    title: 'Phân hệ dự án',
    path: '/project-subsystem',
    icon: FolderOpenDot,
    component: () =>
      import('@/components/app/layouts').then((module) => ({ default: module.DashboardLayout })),
    children: [
      {
        title: 'Project Subsystem',
        path: '/project-subsystem/projects',
        icon: Archive,
        component: () => import('@/views/projects/Projects')
      }
    ]
  },
  {
    title: 'Phân hệ YCVT',
    path: '/ycvt-subsystem',
    icon: Archive,
    component: () =>
      import('@/components/app/layouts').then((module) => ({ default: module.DashboardLayout })),
    children: [
      {
        title: 'YCVT Subsystem',
        path: '/ycvt-subsystem/materials',
        icon: Archive,
        component: () => import('@/views/materials/Materials')
      }
    ]
  }
]

export { routes, sidebarSubmenus }
