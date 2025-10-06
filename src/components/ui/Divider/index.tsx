import type { ReactNode } from 'react'
import styled from 'styled-components'

type Props = {
  children?: ReactNode
  orientation?: 'horizontal' | 'vertical'
  dashed?: boolean
  color?: string
}

export default function Divider({
  children,
  orientation = 'horizontal',
  dashed = false,
  color = 'rgba(0,0,0,0.1)',
}: Props) {
  if (orientation === 'vertical') {
    return <Vertical $dashed={dashed} $color={color} role="separator" />
  }

  return (
    <Wrap role="separator">
      <Line $dashed={dashed} $color={color} />
      {children && <Text>{children}</Text>}
      {children && <Line $dashed={dashed} $color={color} />}
    </Wrap>
  )
}

const Wrap = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 8px;
`

const Line = styled.span<{ $dashed: boolean; $color: string }>`
  flex: 1;
  border-top: ${({ $dashed }) => ($dashed ? '1px dashed' : '1px solid')};
  border-color: ${({ $color }) => $color};
`

const Text = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #6b7280;
  white-space: nowrap;
`

const Vertical = styled.span<{ $dashed: boolean; $color: string }>`
  display: inline-block;
  align-self: stretch;
  width: 1px;
  background-image: ${({ $dashed, $color }) =>
    $dashed
      ? `repeating-linear-gradient(to bottom, ${$color}, ${$color} 4px, transparent 4px, transparent 8px)`
      : 'none'};
  background-color: ${({ $dashed, $color }) => ($dashed ? 'transparent' : $color)};
`
