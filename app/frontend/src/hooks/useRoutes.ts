export interface Route {
    routeName: string
    routePath: string
}

export default (): {
    routes: Route[]
} => {
    const routes: Route[] = [
        {
            routeName: 'Login',
            routePath: '/auth/login',
        },
        {
            routeName: 'Register',
            routePath: '/auth/register',
        },
        {
            routeName: 'ForgotPassword',
            routePath: '/auth/forgot-password',
        }
    ]
    return {
        routes
    }
}
