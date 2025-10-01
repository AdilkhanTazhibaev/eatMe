import LoginPage from '@/modules/auth/pages/LoginPage.tsx'
import RegistrationPage from '@/modules/auth/pages/RegistrationPage.tsx'
import { type RouteObject } from 'react-router-dom'
import RestorePasswordPage from '@/modules/auth/pages/RestorePasswordPage.tsx'

export const routes: RouteObject[] = [
  {
    path: '/auth',
    children: [
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegistrationPage /> },
      { path: 'restore', element: <RestorePasswordPage /> },
    ],
  },
]
