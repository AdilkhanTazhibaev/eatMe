import { Promocode } from '@/modules/promocodes/screens/Promocode.tsx'
import { type RouteObject } from 'react-router-dom'

export const routes: RouteObject[] = [
  {
    path: '/promocodes',
    element: <Promocode />,
  },
]
