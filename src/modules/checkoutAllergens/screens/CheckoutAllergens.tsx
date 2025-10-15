import ArrowRight from '@/assets/icons/arrow-right.svg?react'
import { Container, Grid, WrapBetween } from '@/components/snippets'
import { useScreenLayout } from '@/shared/hooks/useScreenLayout.tsx'
import { BackTopBar } from '@/shared/topbar/BackTopBar.tsx'
import { raw } from '@theme/tokens.ts'
import NavigationLink from '@ui/NavigationLink'
import Heading from '@ui/typography/Heading.tsx'
import { useNavigate } from 'react-router-dom'

export function CheckoutAllergens() {
  const navigate = useNavigate()

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
            <Heading level={6}>Выберите комплект, чтобы назначить аллергены</Heading>
            <NavigationLink
              title={'Стандарт'}
              variant={'wrapper'}
              action={
                <ArrowRight
                  onClick={() => {
                    navigate('/checkout/allergen/enter')
                  }}
                />
              }
              caption={'2 400 кКал × 14 дней'}
              level={'h6'}
            />{' '}
            <NavigationLink
              title={'Стандарт'}
              variant={'wrapper'}
              action={
                <ArrowRight
                  onClick={() => {
                    navigate('/checkout/allergen/enter')
                  }}
                />
              }
              caption={'2 400 кКал × 14 дней'}
              level={'h6'}
            />{' '}
            <NavigationLink
              title={'Стандарт'}
              variant={'wrapper'}
              action={
                <ArrowRight
                  onClick={() => {
                    navigate('/checkout/allergen/enter')
                  }}
                />
              }
              caption={'2 400 кКал × 14 дней'}
              level={'h6'}
            />
          </Grid>
        </WrapBetween>
      </Container>
    </>
  )
}
