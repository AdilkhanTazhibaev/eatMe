// import { useEffect } from 'react'
// import { useNavigate, useLocation } from 'react-router-dom'
// import { useOnboardingStore } from '../store/useOnboardingStore'
// import { useAuthStore } from '@/store/useAuthStore' // твой общий стор авторизации
//
// export const useOnboardingGuard = () => {
//   const { city, language, phone, otpRequestId } = useOnboardingStore()
//   const { token, initialized } = useAuthStore()
//   const nav = useNavigate()
//   const loc = useLocation()
//
//   useEffect(() => {
//     // Уже авторизован и онборден → в приложение
//     if (token && initialized) {
//       nav('/', { replace: true })
//       return
//     }
//
//     const path = loc.pathname
//     if (path.includes('/onboarding')) {
//       if (path.endsWith('/language') && !city) nav('/onboarding/city', { replace: true })
//       if ((path.endsWith('/login') || path.endsWith('/verify') || path.endsWith('/complete')) && !city)
//         nav('/onboarding/city', { replace: true })
//       if ((path.endsWith('/login') || path.endsWith('/verify') || path.endsWith('/complete')) && !language)
//         nav('/onboarding/language', { replace: true })
//       if (path.endsWith('/verify') && (!phone || !otpRequestId)) nav('/onboarding/login', { replace: true })
//     }
//   }, [city, language, phone, otpRequestId, token, initialized, nav, loc.pathname])
// }
