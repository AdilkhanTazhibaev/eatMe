import Shopping from '@/assets/icons/_shopping-bag-02.svg?react'
import Arrow from '@/assets/icons/arrow.svg?react'

import { CardWrapper } from '@/components/snippets'
import { MealsCard } from '@/modules/programs/components/MealsCard.tsx'
import { OtherPrograms } from '@/modules/programs/components/OtherPrograms.tsx'
import { useScreenLayout } from '@/shared/hooks/useScreenLayout.tsx'
import { BaseTopBar } from '@/shared/topbar/Base.tsx'
import { raw } from '@theme/tokens.ts'
import { Notice } from '@ui/Notice'
import Tag from '@ui/Tags'
import TitleSubtitle from '@ui/TitleSubtitle'
import Text from '@ui/typography/Text.tsx'
import { useNavigate } from 'react-router-dom'

export function ProgramDetail() {
  const navigate = useNavigate()
  useScreenLayout({
    mainStyle: {
      padding: 0,
    },
    header: (
      <BaseTopBar
        rounded={true}
        title={'Стандарт'}
        size={48}
        caption={'Программа'}
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
      <div style={{ display: 'grid', gap: 16 }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            paddingRight: 16,
            paddingLeft: 16,
            paddingTop: 16,
          }}
        >
          <Text size={16} color={raw.colors.neutral['900']}>
            Календарь питания
          </Text>
          <Text size={14} weight={'regular'} color={raw.colors.neutral['700']}>
            Выберите день, чтобы посмотреть питание
          </Text>
        </div>
        <div style={{ display: 'flex', gap: 5, paddingRight: 16, paddingLeft: 16 }}>
          <Tag>13 сентября</Tag>
          <Tag>14 сентября</Tag>
          <Tag>15 сентября</Tag>
        </div>
        <CardWrapper $color={0} $padding={16} style={{ display: 'grid', gap: 16 }}>
          <TitleSubtitle caption={'Сегодня'} title={'13 сентября'} />
          <Notice
            description={
              'Это примерное меню. Иногда мы меняем некоторые блюда, чтобы сделать меню еще вкуснее'
            }
          />
          <Text>Блюда в комплекте</Text>
          <Text size={14} weight={'regular'}>
            Всего 5
          </Text>
          <Text size={14} weight={'regular'} color={raw.colors.neutral['700']}>
            Завтрак, 06:00 — 10:00
          </Text>
          <MealsCard
            onClick={() => {
              navigate(`/programs-nutrition/${12}/info/${4}`)
            }}
            title={'Макароны по-флотски'}
            description={
              'Макароны по-флотски, ну очень сытное блюдо, приготовлено с использование макарон'
            }
          />{' '}
          <Text size={14} weight={'regular'} color={raw.colors.neutral['700']}>
            Завтрак, 06:00 — 10:00
          </Text>
          <MealsCard
            title={'Макароны по-флотски'}
            description={
              'Макароны по-флотски, ну очень сытное блюдо, приготовлено с использование макарон'
            }
          />{' '}
          <Text size={14} weight={'regular'} color={raw.colors.neutral['700']}>
            Завтрак, 06:00 — 10:00
          </Text>
          <MealsCard
            title={'Макароны по-флотски'}
            description={
              'Макароны по-флотски, ну очень сытное блюдо, приготовлено с использование макарон'
            }
          />{' '}
          <Text size={14} weight={'regular'} color={raw.colors.neutral['700']}>
            Завтрак, 06:00 — 10:00
          </Text>
          <MealsCard
            title={'Макароны по-флотски'}
            description={
              'Макароны по-флотски, ну очень сытное блюдо, приготовлено с использование макарон'
            }
          />
        </CardWrapper>

        <OtherPrograms />
      </div>
    </>
  )
}
