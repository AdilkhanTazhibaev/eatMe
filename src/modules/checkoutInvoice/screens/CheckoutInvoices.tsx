import Edit from '@/assets/icons/edit-02.svg?react'
import User from '@/assets/icons/image-user-plus.svg?react'
import { Container, Grid, WrapBetween } from '@/components/snippets'
import { useScreenLayout } from '@/shared/hooks/useScreenLayout.tsx'
import { BackTopBar } from '@/shared/topbar/BackTopBar.tsx'
import { raw } from '@theme/tokens.ts'
import { Button } from '@ui/Button'
import { RadioGroup } from '@ui/RadioSelect'
import Heading from '@ui/typography/Heading.tsx'

export function CheckoutInvoices() {
  useScreenLayout({
    header: <BackTopBar title={'Получатели'} />,
    mainStyle: {
      background: raw.colors.neutral[0],
    },
  })
  return (
    <>
      <Container $bg={0}>
        <WrapBetween>
          <Grid $gap={16}>
            <Heading level={6}>Выберите получателя, или добавьте нового</Heading>
            <RadioGroup
              name="contact"
              withWrapper
              size={80}
              options={[
                {
                  value: '1',
                  title: 'Алибек Князькин',
                  description: '+7 777 123 45 67',
                  trailing: <Edit />,
                },
              ]}
            />
            <Button trailing={<User />} variant={'accent/text'}>
              Добавить получателя
            </Button>
          </Grid>
        </WrapBetween>
      </Container>
    </>
  )
}
