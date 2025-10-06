// components/InfoField.tsx
import { raw } from '@theme/tokens.ts'
import React from 'react'
import styled from 'styled-components'
import { Heading } from '../typography/Heading'
import { Text } from '../typography/Text'

type Size = '16' | 'h6' | 'h5' | 'h2'

export type InfoFieldProps = {
  label?: React.ReactNode
  value: number | string | React.ReactNode
  size?: Size
  suffix?: React.ReactNode
  smallSuffix?: boolean
  caption?: React.ReactNode
  surface?: boolean
  labelColor?: string
  valueColor?: string
  suffixColor?: string
  className?: string
}

export function InfoField({
  label,
  value,
  size = '16',
  suffix,
  smallSuffix,
  caption,
  surface,
  labelColor = raw.colors.neutral['800'],
  valueColor = '#1D1D1E',
  suffixColor = raw.colors.neutral['900'],
  className,
}: InfoFieldProps) {
  return (
    <Outer className={className} data-surface={surface ? '' : undefined}>
      {label && (
        <Text size={14} weight="regular" color={labelColor} as="div">
          {label}
        </Text>
      )}

      <Row>
        {suffix !== undefined && (
          <Suffix $color={suffixColor}>
            <Heading level={6}>{suffix}</Heading>
          </Suffix>
        )}
      </Row>

      {caption && (
        <Text size={12} weight="regular" color="#1D1D1E" as="div">
          {caption}
        </Text>
      )}
    </Outer>
  )
}

/* ------------- helpers ------------- */

function renderValue(node: React.ReactNode, size: Size) {
  if (typeof node === 'number') node = formatNumber(node)

  if (size === '16') {
    return (
      <Text size={16} weight="regular">
        {node}
      </Text>
    )
  }
  if (size === 'h6') {
    return <Heading level={6}>{node}</Heading>
  }
  if (size === 'h5') {
    return <Heading level={5}>{node}</Heading>
  }
  return <Heading level={2}>{node}</Heading> // h2
}

export const formatNumber = (n: number) =>
  new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 0 }).format(n)

const Outer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0;

  &[data-surface] {
    background: #f5f5fa;
    border-radius: 20px;
    padding: 12px 16px;
  }
`

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  min-height: 24px;
`

const Value = styled.div<{ $color: string }>`
  color: ${({ $color }) => $color};
`

const Suffix = styled.div<{ $color: string }>`
  color: ${({ $color }) => $color};
`

/* -------- список -------- */

export type InfoFieldListProps = {
  children: React.ReactNode
  gap?: number
  padding?: string
  className?: string
}

export const InfoFieldList = ({ children, gap = 4, padding, className }: InfoFieldListProps) => (
  <List className={className} style={{ gap, padding }}>
    {children}
  </List>
)

const List = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`
