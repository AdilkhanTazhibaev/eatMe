import Pencil from '@/assets/icons/_pencil-01.svg?react'
import Trash from '@/assets/icons/_trash-03.svg?react'
import { CardWrapper, Grid } from '@/components/snippets'
import type { ProgramCard } from '@/modules/programs/types.ts'
import { Button } from '@ui/Button'
import Divider from '@ui/Divider'
import { InfoField } from '@ui/InfoField'
import TitleSubtitle from '@ui/TitleSubtitle'
import { useNavigate } from 'react-router-dom'

interface Props extends ProgramCard {
  onClick?: () => void
}

export function CartsCard({ ...props }: Props) {
  const navigation = useNavigate()

  return (
    <>
      <CardWrapper $color={0}>
        <Grid $gap={16}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <TitleSubtitle title={props.name} caption={props.description}></TitleSubtitle>
            <Trash />
          </div>
          <Divider />
          <InfoField label={'Пищевая ценность'} value={props.kcal} />
          <InfoField label={'Приёмов пищи'} value={props.mealsPerDay} />
          <InfoField label={'Продолжительность питания'} value={props.durationDays} />
          <InfoField label={'Комплектов'} value={props.sets} />
          <div>
            <Button
              leading={<Pencil />}
              fullWidth={false}
              variant={'neutral/text'}
              labelSize={14}
              onClick={() => {
                navigation('/nutrition-pricing')
              }}
              size={36}
            >
              Отредактировать
            </Button>
          </div>
          <Divider />
          <InfoField size={'h5'} label={'Итого'} value={props.price + props.currency} />
        </Grid>
      </CardWrapper>
    </>
  )
}
