import Chevron from '@/assets/icons/_chevron-right.svg?react'
import { CardWrapper } from '@/components/snippets'
import { MealsCard } from '@/modules/programs/components/MealsCard.tsx'
import { raw } from '@theme/tokens.ts'
import Heading from '@ui/typography/Heading.tsx'
import Text from '@ui/typography/Text.tsx'

export function OtherPrograms() {
  return (
    <>
      <CardWrapper $color={0} $padding={16}>
        <div style={{ marginBottom: 16 }}>
          <Heading level={6}>Другие программы</Heading>
        </div>
        <CardWrapper $color={50} $padding={8}>
          <div
            style={{
              marginBottom: 16,
              padding: 8,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'start',
            }}
          >
            <div style={{}}>
              <Heading level={6}>Американские горки</Heading>
              <Text size={14} color={raw.colors.neutral['700']}>
                Цена скрыта
              </Text>
            </div>
            <Chevron />
          </div>
          <div style={{ display: 'grid', gap: 8 }}>
            <MealsCard
              color={0}
              title={'Макароны по-флотски'}
              description={
                'Макароны по-флотски, ну очень сытное блюдо, приготовлено с использование макарон'
              }
            />{' '}
            <MealsCard
              color={0}
              title={'Макароны по-флотски'}
              description={
                'Макароны по-флотски, ну очень сытное блюдо, приготовлено с использование макарон'
              }
            />{' '}
            <MealsCard
              color={0}
              title={'Макароны по-флотски'}
              description={
                'Макароны по-флотски, ну очень сытное блюдо, приготовлено с использование макарон'
              }
            />{' '}
            <MealsCard
              color={0}
              title={'Макароны по-флотски'}
              description={
                'Макароны по-флотски, ну очень сытное блюдо, приготовлено с использование макарон'
              }
            />{' '}
            <MealsCard
              color={0}
              title={'Макароны по-флотски'}
              description={
                'Макароны по-флотски, ну очень сытное блюдо, приготовлено с использование макарон'
              }
            />{' '}
            <MealsCard
              color={0}
              title={'Макароны по-флотски'}
              description={
                'Макароны по-флотски, ну очень сытное блюдо, приготовлено с использование макарон'
              }
            />{' '}
            <MealsCard
              color={0}
              title={'Макароны по-флотски'}
              description={
                'Макароны по-флотски, ну очень сытное блюдо, приготовлено с использование макарон'
              }
            />
          </div>
        </CardWrapper>
      </CardWrapper>
    </>
  )
}
