import { Authority, Resource } from '@/constants'
import { useUserInfoPermissionsStore } from '@/stores'

export const hasRequiredPermissions = ({
  authority,
  resource
}: {
  authority: string
  resource: string
}): boolean => {
  const { userRoles } = useUserInfoPermissionsStore.getState()
  return userRoles.some((item) =>
    item.permissions.some((permission) => {
      if (permission.authority === Authority.MANAGE && permission.resource === Resource.ALL)
        return true

      if (permission.authority === Authority.MANAGE && permission.resource !== Resource.ALL)
        return permission.resource === resource

      if (permission.authority !== Authority.MANAGE && permission.resource == Resource.ALL)
        return permission.authority === authority

      return permission.authority === authority && permission.resource === resource
    })
  )
}
