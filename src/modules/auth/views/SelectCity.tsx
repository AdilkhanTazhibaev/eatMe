// @ts-ignore
import ArrowRight from '@/assets/icons/arrow-right.svg?react'
import { HeadingWrapper } from '@/components/snippets'
import { LoginStep, useAuthStore } from '@/modules/auth/stores/auth.store.ts'
import { useURLState } from '@/shared/hooks/useURLState'
import NavigationLink from '@ui/NavigationLink'
import Heading from '@ui/typography/Heading.tsx'
import { useEffect } from 'react'

const cities = ['Алматы', 'Астана', 'Шымкент', 'Ташкент', 'Dubai']

export default function SelectCity() {
  const { patch, next } = useAuthStore()
  const { params, setParams } = useURLState<{ city?: string; step?: string }>()

  useEffect(() => {
    if (params.city) patch({ city: params.city })
  }, [params.city, patch])

  const onPick = (c: string) => {
    patch({ city: c })
    setParams({ city: c, step: LoginStep.SelectLanguage }, true)
    next()
  }

  return (
    <div>
      <HeadingWrapper>
        <Heading level={4}>Выберите ваш город</Heading>
        <Heading level={4}>Select your city</Heading>
      </HeadingWrapper>
      {cities.map((c) => (
        <NavigationLink
          key={c}
          actionBg={0}
          level={'h6'}
          title={c}
          action={
            <ArrowRight
              onClick={() => {
                onPick(c)
              }}
            />
          }
        />
      ))}
    </div>
  )
}
