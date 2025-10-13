import Arrow from '@/assets/icons/arrow.svg?react'
import { useHeader } from '@/layouts/DefaultLayout.tsx'
import { TopBar } from '@ui/Topbar'
import { useEffect } from 'react'

export function AddressDelivery() {
  const { setHeader } = useHeader()

  useEffect(() => {
    setHeader(<TopBar left={<Arrow />} title={'Добавление адреса доставки'} />)

    return () => {
      setHeader(null)
    }
  }, [])

  return <>sldk</>
}
