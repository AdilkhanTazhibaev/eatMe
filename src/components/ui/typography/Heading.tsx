import React from 'react'
import styled, { css } from 'styled-components'
import { type HeadingLevel, headingScale } from '../../../theme/typography.ts'

export type HeadingProps = {
  level?: HeadingLevel
  children: React.ReactNode
  color?: string
  as?: React.ElementType
  id?: string
}

const base = (level: HeadingLevel) => {
  const { size, line } = headingScale[level]
  return css`
    font-family:
      'Roboto Flex',
      system-ui,
      -apple-system,
      Segoe UI,
      Roboto,
      Arial,
      sans-serif;
    font-weight: 700;
    font-size: ${size}px;
    line-height: ${line}px;
    margin: 0;
  `
}
const H = styled.h1<{ $level: HeadingLevel; $color?: string }>`
  ${({ $level }) => base($level)}
  ${({ $color }) =>
    $color &&
    css`
      color: ${$color};
    `}
`

export function Heading({ level = 1, children, color, as }: HeadingProps) {
  const tag = as ?? (`h${level}` as const)
  return (
    <H as={tag} $level={level} $color={color}>
      {children}
    </H>
  )
}

export default Heading
