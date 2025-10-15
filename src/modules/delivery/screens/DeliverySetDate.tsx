import { WrapBetween } from '@/components/snippets'
import { useScreenLayout } from '@/shared/hooks/useScreenLayout.tsx'
import { BackTopBar } from '@/shared/topbar/BackTopBar.tsx'
import { raw } from '@theme/tokens.ts'
import { Button } from '@ui/Button'
import { RadioGroup } from '@ui/RadioSelect'

export function DeliverySetDate() {
  useScreenLayout({
    header: <BackTopBar title={'Время доставки'} />,
    footer: (
      <WrapBetween>
        <Button>Применить</Button>
      </WrapBetween>
    ),
    mainStyle: { background: raw.colors.neutral[0] },
    footerStyle: { paddingBottom: 8, background: raw.colors.neutral[0] },
  })

  return (
    <>
      <WrapBetween>
        <RadioGroup
          name="contact"
          size={64}
          gap={0}
          options={[
            {
              value: '1',
              title: '07:00 - 10:00',
              description: 'Утром',
            },
            {
              value: '1',
              title: '19:00 - 22:00',
              description: 'Вечером',
            },
          ]}
        />
      </WrapBetween>
    </>
  )
}
