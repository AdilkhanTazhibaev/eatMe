import { Container, WrapBetween } from '@/components/snippets'
import { useScreenLayout } from '@/shared/hooks/useScreenLayout.tsx'
import { BackTopBar } from '@/shared/topbar/BackTopBar.tsx'
import { raw } from '@theme/tokens.ts'
import { Button } from '@ui/Button'
import { TextArea } from '@ui/Textarea'

export function DeliveryComment() {
  useScreenLayout({
    header: <BackTopBar title={'Пожелания к доставке'} caption={'Алматы'} />,
    footer: (
      <WrapBetween>
        <Button>Сохранить</Button>
      </WrapBetween>
    ),
    mainStyle: { background: raw.colors.neutral[0] },
    footerStyle: { paddingBottom: 8, background: raw.colors.neutral[0] },
  })

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
