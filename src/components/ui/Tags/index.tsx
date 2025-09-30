// components/Tag.tsx
import React from 'react'
import styled, { css } from 'styled-components'
import Text from '../typography/Text.tsx'

type Tone = 'neutral' | 'success' | 'info' | 'danger'
type Size = 'md' | 'sm'

export interface TagProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  tone?: Tone
  size?: Size // md = 24px (по макету), sm = 20px
  leading?: React.ReactNode
  trailing?: React.ReactNode
  clickable?: boolean // курсор-рука/hover
}

const tokens = (theme?: any) => {
  const r = theme?.raw
  const c = r?.colors ?? {}
  return {
    // base
    white: c.neutral?.[0] ?? '#FFFFFF',
    textDark: c.neutral?.[800] ?? '#3A3A3B', // для neutral
    grayBg: c.neutral?.[100] ?? '#E7E7EB',

    // success / brand
    successBg: c.success?.[500] ?? c.brand?.[500] ?? '#00AB75',

    // info (в токенах нет — даём дефолт к #3B82F6)
    infoBg: c.info?.[500] ?? '#3B82F6',

    // danger
    dangerBg: c.error?.[500] ?? '#DC2626',

    // radii/spacing
    radiusPill: r?.radii?.full ?? 999,
    x2: r?.spacing?.[2] ?? 8,
    x1: r?.spacing?.[1] ?? 4,
  }
}

const S = styled.div<{
  $tone: Tone
  $size: Size
  $clickable?: boolean
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border-radius: ${({ theme }) => tokens(theme).radiusPill}px;
  padding: ${({ theme, $size }) =>
    $size === 'md' ? `${tokens(theme).x1 - 2}px ${tokens(theme).x1 * 2}px` : '0px 6px'};
  min-height: ${({ $size }) => ($size === 'md' ? 24 : 20)}px;
  max-height: ${({ $size }) => ($size === 'md' ? 24 : 20)}px;
  user-select: none;
  white-space: nowrap;

  ${({ $clickable }) =>
    $clickable &&
    css`
      cursor: pointer;
      transition:
        transform 0.02s ease,
        filter 0.15s ease,
        opacity 0.15s ease;

      &:active {
        transform: translateY(0.5px);
      }
    `}

  ${({ theme, $tone }) => {
    const t = tokens(theme)
    switch ($tone) {
      case 'neutral':
        return css`
          background: ${t.grayBg};
          color: ${t.textDark};
        `
      case 'success':
        return css`
          background: ${t.successBg};
          color: ${t.white};
        `
      case 'info':
        return css`
          background: ${t.infoBg};
          color: ${t.white};
        `
      case 'danger':
        return css`
          background: ${t.dangerBg};
          color: ${t.white};
        `
    }
  }}
`

const IconBox = styled.span<{ $size: Size }>`
  display: inline-grid;
  place-items: center;
  width: ${({ $size }) => ($size === 'md' ? 16 : 14)}px;
  height: ${({ $size }) => ($size === 'md' ? 16 : 14)}px;
  flex: 0 0 auto;
`

const TextWrap = styled.span`
  display: flex;
  align-items: center;
  padding: 0 4px;
  min-width: 0;

  & > * {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`

export const Tag: React.FC<TagProps> = ({
  children,
  tone = 'neutral',
  size = 'md',
  leading,
  trailing,
  clickable,
  ...rest
}) => (
  <S $tone={tone} $size={size} $clickable={clickable} {...rest}>
    {leading && (
      <IconBox $size={size} aria-hidden>
        {leading}
      </IconBox>
    )}
    <TextWrap>
      <Text size={14} weight="medium">
        {children}
      </Text>
    </TextWrap>
    {trailing && (
      <IconBox $size={size} aria-hidden>
        {trailing}
      </IconBox>
    )}
  </S>
)

export default Tag
