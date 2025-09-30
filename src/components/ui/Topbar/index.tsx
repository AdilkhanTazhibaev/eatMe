// components/topbar/TopBar.tsx
import React from 'react'
import styled, { css } from 'styled-components'
import { Text } from '../typography/Text' // поправь путь

// ── API ─────────────────────────────────────────────────────────────────────────
export type TopBarProps = {
  /** Заголовок по центру (одна строка) */
  title?: React.ReactNode
  /** Подзаголовок/капшен под заголовком */
  caption?: React.ReactNode
  /** Кастомный центр (например, поисковая строка). Если задан — title/caption игнорятся */
  center?: React.ReactNode
  /** Левая кнопка (иконка/кнопка) */
  left?: React.ReactNode
  /** Правая кнопка (иконка/кнопка) */
  right?: React.ReactNode
  /** Показать имитатор статус-бара как в макете (для демо/превью) */
  statusBar?: boolean
  /** Скругление низа контейнера (0 0 20px 20px) */
  rounded?: boolean
  className?: string
}

export function TopBar({
  title,
  caption,
  center,
  left,
  right,
  statusBar = false,
  rounded = false,
  className,
}: TopBarProps) {
  return (
    <Wrap className={className} $rounded={rounded} data-statusbar={statusBar || undefined}>
      {statusBar && <StatusBar />}
      <Toolbar>
        <Side>{left}</Side>

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

        <Side right>{right}</Side>
      </Toolbar>
    </Wrap>
  )
}

// ── Вспомогательные UI части (иконк. кнопки) ───────────────────────────────────
// Используй где удобно; либо передавай свои готовые кнопки в props.

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

// ── Styles ─────────────────────────────────────────────────────────────────────

const Wrap = styled.header<{ $rounded: boolean }>`
  background: #fff;

  ${({ $rounded }) =>
    $rounded &&
    css`
      border-radius: 0 0 20px 20px;
    `}
  /* высота = 37 (status) + 48 (toolbar), если статусбар включён */
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
  padding: 0 12px; /* как в макете */
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

// Фэйковый статусбар для превью экранов (как в макете)
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
