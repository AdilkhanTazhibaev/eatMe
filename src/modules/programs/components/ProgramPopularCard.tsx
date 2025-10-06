import Chevron from '@/assets/icons/chevron.svg?react'
import { CardWrapper, Carousel, Grid } from '@/components/snippets'
import { MealsCard } from '@/modules/programs/components/MealsCard.tsx'
import type { Program } from '@/modules/programs/types.ts'
import { raw } from '@theme/tokens.ts'
import { InfoField } from '@ui/InfoField'
import Tag from '@ui/Tags'
import TitleSubtitle from '@ui/TitleSubtitle'
import Text from '@ui/typography/Text.tsx'
import { Swiper, SwiperSlide } from 'swiper/react'

interface Props extends Program {
  onClick: (event: MouseEvent) => void
}

export function ProgramPopularCard({ name, description, ...props }: Props) {
  return (
    <>
      <CardWrapper $color={50}>
        <Grid $gap={16}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
            <TitleSubtitle title={name} caption={description} />
            <Chevron onClick={props.onClick} />
          </div>

          <div style={{ display: 'flex', gap: 5 }}>
            {props.kcalRange.map((p, i) => (
              <Tag key={i}>{p}</Tag>
            ))}
          </div>
          <Text size={14} color={raw.colors.neutral['700']}>
            Блюда в комплекте: {props.mealsPerDay}
          </Text>
          <Carousel>
            <Swiper slidesPerView={'auto'} spaceBetween={5}>
              {props.options.map((o, i) => (
                <SwiperSlide key={i}>
                  <MealsCard
                    color={0}
                    title={o.exampleMeal.title}
                    description={o.exampleMeal.description}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </Carousel>
          <InfoField
            caption={'Войдите по номеру, чтобы увидеть цены'}
            label={'Для 900 кКал, за 1 день питания'}
            suffix={'Цена скрыта'}
          />
        </Grid>
      </CardWrapper>
    </>
  )
}
