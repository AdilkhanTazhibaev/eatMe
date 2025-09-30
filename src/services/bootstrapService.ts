import type { ReactNode } from 'react'
import type { RouteObject } from 'react-router-dom'

export interface ModuleConfig {
  name: string
  routes?: RouteObject[]
  locales?: Record<string, Record<string, any>>
  provider?: (children: ReactNode) => ReactNode
}

export class BootstrapService {
  private modules: ModuleConfig[] = []

  register(config: ModuleConfig) {
    this.modules.push(config)
  }

  getRoutes(): RouteObject[] {
    return this.modules.flatMap((m) => m.routes ?? [])
  }

  getLocales(): Record<string, Record<string, any>> {
    const result: Record<string, Record<string, any>> = {}
    for (const mod of this.modules) {
      if (mod.locales) {
        for (const lang of Object.keys(mod.locales)) {
          result[lang] = { ...(result[lang] || {}), ...mod.locales[lang] }
        }
      }
    }
    return result
  }

  wrapProviders(children: ReactNode): ReactNode {
    return this.modules.reduce((acc, mod) => (mod.provider ? mod.provider(acc) : acc), children)
  }
}
