import Arrow from '@/assets/icons/arrow.svg?react'
import { Container, Grid, WrapBetween } from '@/components/snippets'
import { useFooter, useHeader, useLayout } from '@/layouts/DefaultLayout.tsx'
import { raw } from '@theme/tokens.ts'
import { Button } from '@ui/Button'
import { Input } from '@ui/Input'
import TitleSubtitle from '@ui/TitleSubtitle'
import { TopBar } from '@ui/Topbar'
import Text from '@ui/typography/Text.tsx'
import { useEffect } from 'react'

export function CheckoutInvoiceEnter() {
  const { setHeader } = useHeader()
  const { setFooter } = useFooter()
  const { setMainStyle } = useLayout()
  useEffect(() => {
    setHeader(<TopBar left={<Arrow />} title={'Добавление получателя'} />)

    return () => {
      setHeader(null)
    }
  }, [])
  useEffect(() => {
    setMainStyle({
      background: raw.colors.neutral[0],
    })

    return () => {
      setBg(null)
    }
  }, [])
  useEffect(() => {
    setFooter(
      <WrapBetween>
        <Button>Сохранить получателя</Button>
      </WrapBetween>,
    )
    return () => setFooter(null)
  }, [])
  return (
    <>
      <Container $bg={0}>
        <WrapBetween>
          <Grid $gap={16}>
            <TitleSubtitle
              caption={'Это можете быть вы, или другое лицо, для которого предназначен заказ'}
              title={'Добавьте данные получателя'}
              level={'h6'}
            ></TitleSubtitle>

            <Text size={14} weight={'medium'} color={raw.colors.neutral['700']}>
              До 3-х аллергенов на комплект
            </Text>
            <Input size={'500-48px'} label={'Имя'} />
            <Input size={'500-48px'} label={'Фамилия'} />
            <Input size={'500-48px'} label={'Мобильный номер'} />
            <Input
              helpText={'Будет отправлять чеки и иные документы'}
              size={'500-48px'}
              label={'Электронная почта'}
            />
          </Grid>
        </WrapBetween>
      </Container>
    </>
  )
}
