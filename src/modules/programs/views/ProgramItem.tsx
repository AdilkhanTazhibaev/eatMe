import { MealsCard } from '@/modules/programs/components/MealsCard.tsx'
import type { Program } from '@/modules/programs/types.ts'
import { raw } from '@theme/tokens.ts'
import { Button } from '@ui/Button'
import Divider from '@ui/Divider'
import { InfoField } from '@ui/InfoField'
import Tag from '@ui/Tags'
import TitleSubtitle from '@ui/TitleSubtitle'
import Text from '@ui/typography/Text.tsx'
import styled from 'styled-components'

interface Props extends Program {
  onClick: () => void
}

export function ProgramItem(props: Props) {
  return (
    <Wrap>
      <TitleSubtitle caption={props.description} title={props.name} />
      <div>
        <Tag>от 900 до 2 500 кКал · 5 блюд</Tag>
      </div>
      <Divider />
      <Text size={14} weight={'medium'} color={raw.colors.neutral['700']}>
        Выберите калораж, чтобы увидеть цену
      </Text>
      <div style={{ display: 'flex', gap: 5 }}>
        {props.kcalRange.map((p, i) => (
          <Tag key={i}>{p}</Tag>
        ))}
      </div>
      <Text size={14} color={raw.colors.neutral['700']}>
        Блюда в комплекте: {props.mealsPerDay}
      </Text>

      {props.options.map((o, i) => (
        <div key={i}>
          <MealsCard title={o.exampleMeal.title} description={o.exampleMeal.description} />
        </div>
      ))}
      <InfoField
        caption={'Войдите по номеру, чтобы увидеть цены'}
        label={'Для 900 кКал, за 1 день питания'}
        suffix={'Цена скрыта'}
      />
      <Button size={48} variant={'accent/soft'}>
        Подробнее о программе
      </Button>
    </Wrap>
  )
}

const Wrap = styled.div`
  display: grid;
  gap: 16px;
`
