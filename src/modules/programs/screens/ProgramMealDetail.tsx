import Shopping from '@/assets/icons/_shopping-bag-02.svg?react'
import Arrow from '@/assets/icons/arrow.svg?react'
import { useHeader } from '@/layouts/DefaultLayout.tsx'
import { Notice } from '@ui/Notice'
import Tag from '@ui/Tags'
import { TopBar } from '@ui/Topbar'
import Heading from '@ui/typography/Heading.tsx'
import Text from '@ui/typography/Text.tsx'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

export function ProgramMealDetail() {
  const { setHeader } = useHeader()
  const navigate = useNavigate()

  useEffect(() => {
    setHeader(
      <TopBar
        left={
          <Arrow
            onClick={() => {
              navigate(-1)
            }}
          />
        }
        right={<Shopping />}
        title={'Стандарт'}
        caption={'Питание 13 сентября'}
      />,
    )
    return () => setHeader(null)
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
        <Notice
          description={
            'При оформлении заказа можно указать до 3-х аллергенов, они будут исключены в процессе приготовления из запланированных блюд'
          }
        />
        <ImageWrapper />

        <Heading level={4}>Сырники с фруктами в сливочном соуте</Heading>
        <Text>Описание</Text>
        <Text weight={'regular'}>
          Филе грудки индейки, вода, морковь, перец болгарский, шампиньоны, лук, соус унаги, крахмал
          картофельный, соль розовая, перец красный острый, лапша гречневая отварная, лук зеленый,
          брокколи, семя кунжута
        </Text>
      </div>
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
