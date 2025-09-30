import React from 'react'
import styled from 'styled-components'
import Calculator from '../../../assets/icons/_calculator.svg?react'
import MessageSmileSquare from '../../../assets/icons/_message-smile-square.svg?react'
import SuccessFilled from '../../../assets/icons/successFilled.svg?react'
import { raw as t } from '../../../theme/tokens.ts'
import Text from '../typography/Text.tsx'

type Variant = 'success' | 'accent' | 'bonus' | 'promo'
type Size = 'regular' | 'compact'

export type NoticeProps = {
  variant?: Variant
  size?: Size // compact = подпись 10px, ниже высота
  title?: string
  description?: string
  actionLabel?: string
  onAction?: () => void
  icon?: React.ReactNode
  onClose?: () => void
  className?: string
}

const palette: Record<Variant, { bg: string; icon: string; radius: number }> = {
  success: { bg: '#D2EEE5', icon: '#00A16E', radius: 16 },
  accent: { bg: '#E0E1FD', icon: '#6D51ED', radius: 12 }, // «калькулятор»
  bonus: { bg: '#E0E1FD', icon: '#6D4376', radius: 16 }, // «coins»
  promo: { bg: '#DBE8FD', icon: '#3B82F6', radius: 16 }, // «sale»
}

const Wrap = styled.div<{ $bg: string; $radius: number }>`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 16px;
  background: ${({ $bg }) => $bg};
  border-radius: ${({ $radius }) => $radius}px;
`

const IconBox = styled.div<{ $color: string }>`
  width: 20px;
  height: 20px;
  flex: none;
  color: ${({ $color }) => $color};
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1 1 auto;
  min-width: 0;
`

const TextBlock = styled.div<{ $size: Size }>`
  display: flex;
  flex-direction: column;
  gap: 4px;
  text-align: start;
`

const Bar = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const ActionBtn = styled.button`
  appearance: none;
  border: 0;
  background: #fff;
  color: #1d1d1e;
  border-radius: 4px;
  padding: 4px 8px;
  min-height: 24px;
  height: 24px;
  font-family:
    'Suisse Intl',
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    Arial,
    sans-serif;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid ${t.colors.brand?.[500] ?? '#6D51ED'};
    outline-offset: 2px;
  }
`

const CloseBtn = styled.button`
  appearance: none;
  border: 0;
  background: none;
  width: 20px;
  height: 20px;
  color: #3a3a3b;
  cursor: pointer;
  border-radius: 6px;

  &:focus-visible {
    outline: 2px solid rgba(0, 0, 0, 0.3);
    outline-offset: 2px;
  }
`

const defaultIconByVariant: Record<Variant, React.ReactNode> = {
  success: <SuccessFilled />,
  accent: <MessageSmileSquare />,
  bonus: <Calculator />,
}

/* ——— Компонент ——— */
export const Notice: React.FC<NoticeProps> = ({
  variant = 'success',
  size = 'regular',
  title,
  description,
  actionLabel,
  onAction,
  icon,
  onClose,
  className,
}) => {
  const colors = palette[variant]

  return (
    <Wrap className={className} $bg={colors.bg} $radius={colors.radius} role="status">
      <IconBox $color={colors.icon} aria-hidden>
        {icon ?? defaultIconByVariant[variant]}
      </IconBox>

      <Content>
        <TextBlock $size={size}>
          {title && (
            <Text size={14} weight={'semibold'}>
              {title}
            </Text>
          )}
          {description && (
            <Text size={12} weight={'regular'}>
              {description}
            </Text>
          )}
        </TextBlock>

        {(actionLabel || onClose) && (
          <Bar>
            {actionLabel && (
              <ActionBtn type="button" onClick={onAction}>
                {actionLabel}
              </ActionBtn>
            )}
          </Bar>
        )}
      </Content>

      {onClose && (
        <CloseBtn aria-label="Закрыть" onClick={onClose}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6.4 5 5 6.4 10.6 12 5 17.6 6.4 19 12 13.4 17.6 19 19 17.6 13.4 12 19 6.4 17.6 5 12 10.6 6.4 5Z" />
          </svg>
        </CloseBtn>
      )}
    </Wrap>
  )
}
