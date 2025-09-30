// src/modules/onboarding/pages/VerifyPage.tsx
import { useResendOtpMutation, useVerifyOtpMutation } from '@/api/generated/endpoints'
import { useAuthStore } from '@/store/useAuthStore'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useOnboardingStore } from '../store/useOnboardingStore'

type Form = { code: string }

export default function VerifyPage() {
  const { t } = useTranslation()
  const nav = useNavigate()
  const { phone, otpRequestId } = useOnboardingStore()
  const setAuth = useAuthStore((s) => s.setAuth) // сохранит токен/профиль
  const [cooldown, setCooldown] = useState(0)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Form>()
  const { mutateAsync: verifyOtp } = useVerifyOtpMutation()
  const { mutateAsync: resendOtp } = useResendOtpMutation()

  const onSubmit = async (data: Form) => {
    const res = await verifyOtp({ requestId: otpRequestId!, code: data.code })
    setAuth({ token: res.token, initialized: true })
    nav('/onboarding/complete')
  }

  const onResend = async () => {
    if (cooldown > 0) return
    await resendOtp({ phone: phone! })
    setCooldown(30)
    const id = setInterval(() => {
      setCooldown((c) => {
        if (c <= 1) {
          clearInterval(id)
          return 0
        }
        return c - 1
      })
    }, 1000)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="container">
      <h1>{t('onboarding.verify.title')}</h1>
      <input
        {...register('code', {
          required: t('errors.required') as string,
          minLength: 4,
          maxLength: 8,
        })}
        inputMode="numeric"
        placeholder={t('onboarding.verify.placeholder') as string}
      />
      {errors.code && <p className="error">{errors.code.message as string}</p>}
      <button type="submit" disabled={isSubmitting}>
        {t('actions.confirm')}
      </button>
      <button type="button" onClick={onResend} disabled={cooldown > 0}>
        {cooldown > 0 ? t('actions.resendIn', { s: cooldown }) : t('actions.resendCode')}
      </button>
    </form>
  )
}
