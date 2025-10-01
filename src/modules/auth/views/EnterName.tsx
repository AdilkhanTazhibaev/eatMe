import { Grid } from '@/components/snippets'
import { useFooter } from '@/layouts/AuthLayout'
import { useAuthStore } from '@/modules/auth/stores/auth.store'
import { Button } from '@ui/Button'
import { Input } from '@ui/Input'
import Heading from '@ui/typography/Heading'
import Text from '@ui/typography/Text'
import { useEffect, useState } from 'react'

export default function EnterName() {
  const { patch, next } = useAuthStore()
  const [name, setName] = useState('Tets')
  const { setFooter } = useFooter()

  const canSave = name.trim().length > 0
  const onSave = () => {
    if (!canSave) return
    patch({ name: name.trim() })
    next()
  }

  useEffect(() => {
    setFooter(
      <Button onClick={onSave} disabled={!canSave}>
        Сохранить
      </Button>,
    )
    return () => setFooter(null)
  }, [canSave])

  return (
    <>
      <Grid $gap={16}>
        <Grid $gap={4}>
          <Heading level={4}>Как к вам обращаться</Heading>
          <Text size={14} weight="regular">
            Это последний шаг регистрации
          </Text>
        </Grid>

        <Input
          label="Ваше имя"
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
        />
      </Grid>
    </>
  )
}
