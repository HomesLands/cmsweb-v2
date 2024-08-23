import React from 'react';

export interface Route {
    routeName: string;
    routePath: string;
    element: React.LazyExoticComponent<React.FC> | React.FC;
    children?: Route[];
}

// Define routes with dynamic imports
const useRoutes = () => {
    const routes: Route[] = [
        {
            routeName: 'Login',
            routePath: '/auth/login',
            element: React.lazy(() => import('@/views/auth/Login'))
        },
        {
            routeName: 'Register',
            routePath: '/auth/register',
            element: React.lazy(() => import('@/views/auth/Register'))
        },
        {
            routeName: 'Dashboard',
            routePath: '/hr-subsystem',
            element: React.lazy(() => import('@/layouts/DashboardLayout'))
        }
    ];

    return { routes };
};

export default useRoutes;
