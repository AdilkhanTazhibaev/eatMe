import { type ReactNode, useEffect } from 'react'
import styled, { css } from 'styled-components'

type Props = {
  open: boolean
  onClose?: () => void

  /** Направление анимации выезда */
  from?: 'left' | 'right' | 'bottom'

  /** Показывать полупрозрачный фон за экраном */
  backdrop?: boolean

  /** Закрывать по свайпу назад (только bottom) */
  swipeToClose?: boolean

  /** Блокировать прокрутку body, пока открыт */
  lockScroll?: boolean

  /** Слоты */
  header?: ReactNode // липкая шапка сверху
  footer?: ReactNode // липкий футер снизу
  children?: ReactNode

  className?: string
}

export default function Drawer({
  open,
  onClose,
  from = 'left',
  backdrop = true,
  swipeToClose = false,
  lockScroll = true,
  header,
  footer,
  children,
  className,
}: Props) {
  useEffect(() => {
    if (!open) return
    const h = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [open, onClose])

  useEffect(() => {
    if (!open || !lockScroll) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open, lockScroll])

  useEffect(() => {
    if (!open || !swipeToClose || from !== 'bottom') return

    let startY = 0,
      delta = 0,
      moving = false
    const onStart = (e: TouchEvent) => {
      moving = true
      startY = e.touches[0].clientY
    }
    const onMove = (e: TouchEvent) => {
      if (!moving) return
      delta = e.touches[0].clientY - startY
      if (delta > 0) e.preventDefault()
      panel.style.transform = `translateY(${Math.max(0, delta)}px)`
    }
    const onEnd = () => {
      moving = false
      if (delta > 80) onClose()
      panel.style.transform = ''
    }

    const panel = document.getElementById('__fpd')
    if (!panel) return
    panel.addEventListener('touchstart', onStart, { passive: false })
    panel.addEventListener('touchmove', onMove, { passive: false })
    panel.addEventListener('touchend', onEnd)
    panel.addEventListener('touchcancel', onEnd)
    return () => {
      panel.removeEventListener('touchstart', onStart)
      panel.removeEventListener('touchmove', onMove)
      panel.removeEventListener('touchend', onEnd)
      panel.removeEventListener('touchcancel', onEnd)
    }
  }, [open, swipeToClose, from, onClose])

  return (
    <>
      {backdrop && <Backdrop $open={open} onClick={onClose} />}

      <Page id="__fpd" className={className} $open={open} $from={from} role="dialog" aria-modal>
        {header && <Header>{header}</Header>}

        <Body>{children}</Body>

        {footer && (
          <Footer>
            {footer}
            <SafeBottom />
          </Footer>
        )}
      </Page>
    </>
  )
}

const Backdrop = styled.div<{ $open: boolean }>`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  pointer-events: ${({ $open }) => ($open ? 'auto' : 'none')};
  transition: opacity 0.22s ease;
  z-index: 1000;
`

/** Полноэкранная страница с анимацией выезда */
const Page = styled.div<{ $open: boolean; $from: 'left' | 'right' | 'bottom' }>`
  position: fixed;
  inset: 0;
  z-index: 1001;
  width: 100vw;
  height: 100dvh; /* корректно на iOS */
  background: #f3f4f6;
  display: flex;
  flex-direction: column;

  /* анимация выезда */
  transition: transform 0.26s ease;
  ${({ $from }) =>
    $from === 'left' &&
    css`
      transform: translateX(-100%);
    `}
  ${({ $from }) =>
    $from === 'right' &&
    css`
      transform: translateX(100%);
    `}
  ${({ $from }) =>
    $from === 'bottom' &&
    css`
      transform: translateY(100%);
    `}

  ${({ $open, $from }) =>
    $open &&
    css`
      transform: translate${$from === 'bottom' ? 'Y' : 'X'}(0);
    `}
`

export const Header = styled.header`
  position: sticky;
  top: 0;
  padding: 12px 16px;
  padding-top: calc(12px + env(safe-area-inset-top));
  background: #ffffff;
  border-bottom-left-radius: 24px;
  border-bottom-right-radius: 24px;
  z-index: 1;
`

export const Body = styled.div`
  flex: 1;
  overflow: auto;
`

export const Footer = styled.footer`
  position: sticky;
  bottom: 0;
  padding: 12px 16px;
  background: linear-gradient(180deg, rgba(243, 244, 246, 0) 0%, #f3f4f6 60%);
`

const SafeBottom = styled.div`
  height: env(safe-area-inset-bottom);
`
