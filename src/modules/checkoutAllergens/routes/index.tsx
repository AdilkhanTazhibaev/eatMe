import { CheckoutAllergenEnter } from '@/modules/checkoutAllergens/screens/CheckoutAllergenEnter.tsx'
import { CheckoutAllergens } from '@/modules/checkoutAllergens/screens/CheckoutAllergens.tsx'
import { type RouteObject } from 'react-router-dom'

export const routes: RouteObject[] = [
  {
    path: '/checkout/allergens',
    element: <CheckoutAllergens />,
  },
  {
    path: '/checkout/allergen/enter',
    element: <CheckoutAllergenEnter />,
  },
]
