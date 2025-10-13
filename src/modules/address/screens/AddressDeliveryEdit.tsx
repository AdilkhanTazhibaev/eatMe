import Arrow from '@/assets/icons/arrow.svg?react'
import { Grid, Wrap, WrapBetween } from '@/components/snippets'
import { useFooter, useHeader, useLayout } from '@/layouts/DefaultLayout.tsx'
import { raw } from '@theme/tokens.ts'
import { Button } from '@ui/Button'
import Divider from '@ui/Divider'
import { Input } from '@ui/Input'
import { TopBar } from '@ui/Topbar'
import { useEffect } from 'react'

export function AddressDeliveryEdit() {
  const { setHeader } = useHeader()
  const { setFooter } = useFooter()
  const { setMainStyle, setFooterStyle } = useLayout()
  useEffect(() => {
    setHeader(
      <TopBar
        left={<Arrow />}
        title={'Адрес доставки'}
        caption={'Укажите важные детали для курьера'}
      />,
    )

    return () => {
      setHeader(null)
    }
  }, [])

  useEffect(() => {
    setMainStyle({
      background: raw.colors.neutral[0],
      padding: 0,
    })
    setFooterStyle({
      background: raw.colors.neutral[0],
      paddingBottom: 10,
    })
    return () => {
      setMainStyle(null)
    }
  }, [])
  useEffect(() => {
    setFooter(
      <WrapBetween>
        <Button>Сохранить</Button>
      </WrapBetween>,
    )

    return () => {
      setFooter(null)
    }
  }, [])

  return (
    <Wrap>
      <Grid $gap={24}>
        <Input value={'Алматы'} label={'Город'} />
        <Input
          helpText={'Доставка сюда будет бесплатной'}
          value={'Проспект Аль-Фараби, 41/6'}
          label={'Адрес'}
        />
        <Divider />
        <Grid
          style={{
            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
            minWidth: 0,
          }}
          $gap={8}
        >
          <Input label={'Подъезд'} />
          <Input label={'Код домофона'} />
        </Grid>
        <Grid
          style={{
            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
            minWidth: 0,
          }}
          $gap={8}
        >
          <Input label={'Квартира/офис'} />
          <Input label={'Этаж'} />
        </Grid>
      </Grid>
    </Wrap>
  )
}
