import Text from '@ui/typography/Text.tsx'
import React, { useId } from 'react'
import styled, { css } from 'styled-components'

const t = (theme?: any) => {
  const r = theme?.raw
  const c = r?.colors ?? {}
  return {
    brand: c.brand?.[500] ?? '#00AB75',
    brandSoft: c.brand?.[50] ?? '#D2EEE5',
    neutral0: c.neutral?.[0] ?? '#FFFFFF',
    neutral50: c.neutral?.[50] ?? '#F5F5FA',
    neutral100: c.neutral?.[100] ?? '#E7E7EB',
    neutral200: c.neutral?.[200] ?? '#D8D8DD',
    neutral400: c.neutral?.[400] ?? '#ADADB0',
    neutral700: c.neutral?.[700] ?? '#565658',
    neutral900: c.neutral?.[900] ?? '#1D1D1E',
    radius12: r?.radii?.md ?? 12,
    radius24: r?.radii?.xl ?? 24,
    gap16: r?.spacing?.[4] ?? 16,
    pad16: r?.spacing?.[4] ?? 16,
    pad8: r?.spacing?.[2] ?? 8,
  }
}

const RadioBox = styled.span<{
  $checked: boolean
  $disabled?: boolean
}>`
  position: relative;
  width: 24px;
  height: 24px;
  border-radius: 999px;
  display: inline-grid;
  place-items: center;
  background: ${({ theme, $checked }) => ($checked ? t(theme).brand : t(theme).neutral100)};
  transition:
    background-color 0.15s ease,
    box-shadow 0.15s ease,
    transform 0.05s ease;

  &::after {
    content: '';
    width: 10px;
    height: 10px;
    border-radius: 100%;
    background: ${({ theme, $checked }) => ($checked ? t(theme).neutral0 : t(theme).neutral100)};
    transition:
      background-color 0.15s ease,
      transform 0.15s ease;
    transform: ${({ $checked }) => ($checked ? 'scale(1)' : 'scale(.66)')};
  }

  ${({ $disabled, theme }) =>
    $disabled &&
    css`
      background: ${t(theme).neutral100};

      &::after {
        background: ${t(theme).neutral200};
      }

      opacity: 0.7;
    `}
`

const HiddenInput = styled.input.attrs({ type: 'radio' })`
  position: absolute;
  inset: 0;
  opacity: 0;
  margin: 0;
  cursor: pointer;
`

type Size = 64 | 80

const Cell = styled.label<{
  $size: Size
  $withWrapper?: boolean
  $disabled?: boolean
}>`
  position: relative;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => t(theme).gap16}px;
  min-height: 56px;
  height: ${({ $size }) => $size}px;
  border-radius: ${({ theme, $withWrapper }) => ($withWrapper ? t(theme).radius24 : 0)}px;
  background: ${({ theme, $withWrapper }) => ($withWrapper ? t(theme).neutral50 : 'transparent')};
  cursor: pointer;
  user-select: none;

  &:has(${HiddenInput}:focus-visible) {
    outline: 2px solid ${({ theme }) => t(theme).brand};
    outline-offset: 2px;
  }

  ${({ $disabled }) =>
    $disabled &&
    css`
      cursor: not-allowed;
    `}

  ${({ $withWrapper }) =>
    $withWrapper &&
    css`
      padding-left: 12px;
      padding-right: 12px;
    `}
`

const Controls = styled.div`
  width: 24px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Addon = styled.div`
  width: 40px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;

  & > .avatar {
    width: 40px;
    height: 40px;
    border-radius: 20px;
    display: grid;
    place-items: center;
    background: ${({ theme }) => t(theme).neutral100};
    border: 1px solid ${({ theme }) => t(theme).neutral100};
  }
`

const TitleWrap = styled.div<{ $size: Size }>`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  padding: ${({ theme }) => t(theme).pad8}px 0;
  min-width: 0;
`

const Row = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 4px;
  min-width: 0;
`
const Trailing = styled.div`
  width: 24px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
`

export interface RadioOption<T extends string | number = string> {
  value: T
  title: React.ReactNode
  description?: React.ReactNode
  addon?: React.ReactNode
  trailing?: React.ReactNode
  disabled?: boolean
}

export interface RadioItemProps<T extends string | number = string> extends RadioOption<T> {
  name: string
  checked: boolean
  onChange: (value: T) => void
  size?: Size
  withWrapper?: boolean
  controlPosition?: 'left' | 'right'
}

export function RadioItem({
  name,
  value,
  title,
  description,
  addon,
  trailing,
  checked,
  onChange,
  size = 64,
  withWrapper,
  disabled,
  controlPosition = 'left',
}: RadioItemProps) {
  const id = useId()
  return (
    <Cell htmlFor={id} $size={size} $withWrapper={withWrapper} $disabled={disabled}>
      {controlPosition === 'left' && (
        <Controls>
          <RadioBox $checked={checked} $disabled={disabled} />
        </Controls>
      )}

      {addon && <Addon>{addon}</Addon>}

      <TitleWrap $size={size}>
        <Row>
          <Text size={16} weight="medium" as="div" color="inherit">
            {title}
          </Text>
        </Row>
        {description && (
          <Row>
            <Text size={14} weight="regular" as="div" color="#565658">
              {description}
            </Text>
          </Row>
        )}
      </TitleWrap>

      {trailing && <Trailing>{trailing}</Trailing>}
      {controlPosition === 'right' && (
        <Controls>
          <RadioBox $checked={checked} $disabled={disabled} />
        </Controls>
      )}
      <HiddenInput
        id={id}
        name={name}
        value={String(value)}
        checked={checked}
        disabled={disabled}
        onChange={() => !disabled && onChange(value)}
      />
    </Cell>
  )
}

export interface RadioGroupProps<T extends string | number = string> {
  name: string
  options: RadioOption<T>[]
  value: T | null
  onChange: (value: T) => void
  gap?: number
  size?: Size
  withWrapper?: boolean
  direction?: 'column' | 'row'
  controlPosition?: 'left' | 'right'
}

const Group = styled.div<{ $gap: number; $dir: 'column' | 'row' }>`
  display: flex;
  flex-direction: ${({ $dir }) => $dir};
  gap: ${({ $gap }) => $gap}px;
`

export function RadioGroup<T extends string | number = string>({
  name,
  options,
  value,
  onChange,
  gap = 12,
  size = 64,
  withWrapper = false,
  direction = 'column',
  controlPosition,
}: RadioGroupProps<T>) {
  return (
    <Group $gap={gap} $dir={direction}>
      {options.map((o, i) => (
        <RadioItem
          key={String(o.value) + i}
          name={name}
          value={o.value}
          title={o.title}
          description={o.description}
          addon={o.addon}
          trailing={o.trailing}
          disabled={o.disabled}
          checked={o.value === value}
          onChange={onChange}
          controlPosition={controlPosition}
          size={size}
          withWrapper={withWrapper}
        />
      ))}
    </Group>
  )
}
