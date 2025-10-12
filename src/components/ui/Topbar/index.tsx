import { IconWrap } from '@/components/snippets' // поправь путь
import BadgeIcon from '@ui/BadgeIcon'
import React from 'react'
import styled, { css } from 'styled-components'
import { Text } from '../typography/Text'

type BadgeVariant = 'default' | 'danger' | 'success' | 'warning' | 'info'

export type TopBarProps = {
  title?: React.ReactNode
  caption?: React.ReactNode
  center?: React.ReactNode
  left?: React.ReactNode
  right?: React.ReactNode
  statusBar?: boolean
  rounded?: boolean
  className?: string
  badgeVariant?: BadgeVariant
  badgeCount?: number | null
}

export function TopBar({
  title,
  caption,
  center,
  left,
  right,
  badgeCount = null,
  statusBar = false,
  badgeVariant,
  rounded = false,
  className,
}: TopBarProps) {
  return (
    <Wrap className={className} $rounded={rounded} data-statusbar={statusBar || undefined}>
      {statusBar && <StatusBar />}
      <Toolbar>
        <Side>
          <IconWrap $color={50}>{left}</IconWrap>
        </Side>

        <Center>
          {center ? (
            center
          ) : (
            <CenterText>
              {title && (
                <Text size={16} weight="medium" as="div">
                  {title}
                </Text>
              )}
              {caption && (
                <Text size={14} weight="regular" color="#737376" as="div">
                  {caption}
                </Text>
              )}
            </CenterText>
          )}
        </Center>
        {badgeCount ? (
          <BadgeIcon
            variant={badgeVariant}
            count={badgeCount}
            icon={
              right && (
                <Side right>
                  <IconWrap $color={50}>{right}</IconWrap>
                </Side>
              )
            }
          ></BadgeIcon>
        ) : (
          right && (
            <Side right>
              <IconWrap $color={50}>{right}</IconWrap>
            </Side>
          )
        )}
      </Toolbar>
    </Wrap>
  )
}

export type IconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /** по макету 32×32 */
  square?: boolean
}

export const IconButton = styled.button<IconButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  min-width: 32px;
  width: ${({ square }) => (square ? 32 : 32)}px;
  height: 32px;
  border: 0;
  background: #f5f5fa;
  border-radius: 8px;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: default;
  }
`

const Wrap = styled.header<{ $rounded: boolean }>`
  background: #fff;
  padding: 16px;
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;

  ${({ $rounded }) =>
    $rounded &&
    css`
      border-radius: 0 0 20px 20px;
    `}
  &[data-statusbar] {
    min-height: 85px;
  }
`

const Toolbar = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 44px 1fr 44px; /* 12px отступ + 32px кнопка */
  align-items: center;
  min-height: 48px;
`

const Side = styled.div<{ right?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: ${({ right }) => (right ? 'flex-end' : 'flex-start')};
  height: 48px;
`

const Center = styled.div`
  min-width: 0; /* чтобы работали ellipsis */
  display: flex;
  align-items: center;
  justify-content: center;
  height: 48px;
`

const CenterText = styled.div`
  max-width: 328px; /* ограничение из макета */
  width: 100%;
  text-align: center;
  display: grid;
  grid-auto-rows: min-content;
  align-content: center;
  gap: 0;

  > :first-child {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`

const StatusBarRoot = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 37px;
  padding: 8px 16px;
`

function StatusBar() {
  return (
    <StatusBarRoot aria-hidden>
      <Text size={14} weight="medium" as="div">
        9:41
      </Text>
      <div style={{ width: 58, height: 18, background: '#1D1D1E', borderRadius: 4 }} />
    </StatusBarRoot>
  )
}
