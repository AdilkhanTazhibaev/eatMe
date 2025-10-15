import Text from '@ui/typography/Text'
import React, { useEffect, useId, useState } from 'react'
import styled, { css } from 'styled-components'

type Size = 20 | 24

export type CheckboxProps = {
  label?: React.ReactNode
  checked?: boolean // контролируемый режим
  defaultChecked?: boolean // неконтролируемый старт
  onChange?: (next: boolean) => void
  disabled?: boolean
  indeterminate?: boolean
  size?: Size
  className?: string
}

const t = (theme?: any) => {
  const r = theme?.raw
  const c = r?.colors ?? {}
  return {
    brand: c.brand?.[500] ?? '#00AB75',
    brandHover: c.brand?.[600] ?? '#009965',
    bg: c.neutral?.[0] ?? '#fff',
    stroke: c.neutral?.[300] ?? '#D8D8DD',
    text: c.neutral?.[900] ?? '#1D1D1E',
    textMuted: c.neutral?.[700] ?? '#565658',
    focus: c.brand?.[400] ?? '#33C09A',
    disabled: c.neutral?.[200] ?? '#E7E7EB',
  }
}

export default function Checkbox({
  label,
  checked,
  defaultChecked,
  onChange,
  disabled,
  indeterminate,
  size = 24,
  className,
}: CheckboxProps) {
  const id = useId()
  const [inner, setInner] = useState(!!defaultChecked)
  const isControlled = typeof checked === 'boolean'
  const value = isControlled ? !!checked : inner

  useEffect(() => {}, [indeterminate])

  const toggle = () => {
    if (disabled) return
    const next = !value
    if (!isControlled) setInner(next)
    onChange?.(next)
  }

  return (
    <Root className={className} onClick={toggle} $disabled={!!disabled}>
      <Box
        aria-hidden
        $size={size}
        $checked={value}
        $disabled={!!disabled}
        $indeterminate={!!indeterminate && !value}
      >
        <CheckIcon viewBox="0 0 24 24" $visible={value && !indeterminate}>
          <path
            d="M5 12.5l4 4 10-10"
            stroke="white"
            strokeWidth="2.4"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </CheckIcon>
        <MinusIcon viewBox="0 0 24 24" $visible={!!indeterminate && !value}>
          <rect x="5" y="11" width="14" height="2.4" rx="1.2" fill="white" />
        </MinusIcon>
      </Box>

      {label && (
        <Label htmlFor={id}>
          <Text as="span" size={16} weight="medium" color={t().text}>
            {label}
          </Text>
        </Label>
      )}

      <HiddenInput
        id={id}
        type="checkbox"
        checked={value}
        onChange={(e) => (isControlled ? onChange?.(e.target.checked) : setInner(e.target.checked))}
        disabled={disabled}
      />
    </Root>
  )
}

const Root = styled.label<{ $disabled: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  user-select: none;
`

const Box = styled.span<{
  $size: Size
  $checked: boolean
  $disabled: boolean
  $indeterminate: boolean
}>`
  position: relative;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  border-radius: 6px;
  display: inline-grid;
  place-items: center;
  box-sizing: border-box;
  transition:
    background-color 0.15s ease,
    border-color 0.15s ease,
    box-shadow 0.15s ease,
    transform 0.05s ease;

  ${({ theme, $checked }) =>
    $checked
      ? css`
          background: ${t(theme).brand};
          border: 1px solid ${t(theme).brand};
        `
      : css`
          background: ${t(theme).bg};
          border: 1px solid ${t(theme).stroke};
        `}
  ${({ theme, $indeterminate }) =>
    $indeterminate &&
    css`
      background: ${t(theme).brand};
      border-color: ${t(theme).brand};
    `}
  ${Root}:not([aria-disabled='true']) &:hover {
    ${({ theme }) => css`
      border-color: ${t(theme).brandHover};
    `}
  }

  ${({ $disabled, theme }) =>
    $disabled &&
    css`
      background: ${t(theme).disabled};
      border-color: ${t(theme).disabled};
      opacity: 0.7;
    `}
  /* focus по реальному инпуту */
  ${Root}:has(input:focus-visible) & {
    box-shadow: 0 0 0 3px ${({ theme }) => t(theme).focus}33;
  }
`

const HiddenInput = styled.input`
  position: absolute;
  opacity: 0;
  inset: 0;
  margin: 0;
  pointer-events: none;
`

const Label = styled.span`
  line-height: 1;
`

const CheckIcon = styled.svg<{ $visible: boolean }>`
  width: 18px;
  height: 23px;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition: opacity 0.12s ease;
`
const MinusIcon = styled.svg<{ $visible: boolean }>`
  width: 18px;
  height: 18px;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition: opacity 0.12s ease;
`
