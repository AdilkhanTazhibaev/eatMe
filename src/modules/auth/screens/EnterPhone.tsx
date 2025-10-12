import { Grid, HeadingWrapper } from '@/components/snippets'
import { useFooter } from '@/layouts/DefaultLayout.tsx'
import { RegisterStep, useAuthStore } from '@/modules/auth/stores/auth.store.ts'
import { useURLState } from '@/shared/hooks/useURLState.ts'
import InputLarge from '@/shared/ui/inputs/InputLarge.tsx'
import { Button } from '@ui/Button'
import Heading from '@ui/typography/Heading.tsx'
import { useEffect } from 'react'

export default function EnterPhone() {
  const { setFooter } = useFooter()
  const { patch, next } = useAuthStore()
  const { setParams } = useURLState<{ phone?: string; step?: string }>()

  useEffect(() => {
    setFooter(
      <Grid $gap={10}>
        <Button
          onClick={() => {
            onPick('7777777')
          }}
        >
          Войти или зарегистрироваться
        </Button>
        <Button
          onClick={() => {
            onPick('7777777')
          }}
          variant={'accent/text'}
        >
          Продолжить как гость
        </Button>
      </Grid>,
    )
    return () => setFooter(null)
  }, [])
  const onPick = (c: string) => {
    patch({ phone: c })
    setParams({ phone: c, step: RegisterStep.EnterName }, true)
    next()
  }
  return (
    <>
      <HeadingWrapper style={{ maxWidth: 256 }}>
        <Heading level={4}>Введите мобильный номер</Heading>
        <Heading level={6}>Отправим код подтверждения входа</Heading>
      </HeadingWrapper>
      <Grid style={{ marginTop: 24 }} $gap={12}>
        <InputLarge value={''} onChange={() => {}} />
      </Grid>
    </>
  )
}
