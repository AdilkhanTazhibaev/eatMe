import { Container, Grid, WrapBetween } from '@/components/snippets'
import { useScreenLayout } from '@/shared/hooks/useScreenLayout.tsx'
import { BackTopBar } from '@/shared/topbar/BackTopBar.tsx'
import { raw } from '@theme/tokens.ts'
import { Input } from '@ui/Input'
import TitleSubtitle from '@ui/TitleSubtitle'
import Text from '@ui/typography/Text.tsx'

export function CheckoutAllergenEnter() {
  useScreenLayout({
    header: <BackTopBar title={'Аллергены'} />,
    mainStyle: {
      background: raw.colors.neutral[0],
    },
  })
  return (
    <>
      <Container $bg={0}>
        <WrapBetween>
          <Grid $gap={16}>
            <TitleSubtitle
              caption={'2 400 кКал × 14 дней'}
              title={'Аллергены для комплекта Стандарт'}
              level={'h6'}
            ></TitleSubtitle>

            <Text size={14} weight={'medium'} color={raw.colors.neutral['700']}>
              До 3-х аллергенов на комплект
            </Text>
            <Input size={'500-48px'} label={'Аллерген 1'} />
            <Input size={'500-48px'} label={'Аллерген 2'} />
            <Input size={'500-48px'} label={'Аллерген 3'} />
          </Grid>
        </WrapBetween>
      </Container>
    </>
  )
}
