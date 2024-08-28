import React from 'react'

// Định nghĩa kiểu cho props của IconWrapper
interface IconWrapperProps {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>> // Đảm bảo Icon là một component SVG
  className?: string
}

// Wrapper component để xử lý className
const IconWrapper: React.FC<IconWrapperProps> = ({ Icon, className, ...props }) => (
  <Icon className={className} {...props} />
)

export default IconWrapper
