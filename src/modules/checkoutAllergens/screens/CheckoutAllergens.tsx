import ArrowRight from '@/assets/icons/arrow-right.svg?react'
import Arrow from '@/assets/icons/arrow.svg?react'
import { Container, Grid, WrapBetween } from '@/components/snippets'
import { useHeader, useLayout } from '@/layouts/DefaultLayout.tsx'
import { raw } from '@theme/tokens.ts'
import NavigationLink from '@ui/NavigationLink'
import { TopBar } from '@ui/Topbar'
import Heading from '@ui/typography/Heading.tsx'
import { useEffect } from 'react'

export function CheckoutAllergens() {
  const { setHeader } = useHeader()
  const { setMainStyle } = useLayout()
  useEffect(() => {
    setHeader(<TopBar left={<Arrow />} title={'Аллергены'} />)

    return () => {
      setHeader(null)
    }
  }, [])
  useEffect(() => {
    setMainStyle({
      background: raw.colors.neutral[0],
    })

    return () => {
      setMainStyle(null)
    }
  }, [])
  return (
    <>
      <Container $bg={0}>
        <WrapBetween>
          <Grid $gap={16}>
            <Heading level={6}>Выберите комплект, чтобы назначить аллергены</Heading>
            <NavigationLink
              title={'Стандарт'}
              variant={'wrapper'}
              action={<ArrowRight />}
              caption={'2 400 кКал × 14 дней'}
              level={'h6'}
            />{' '}
            <NavigationLink
              title={'Стандарт'}
              variant={'wrapper'}
              action={<ArrowRight />}
              caption={'2 400 кКал × 14 дней'}
              level={'h6'}
            />{' '}
            <NavigationLink
              title={'Стандарт'}
              variant={'wrapper'}
              action={<ArrowRight />}
              caption={'2 400 кКал × 14 дней'}
              level={'h6'}
            />
          </Grid>
        </WrapBetween>
      </Container>
    </>
  )
}
