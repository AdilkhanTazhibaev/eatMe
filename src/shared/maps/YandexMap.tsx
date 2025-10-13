import { useYMaps } from '@/shared/hooks/useYMaps.ts'
import { useEffect, useRef } from 'react'
import styled from 'styled-components'

type Marker = { id: string; coords: [number, number]; hint?: string; balloon?: string }

type Props = {
  center?: [number, number]
  zoom?: number
  markers?: Marker[]
  height?: number | string
  onClickMap?: (coords: [number, number]) => void
  className?: string
}

export default function YandexMap({
  center = [43.238949, 76.889709],
  zoom = 12,
  markers = [],
  height = 500,
  onClickMap,
  className,
}: Props) {
  const ymaps = useYMaps()
  const ref = useRef<HTMLDivElement | null>(null)
  const mapRef = useRef<any>(null)

  // init
  useEffect(() => {
    if (!ymaps || !ref.current || mapRef.current) return
    const map = new ymaps.Map(ref.current, { center, zoom }, { suppressMapOpenBlock: true })
    mapRef.current = map

    if (onClickMap) {
      map.events.add('click', (e: any) => {
        const coords = e.get('coords') as [number, number]
        onClickMap(coords)
      })
    }
  }, [ymaps])

  // update center/zoom
  useEffect(() => {
    const map = mapRef.current
    if (!map || !ymaps) return
    map.setCenter(center, zoom, { duration: 200 })
  }, [center?.[0], center?.[1], zoom, ymaps])

  // update markers
  useEffect(() => {
    const map = mapRef.current
    if (!map || !ymaps) return
    map.geoObjects.removeAll()
    markers.forEach((m) => {
      const pm = new ymaps.Placemark(
        m.coords,
        { hintContent: m.hint, balloonContent: m.balloon },
        { preset: 'islands#greenIcon' },
      )
      map.geoObjects.add(pm)
    })
  }, [markers, ymaps])

  return <Wrap ref={ref} style={{ height }} className={className} />
}

const Wrap = styled.div`
  width: 100%;
  border-radius: 16px;
  overflow: hidden;
  background: #f3f4f6;
`
