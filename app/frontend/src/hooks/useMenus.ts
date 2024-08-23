import type { Route, SidebarSubmenu } from '@/types/route';
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
        title: 'Dashboard',
        path: '/hr-subsystem',
        component: () => import('@/layouts/DashboardLayout'),
        children: [
            {
                title: 'Dashboard',
                path: '/hr-subsystem/dashboard',
                component: () => import ('@/views/dashboard/Dashboard')
            }
        ]
    }
];

const sidebarSubmenus: SidebarSubmenu[] = [
    {
        title: 'Phân hệ HR',
        icon: SquareMenu,
        children: [
            {
                title: 'HR Subsystem',
                path: '/hr-subsystem',
                icon: AlignJustify,
                component: () => import('@/layouts/DashboardLayout')
            }
        ]
    },
    {
        title: 'Phân hệ dự án',
        icon: FolderOpenDot,
        children: [
            {
                title: 'Project Subsystem',
                path: '/project-subsystem',
                icon: Archive,
                component: () => import('@/layouts/DashboardLayout')
            }
        ]
    },
    {
        title: 'Phân hệ YCVT',
        icon: Archive,
        children: [
            {
                title: 'YCVT Subsystem',
                path: '/ycvt-subsystem',
                icon: Archive,
                component: () => import('@/layouts/DashboardLayout')
            }
        ]
    }
];

export default { routes, sidebarSubmenus };
