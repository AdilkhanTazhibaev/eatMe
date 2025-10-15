import Edit from '@/assets/icons/edit-02.svg?react'
import Mark from '@/assets/icons/marker-pin-04.svg?react'
import { Container, Grid, WrapBetween } from '@/components/snippets'
import { useScreenLayout } from '@/shared/hooks/useScreenLayout.tsx'
import { BackTopBar } from '@/shared/topbar/BackTopBar.tsx'
import { raw } from '@theme/tokens.ts'
import { Button } from '@ui/Button'
import { RadioGroup } from '@ui/RadioSelect'
import Heading from '@ui/typography/Heading.tsx'

export function AddressDeliveryDetails() {
  useScreenLayout({
    header: <BackTopBar title={'Адреса доставки'} />,
    mainStyle: {
      background: raw.colors.neutral[0],
    },
  })
  return (
    <>
      <Container $bg={0}>
        <WrapBetween>
          <Grid $gap={16}>
            <Heading level={6}>Выберите адрес доставки, или добавьте новый</Heading>
            <RadioGroup
              name="contact"
              withWrapper
              size={80}
              options={[
                {
                  value: '1',
                  title: 'Проспект Аль-Фараби, 41/6',
                  description: 'Алматы',
                  trailing: <Edit />,
                },
              ]}
            />
            <Button trailing={<Mark />} variant={'accent/text'}>
              Добавить адрес
            </Button>
          </Grid>
        </WrapBetween>
      </Container>
    </>
  )
}
