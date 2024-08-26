import type { Route, SidebarSubmenu } from '@/types/route.type';
import { AlignJustify, SquareMenu, FolderOpenDot, Archive } from 'lucide-react';

const routes: Route[] = [
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
        component: () => import('@/layouts/DashboardLayout'),
    },
    {
        title: 'Dashboard',
        path: '/hr-subsystem',
        component: () => import('@/layouts/DashboardLayout'),
        children: [
            {
                title: 'Dashboard',
                path: '/hr-subsystem',
                component: () => import ('@/views/hr/Hr')
            }
        ]
    },
    {
        title: 'Project Subsystem',
        path: '/project-subsystem',
        component: () => import('@/layouts/DashboardLayout'),
        children: [
            {
                title: 'Projects',
                path: '/project-subsystem',
                component: () => import('@/views/projects/Projects')
            }
        ]
    },
    {
        title: 'YCVT Subsystem',
        path: '/ycvt-subsystem',
        component: () => import('@/layouts/DashboardLayout'),
        children: [
            {
                title: 'Materials',
                path: '/ycvt-subsystem',
                component: () => import('@/views/materials/materials')
            }
        ]
    }
];

const sidebarSubmenus: SidebarSubmenu[] = [
    {
        title: 'Phân hệ HR',
        path: '/hr-subsystem',
        icon: SquareMenu,
        component: () => import('@/layouts/DashboardLayout'),
        children: [
            {
                title: 'HR Subsystem',
                path: '/hr-subsystem',
                icon: AlignJustify,
                component: () => import('@/views/hr/Hr')
            }
        ]
    },
    {
        title: 'Phân hệ dự án',
        path: '/project-subsystem',
        icon: FolderOpenDot,
        component: () => import('@/layouts/DashboardLayout'),
        children: [
            {
                title: 'Project Subsystem',
                path: '/project-subsystem',
                icon: Archive,
                component: () => import('@/views/projects/Projects')
            }
        ]
    },
    {
        title: 'Phân hệ YCVT',
        path: '/ycvt-subsystem',
        icon: Archive,
        component: () => import('@/layouts/DashboardLayout'),
        children: [
            {
                title: 'YCVT Subsystem',
                path: '/ycvt-subsystem',
                icon: Archive,
                component: () => import('@/views/materials/materials')
            }
        ]
    }
];

export default { routes, sidebarSubmenus };
