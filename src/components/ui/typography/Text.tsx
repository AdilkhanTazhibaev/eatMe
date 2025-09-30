import React from 'react'
import styled, { css } from 'styled-components'
import { textScale, type TextSize } from '../../../theme/typography.ts'

export type TextProps<S extends TextSize = 16> = {
  size?: S
  weight?: keyof (typeof textScale)[S]
  children: React.ReactNode
  color?: string
  as?: React.ElementType
  atm20?: 'semibold' | 'medium'
}

const textCss = <S extends TextSize>(size: S, weight: keyof (typeof textScale)[S]) => {
  const spec = textScale[size][weight]
  return css`
    font-family:
      'Suisse Intl',
      system-ui,
      -apple-system,
      Segoe UI,
      Roboto,
      Arial,
      sans-serif;
    font-weight: ${spec.weight};
    font-size: ${spec.size}px;
    line-height: ${spec.line}px;
    margin: 0;
  `
}

const T = styled.span<{ $css: ReturnType<typeof css>; $color?: string }>`
  ${({ $css }) => $css}
  ${({ $color }) =>
    $color &&
    css`
      color: ${$color};
    `}
`

export function Text<S extends TextSize = 16>({
  size = 16 as S,
  weight = 'regular' as keyof (typeof textScale)[S],
  children,
  color,
  as,
  atm20,
}: TextProps<S>) {
  const _size = (atm20 ? 20 : size) as TextSize
  const _weight = (atm20 ? atm20 : weight) as keyof (typeof textScale)[typeof _size]
  const cssChunk = textCss(_size, _weight)
  const tag = as ?? 'span'
  return (
    <T as={tag} $css={cssChunk} $color={color}>
      {children}
    </T>
  )
}

export default Text
