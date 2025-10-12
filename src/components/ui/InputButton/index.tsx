import Minus from '@/assets/icons/minus_outlined.svg?react'
import Plus from '@/assets/icons/plus_outlined.svg?react'
import { Grid } from '@/components/snippets'
import { raw } from '@theme/tokens.ts'
import Text from '@ui/typography/Text.tsx'
import styled from 'styled-components'

type Props = {
  label: string
  value: number
  onChange: (v: number) => void
  step?: number
  min?: number
  max?: number
  disabled?: boolean
  className?: string
  helpText?: string
}

export default function InputButton({
  label,
  value,
  onChange,
  step = 1,
  min = -Infinity,
  max = Infinity,
  disabled = false,
  className,
  helpText,
}: Props) {
  const dec = () => !disabled && onChange(Math.max(min, value - step))
  const inc = () => !disabled && onChange(Math.min(max, value + step))

  const canDec = !disabled && value - step >= min
  const canInc = !disabled && value + step <= max

  return (
    <Grid $gap={8}>
      <Wrap className={className} aria-disabled={disabled}>
        <LabelBlock>
          <Text weight={'medium'} size={14} color={raw.colors.neutral['700']}>
            {label}
          </Text>
          <Text size={16} weight={'regular'}>
            {value}
          </Text>
        </LabelBlock>

        <Btn onClick={dec} disabled={!canDec}>
          <Minus />
        </Btn>
        <Btn onClick={inc} disabled={!canInc}>
          <Plus />
        </Btn>
      </Wrap>
      {helpText && (
        <Text weight={'medium'} size={12} color={raw.colors.neutral['700']}>
          {helpText}
        </Text>
      )}
    </Grid>
  )
}

const Wrap = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  height: 48px;
  padding: 2px 6px 2px 16px;

  background: ${({ theme }) => theme.raw.colors.neutral['100']};
  border-radius: 16px;

  &[aria-disabled='true'] {
    opacity: 0.6;
    pointer-events: none;
  }
`

const LabelBlock = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  min-width: 0;
  height: 44px;
  justify-content: center;
`

const Btn = styled.button`
  width: 36px;
  height: 36px;
  min-height: 36px;
  max-height: 36px;

  display: grid;
  place-items: center;

  border: 0;
  border-radius: 8px;
  background: #fff;
  cursor: pointer;

  &:disabled {
    opacity: 0.4;
    cursor: default;
  }

  &:active:not(:disabled) {
    transform: translateY(1px);
  }
`
