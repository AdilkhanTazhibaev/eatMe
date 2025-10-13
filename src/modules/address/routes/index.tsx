import { AddressDelivery } from '@/modules/address/screens/AddressDelivery.tsx'
import { AddressDeliveryDetails } from '@/modules/address/screens/AddressDeliveryDetails.tsx'
import { AddressDeliveryEdit } from '@/modules/address/screens/AddressDeliveryEdit.tsx'
import { AddressSearch } from '@/modules/address/screens/AddressSearch.tsx'
import { type RouteObject } from 'react-router-dom'

export const routes: RouteObject[] = [
  {
    path: '/address',
    element: <AddressDelivery />,
  },
  {
    path: '/address/details',
    element: <AddressDeliveryDetails />,
  },
  {
    path: '/address/details/edit',
    element: <AddressDeliveryEdit />,
  },
  {
    path: '/address/search',
    element: <AddressSearch />,
  },
]
