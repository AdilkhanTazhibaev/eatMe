import { Navigate, type RouteObject } from 'react-router-dom'
import LoginPage from '../../onboarding/pages/LoginPage.tsx'

export const routes: RouteObject[] = [
  {
    path: '/auth',
    children: [
      { index: true, element: <Navigate to="login" replace /> },
      { path: 'login', element: <LoginPage /> },
      // { path: 'verify', element: <VerifyPage /> },
      // { path: 'complete', element: <CompletePage /> },
    ],
  },
]
