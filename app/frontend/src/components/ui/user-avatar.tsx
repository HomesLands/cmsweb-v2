import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui'

function UserAvatar({ src, alt, fallback }: { src?: string; alt?: string; fallback?: string }) {
  return (
    <Avatar>
      <AvatarImage src={src || 'https://github.com/shadcn.png'} alt={alt || '@shadcn'} />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  )
}

export { UserAvatar }
