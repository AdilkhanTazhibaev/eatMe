import Menu from '@/assets/icons/_menu-03.svg?react'
import Shopping from '@/assets/icons/_shopping-bag-02.svg?react'
import { Grid } from '@/components/snippets'
import { BonusCard } from '@/modules/main/components/BonusCard.tsx'
import { NavigationView } from '@/modules/navigation/views/NavigationView.tsx'
import { Programs } from '@/modules/programs/components/Programs.tsx'
import { ProgramsPopular } from '@/modules/programs/components/ProgramsPopular.tsx'
import { useScreenLayout } from '@/shared/hooks/useScreenLayout.tsx'
import { BaseTopBar } from '@/shared/topbar/Base.tsx'
import Drawer from '@ui/Drawer'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function Main() {
  useScreenLayout({
    header: (
      <BaseTopBar
        noWrap={true}
        badgeCount={10}
        badgeVariant={'danger'}
        right={
          <Shopping
            onClick={() => {
              navigate('/carts')
            }}
          ></Shopping>
        }
        left={
          <Menu
            onClick={() => {
              setOpen(true)
            }}
          ></Menu>
        }
      />
    ),
  })
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <Grid $gap={12}>
      <BonusCard />
      <Programs />
      <ProgramsPopular />
      <Drawer open={open}>
        <NavigationView
          onClick={() => {
            setOpen(false)
          }}
        />
      </Drawer>
    </Grid>
  )
}
