import React from 'react'
import styled from 'styled-components'
import { Heading } from '../typography/Heading.tsx'
import { Text } from '../typography/Text.tsx'

export type TitleLevel = 'h4' | 'h6' | 'text16' | 'subtitle'

export type TitleSubtitleProps = {
  title: React.ReactNode
  caption?: React.ReactNode
  chevron?: boolean
  dense?: boolean
  as?: React.ElementType
  onClick?: () => void
  disabled?: boolean
  reverse?: boolean
  level?: TitleLevel
  rowGap?: number
}

const Wrapper = styled.div<{ $reverse: boolean; $gap: number }>`
  display: flex;
  flex-direction: ${({ $reverse }) => ($reverse ? `column-reverse` : 'column')};
  align-items: flex-start;
  gap: ${({ $gap }) => `${$gap}px`};
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
  width: 100%;
  min-height: 24px;
`

const ChevronBox = styled.div<{ $size: 20 | 24; $color?: string }>`
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  min-height: ${({ $size }) => $size}px;
  max-height: ${({ $size }) => $size}px;
  display: grid;
  place-items: center;
  border-radius: 4px;
  color: ${({ $color, theme }) => $color ?? theme.semantic.brand.primary};
`

const ChevronIcon: React.FC<{ size?: number }> = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
    <path
      d="M9 18l6-6-6-6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export function TitleSubtitle({
  title,
  caption,
  chevron,
  onClick,
  disabled,
  rowGap = 4,
  reverse = false,
  level = 'h4',
}: TitleSubtitleProps) {
  const captionColor = '#565658' // neutral.700 → можешь заменить на theme.semantic.text.secondary/tertiary

  return (
    <Wrapper
      $gap={rowGap}
      $reverse={reverse}
      onClick={disabled ? undefined : onClick}
      aria-disabled={disabled}
    >
      <Row>
        {level === 'subtitle' ? (
          <Text size={14} weight="medium">
            {title}
          </Text>
        ) : level === 'text16' ? (
          <Text size={16} weight="medium">
            {title}
          </Text>
        ) : level === 'h6' ? (
          <Heading level={6}>{title}</Heading>
        ) : (
          <Heading level={4}>{title}</Heading>
        )}

        {chevron && (
          <ChevronBox $size={level === 'h6' ? 24 : 20}>
            <ChevronIcon size={level === 'h6' ? 24 : 20} />
          </ChevronBox>
        )}
      </Row>

      {caption && (
        <Text size={14} weight="regular" color={captionColor}>
          {caption}
        </Text>
      )}
    </Wrapper>
  )
}

export default TitleSubtitle
