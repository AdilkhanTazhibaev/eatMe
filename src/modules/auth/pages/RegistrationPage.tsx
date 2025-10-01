import AuthLayout from '@/layouts/AuthLayout'
import {
  AuthMode,
  registerFlow,
  RegisterStep,
  useAuthStore,
} from '@/modules/auth/stores/auth.store.ts'
import { default as EnterName } from '@/modules/auth/views/EnterName'
import EnterOtpCode from '@/modules/auth/views/EnterOtpCode.tsx'
import EnterPhone from '@/modules/auth/views/EnterPhone'
import EnterSendCode from '@/modules/auth/views/EnterSendCode'
import { useURLState } from '@/shared/hooks/useURLState'
import { useEffect, useMemo } from 'react'

function isRegisterStep(v: any): v is RegisterStep {
  return registerFlow.includes(v)
}

export default function RegistrationPage() {
  const { registerStep, setMode, patch } = useAuthStore()
  const { params, setParams } = useURLState<{
    step?: string
    city?: string
    lang?: 'kk' | 'ru' | 'en'
  }>()

  useEffect(() => {
    setMode(AuthMode.Register)

    if (params.city) patch({ city: params.city })
    if (params.lang) patch({ language: params.lang })

    const urlStep = params.step as RegisterStep | undefined
    if (urlStep && isRegisterStep(urlStep) && urlStep !== registerStep) {
      patch({ registerStep: urlStep })
    } else {
      if (params.step !== registerStep) {
        setParams({ step: registerStep }, true)
      }
    }
  }, [])

  useEffect(() => {
    if (params.step !== registerStep) {
      setParams({ step: registerStep }, true)
    }
  }, [registerStep, params.step, setParams])

  const View = useMemo(
    () =>
      (
        ({
          [RegisterStep.EnterName]: <EnterName />,
          [RegisterStep.EnterPhone]: <EnterPhone />,
          [RegisterStep.EnterSendCode]: <EnterSendCode />,
          [RegisterStep.EnterOtpCode]: <EnterOtpCode />,
        }) as const
      )[registerStep] ?? <EnterPhone />,
    [registerStep],
  )

  return <AuthLayout>{View}</AuthLayout>
}
