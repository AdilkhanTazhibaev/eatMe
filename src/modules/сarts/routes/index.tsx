import { type RouteObject } from 'react-router-dom'
import { Carts } from '@/modules/сarts/screens/Carts.tsx'

export const routes: RouteObject[] = [
  {
    path: '/carts',
    element: <Carts />,
  },
]
