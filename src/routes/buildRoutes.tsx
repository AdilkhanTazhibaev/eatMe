import DefaultLayout from '@/layouts/DefaultLayout.tsx'
import { bootstrapService } from '@/modules'

export function buildRoutes() {
  const moduleRoutes = bootstrapService.getRoutes()

  return [
    {
      path: '/',
      element: <DefaultLayout />,
      children: moduleRoutes.filter((r) => !String(r.path).startsWith('/auth')),
    },
    {
      path: '/auth',
      children: moduleRoutes
        .filter((r) => String(r.path).startsWith('/auth'))
        .map((r) => ({
          ...r,
          element: <DefaultLayout>{r.element}</DefaultLayout>,
        })),
    },
  ]
}
