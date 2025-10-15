import { CardWrapper, Rail } from '@/components/snippets'
import TitleSubtitle from '@ui/TitleSubtitle'
import { Swiper, SwiperSlide } from 'swiper/react'

export function PromocodeList() {
  return (
    <>
      <Rail>
        <Swiper centeredSlides={false} freeMode slidesPerView={'auto'} spaceBetween={12}>
          <SwiperSlide>
            <CardWrapper $color={50}>
              <TitleSubtitle
                title={'leto2025'}
                caption={'Описание промокода из панели администратора, не более 2-х строк'}
              />
            </CardWrapper>
          </SwiperSlide>
          <SwiperSlide>
            <CardWrapper $color={50}>
              <TitleSubtitle
                title={'leto2025'}
                caption={'Описание промокода из панели администратора, не более 2-х строк'}
              />
            </CardWrapper>
          </SwiperSlide>
        </Swiper>
      </Rail>
    </>
  )
}
