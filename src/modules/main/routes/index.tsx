import { Main } from '@/modules/main/screens/Main.tsx'
import { type RouteObject } from 'react-router-dom'

export const routes: RouteObject[] = [
  {
    path: '',
    element: <Main />,
  },
]
