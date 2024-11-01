import React from 'react'
import { useLocation, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui'

// Add a route name mapping object
const routeNameMap: { [key: string]: string } = {
  team: 'teamDetails',
  project: 'projectDetails',
  settings: 'settings'
  // Add more mappings as needed
}

const Breadcrumbs: React.FC = () => {
  const location = useLocation()
  const { t } = useTranslation(['sidebar'])

  const pathnames = location.pathname.split('/').filter((x) => x)

  const getBreadcrumbText = (name: string, index: number) => {
    if (routeNameMap[name]) {
      return t(`sidebar.${routeNameMap[name]}`)
    }
    return t(`sidebar.${name}`)
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/">{t('sidebar.home')}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`
          const isLast = index === pathnames.length - 1
          return (
            <React.Fragment key={name}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{getBreadcrumbText(name, index)}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link to={routeTo}>{getBreadcrumbText(name, index)}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export default Breadcrumbs
