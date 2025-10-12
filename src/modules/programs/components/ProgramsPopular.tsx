import Chevron from '@/assets/icons/_chevron-right.svg?react'
import { CardWrapper, Grid } from '@/components/snippets'
import { mockPrograms } from '@/mocks.ts'
import { ProgramPopularCard } from '@/modules/programs/components/ProgramPopularCard.tsx'
import { Button } from '@ui/Button'
import { Notice } from '@ui/Notice'
import Heading from '@ui/typography/Heading.tsx'
import { useNavigate } from 'react-router-dom'

interface Props {}

export function ProgramsPopular() {
  const navigate = useNavigate()

  return (
    <CardWrapper $color={0}>
      <Grid $gap={16}>
        <div
          style={{
            padding: 8,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'start',
          }}
        >
          <div style={{}}>
            <Heading level={6}>Популярные программы</Heading>
          </div>
          <Chevron />
        </div>
        <Notice
          description={
            'При оформлении можно указать до 3-х аллергенов, они будут исключены в процессе приготовления вашего питания, для любой программы'
          }
        />
        <Grid $gap={12}>
          {mockPrograms.map((f, i) => (
            <ProgramPopularCard
              onClick={() => {
                navigate(`/programs-nutrition/${f}`)
              }}
              key={i}
              {...f}
            />
          ))}
        </Grid>
        <Button
          onClick={() => {
            navigate('/programs-nutrition')
          }}
        >
          Смотреть все программы
        </Button>
      </Grid>
    </CardWrapper>
  )
}
