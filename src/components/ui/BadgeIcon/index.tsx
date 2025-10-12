import Text from '@ui/typography/Text.tsx'
import { ReactNode } from 'react'
import styled, { css } from 'styled-components'

type Variant = 'default' | 'danger' | 'success' | 'warning' | 'info'

type Props = {
  icon: ReactNode
  count?: number
  max?: number
  variant?: Variant
}

export default function BadgeIcon({ icon, count, max = 99, variant = 'default' }: Props) {
  const display = typeof count === 'number' && count > max ? `${max}+` : count

  return (
    <Wrap>
      {icon}
      {count !== undefined && count > 0 && (
        <Badge $variant={variant}>
          <Text size={10} weight={'medium'}>
            {display}
          </Text>
        </Badge>
      )}
    </Wrap>
  )
}

/* styled */

const Wrap = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  width: 48px;
  height: 48px;
  border-radius: 16px;
  background: #f3f4f6;
`

const Badge = styled.span<{ $variant: Variant }>`
  position: absolute;
  top: -5px;
  right: -5px;

  min-width: 18px;
  height: 18px;
  padding: 0 5px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 999px;
  color: #fff;
  font-size: 12px;
  font-weight: 600;
  line-height: 1;

  ${({ $variant }) =>
    $variant === 'danger' &&
    css`
      background: #ef4444; /* красный */
    `}
  ${({ $variant }) =>
    $variant === 'success' &&
    css`
      background: #10b981; /* зелёный */
    `}
  ${({ $variant }) =>
    $variant === 'warning' &&
    css`
      background: #f59e0b; /* жёлтый */
    `}
  ${({ $variant }) =>
    $variant === 'info' &&
    css`
      background: #3b82f6; /* синий */
    `}
  ${({ $variant }) =>
    $variant === 'default' &&
    css`
      background: #6b7280; /* серый */
    `}
`
