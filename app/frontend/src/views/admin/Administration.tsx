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
      <div className="flex flex-wrap gap-5 items-center mt-5">
        {adminRoutes.map((item) => {
          return (
            <Card
              className="flex flex-col justify-center items-center w-52 h-52 transition-all duration-200 cursor-pointer bg-muted hover:scale-105 hover:border-primary"
              onClick={() => navigate(item.path)}
            >
              <CardContent>
                <div className="flex flex-col gap-5 items-center text-primary">
                  {item.icon && <IconWrapper Icon={item.icon} className="w-8 h-8" />}
                  <p className="text-sm font-extralight">{t(item.title)}</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
