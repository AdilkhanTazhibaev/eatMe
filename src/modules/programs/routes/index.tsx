import { ProgramDetail } from '@/modules/programs/screens/ProgramDetail.tsx'
import { ProgramsNutrition } from '@/modules/programs/screens/ProgramsNutrition.tsx'
import { type RouteObject } from 'react-router-dom'
import { ProgramMealDetail } from '@/modules/programs/screens/ProgramMealDetail.tsx'

export const routes: RouteObject[] = [
  {
    path: '/programs-nutrition',
    children: [
      {
        path: '',
        element: <ProgramsNutrition />,
      },
      {
        path: ':id',
        element: <ProgramDetail />,
      },
      {
        path: ':id/info/:programId',
        element: <ProgramMealDetail />,
      },
    ],
  },
]
