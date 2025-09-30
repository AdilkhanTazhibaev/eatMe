import type { ModuleConfig } from '../../services/bootstrapService.ts'
import en from './locales/en.json'
import ru from './locales/ru.json'
import { routes } from './routes'

export const AuthModule: ModuleConfig = {
  name: 'auth',
  routes: routes,
  locales: {
    en,
    ru,
  },
}
