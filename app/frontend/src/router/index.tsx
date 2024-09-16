import React, { Suspense } from 'react'
import { createBrowserRouter, RouteObject, useLocation, useNavigate } from 'react-router-dom'

import { routes } from '@/router/routes'
import { IRoute } from '@/types'
import { useUserStore } from '@/stores'

const createRouteObject = (route: {
  title: string
  path: string
  component?: () => Promise<{ default: React.ComponentType }>
  children?: IRoute[]
}): RouteObject => {
  const { component, children } = route

  const Element = React.lazy(async () => {
    const module = await component!()
    return { default: module.default }
  })

  return {
    path: route.path,
    element: (
      <Suspense>
        <Element />
      </Suspense>
    ),
    children: children?.map(createRouteObject)
  }
}

const routeObjects = routes.map(createRouteObject)

export function useToLogin() {
  const location = useLocation()
  console.log('location', location)
  const navigate = useNavigate()
  console.log('navigate', navigate)
  console.log('useToLogin')

  return (path?: string) => {
    const userStore = useUserStore.getState()
    userStore.logout()
    const currentPath = location.pathname
    if (currentPath !== '/auth/login') {
      navigate('/auth/login')
    }
  }
}

export const router = createBrowserRouter(routeObjects)
