import { DeliveryComment } from '@/modules/comments/screens/DeliveryComment.tsx'
import { type RouteObject } from 'react-router-dom'

export const routes: RouteObject[] = [
  {
    path: '/comment',
    element: <DeliveryComment />,
  },
]
