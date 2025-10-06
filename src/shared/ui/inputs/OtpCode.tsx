import { raw } from '@theme/tokens.ts'
import Text from '@ui/typography/Text.tsx'
import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

type Props = {
  length?: number // кол-во символов (по макету 4)
  value?: string // контролируемое значение (опц.)
  defaultValue?: string // неконтролируемое начальное
  onChange?: (v: string) => void // отдаём только цифры
  onComplete?: (v: string) => void
  autoFocus?: boolean

  // таймер
  resendSeconds?: number // стартовое значение таймера
  onResend?: () => void // вызывается по клику «Получить повторно»
  textColor?: string // цвет подписи (по макету серый)
}

export default function OtpCode({
  length = 4,
  value,
  defaultValue = '',
  onChange,
  onComplete,
  autoFocus,
  resendSeconds = 60,
  onResend,
  textColor = 'rgba(255,255,255,0.6)',
}: Props) {
  const [inner, setInner] = useState(() => onlyDigits(value ?? defaultValue).slice(0, length))
  const controlled = typeof value === 'string'
  const code = controlled ? onlyDigits(value!).slice(0, length) : inner

  const [left, setLeft] = useState(resendSeconds)
  const inputRef = useRef<HTMLInputElement>(null)

  // таймер
  useEffect(() => setLeft(resendSeconds), [resendSeconds])
  useEffect(() => {
    if (left <= 0) return
    const t = setInterval(() => setLeft((s) => (s > 0 ? s - 1 : 0)), 1000)
    return () => clearInterval(t)
  }, [left])

  // автофокус
  useEffect(() => {
    if (autoFocus) inputRef.current?.focus()
  }, [autoFocus])

  // завершение
  useEffect(() => {
    if (code.length === length) onComplete?.(code)
  }, [code, length, onComplete])

  const setCode = (next: string) => {
    const clean = onlyDigits(next).slice(0, length)
    if (!controlled) setInner(clean)
    onChange?.(clean)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setCode(e.target.value)

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && code.length > 0) {
      e.preventDefault()
      setCode(code.slice(0, -1))
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const text = e.clipboardData.getData('text')
    if (!text) return
    e.preventDefault()
    setCode(code + text)
  }

  const chars = code.split('')
  const canResend = left === 0

  return (
    <Wrap>
      <Dots onClick={() => inputRef.current?.focus()}>
        {Array.from({ length }).map((_, i) =>
          value ? <Digit key={i}>{chars[i] ?? ''}</Digit> : <Dot key={i} $filled={!!chars[i]} />,
        )}
      </Dots>

      <HiddenInput
        ref={inputRef}
        inputMode="numeric"
        autoComplete="one-time-code"
        value={code}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
      />

      <TimerRow style={{ color: textColor }}>
        {canResend ? (
          <ResendButton type="button" onClick={onResend}>
            <Text size={14} weight="regular" color={raw.colors.neutral['700']}>
              Получить повторно
            </Text>
          </ResendButton>
        ) : (
          <Text size={14} weight="regular" color={raw.colors.neutral['700']}>
            Получить повторно через {formatTimer(left)}
          </Text>
        )}
      </TimerRow>
    </Wrap>
  )
}

/* utils */
const onlyDigits = (s: string) => s.replace(/\D/g, '')
const formatTimer = (sec: number) =>
  `${String(Math.floor(sec / 60)).padStart(2, '0')}:${String(sec % 60).padStart(2, '0')}`

/* styled */
const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`

const Dots = styled.div`
  display: flex;
  gap: 24px;
  align-items: center;
  justify-content: center;
  min-height: 48px;
`

const Dot = styled.span<{ $filled?: boolean }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${({ $filled }) => ($filled ? '#1D1D1E' : '#C4C4C4')};
`

const Digit = styled.span`
  font-size: 32px;
  font-weight: 700;
  color: #1d1d1e;
  min-width: 20px;
  text-align: center;
  font-family:
    'Roboto Flex',
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    Arial,
    sans-serif;
`

const HiddenInput = styled.input`
  position: absolute;
  opacity: 0;
  pointer-events: none;
  width: 1px;
  height: 1px;
`

const TimerRow = styled.div`
  font-size: 14px;
  line-height: 20px;
  font-weight: 600;
`

const ResendButton = styled.button`
  background: transparent;
  border: none;
  color: inherit;
  font: inherit;
  font-weight: 700;
  text-decoration: underline;
  cursor: pointer;
  padding: 0;
`
