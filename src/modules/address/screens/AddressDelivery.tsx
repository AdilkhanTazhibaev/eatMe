import Arrow from '@/assets/icons/arrow.svg?react'
import { Container, Grid } from '@/components/snippets'
import { useFooter, useHeader, useLayout } from '@/layouts/DefaultLayout.tsx'
import YandexMap from '@/shared/maps/YandexMap.tsx'
import { raw } from '@theme/tokens.ts'
import { Button } from '@ui/Button'
import { Input } from '@ui/Input'
import { TopBar } from '@ui/Topbar'
import { useCallback, useEffect, useState } from 'react'

export function AddressDelivery() {
  const { setHeader } = useHeader()
  const { setFooter } = useFooter()
  const { setMainStyle } = useLayout()
  const [point, setPoint] = useState<[number, number] | null>(null)
  const handleClick = useCallback((coords: [number, number]) => setPoint(coords), [])
  useEffect(() => {
    setHeader(<TopBar left={<Arrow />} title={'Добавление адреса доставки'} />)

    return () => {
      setHeader(null)
    }
  }, [])

  useEffect(() => {
    setMainStyle({
      background: raw.colors.neutral[0],
      padding: 0,
    })

    return () => {
      setMainStyle(null)
    }
  }, [])
  useEffect(() => {
    setFooter(
      <>
        <Container
          style={{
            padding: 16,
            background: raw.colors.neutral['0'],
          }}
        >
          <Grid $gap={8}>
            <Input size={'500-48px'} value={'Проспект Аль-Фараби, 41/6'} />
            <Button>Подтвердить и продолжить</Button>
          </Grid>
        </Container>
      </>,
    )

    return () => {
      setFooter(null)
    }
  }, [])

  return (
    <>
      <YandexMap
        center={point ?? [43.238949, 76.889709]}
        zoom={point ? 15 : 12}
        markers={point ? [{ id: 'picked', coords: point, hint: 'Вы выбрали точку' }] : []}
        onClickMap={handleClick}
        height={550}
      />
    </>
  )
}
