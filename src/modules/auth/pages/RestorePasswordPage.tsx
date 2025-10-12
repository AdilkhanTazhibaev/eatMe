import DefaultLayout from '@/layouts/DefaultLayout.tsx'
import EnterOtpCode from '@/modules/auth/screens/EnterOtpCode.tsx'
import EnterPhone from '@/modules/auth/screens/EnterPhone'
import EnterSendCode from '@/modules/auth/screens/EnterSendCode'
import WelcomeRestore from '@/modules/auth/screens/restore/WelcomeRestore.tsx'
import { AuthMode, RestoreStep, useAuthStore } from '@/modules/auth/stores/auth.store.ts'
import { useEffect, useMemo } from 'react'

export default function RestorePasswordPage() {
  const { restoreStep, setMode } = useAuthStore()

  useEffect(() => {
    setMode(AuthMode.Restore)
  }, [])

  const View = useMemo(
    () =>
      (
        ({
          [RestoreStep.WelcomeRestore]: <WelcomeRestore />,
          [RestoreStep.EnterSendCode]: <EnterSendCode />,
          [RestoreStep.EnterPinCode]: <EnterOtpCode />,
        }) as const
      )[restoreStep] ?? <EnterPhone />,
    [restoreStep],
  )

  return <DefaultLayout>{View}</DefaultLayout>
}
