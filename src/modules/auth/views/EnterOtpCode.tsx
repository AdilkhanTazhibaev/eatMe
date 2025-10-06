import { Grid } from '@/components/snippets'
import { useAuthStore } from '@/modules/auth/stores/auth.store.ts'
import { useURLState } from '@/shared/hooks/useURLState.ts'
import OtpCode from '@/shared/ui/inputs/OtpCode.tsx'
import { raw } from '@theme/tokens.ts'
import Heading from '@ui/typography/Heading.tsx'
import Text from '@ui/typography/Text.tsx'
import { useState } from 'react'

export default function EnterOtpCode() {
  const { patch, next } = useAuthStore()
  const { setParams } = useURLState<{ phone?: string; step?: string }>()

  const [code, setCode] = useState()
  return (
    <>
      <Grid $gap={16}>
        <div style={{ maxWidth: 256, gap: 4, display: 'grid' }}>
          <Heading level={4}>Введите код</Heading>
          <Text size={14} weight={'regular'} color={raw.colors.neutral['700']}>
            Отправили в Telegram на номер +7 771 123 45 67
          </Text>
        </div>
        <Grid $gap={12}>
          <OtpCode value={code} onChange={setCode} />
        </Grid>
      </Grid>
    </>
  )
}
