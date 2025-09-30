// src/modules/onboarding/pages/CompletePage.tsx
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useOnboardingStore } from '../store/useOnboardingStore'

export default function CompletePage() {
  const nav = useNavigate()
  const reset = useOnboardingStore((s) => s.reset)

  useEffect(() => {
    reset()
    nav('/', { replace: true })
  }, [nav, reset])

  return null
}
