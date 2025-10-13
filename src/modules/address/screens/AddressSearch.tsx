import Arrow from '@/assets/icons/arrow.svg?react'
import { Container, WrapBetween } from '@/components/snippets'
import { useFooter, useHeader, useLayout } from '@/layouts/DefaultLayout.tsx'
import { raw } from '@theme/tokens.ts'
import { Button } from '@ui/Button'
import { Input } from '@ui/Input'
import { TopBar } from '@ui/Topbar'
import { useEffect } from 'react'

export function AddressSearch() {
  const { setHeader } = useHeader()
  const { setFooter } = useFooter()
  const { setMainStyle, setFooterStyle } = useLayout()

  useEffect(() => {
    setHeader(<TopBar left={<Arrow />} title={'Поиск по адресам'} caption={'Алматы'} />)

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
          <Input label={'Адрес доставки'} value={'Проспект Аль-Фараби, 41/6|'} />
        </WrapBetween>
      </Container>
    </>
  )
}
