import Arrow from '@/assets/icons/arrow.svg?react'
import CardPay from '@/assets/icons/card-pay.svg?react'
import Chevron from '@/assets/icons/chevron.svg?react'
import Kaspi from '@/assets/icons/kaspi.kz.svg?react'
import { CardWrapper, Grid, Rail } from '@/components/snippets'
import { useHeader } from '@/layouts/DefaultLayout.tsx'
import { programCards } from '@/mocks.ts'
import { CheckoutCard } from '@/modules/checkout/components/CheckoutCard.tsx'
import { Button } from '@ui/Button'
import Divider from '@ui/Divider'
import { InfoField } from '@ui/InfoField'
import NavigationLink from '@ui/NavigationLink'
import { RadioGroup } from '@ui/RadioSelect'
import TitleSubtitle from '@ui/TitleSubtitle'
import { TopBar } from '@ui/Topbar'
import Heading from '@ui/typography/Heading.tsx'
import { useEffect } from 'react'
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
                  <CheckoutCard color={50} {...o} />
                </SwiperSlide>
              ))}
            </Swiper>
            <NavigationLink
              title={'Аллергены'}
              actionPadding={0}
              variant="card"
              action={<Chevron />}
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
          <Button size={48} variant={'neutral/filled'}>
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
          <Button size={48} variant={'neutral/filled'}>
            Добавить адрес доставки
          </Button>
        </Grid>
      </CardWrapper>
      <CardWrapper $padding={16} $color={0}>
        <NavigationLink
          title={'Промокод'}
          variant={'simple'}
          actionPadding={0}
          actionBg={0}
          action={<Chevron />}
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
