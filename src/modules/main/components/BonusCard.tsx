import User from '@/assets/icons/_user-right-01.svg?react'
import { CardWrapper, Grid } from '@/components/snippets'
import { Button } from '@ui/Button'
import TitleSubtitle from '@ui/TitleSubtitle'

export function BonusCard() {
  return (
    <CardWrapper $color={0}>
      <Grid $gap={20}>
        <TitleSubtitle
          level={'h6'}
          title={'Ваши бонусы'}
          caption={'Начисляем за регистрацию и каждую покупку'}
        ></TitleSubtitle>
        <Button variant={'accent/soft'} trailing={<User />}>
          Войти, чтобы увидеть
        </Button>
      </Grid>
    </CardWrapper>
  )
}
