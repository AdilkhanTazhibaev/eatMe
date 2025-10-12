import { Checkout } from '@/modules/checkout/screens/Checkout.tsx'
import { type RouteObject } from 'react-router-dom'

export const routes: RouteObject[] = [
  {
    path: '/checkout',
    element: <Checkout />,
  },
]
