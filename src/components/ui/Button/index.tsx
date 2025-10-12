import React from 'react'
import styled, { css } from 'styled-components'
import Text from '../typography/Text.tsx'

type Variant =
  | 'accent/solid'
  | 'accent/soft'
  | 'accent/text'
  | 'neutral/filled'
  | 'neutral/text'
  | 'neutral/ghost'
  | 'destructive/text'
  | 'destructive/soft'

type Size = 36 | 48 | 56
type labelSize = 10 | 12 | 14 | 16 | 18

export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'> {
  variant?: Variant
  size?: Size
  labelSize?: labelSize
  fullWidth?: boolean
  radius?: number
  leading?: React.ReactNode
  trailing?: React.ReactNode
  loading?: boolean
  noGap?: boolean
  onClick?: (event: MouseEvent) => void
}

const getTokens = (theme?: any) => {
  const r = theme?.raw
  const colors = r?.colors

  const brand = colors?.brand ?? {}
  const neutral = colors?.neutral ?? {}
  const error = colors?.error ?? {}
  const success = colors?.success ?? {}

  const radii = r?.radii ?? {}
  const spacing = r?.spacing ?? {}

  return {
    brand50: brand[50] ?? '#D2EEE5',
    brand500: brand[500] ?? '#00AB75',
    brand600: brand[600] ?? '#008D60',

    n0: neutral[0] ?? '#FFFFFF',
    n50: neutral[50] ?? '#F5F5FA',
    n100: neutral[100] ?? '#E7E7EB',
    n200: neutral[200] ?? '#D8D8DD',
    n400: neutral[400] ?? '#D8D8DD',
    n500: neutral[500] ?? '#909093',
    n900: neutral[900] ?? '#1D1D1E',

    // error
    err100: error[100] ?? '#F8D7D7',
    err500: error[500] ?? '#DC2626',

    suc100: success[100] ?? '#D2EEE5',
    suc500: success[500] ?? '#00A16E',

    radii: {
      xs: radii.xs ?? 6,
      sm: radii.sm ?? 8,
      md: radii.md ?? 12,
      lg: radii.lg ?? 16,
      xl: radii.xl ?? 24,
      full: radii.full ?? 999,
    },
    spacing: {
      x2: spacing[2] ?? 8,
      x3: spacing[3] ?? 12,
      x4: spacing[4] ?? 16,
      x5: spacing[5] ?? 20,
      x6: spacing[6] ?? 24,
    },
  }
}

const sizeCss = {
  36: css`
    min-height: 36px;
    height: 36px;
    padding: 8px 16px;
    font-size: 14px;
    line-height: 20px;
  `,
  48: css`
    min-height: 48px;
    height: 48px;
    padding: 12px 24px;
    font-size: 16px;
    line-height: 24px;
  `,
  56: css`
    min-height: 56px;
    height: 56px;
    padding: 14px 24px;
    font-size: 18px;
    line-height: 24px;
  `,
}

const resolveRadius = (size: Size, fallback: ReturnType<typeof getTokens>['radii']) =>
  size === 36 ? fallback.sm : size === 48 ? fallback.md : fallback.lg

const variantCss = (v: Variant, t: ReturnType<typeof getTokens>) => {
  switch (v) {
    case 'accent/solid':
      return css`
        background: ${t.brand500};
        color: ${t.n0};

        &:hover {
          background: ${t.brand600};
        }

        &:active {
          filter: brightness(0.97);
        }
      `
    case 'accent/text':
      return css`
        background: transparent;
        color: ${t.brand500};

        &:hover {
          filter: brightness(0.9);
        }

        &:active {
          filter: brightness(0.9);
        }
      `
    case 'accent/soft':
      return css`
        background: ${t.brand50};
        color: ${t.brand500};

        &:hover {
          filter: brightness(0.98);
        }

        &:active {
          filter: brightness(0.96);
        }
      `
    case 'neutral/filled':
      return css`
        background: ${t.n100};
        color: ${t.n900};

        &:hover {
          filter: brightness(0.98);
        }

        &:active {
          filter: brightness(0.96);
        }
      `
    case 'neutral/ghost':
      return css`
        background: transparent;
        color: ${t.n900};

        &:hover {
          background: ${t.n50};
        }

        &:active {
          filter: brightness(0.96);
        }
      `
    case 'neutral/text':
      return css`
        background: transparent;
        color: ${t.n900};

        &:hover {
          background: ${t.n50};
        }

        &:active {
          filter: brightness(0.96);
        }
      `
    case 'destructive/text':
      return css`
        background: transparent;
        color: ${t.err500};

        &:hover {
          background: ${t.err100};
        }

        &:active {
          filter: brightness(0.97);
        }
      `
    case 'destructive/soft':
      return css`
        background: ${t.err100};
        color: ${t.err500};

        &:hover {
          filter: brightness(0.98);
        }

        &:active {
          filter: brightness(0.96);
        }
      `
  }
}

const StyledButton = styled.button<{
  $size: Size
  $full: boolean
  $radius: number
  $variant: Variant
  $noGap: boolean
}>`
  position: relative;
  display: inline-flex;
  width: ${({ $full }) => ($full ? '100%' : 'auto')};
  justify-content: center;
  align-items: center;
  gap: ${({ $noGap }) => ($noGap ? 0 : '12px')};
  border: none;
  cursor: pointer;
  user-select: none;
  font-family:
    'Suisse Intl',
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    sans-serif;
  font-weight: 500;
  transition:
    background-color 0.15s ease,
    filter 0.15s ease,
    opacity 0.15s ease,
    transform 0.02s ease;

  ${({ $size }) => sizeCss[$size]}
  border-radius: ${({ $radius }) => `${$radius}px`};

  ${({ theme, $variant }) => variantCss($variant, getTokens(theme))}
  &:active {
    transform: translateY(0.5px);
  }

  &:disabled {
    ${({ theme }) => {
      const t = getTokens(theme)
      return css`
        background: ${t.n400};
        color: ${t.n0};
        cursor: not-allowed;
        filter: none;
        transform: none;
      `
    }}
  }
`

const Leading = styled.span`
  display: inline-grid;
  place-items: center;
`
const Trailing = styled.span`
  display: inline-grid;
  place-items: center;
`

const Spinner = styled.span<{ $size: Size }>`
  width: ${({ $size }) => ($size === 36 ? 16 : $size === 48 ? 18 : 20)}px;
  height: ${({ $size }) => ($size === 36 ? 16 : $size === 48 ? 18 : 20)}px;
  border-radius: 999px;
  border: 2px solid currentColor;
  border-right-color: transparent;
  animation: spin 0.8s linear infinite;
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`

export function Button({
  children,
  variant = 'accent/solid',
  size = 56,
  fullWidth = true,
  radius,
  labelSize = 18,
  leading,
  trailing,
  loading = false,
  noGap = false,
  disabled,
  ...rest
}: ButtonProps) {
  return (
    <StyledButton
      $variant={variant}
      $size={size}
      $full={fullWidth}
      $radius={radius ?? resolveRadius(size, getTokens(rest as any).radii)}
      $noGap={noGap}
      disabled={disabled || loading}
      {...rest}
    >
      {loading ? (
        <Spinner $size={size} aria-hidden />
      ) : leading ? (
        <Leading>{leading}</Leading>
      ) : null}
      <Text size={labelSize} weight={'medium'}>
        {children}
      </Text>
      {trailing && !loading ? <Trailing>{trailing}</Trailing> : null}
    </StyledButton>
  )
}
