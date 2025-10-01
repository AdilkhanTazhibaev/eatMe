import { useCallback, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

export function useURLState<T extends Record<string, string | undefined>>() {
  const [sp, setSp] = useSearchParams()

  const params = useMemo(() => {
    const o: Record<string, string> = {}
    sp.forEach((v, k) => (o[k] = v))
    return o as T
  }, [sp])

  const setParams = useCallback(
    (patch: Partial<T>, replace = false) => {
      const next = new URLSearchParams(sp)
      let changed = false

      Object.entries(patch).forEach(([k, v]) => {
        const key = String(k)
        const cur = sp.get(key)

        if (v === undefined || v === null || v === '') {
          if (cur !== null) {
            next.delete(key)
            changed = true
          }
        } else {
          const nv = String(v)
          if (cur !== nv) {
            next.set(key, nv)
            changed = true
          }
        }
      })

      if (changed) setSp(next, { replace })
    },
    [sp, setSp],
  )

  return { params, setParams }
}
