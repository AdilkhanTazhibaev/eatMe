import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type City = { id: string; name: string; code: string }
type Language = 'kk' | 'ru' | 'en'

interface OnboardingState {
  city?: City
  language?: Language
  phone?: string
  otpRequestId?: string
  setCity: (c: City) => void
  setLanguage: (l: Language) => void
  setPhone: (p: string) => void
  setOtpRequestId: (id: string) => void
  reset: () => void
}

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      setCity: (city) => set({ city }),
      setLanguage: (language) => set({ language }),
      setPhone: (phone) => set({ phone }),
      setOtpRequestId: (otpRequestId) => set({ otpRequestId }),
      reset: () =>
        set({ city: undefined, language: undefined, phone: undefined, otpRequestId: undefined }),
    }),
    { name: 'onboarding' },
  ),
)
