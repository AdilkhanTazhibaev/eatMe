import Arrow from '@/assets/icons/arrow.svg?react'
import { Container, WrapBetween } from '@/components/snippets'
import { useFooter, useHeader, useLayout } from '@/layouts/DefaultLayout.tsx'
import { raw } from '@theme/tokens.ts'
import { Button } from '@ui/Button'
import { TextArea } from '@ui/Textarea'
import { TopBar } from '@ui/Topbar'
import { useEffect } from 'react'

export function DeliveryComment() {
  const { setHeader } = useHeader()
  const { setFooter } = useFooter()
  const { setMainStyle, setFooterStyle } = useLayout()

  useEffect(() => {
    setHeader(<TopBar left={<Arrow />} title={'Пожелания к доставке'} caption={'Алматы'} />)

    return () => {
      setHeader(null)
    }
  }, [])
  useEffect(() => {
    setMainStyle({
      background: raw.colors.neutral[0],
    })
    setFooterStyle({
      paddingBottom: 8,
      background: raw.colors.neutral[0],
    })

    return () => {
      setMainStyle(null)
      setFooterStyle(null)
    }
  }, [])
  useEffect(() => {
    setFooter(
      <WrapBetween>
        <Button>Сохранить</Button>
      </WrapBetween>,
    )

    return () => {
      setFooter(null)
    }
  }, [])
  return (
    <>
      <Container $bg={0}>
        <WrapBetween>
          <TextArea
            label={'Комментарий для курьера, если нужно'}
            value={'Не звонить в домофон,в это время дома спят дети|'}
          />
        </WrapBetween>
      </Container>
    </>
  )
}
