import { AuthMode, useAuthStore } from '@/modules/auth/stores/auth.store.ts'
import { useState } from 'react'
import PinInput from '../components/PinInput'

export default function EnterPinCode() {
  const { mode, pin, patch, next } = useAuthStore()
  const [error, setError] = useState('')

  const title =
    mode === AuthMode.Login ? 'Введите код быстрого доступа' : 'Установите код быстрого доступа'

  const handleComplete = (v: string) => {
    if (mode === AuthMode.Login) {
      // TODO: verify PIN
      const ok = true // result from API
      if (!ok) {
        setError('Неверный код')
        return
      }
      next()
    } else {
      // при регистрации просто сохраняем и идём дальше
      patch({ pin: v })
      next()
    }
  }

  return (
    <div>
      <h1 className="mb-2 text-xl font-semibold">{title}</h1>
      {error && <p className="mb-2 text-sm text-red-600">{error}</p>}
      <PinInput value={pin ?? ''} onChange={(v) => patch({ pin: v })} onComplete={handleComplete} />
      <button
        className="mt-4 h-11 w-full rounded-xl bg-emerald-600 text-white"
        onClick={() => handleComplete(pin ?? '')}
      >
        Продолжить
      </button>
    </div>
  )
}
