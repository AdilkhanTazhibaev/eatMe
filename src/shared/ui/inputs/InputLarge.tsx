import React, { useEffect, useMemo, useRef } from 'react'
import styled from 'styled-components'

type Country = { code: string; label: string }

type Props = {
  value: string // только цифры без кода (пример: "7700000000")
  onChange: (next: string) => void // вернем только цифры
  country?: Country // текущая страна, по умолчанию +7
  onCountryChange?: (c: Country) => void
  placeholder?: string // "0 000 00 00"
  disabled?: boolean
  autoFocus?: boolean
  className?: string
}

const DEFAULT_COUNTRY: Country = { code: '+7', label: 'KZ' }
const COUNTRIES: Country[] = [
  { code: '+7', label: 'KZ' },
  { code: '+998', label: 'UZ' },
  { code: '+996', label: 'KG' },
  { code: '+374', label: 'AM' },
]

const digitsOnly = (s: string) => s.replace(/\D/g, '')

function formatKZ(d: string) {
  // 10 цифр -> "700 000 00 00"
  const v = digitsOnly(d).slice(0, 10)
  const p1 = v.slice(0, 3)
  const p2 = v.slice(3, 6)
  const p3 = v.slice(6, 8)
  const p4 = v.slice(8, 10)
  return [p1, p2, p3, p4].filter(Boolean).join(' ')
}

export default function InputLarge({
  value,
  onChange,
  country = DEFAULT_COUNTRY,
  onCountryChange,
  placeholder = '0 000 00 00',
  disabled,
  autoFocus,
  className,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null)

  const displayValue = useMemo(() => {
    if (country.code === '+7') return formatKZ(value)
    const v = digitsOnly(value).slice(0, 12)
    const g = [v.slice(0, 3), v.slice(3, 6), v.slice(6, 8), v.slice(8, 10), v.slice(10, 12)].filter(
      Boolean,
    )
    return g.join(' ')
  }, [value, country.code])

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(digitsOnly(e.target.value))
  }

  const clear = () => {
    onChange('')
    inputRef.current?.focus()
  }

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus()
  }, [autoFocus])

  return (
    <Wrap className={className}>
      <CountryWrap>
        <CountryBtn type="button" disabled={disabled} aria-haspopup="listbox">
          <Chevron viewBox="0 0 24 24">
            <path
              d="M6 9l6 6 6-6"
              stroke="#161616"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Chevron>
          <CountryCode>{country.code}</CountryCode>
        </CountryBtn>
      </CountryWrap>

      <InputWrap>
        <Input
          ref={inputRef}
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          disabled={disabled}
          value={displayValue}
          onChange={handleInput}
          placeholder={placeholder}
          aria-label="Phone number"
        />
        {!!value && (
          <ClearBtn type="button" onClick={clear} aria-label="Очистить">
            <ClearIcon viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="12" />
              <path d="M15 9l-6 6M9 9l6 6" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
            </ClearIcon>
          </ClearBtn>
        )}
      </InputWrap>
    </Wrap>
  )
}

/* ===== styled ===== */

const Wrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`

const CountryWrap = styled.div`
  position: relative;
`

const CountryBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;

  background: #ffffff;
  border-radius: 16px;
  border-color: transparent;
  padding: 12px;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`

const Chevron = styled.svg`
  width: 24px;
  height: 24px;
  flex: none;
`

const CountryCode = styled.span`
  font-family:
    'Roboto Flex',
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    Arial,
    sans-serif;
  font-weight: 700;
  font-size: 18px;
  line-height: 24px;
  color: #1d1d1e;
`

const InputWrap = styled.div`
  position: relative;
  width: 100%;
`

const Input = styled.input`
  background: #ffffff;
  border-radius: 16px;
  border-color: transparent;
  padding: 12px;
  font-family:
    'Roboto Flex',
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    Arial,
    sans-serif;
  font-weight: 700;
  font-size: 18px;
  line-height: 24px;
  color: #1d1d1e;

  &::placeholder {
    color: #adadb0;
  }

  outline: none;
`

const ClearBtn = styled.button`
  position: absolute;
  top: 50%;
  right: 8px;
  transform: translateY(-50%);

  width: 24px;
  height: 24px;
  border-radius: 999px;

  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  cursor: pointer;

  &:hover {
    background: rgba(0, 0, 0, 0.06);
  }
`

const ClearIcon = styled.svg`
  width: 18px;
  height: 18px;

  & > circle {
    fill: #3a3a3b;
  }
`
