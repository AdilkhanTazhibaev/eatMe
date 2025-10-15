import { type BadgeVariant, TopBar } from '@ui/Topbar'
import React from 'react'

interface BackTopBarProps {
  title?: string
  caption?: string
  rounded?: boolean
  right?: React.ReactNode
  left?: React.ReactNode
  noWrap?: boolean
  size?: 48 | 80
  badgeCount?: number
  badgeVariant?: BadgeVariant
}

export function BaseTopBar({
  title,
  caption,
  right,
  left,
  badgeCount,
  size = 80,
  rounded = false,
  badgeVariant,
  noWrap = false,
}: BackTopBarProps) {
  return (
    <TopBar
      badgeVariant={badgeVariant}
      badgeCount={badgeCount}
      size={size}
      noWrap={noWrap}
      rounded={rounded}
      left={left}
      title={title}
      caption={caption}
      right={right}
    />
  )
}
