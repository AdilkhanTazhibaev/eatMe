import DefaultLayout from '@/layouts/DefaultLayout.tsx'
import EnterOtpCode from '@/modules/auth/screens/EnterOtpCode.tsx'
import EnterPhone from '@/modules/auth/screens/EnterPhone'
import SelectCity from '@/modules/auth/screens/SelectCity.tsx'
import SelectLanguage from '@/modules/auth/screens/SelectLanguage.tsx'
import { useURLState } from '@/shared/hooks/useURLState'
import { useEffect, useMemo } from 'react'
import { AuthMode, LoginStep, useAuthStore } from '../stores/auth.store'

const loginFlow = [
  LoginStep.SelectCity,
  LoginStep.SelectLanguage,
  LoginStep.EnterPhone,
  LoginStep.EnterPinCode,
] as const

function isLoginStep(v: any): v is LoginStep {
  return loginFlow.includes(v)
}

export default function LoginPage() {
  const { loginStep, setMode, patch } = useAuthStore()
  const { params, setParams } = useURLState<{ step?: string }>()

  useEffect(() => {
    setMode(AuthMode.Login)

    const urlStep = params.step as LoginStep | undefined
    if (urlStep && isLoginStep(urlStep) && urlStep !== loginStep) {
      patch({ loginStep: urlStep })
    } else {
      if (params.step !== loginStep) {
        setParams({ step: loginStep }, true)
      }
    }
  }, [])

  useEffect(() => {
    if (params.step !== loginStep) {
      setParams({ step: loginStep }, true)
    }
  }, [loginStep, params.step, setParams])

  const View = useMemo(
    () =>
      (
        ({
          [LoginStep.SelectCity]: <SelectCity />,
          [LoginStep.SelectLanguage]: <SelectLanguage />,
          [LoginStep.EnterPhone]: <EnterPhone />,
          [LoginStep.EnterSendCode]: <EnterOtpCode />,
        }) as const
      )[loginStep] ?? <SelectCity />,
    [loginStep],
  )

  return <DefaultLayout>{View}</DefaultLayout>
}
