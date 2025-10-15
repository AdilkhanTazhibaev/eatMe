import Shopping from '@/assets/icons/_shopping-bag-02.svg?react'
import Arrow from '@/assets/icons/arrow.svg?react'
import { CardWrapper, Grid } from '@/components/snippets'
import { useScreenLayout } from '@/shared/hooks/useScreenLayout.tsx'
import { BaseTopBar } from '@/shared/topbar/Base.tsx'
import { raw } from '@theme/tokens.ts'
import { Notice } from '@ui/Notice'
import Tag from '@ui/Tags'
import Heading from '@ui/typography/Heading.tsx'
import Text from '@ui/typography/Text.tsx'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

export function ProgramMealDetail() {
  const navigate = useNavigate()

  useScreenLayout({
    mainStyle: {
      padding: 0,
      background: raw.colors.neutral['50'],
    },
    header: (
      <BaseTopBar
        rounded={true}
        title={'Стандарт'}
        size={48}
        caption={'Питание 13 сентября'}
        right={
          <Shopping
            onClick={() => {
              navigate('/carts')
            }}
          ></Shopping>
        }
        left={
          <Arrow
            onClick={() => {
              navigate(-1)
            }}
          />
        }
      />
    ),
  })
  return (
    <>
      <div style={{ padding: 16, display: 'grid', gap: 16 }}>
        <Text size={16}>Запланированные блюда</Text>
        <div style={{ display: 'flex', gap: 5 }}>
          <Tag>Завтрак</Tag>
          <Tag>Второй завтрак</Tag>
          <Tag>Обед</Tag>
        </div>
      </div>
      <CardWrapper $color={0}>
        <Grid $gap={12}>
          <Notice
            description={
              'При оформлении заказа можно указать до 3-х аллергенов, они будут исключены в процессе приготовления из запланированных блюд'
            }
          />
          <ImageWrapper />
          <Heading level={4}>Сырники с фруктами в сливочном соуте</Heading>
          <Text>Описание</Text>
          <Text weight={'regular'}>
            Филе грудки индейки, вода, морковь, перец болгарский, шампиньоны, лук, соус унаги,
            крахмал картофельный, соль розовая, перец красный острый, лапша гречневая отварная, лук
            зеленый, брокколи, семя кунжута
          </Text>
        </Grid>
      </CardWrapper>
    </>
  )
}

const ImageWrapper = styled.div`
  width: 100%;
  height: 200px;
  border-radius: 16px;
  background: antiquewhite;
  opacity: 1;
  top: 8px;
  left: 8px;
`
