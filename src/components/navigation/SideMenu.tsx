import ArrowRight from '@/assets/icons/arrow-right.svg?react'
import { IconWrap } from '@/components/snippets'
import NavigationLink from '@ui/NavigationLink'
import React, { type ReactNode } from 'react'

export type MenuEntry = {
  id: string
  label: string
  to?: string
  onClick?: () => void
  icon?: ReactNode
  rightIcon?: ReactNode
  disabled?: boolean
}

interface Props {
  items: MenuEntry[]
}

export const SideMenu: React.FC = ({ items }: Props) => {
  return (
    <>
      {items.map((i, key) => {
        return (
          <NavigationLink
            icon={<IconWrap $color={0}>{i.icon}</IconWrap>}
            key={key}
            title={i.label}
            action={<ArrowRight />}
          />
        )
      })}
    </>
  )
}
