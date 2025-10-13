import type { ModuleConfig } from '@/services/bootstrapService.ts'
import en from './locales/en.json'
import ru from './locales/ru.json'
import { routes } from './routes'

export const CheckoutAllergensModule: ModuleConfig = {
  name: 'checkout-allergens',
  routes: routes,
  locales: {
    en,
    ru,
  },
}
