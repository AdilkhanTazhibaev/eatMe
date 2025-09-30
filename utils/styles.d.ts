import 'styled-components'
import { RawTokens } from '../src/theme/tokens'

declare module 'styled-components' {
  export interface DefaultTheme {
    raw: RawTokens
  }
}
