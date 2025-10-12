import Menu from '@/assets/icons/_menu-03.svg?react'
import Shopping from '@/assets/icons/_shopping-bag-02.svg?react'
import { Grid } from '@/components/snippets'
import { useHeader } from '@/layouts/DefaultLayout.tsx'
import { BonusCard } from '@/modules/main/components/BonusCard.tsx'
import { NavigationView } from '@/modules/navigation/views/NavigationView.tsx'
import { Programs } from '@/modules/programs/components/Programs.tsx'
import { ProgramsPopular } from '@/modules/programs/components/ProgramsPopular.tsx'
import Drawer from '@ui/Drawer'
import { TopBar } from '@ui/Topbar'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function Main() {
  const { setHeader } = useHeader()
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  useEffect(() => {
    setHeader(
      <TopBar
        badgeCount={10}
        badgeVariant={'danger'}
        left={
          <Menu
            onClick={() => {
              setOpen(true)
            }}
          ></Menu>
        }
        right={
          <Shopping
            onClick={() => {
              navigate('/carts')
            }}
          ></Shopping>
        }
      />,
    )
    return () => setHeader(null)
  })

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
