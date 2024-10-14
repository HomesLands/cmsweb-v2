import { IconWrapper } from '@/components/app/drawer'
import { Card, CardContent } from '@/components/ui'
import { adminRoutes } from '@/router/admin-routes'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

export default function Administration() {
  const navigate = useNavigate()
  const { t } = useTranslation('sidebar')

  return (
    <div>
      <p className="font-semibold text-xl">Overview</p>
      <div className="flex items-center flex-wrap gap-5 mt-5">
        {adminRoutes.map((item) => {
          return (
            <Card
              className="w-52 h-52 flex items-center justify-center flex-col cursor-pointer bg-gray-100 hover:border-gray-500 transition-colors"
              onClick={() => navigate(item.path)}
            >
              <CardContent>
                <div className="flex flex-col items-center gap-5 text-violet-800">
                  {item.icon && <IconWrapper Icon={item.icon} className="w-8 h-8 " />}
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
