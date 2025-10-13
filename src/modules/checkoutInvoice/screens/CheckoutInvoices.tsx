import Arrow from '@/assets/icons/arrow.svg?react'
import Edit from '@/assets/icons/edit-02.svg?react'
import User from '@/assets/icons/image-user-plus.svg?react'
import { Container, Grid, WrapBetween } from '@/components/snippets'
import { useHeader, useLayoutBg } from '@/layouts/DefaultLayout.tsx'
import { raw } from '@theme/tokens.ts'
import { Button } from '@ui/Button'
import { RadioGroup } from '@ui/RadioSelect'
import { TopBar } from '@ui/Topbar'
import Heading from '@ui/typography/Heading.tsx'
import { useEffect } from 'react'

export function CheckoutInvoices() {
  const { setHeader } = useHeader()
  const { setBg } = useLayoutBg()
  useEffect(() => {
    setHeader(<TopBar left={<Arrow />} title={'Получатели'} />)

    return () => {
      setHeader(null)
    }
  }, [])
  useEffect(() => {
    setBg(raw.colors.neutral[0])

    return () => {
      setBg(null)
    }
  }, [])
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
