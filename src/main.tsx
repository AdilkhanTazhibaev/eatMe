import DefaultLayout from '@/layouts/DefaultLayout.tsx'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import App from './App.tsx'
import './index.css'
import { bootstrapService } from './modules'
import { lightTheme } from './theme'

const routes = createBrowserRouter(bootstrapService.getRoutes())

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={lightTheme}>
      <DefaultLayout>
        <App />
        <RouterProvider router={routes} />
      </DefaultLayout>
    </ThemeProvider>
  </StrictMode>,
)
