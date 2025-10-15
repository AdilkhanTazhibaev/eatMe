import CardPay from '@/assets/icons/card-pay.svg?react'
import Chevron from '@/assets/icons/chevron.svg?react'
import Kaspi from '@/assets/icons/kaspi.kz.svg?react'
import { CardWrapper, Grid, Rail } from '@/components/snippets'
import { programCards } from '@/mocks.ts'
import { CheckoutCard } from '@/modules/checkout/components/CheckoutCard.tsx'
import { useScreenLayout } from '@/shared/hooks/useScreenLayout.tsx'
import { BackTopBar } from '@/shared/topbar/BackTopBar.tsx'
import { Button } from '@ui/Button'
import Divider from '@ui/Divider'
import { InfoField } from '@ui/InfoField'
import NavigationLink from '@ui/NavigationLink'
import { RadioGroup } from '@ui/RadioSelect'
import TitleSubtitle from '@ui/TitleSubtitle'
import Heading from '@ui/typography/Heading.tsx'
import { useNavigate } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'

export function Checkout() {
  useScreenLayout({
    header: <BackTopBar title={'Оформление заказа'} />,
  })
  const navigate = useNavigate()
  return (
    <Grid $gap={16}>
      <Rail>
        <CardWrapper $color={0}>
          <Grid $gap={12}>
            <Heading level={6}>Программы в заказе</Heading>

            <Swiper centeredSlides={false} freeMode slidesPerView={'auto'} spaceBetween={12}>
              {programCards.map((o, i) => (
                <SwiperSlide key={i}>
                  <CheckoutCard color={50} {...o} />
                </SwiperSlide>
              ))}
            </Swiper>
            <NavigationLink
              title={'Аллергены'}
              actionPadding={0}
              variant="card"
              action={
                <Chevron
                  onClick={() => {
                    navigate('/checkout/allergens')
                  }}
                />
              }
              caption={
                'Вы можете указать аллергены, чтобы мы исключили их в процессе приготовления'
              }
              level={'text16'}
            />
          </Grid>
        </CardWrapper>
      </Rail>
      <CardWrapper $color={0}>
        <Grid $gap={16}>
          <TitleSubtitle
            level={'h6'}
            title={'Получатель'}
            caption={'Добавьте данные получателя заказа'}
          />
          <Button
            onClick={() => {
              navigate('/checkout/invoices')
            }}
            size={48}
            variant={'neutral/filled'}
          >
            Добавить получателя
          </Button>
        </Grid>
      </CardWrapper>
      <CardWrapper $color={0}>
        <Grid $gap={16}>
          <TitleSubtitle
            level={'h6'}
            title={'Адрес доставки и детали'}
            caption={'Укажите адрес доставки'}
          />
          <Button
            onClick={() => {
              navigate('/address')
            }}
            size={48}
            variant={'neutral/filled'}
          >
            Добавить адрес доставки
          </Button>
          <CardWrapper $color={100}>
            <Grid $gap={8}>
              <div
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              >
                <TitleSubtitle
                  level={'text16'}
                  reverse={true}
                  title={'Завтра, 18 сентября'}
                  caption={'Дата первой доставки'}
                />
                <Chevron
                  onClick={() => {
                    navigate('/address/details/edit')
                  }}
                />
              </div>
              <Divider />
              <div
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              >
                <TitleSubtitle
                  level={'text16'}
                  reverse={true}
                  title={'Утром, 07:00 - 10:00'}
                  caption={'Время ежедневной доставки'}
                />
                <Chevron
                  onClick={() => {
                    navigate('/delivery/set-date')
                  }}
                />
              </div>
              <Divider />
              <div
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              >
                <TitleSubtitle
                  level={'text16'}
                  reverse={true}
                  title={'Добавьте, если нужно'}
                  caption={'Комментарий для курьера'}
                />
                <Chevron
                  onClick={() => {
                    navigate('/comment')
                  }}
                />
              </div>
              <Divider />
              <div
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              >
                <TitleSubtitle
                  level={'text16'}
                  reverse={true}
                  title={'Можно исключить до 3-х дней в неделе, если нужно'}
                  caption={'Не привозить в выбранные дни'}
                />
                <Chevron
                  onClick={() => {
                    navigate('/delivery/set-skip-days')
                  }}
                />
              </div>
            </Grid>
          </CardWrapper>
        </Grid>
      </CardWrapper>
      <CardWrapper $padding={16} $color={0}>
        <NavigationLink
          title={'Промокод'}
          variant={'simple'}
          actionPadding={0}
          actionBg={0}
          action={
            <Chevron
              onClick={() => {
                navigate('/promocodes')
              }}
            />
          }
          caption={'Введите, чтобы применить'}
          level={'h6'}
        />
      </CardWrapper>
      <CardWrapper $padding={16} $color={0}>
        <Grid $gap={16}>
          <Heading level={6}>Детали счёта</Heading>
          <InfoField label={'Сумма без скидок'} value={159566} />
          <Divider />
          <Heading level={6}>Итого к оплате 159 467 ₸</Heading>
        </Grid>
      </CardWrapper>
      <CardWrapper $padding={16} $color={0}>
        <Grid $gap={16}>
          <Heading level={6}>Способы оплаты</Heading>
          <RadioGroup
            name="pay"
            controlPosition={'right'}
            size={64}
            options={[
              {
                value: 'kaspi',
                title: 'Kaspi.kz',
                description: 'В мобильном приложении',
                addon: <Kaspi />,
              },
              {
                value: 'card',
                title: 'Банковской картой',
                addon: <CardPay />,
              },
            ]}
          />
        </Grid>
      </CardWrapper>
    </Grid>
  )
}
