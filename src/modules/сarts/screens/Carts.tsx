import Plus from '@/assets/icons/_plus-circle.svg?react'
import Trash from '@/assets/icons/_trash-03.svg?react'
import { Grid, Wrap, WrapBetween } from '@/components/snippets'
import { programCards } from '@/mocks.ts'
import { CartsCard } from '@/modules/сarts/components/CartsCard.tsx'
import { useScreenLayout } from '@/shared/hooks/useScreenLayout.tsx'
import { BackTopBar } from '@/shared/topbar/BackTopBar.tsx'
import { raw } from '@theme/tokens.ts'
import { Button } from '@ui/Button'
import { InfoField } from '@ui/InfoField'
import TitleSubtitle from '@ui/TitleSubtitle'

export function Carts() {
  useScreenLayout({
    header: <BackTopBar title={'Корзина'} />,
  })

  return (
    <Grid $gap={16}>
      <WrapBetween>
        <TitleSubtitle
          level={'h4'}
          title={'Программы в корзине'}
          caption={'Всего 2'}
        ></TitleSubtitle>
      </WrapBetween>
      <WrapBetween>
        <Button variant={'accent/soft'} leading={<Plus />}>
          Добавить еще программу
        </Button>
      </WrapBetween>
      {programCards.map((f) => (
        <CartsCard {...f} />
      ))}
      <Button leading={<Trash />} variant={'destructive/text'}>
        Очистить всю корзину
      </Button>

      <Wrap style={{ background: raw.colors.neutral['0'] }}>
        <Grid $gap={16}>
          <InfoField size={'h2'} label={'Итого'} value={'265 214 ₸'} />
          <Button>К оформлению</Button>
        </Grid>
      </Wrap>
    </Grid>
  )
}
