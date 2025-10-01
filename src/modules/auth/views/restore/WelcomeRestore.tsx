import ArrowRight from '@/assets/icons/arrow-narrow-right.svg?react'
import { Grid } from '@/components/snippets'
import { useFooter } from '@/layouts/AuthLayout.tsx'
import { RestoreStep, useAuthStore } from '@/modules/auth/stores/auth.store.ts'
import { useURLState } from '@/shared/hooks/useURLState.ts'
import { raw } from '@theme/tokens.ts'
import { Button } from '@ui/Button'
import Heading from '@ui/typography/Heading.tsx'
import Text from '@ui/typography/Text.tsx'
import { useEffect } from 'react'

export default function WelcomeRestore() {
  const { next } = useAuthStore()
  const { setParams } = useURLState<{ step?: string }>()
  const { setFooter } = useFooter()

  useEffect(() => {
    setFooter(
      <Button
        trailing={<ArrowRight />}
        onClick={() => {
          onPick()
        }}
      >
        Выбрать мессенджер
      </Button>,
    )
    return () => setFooter(null)
  }, [])
  const onPick = () => {
    setParams({ step: RestoreStep.EnterSendCode }, true)
    next()
  }
  return (
    <>
      <Grid $gap={16}>
        <div style={{ maxWidth: 291, gap: 4, display: 'grid' }}>
          <Heading level={4}>
            Чтобы восстановить доступ, отправим проверочный код в один из мессенджеров
          </Heading>
          <Text size={14} weight={'regular'} color={raw.colors.neutral['700']}>
            Так мы сможем убедиться, что аккаунт действительно принадлежит вам
          </Text>
        </div>
      </Grid>
    </>
  )
}
