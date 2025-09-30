// src/modules/onboarding/routes.tsx
import { Navigate, type RouteObject } from 'react-router-dom'
import CityPage from '../pages/CityPage'
import LanguagePage from '../pages/LanguagePage.tsx'

export const routes: RouteObject[] = [
  {
    path: '/onboarding',
    children: [
      { index: true, element: <Navigate to="city" replace /> },
      { path: 'city', element: <CityPage /> },
      { path: 'language', element: <LanguagePage /> },
      // { path: 'login', element: <LoginPage /> },
      // { path: 'verify', element: <VerifyPage /> },
      // { path: 'complete', element: <CompletePage /> },
    ],
  },
]
