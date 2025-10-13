import { useEffect, useState } from 'react'

export function useYMaps() {
  const [ymaps, setYmaps] = useState<any>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const w = window as any
    if (w.ymaps) {
      w.ymaps.ready(() => setYmaps(w.ymaps))
      return
    }
    const apikey = import.meta.env.VITE_YMAPS_API_KEY
    const s = document.createElement('script')
    s.src = `https://api-maps.yandex.ru/2.1/?apikey=${apikey}&lang=ru_RU`
    s.async = true
    s.onload = () => w.ymaps.ready(() => setYmaps(w.ymaps))
    document.head.appendChild(s)
    return () => {
      /* можно удалить скрипт по желанию */
    }
  }, [])

  return ymaps
}
