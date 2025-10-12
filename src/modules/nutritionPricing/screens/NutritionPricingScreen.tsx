import Shopping from '@/assets/icons/_shopping-bag-02.svg?react'
import ShoppingOutlined from '@/assets/icons/_shopping-bag-outlined.svg?react'
import Arrow from '@/assets/icons/arrow.svg?react'

import { CardWrapper, FlexWrap, Grid, IconContent, WrapBetween } from '@/components/snippets'
import { useFooter, useHeader } from '@/layouts/DefaultLayout.tsx'
import { Button } from '@ui/Button'
import { InfoField } from '@ui/InfoField'
import InputButton from '@ui/InputButton'
import InputSlider from '@ui/InputSlider'
import { Notice } from '@ui/Notice'
import TitleSubtitle from '@ui/TitleSubtitle'
import { TopBar } from '@ui/Topbar'
import { useEffect, useState } from 'react'

export function NutritionPricingScreen() {
  const { setHeader } = useHeader()
  const { setFooter } = useFooter()

  useEffect(() => {
    setHeader(<TopBar left={<Arrow />} title={'Расчет стоимости питания'} right={<Shopping />} />)

    return () => {
      setHeader(null)
    }
  }, [])
  const [kits, setKits] = useState(1)
  const [days, setDays] = useState(1)

  useEffect(() => {
    setFooter(
      <CardWrapper $padding={1} $color={100}>
        <Grid $gap={10} style={{ padding: 8 }}>
          <InfoField
            size={'h5'}
            label={'Итого за 2 300 кКал на 14 дней питания'}
            value={'159 467 ₸'}
          />
          <Button leading={<ShoppingOutlined />}>Добавить в корзину</Button>
        </Grid>
      </CardWrapper>,
    )
    return () => setFooter(null)
  }, [])
  return (
    <WrapBetween>
      <Grid $gap={16}>
        <TitleSubtitle
          level={'h6'}
          caption={'Установите количество калорий и продолжительность'}
          title={'Рассчитайте стоимость питания'}
        />
        <FlexWrap $gap={12}>
          <IconContent />
          <TitleSubtitle rowGap={0} reverse={true} title={'Программа'} caption={'Стандарт'} />
        </FlexWrap>
        <InputSlider
          label="Калорий"
          value={'1 800 кКал'}
          min={1}
          max={28}
          step={1}
          onChange={setDays}
          formatValue={(v) => String(v)}
          marks={[
            { value: 1, label: '900 кКал', align: 'left' },
            { value: 28, label: '2 900 кКал', align: 'right' },
          ]}
        />
        <Notice
          size={'regular'}
          variant={'bonus'}
          actionLabel={'Рассчитать'}
          title={'Рассчитайте норму калорий для достижения вашей цели'}
        />
        <InputSlider
          label="Дней питания"
          value={days}
          min={1}
          max={28}
          step={1}
          onChange={setDays}
          formatValue={(v) => String(v)}
          marks={[
            { value: 1, label: '1 день', align: 'left' },
            { value: 14, label: '14 дней', align: 'center' },
            { value: 28, label: '28 дней', align: 'right' },
          ]}
        />
        <InputButton
          helpText={'1 комплект, на одного клиента'}
          label="Комплектов"
          value={kits}
          min={1}
          max={10}
          onChange={setKits}
        />
      </Grid>
    </WrapBetween>
  )
}
