// @ts-ignore
import ArrowRight from '@/assets/icons/arrow-right.svg?react'
import { HeadingWrapper } from '@/components/snippets'
import { useURLState } from '@/shared/hooks/useURLState'
import NavigationLink from '@ui/NavigationLink'
import Heading from '@ui/typography/Heading.tsx'
import { useEffect } from 'react'
import { RegisterStep, useAuthStore } from '../stores/auth.store'

const langs = [
  { k: 'kk', t: 'Қазақ тілі' },
  { k: 'ru', t: 'Русский язык' },
  { k: 'en', t: 'English' },
] as const

export default function SelectLanguage() {
  const { patch, next } = useAuthStore()
  const { params, setParams } = useURLState<{ lang?: 'kk' | 'ru' | 'en'; step?: string }>()

  useEffect(() => {
    if (params.lang) patch({ language: params.lang })
  }, [params.lang, patch])

  const onPick = (k: 'kk' | 'ru' | 'en') => {
    patch({ language: k })
    setParams({ lang: k, step: RegisterStep.EnterName }, true)
    next()
  }

  return (
    <div>
      <HeadingWrapper>
        <Heading level={4}>Тілді таңдаңыз Сегодня</Heading>
        <Heading level={4}>Выберите язык Сегодня</Heading>
      </HeadingWrapper>
      {langs.map((c) => (
        <NavigationLink
          key={c.k}
          actionBg={0}
          level={'h6'}
          title={c.t}
          action={
            <ArrowRight
              onClick={() => {
                onPick(c.k)
              }}
            />
          }
        />
      ))}
    </div>
  )
}
