import { CardWrapper } from '@/components/snippets'
import { raw } from '@theme/tokens.ts'
import Text from '@ui/typography/Text.tsx'
import styled from 'styled-components'

interface Props {
  title: string
  description: string
  timeRange?: string
  img?: string
  color: number
}

export function MealsCard({ color = 50, ...props }: Props) {
  return (
    <>
      <CardWrapper $color={color} $padding={8}>
        <div style={{ display: 'grid', gap: 5, gridTemplateColumns: '1fr 4fr' }}>
          <ImageWrapper />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Text size={10} weight={'medium'} color={raw.colors.neutral['600']}>
              {props.title}
            </Text>
            <Text size={12} weight={'medium'} color={raw.colors.neutral['900']}>
              {props.title}
            </Text>
            <Text size={12} weight={'regular'} color={raw.colors.neutral['600']}>
              {props.description}
            </Text>
          </div>
        </div>
      </CardWrapper>
    </>
  )
}

const ImageWrapper = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 16px;
  background: antiquewhite;
  opacity: 1;
  top: 8px;
  left: 8px;
`
