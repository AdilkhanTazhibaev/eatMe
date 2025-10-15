import Shopping from '@/assets/icons/_shopping-bag-02.svg?react'
import Arrow from '@/assets/icons/arrow.svg?react'
import { CardWrapper } from '@/components/snippets'
import { mockPrograms } from '@/mocks.ts'
import { ProgramItem } from '@/modules/programs/components/ProgramItem.tsx'
import { useScreenLayout } from '@/shared/hooks/useScreenLayout.tsx'
import { BaseTopBar } from '@/shared/topbar/Base.tsx'
import { useNavigate } from 'react-router-dom'

export function ProgramsNutrition() {
  const navigate = useNavigate()

  useScreenLayout({
    header: (
      <BaseTopBar
        rounded={true}
        size={48}
        title={'Программы питания'}
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
      {mockPrograms.map((f, i) => (
        <CardWrapper style={{ marginBottom: 16 }} key={i} $color={0}>
          <ProgramItem {...f} />
        </CardWrapper>
      ))}
    </>
  )
}
