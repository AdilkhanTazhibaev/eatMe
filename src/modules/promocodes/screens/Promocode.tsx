import Arrow from '@/assets/icons/arrow.svg?react'
import { Grid, WrapBetween } from '@/components/snippets'
import { useFooter, useHeader, useLayout } from '@/layouts/DefaultLayout.tsx'
import { PromocodeList } from '@/modules/promocodes/components/PromocodeList.tsx'
import { raw } from '@theme/tokens.ts'
import { Button } from '@ui/Button'
import { Input } from '@ui/Input'
import { TopBar } from '@ui/Topbar'
import Text from '@ui/typography/Text.tsx'
import { useEffect } from 'react'

export function Promocode() {
  const { setHeader } = useHeader()
  const { setFooter } = useFooter()
  const { setMainStyle, setFooterStyle } = useLayout()

  useEffect(() => {
    setHeader(<TopBar left={<Arrow />} title={'Промокод'} />)

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
        <Button>Применить</Button>
      </WrapBetween>,
    )

    return () => {
      setFooter(null)
    }
  }, [])
  return (
    <>
      <WrapBetween>
        <Grid $gap={16}>
          <Grid $gap={12}>
            <Text color={raw.colors.neutral['900']} weight={'medium'}>
              Добавьте вручную
            </Text>
            <Input label={'Введите промокод'} />
          </Grid>
          <Text color={raw.colors.neutral['900']} weight={'medium'}>
            Ваши промокоды
          </Text>
          <PromocodeList />
        </Grid>
      </WrapBetween>
    </>
  )
}
