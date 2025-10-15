import DefaultLayout from '@/layouts/DefaultLayout.tsx'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import 'swiper/css'
import './index.css'
import { bootstrapService } from './modules'
import { lightTheme } from './theme'

const router = createBrowserRouter(
  [
    {
      element: <DefaultLayout />, // Лэйаут — родитель
      children: [
        ...bootstrapService.getRoutes(), // страницы
        { path: '*', element: <div>Not found</div> },
      ],
    },
  ],
  { basename: '/eat-me' },
)
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={lightTheme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
)
