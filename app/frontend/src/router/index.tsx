import React, { Suspense } from 'react'
import { createBrowserRouter, RouteObject } from 'react-router-dom'

import { routes } from '@/router/routes'
import { IRoute } from '@/types'
import ProtectedRoute from '@/views/auth/ProtectedRoute'

const createRouteObject = (route: {
  title: string
  path: string
  component?: () => Promise<{ default: React.ComponentType }>
  children?: IRoute[]
  authorities?: string[]
}): RouteObject => {
  const { component, children, authorities } = route
  console.log('authorities in createRouteObject', authorities)

  const Element = React.lazy(async () => {
    const module = await component!()
    return { default: module.default }
  })

  return {
    path: route.path,
    element: (
      // <ProtectedRoute requiredAuthorities={authorities}>
      <Suspense>
        <Element />
      </Suspense>
      // </ProtectedRoute>
    ),
    children: children?.map(createRouteObject)
  }
}

const routeObjects = routes.map(createRouteObject)

// export function useToLogin() {
//   const location = useLocation()
//   console.log('location', location)
//   const navigate = useNavigate()
//   console.log('navigate', navigate)
//   console.log('useToLogin')

//   return (path?: string) => {
//     const userStore = useAuthStore.getState()
//     userStore.logout()
//     const currentPath = location.pathname
//     if (currentPath !== '/auth/login') {
//       navigate('/auth/login')
//     }
//   }
// }

export const router = createBrowserRouter(routeObjects)
