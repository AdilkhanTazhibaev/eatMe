import { semantic } from './semantic'
import { raw } from './tokens'

export const lightTheme = {
  raw,
  semantic,
}

export type Theme = typeof lightTheme
