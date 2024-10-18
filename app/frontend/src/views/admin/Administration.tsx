import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { IconWrapper } from '@/components/app/drawer'
import { Card, CardContent } from '@/components/ui'
import { adminRoutes } from '@/router/admin-routes'

export default function Administration() {
  const navigate = useNavigate()
  const { t } = useTranslation('sidebar')

  return (
    <div>
      <p className="text-xl font-semibold">Overview</p>
      <div className="grid grid-cols-2 gap-4 mt-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {adminRoutes.map((item) => {
          return (
            <div key={item.path}>
              <Card
                className="flex items-center justify-center w-full h-full transition-all duration-200 cursor-pointer sm:w-48 sm:h-48 bg-muted/50 hover:scale-105 hover:border-primary"
                onClick={() => navigate(item.path)}
              >
                <CardContent className="flex items-center justify-center p-6">
                  <div className="flex flex-col items-center justify-center gap-2 sm:gap-5 text-primary">
                    {item.icon && (
                      <IconWrapper Icon={item.icon} className="w-6 h-6 sm:w-8 sm:h-8" />
                    )}
                    <p className="text-sm font-extralight">{t(item.title)}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )
        })}
      </div>
    </div>
  )
}
