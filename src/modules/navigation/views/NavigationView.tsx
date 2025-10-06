import { type MenuEntry, SideMenu } from '@/components/navigation/SideMenu.tsx'
import React from 'react'

import BarChart from '@/assets/icons/_bar-chart-10.svg?react'
import FastBackward from '@/assets/icons/_fast-backward.svg?react'
import Hearts from '@/assets/icons/_hearts.svg?react'
import HomeSmile from '@/assets/icons/_home-smile.svg?react'
import Message from '@/assets/icons/_message-chat-circle.svg?react'
import Shopping from '@/assets/icons/_shopping-bag-02.svg?react'
import User from '@/assets/icons/_user-02.svg?react'
import Close from '@/assets/icons/_x-close.svg?react'
import { TopBar } from '@ui/Topbar'

export const NavigationView: React.FC = () => {
  const items: MenuEntry[] = [
    { id: 'home', label: 'Главная', to: '/app/home', icon: <HomeSmile /> },
    { id: 'my', label: 'Мои доставки заказов', to: '/app/deliveries', icon: <Hearts /> },
    { id: 'prog', label: 'Программы', to: '/app/programs', icon: <BarChart /> },
    { id: 'hist', label: 'История заказов', to: '/app/orders', icon: <FastBackward /> },
    { id: 'prof', label: 'Профиль', to: '/app/profile', icon: <User /> },
    { id: 'help', label: 'Поддержка', to: '/app/support', icon: <Message /> },
  ]

  return (
    <>
      <TopBar left={<Close />} right={<Shopping />} title={'kdsj'} />
      <div style={{ padding: 16 }}>
        <SideMenu items={items} />
      </div>
    </>
  )
}
