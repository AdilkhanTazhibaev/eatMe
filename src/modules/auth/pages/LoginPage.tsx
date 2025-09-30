import React from 'react'
import styled from 'styled-components'
import ArrowRight from '../../../assets/icons/arrow-right.svg?react'
import NavigationLink from '../../../components/ui/NavigationLink'
import Heading from '../../../components/ui/typography/Heading.tsx'
import { raw } from '../../../theme/tokens.ts'

type City = {
  id: string
  name: string
}

interface Props {
  items: City[]
  loading?: boolean
  onSelect: (city: City) => void
}

const WrapperHeader = styled.div`
  padding-right: 16px;
  padding-left: 16px;
`

const WrapperHeading = styled.div`
  padding-top: 16px;
  padding-bottom: 16px;
`

export const CityList: React.FC<Props> = ({ items, loading, onSelect }) => {
  if (loading) {
    return <p>Загрузка...</p>
  }
  return (
    <div>
      <WrapperHeader>
        <WrapperHeading>
          <Heading level={4}>Выберите ваш город</Heading>
        </WrapperHeading>
        <WrapperHeading>
          <Heading level={4}>Select your city</Heading>
        </WrapperHeading>
      </WrapperHeader>
      {items.map((city) => (
        <>
          <NavigationLink actionBg={0} level={'h6'} title={city.name} action={<ArrowRight />} />
          <hr style={{ background: raw.colors.neutral['100'] }} />
        </>
      ))}
    </div>
  )
}
