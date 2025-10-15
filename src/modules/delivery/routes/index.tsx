import { DeliverySetDate } from '@/modules/delivery/screens/DeliverySetDate.tsx'
import { DeliverySkipDays } from '@/modules/delivery/screens/DeliverySkipDays.tsx'
import { type RouteObject } from 'react-router-dom'
import { DeliveryStartDate } from '@/modules/delivery/screens/DeliveryStartDate.tsx'

export const routes: RouteObject[] = [
  {
    path: '/delivery/set-date',
    element: <DeliverySetDate />,
  },
  {
    path: '/delivery/set-skip-days',
    element: <DeliverySkipDays />,
  },
  {
    path: '/delivery/start-date',
    element: <DeliveryStartDate />,
  },
]
