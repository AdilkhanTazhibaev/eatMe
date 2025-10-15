import { Grid, WrapBetween } from '@/components/snippets'
import { useScreenLayout } from '@/shared/hooks/useScreenLayout.tsx'
import { BackTopBar } from '@/shared/topbar/BackTopBar.tsx'
import { raw } from '@theme/tokens.ts'
import { Button } from '@ui/Button'
import Checkbox from '@ui/Checkbox'
import { Notice } from '@ui/Notice'
import Text from '@ui/typography/Text.tsx'

export function DeliverySkipDays() {
  useScreenLayout({
    header: <BackTopBar title={'Не привозить в выбранные дни'} />,
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
              'Можете выбрать до 3-х дней в неделе, в которые мы не будем привозить питание, доставки за исключенные дни переносятся на следующие активные дни автоматически'
            }
          ></Notice>

          <Text size={14} weight={'medium'}>
            Будние
          </Text>
          <Grid $gap={24}>
            <Checkbox checked={true} label={'Понедельник'}></Checkbox>
            <Checkbox label={'Вторник'}></Checkbox>
            <Checkbox label={'Среда'}></Checkbox>
            <Checkbox label={'Четверг'}></Checkbox>
            <Checkbox label={'Пятница'}></Checkbox>
            <Text size={14} weight={'medium'}>
              Выходные
            </Text>
            <Checkbox checked={true} label={'Суббота'}></Checkbox>
            <Checkbox label={'Воскресенье'}></Checkbox>
          </Grid>
        </Grid>
      </WrapBetween>
    </>
  )
}
