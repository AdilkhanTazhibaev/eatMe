import Shopping from '@/assets/icons/_shopping-bag-02.svg?react'
import Arrow from '@/assets/icons/arrow.svg?react'
import { CardWrapper } from '@/components/snippets'
import { useHeader } from '@/layouts/DefaultLayout.tsx'
import { mockPrograms } from '@/mocks.ts'
import { ProgramItem } from '@/modules/programs/components/ProgramItem.tsx'
import { TopBar } from '@ui/Topbar'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

interface Props {}

export function ProgramsNutrition() {
  const { setHeader } = useHeader()
  const navigate = useNavigate()

  useEffect(() => {
    setHeader(
      <TopBar
        left={
          <Arrow
            onClick={() => {
              navigate('/')
            }}
          />
        }
        right={<Shopping />}
        title={'Программы питания'}
      />,
    )
    return () => setHeader(null)
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
