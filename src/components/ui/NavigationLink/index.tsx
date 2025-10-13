import React from 'react'
import styled, { css } from 'styled-components'
import TitleSubtitle, { type TitleLevel } from '../TitleSubtitle'

export interface NavigationLinkProps {
  title: string
  caption?: string
  icon?: React.ReactNode
  action?: React.ReactNode
  actionBg?: number
  actionPadding?: number
  level?: TitleLevel
  variant?: 'default' | 'card' | 'simple' | 'wrapper'
  withDivider?: boolean
  onClick?: () => void
}

const Wrapper = styled.div<{
  $variant: 'default' | 'card' | 'simple' | 'wrapper'
  $clickable: boolean
  $withDivider: boolean
}>`
  display: flex;
  gap: 12px;
  align-items: center;
  padding-bottom: 16px;
  padding-top: 16px;
  ${({ $variant, theme }) => {
    switch ($variant) {
      case 'card':
        return css`
          background: ${theme.raw.colors.neutral[50]};
          border-radius: 16px;
          padding-left: 16px;
          padding-right: 16px;
          align-items: start;
        `
      case 'simple':
        return css`
          padding: 0;
          align-items: start;
        `
      case 'wrapper':
        return css`
          background: ${theme.raw.colors.neutral[50]};
          border-radius: 16px;
          padding-left: 16px;
          padding-right: 16px;
        `
      default:
        return css`` // дефолтное состояние
    }
  }}
  ${({ $clickable }) =>
    $clickable &&
    css`
      cursor: pointer;
      transition: background 0.2s ease;

      &:hover {
        background: rgba(0, 0, 0, 0.04);
      }
    `}
  ${({ $withDivider, theme }) =>
    $withDivider &&
    css`
      border-bottom: 1px solid ${theme.raw.colors.neutral[200]};
    `}
`

const Caption = styled.div`
  flex: 1;
`

const WrapperAction = styled.div<{
  $bg: number
  $actionPadding: number
  $variant: 'default' | 'card' | 'simple' | 'wrapper'
}>`
  padding: ${({ $actionPadding }) => $actionPadding}px;
  border-radius: 16px;
  display: flex;
  ${({ theme, $bg, $variant }) => {
    switch ($variant) {
      case 'wrapper':
        return css`
          background: ${theme.raw.colors.neutral[0]};
          border-radius: 16px;
        `
      default:
        return css`
          background: ${theme.raw.colors.neutral[$bg]};
        `
    }
  }}
`

function NavigationLink({
  title,
  caption,
  icon,
  action,
  level = 'h6',
  actionBg = 50,
  actionPadding = 12,
  variant = 'default',
  withDivider = false,
  onClick,
}: NavigationLinkProps) {
  return (
    <Wrapper $variant={variant} $clickable={!!onClick} $withDivider={withDivider} onClick={onClick}>
      {icon}
      <Caption>
        <TitleSubtitle level={level} title={title} caption={caption} />
      </Caption>
      {action && (
        <WrapperAction $variant={variant} $bg={actionBg} $actionPadding={actionPadding}>
          {action}
        </WrapperAction>
      )}
    </Wrapper>
  )
}

export default NavigationLink
