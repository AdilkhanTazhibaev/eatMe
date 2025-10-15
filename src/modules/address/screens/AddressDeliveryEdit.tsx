import { Grid, Wrap, WrapBetween } from '@/components/snippets'
import { useScreenLayout } from '@/shared/hooks/useScreenLayout.tsx'
import { BackTopBar } from '@/shared/topbar/BackTopBar.tsx'
import { raw } from '@theme/tokens.ts'
import { Button } from '@ui/Button'
import Divider from '@ui/Divider'
import { Input } from '@ui/Input'

export function AddressDeliveryEdit() {
  useScreenLayout({
    header: <BackTopBar title={'Адреса доставки'} caption={'Укажите важные детали для курьера'} />,
    mainStyle: {
      background: raw.colors.neutral[0],
      padding: 0,
    },
    footerStyle: {
      background: raw.colors.neutral[0],
      paddingBottom: 10,
    },
    footer: (
      <WrapBetween>
        <Button>Сохранить</Button>
      </WrapBetween>
    ),
  })
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
