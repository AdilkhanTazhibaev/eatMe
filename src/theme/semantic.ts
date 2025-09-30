import { raw } from './tokens'

export const semantic = {
  surface: {
    background: raw.colors.neutral[0],
    card: raw.colors.neutral[50],
    border: raw.colors.neutral[200],
    overlay: raw.colors.neutral[800],
  },
  text: {
    primary: raw.colors.neutral[900],
    secondary: raw.colors.neutral[600],
    tertiary: raw.colors.neutral[500],
    inverse: raw.colors.neutral[0],
    danger: raw.colors.error[500],
    success: raw.colors.success[500],
  },
  brand: {
    primary: raw.colors.brand[500],
    hover: raw.colors.brand[600],
    active: raw.colors.brand[700],
    bgSubtle: raw.colors.brand[50],
  },
  status: {
    error: {
      bg: raw.colors.error[100],
      border: raw.colors.error[300],
      fg: raw.colors.error[500],
    },
    success: {
      bg: raw.colors.success[100],
      border: raw.colors.success[300],
      fg: raw.colors.success[500],
    },
  },
}

export type SemanticTokens = typeof semantic
