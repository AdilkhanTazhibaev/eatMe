import { CardWrapper, Grid } from '@/components/snippets'
import type { ProgramCard } from '@/modules/programs/types.ts'
import Divider from '@ui/Divider'
import { InfoField } from '@ui/InfoField'
import TitleSubtitle from '@ui/TitleSubtitle'

interface Props extends ProgramCard {
  onClick?: () => void
  color?: number
}

export function CheckoutCard({ color = 0, ...props }: Props) {
  return (
    <>
      <CardWrapper $color={color}>
        <Grid $gap={16}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <TitleSubtitle title={props.name} caption={props.description}></TitleSubtitle>
          </div>
          <Divider />
          <InfoField label={'Пищевая ценность'} value={props.kcal} />
          <InfoField label={'Приёмов пищи'} value={props.mealsPerDay} />
          <InfoField label={'Продолжительность питания'} value={props.durationDays} />
          <Divider />
          <InfoField size={'h5'} label={'Итого'} value={props.price + props.currency} />
        </Grid>
      </CardWrapper>
    </>
  )
}
