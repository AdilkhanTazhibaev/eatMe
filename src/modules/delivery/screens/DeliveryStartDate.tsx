import { Grid, WrapBetween } from '@/components/snippets'
import { useScreenLayout } from '@/shared/hooks/useScreenLayout.tsx'
import { BackTopBar } from '@/shared/topbar/BackTopBar.tsx'
import { raw } from '@theme/tokens.ts'
import { Button } from '@ui/Button'
import { Notice } from '@ui/Notice'

export function DeliveryStartDate() {
  useScreenLayout({
    header: <BackTopBar title={'Дата первой доставки'} />,
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
        <Grid $gap={12}>
          <Notice
            description={
              'Можете выбрать в качестве даты первой доставки любой день в течение недели с сегодняшнего дня'
            }
          ></Notice>
        </Grid>
      </WrapBetween>
    </>
  )
}
