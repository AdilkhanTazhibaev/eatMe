import { AddressDelivery } from '@/modules/address/screens/AddressDelivery.tsx'
import { type RouteObject } from 'react-router-dom'

export const routes: RouteObject[] = [
  {
    path: '/address',
    element: <AddressDelivery />,
  },
]
