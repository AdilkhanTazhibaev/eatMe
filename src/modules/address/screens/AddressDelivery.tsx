import { Container, Grid } from '@/components/snippets'
import { useScreenLayout } from '@/shared/hooks/useScreenLayout.tsx'
import YandexMap from '@/shared/maps/YandexMap.tsx'
import { BackTopBar } from '@/shared/topbar/BackTopBar.tsx'
import { raw } from '@theme/tokens.ts'
import { Button } from '@ui/Button'
import { Input } from '@ui/Input'
import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function AddressDelivery() {
  const navigate = useNavigate()
  useScreenLayout({
    header: <BackTopBar title={'Добавление адреса доставки'} />,
    mainStyle: {
      background: raw.colors.neutral[0],
      padding: 0,
    },
    footer: (
      <>
        <Container
          style={{
            padding: 16,
            background: raw.colors.neutral['0'],
          }}
        >
          <Grid $gap={8}>
            <Input size={'500-48px'} value={'Проспект Аль-Фараби, 41/6'} />
            <Button
              onClick={() => {
                navigate('/address/details/edit')
              }}
            >
              Подтвердить и продолжить
            </Button>
          </Grid>
        </Container>
      </>
    ),
  })
  const [point, setPoint] = useState<[number, number] | null>(null)
  const handleClick = useCallback((coords: [number, number]) => setPoint(coords), [])

  return (
    <>
      <YandexMap
        center={point ?? [43.238949, 76.889709]}
        zoom={point ? 15 : 12}
        markers={point ? [{ id: 'picked', coords: point, hint: 'Вы выбрали точку' }] : []}
        onClickMap={handleClick}
        height={400}
      />
    </>
  )
}
