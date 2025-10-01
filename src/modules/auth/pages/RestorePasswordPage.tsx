import AuthLayout from '@/layouts/AuthLayout'
import { AuthMode, RestoreStep, useAuthStore } from '@/modules/auth/stores/auth.store.ts'
import EnterOtpCode from '@/modules/auth/views/EnterOtpCode.tsx'
import EnterPhone from '@/modules/auth/views/EnterPhone'
import EnterSendCode from '@/modules/auth/views/EnterSendCode'
import WelcomeRestore from '@/modules/auth/views/restore/WelcomeRestore.tsx'
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

  return <AuthLayout>{View}</AuthLayout>
}
