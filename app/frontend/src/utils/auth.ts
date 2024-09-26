import { useUserInfoPermissionsStore } from '@/stores'

export const hasAuthority = (requiredAuthorities: string[]): boolean => {
  const { userRoles } = useUserInfoPermissionsStore.getState()
  return requiredAuthorities.some((auth) =>
    userRoles.some((role) => role.authorities.includes(auth))
  )
}
