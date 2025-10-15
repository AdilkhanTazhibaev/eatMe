import { Container, Grid, WrapBetween } from '@/components/snippets'
import { useScreenLayout } from '@/shared/hooks/useScreenLayout.tsx'
import { BackTopBar } from '@/shared/topbar/BackTopBar.tsx'
import { raw } from '@theme/tokens.ts'
import { Button } from '@ui/Button'
import { Input } from '@ui/Input'
import TitleSubtitle from '@ui/TitleSubtitle'
import Text from '@ui/typography/Text.tsx'

export function CheckoutInvoiceEnter() {
  useScreenLayout({
    header: <BackTopBar title={'Добавление получателя'} />,
    mainStyle: {
      background: raw.colors.neutral[0],
    },
    footer: (
      <WrapBetween>
        <Button>Сохранить получателя</Button>
      </WrapBetween>
    ),
  })
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
