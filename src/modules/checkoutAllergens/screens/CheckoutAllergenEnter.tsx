import Arrow from '@/assets/icons/arrow.svg?react'
import { Container, Grid, WrapBetween } from '@/components/snippets'
import { useHeader, useLayout } from '@/layouts/DefaultLayout.tsx'
import { raw } from '@theme/tokens.ts'
import { Input } from '@ui/Input'
import TitleSubtitle from '@ui/TitleSubtitle'
import { TopBar } from '@ui/Topbar'
import Text from '@ui/typography/Text.tsx'
import { useEffect } from 'react'

export function CheckoutAllergenEnter() {
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
