import React, { Suspense } from 'react'
import { createBrowserRouter, RouteObject } from 'react-router-dom'
import { routes } from '@/router/routes'
import { IRoute } from '@/types'
import { SpinnerLoading } from '@/components/app/loading'

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
      <Suspense fallback={<SpinnerLoading />}>
        <Element />
      </Suspense>
    ),
    children: children?.map(createRouteObject)
  }
}

const routeObjects = routes.map(createRouteObject)

export const router = createBrowserRouter(routeObjects)
