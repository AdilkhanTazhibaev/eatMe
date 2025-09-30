export const headingScale = {
  1: { size: 36, line: 40 },
  2: { size: 32, line: 36 },
  3: { size: 28, line: 32 },
  4: { size: 24, line: 28 },
  5: { size: 20, line: 24 },
  6: { size: 18, line: 24 },
} as const

export type HeadingLevel = keyof typeof headingScale

export const textScale = {
  20: {
    semibold: { weight: 600, size: 20, line: 24 },
    medium: { weight: 500, size: 20, line: 24 },
  },
  18: {
    semibold: { weight: 600, size: 18, line: 24 },
    medium: { weight: 500, size: 18, line: 24 },
    regular: { weight: 400, size: 18, line: 24 },
  },
  16: {
    semibold: { weight: 600, size: 16, line: 24 },
    medium: { weight: 500, size: 16, line: 24 },
    regular: { weight: 400, size: 16, line: 24 },
  },
  14: {
    semibold: { weight: 600, size: 14, line: 20 },
    medium: { weight: 500, size: 14, line: 20 },
    regular: { weight: 400, size: 14, line: 20 },
  },
  12: {
    medium: { weight: 500, size: 12, line: 16 },
    regular: { weight: 400, size: 12, line: 16 },
  },
  10: {
    semibold: { weight: 600, size: 10, line: 12 },
    medium: { weight: 500, size: 10, line: 12 },
  },
  8: {
    semibold: { weight: 600, size: 8, line: 12 },
    medium: { weight: 500, size: 8, line: 12 },
  },
} as const

export type TextSize = keyof typeof textScale // 20|18|16|14|12|10|8
export type TextWeight<S extends TextSize> = keyof (typeof textScale)[S]
