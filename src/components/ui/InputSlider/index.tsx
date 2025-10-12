// src/components/inputs/InputSlider.tsx
import Text from '@ui/typography/Text'
import styled from 'styled-components'

type Mark = { value: number; label: string; align?: 'left' | 'center' | 'right' }

type Props = {
  label: string
  value: number | string
  onChange: (v: number) => void
  min?: number
  max?: number
  step?: number
  marks?: Mark[]
  formatValue?: (v: number) => string
  disabled?: boolean
  className?: string
}

export default function InputSlider({
  label,
  value,
  onChange,
  min = 1,
  max = 28,
  step = 1,
  marks = [
    { value: 1, label: '1 день', align: 'left' },
    { value: 14, label: '14 дней', align: 'center' },
    { value: 28, label: '28 дней', align: 'right' },
  ],
  formatValue = (v) => String(v),
  disabled,
  className,
}: Props) {
  const pct = ((value - min) / Math.max(1, max - min)) * 100

  return (
    <Wrap className={className} aria-disabled={!!disabled}>
      <Header>
        <LabelBlock>
          <Text size={14} weight="medium" color="#565658">
            {label}
          </Text>
          <Text size={16}>{formatValue(value)}</Text>
        </LabelBlock>
      </Header>

      <TrackArea>
        <BaseTrack />
        <ActiveTrack style={{ width: `${pct}%` }} />

        <Range
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          disabled={disabled}
          aria-label={label}
        />

        <Marks>
          {marks.map((m) => {
            const x = ((m.value - min) / Math.max(1, max - min)) * 100
            return (
              <MarkWrap key={m.value} style={{ left: `${x}%` }}>
                <Tick />
                <MarkLabel $align={m.align ?? 'center'}>
                  <Text size={14} weight="medium" color="#1D1D1E">
                    {m.label}
                  </Text>
                </MarkLabel>
              </MarkWrap>
            )
          })}
        </Marks>
      </TrackArea>
    </Wrap>
  )
}

/* ===== styled ===== */

const Wrap = styled.div`
  display: grid;
  width: 100%;

  &[aria-disabled='true'] {
    opacity: 0.6;
    pointer-events: none;
  }
`

const Header = styled.div`
  height: 48px;
  padding: 2px 16px;
  background: ${({ theme }) => theme.raw.colors.neutral['100']};
  border-radius: 16px;
  display: flex;
  align-items: center;
`

const LabelBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`

const TrackArea = styled.div`
  position: relative;
  height: 64px;
  margin-top: -16px;
`

const BaseTrack = styled.div`
  position: absolute;
  left: 8px;
  right: 8px;
  top: 16px;
  height: 2px;
  background: #d8d8dd;
  border-radius: 2px;
`

const ActiveTrack = styled.div`
  position: absolute;
  left: 8px;
  top: 16px;
  height: 2px;
  background: #00ab75;
  border-radius: 2px;
`

const Range = styled.input`
  position: absolute;
  left: 0;
  right: 0;
  top: 8px;
  height: 32px;
  width: 100%;
  background: transparent;
  -webkit-appearance: none;

  &::-webkit-slider-runnable-track {
    height: 2px;
    background: transparent;
    border: 0;
  }

  &::-moz-range-track {
    height: 2px;
    background: transparent;
    border: 0;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #00ab75;
    border: 0;
    margin-top: -7px;
    box-shadow: 0 0 0 2px #ffffff;
  }

  &::-moz-range-thumb {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #00ab75;
    border: 2px solid #ffffff;
  }
`

const Marks = styled.div`
  position: absolute;
  left: 8px;
  right: 8px;
  top: 0;
  height: 100%;
  pointer-events: none;
`

const MarkWrap = styled.div`
  position: absolute;
  top: 0;
  transform: translateX(-50%);
`

const Tick = styled.span`
  position: absolute;
  top: 14px;
  left: -1px;
  width: 2px;
  height: 4px;
  background: #3a3a3b;
  border-radius: 1px;
`

const MarkLabel = styled.div<{ $align: 'left' | 'center' | 'right' }>`
  position: absolute;
  top: 28px;
  min-width: 48px;
  transform: translateX(
    ${({ $align }) => ($align === 'left' ? '0' : $align === 'right' ? '-100%' : '-50%')}
  );
  text-align: ${({ $align }) =>
    $align === 'left' ? 'left' : $align === 'right' ? 'right' : 'center'};
`
