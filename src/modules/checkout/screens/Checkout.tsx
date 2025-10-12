import Arrow from '@/assets/icons/arrow.svg?react'
import { CardWrapper, Grid } from '@/components/snippets'
import { useHeader } from '@/layouts/DefaultLayout.tsx'
import { programCards } from '@/mocks.ts'
import { CheckoutCard } from '@/modules/checkout/components/CheckoutCard.tsx'
import NavigationLink from '@ui/NavigationLink'
import { TopBar } from '@ui/Topbar'
import Heading from '@ui/typography/Heading.tsx'
import { useEffect } from 'react'
import styled from 'styled-components'
import { Swiper, SwiperSlide } from 'swiper/react'

export function Checkout() {
  const { setHeader } = useHeader()

  useEffect(() => {
    setHeader(<TopBar left={<Arrow />} title={'Оформление заказа'} />)

    return () => {
      setHeader(null)
    }
  }, [])

  return (
    <Grid $gap={16}>
      <Rail>
        <CardWrapper $color={0}>
          <Grid $gap={12}>
            <Heading level={6}>Программы в заказе</Heading>

            <Swiper centeredSlides={false} freeMode slidesPerView={'auto'} spaceBetween={12}>
              {programCards.map((o, i) => (
                <SwiperSlide key={i}>
                  <CheckoutCard color={100} {...o} />
                </SwiperSlide>
              ))}
            </Swiper>
            <NavigationLink
              title={'Аллергены'}
              caption={
                'Вы можете указать аллергены, чтобы мы исключили их в процессе приготовления'
              }
              level={'text16'}
            />
          </Grid>
        </CardWrapper>
      </Rail>
    </Grid>
  )
}

const Rail = styled.div`
  min-width: 0;

  border-radius: 16px;
  overflow: hidden;

  .swiper {
    width: 100%;
  }

  .swiper-wrapper {
    align-items: stretch;
  }

  .swiper-slide {
    width: 300px;
    display: flex;
  }
`
