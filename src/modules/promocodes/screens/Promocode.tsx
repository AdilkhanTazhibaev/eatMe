import { Grid, WrapBetween } from '@/components/snippets'
import { PromocodeList } from '@/modules/promocodes/components/PromocodeList.tsx'
import { raw } from '@theme/tokens.ts'
import { Button } from '@ui/Button'
import { Input } from '@ui/Input'
import Text from '@ui/typography/Text.tsx'
import { useScreenLayout } from '@/shared/hooks/useScreenLayout.tsx'
import { BackTopBar } from '@/shared/topbar/BackTopBar.tsx'

export function Promocode() {
  useScreenLayout({
    header: <BackTopBar title={'Промокод'} />,
    footer: (
      <WrapBetween>
        <Button>Применить</Button>
      </WrapBetween>
    ),
    mainStyle: { background: raw.colors.neutral[0] },
    footerStyle: { paddingBottom: 8, background: raw.colors.neutral[0] },
  })
  return (
    <>
      <WrapBetween>
        <Grid $gap={16}>
          <Grid $gap={12}>
            <Text color={raw.colors.neutral['900']} weight={'medium'}>
              Добавьте вручную
            </Text>
            <Input label={'Введите промокод'} />
          </Grid>
          <Text color={raw.colors.neutral['900']} weight={'medium'}>
            Ваши промокоды
          </Text>
          <PromocodeList />
        </Grid>
      </WrapBetween>
    </>
  )
}
