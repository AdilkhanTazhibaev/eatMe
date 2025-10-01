import ArrowRight from '@/assets/icons/arrow-right.svg?react'
import Telegram from '@/assets/svg/telegram.svg?react'
import WhatsApp from '@/assets/svg/whats-app.svg?react'
import { Grid } from '@/components/snippets'
import { RegisterStep, useAuthStore } from '@/modules/auth/stores/auth.store.ts'
import { useURLState } from '@/shared/hooks/useURLState.ts'
import { raw } from '@theme/tokens.ts'
import NavigationLink from '@ui/NavigationLink'
import Heading from '@ui/typography/Heading.tsx'
import Text from '@ui/typography/Text.tsx'

export default function EnterSendCode() {
  const { next } = useAuthStore()
  const { setParams } = useURLState<{ step?: string }>()
  // const [timer, setTimer] = useState(60)
  // const tRef = useRef<number | null>(null)
  //
  // useEffect(() => {
  //   tRef.current = window.setInterval(() => setTimer((x) => (x > 0 ? x - 1 : 0)), 1000)
  //   return () => {
  //     if (tRef.current) clearInterval(tRef.current)
  //   }
  // }, [])
  //
  // const send = (channel: 'whatsapp' | 'telegram') => {
  //   // TODO: реальный вызов отправки
  //   patch({ otp: '' })
  //   next()
  // }

  const onPick = () => {
    setParams({ step: RegisterStep.EnterOtpCode }, true)
    next()
  }

  const list = [
    {
      label: 'WhatsApp',
      subTitle: 'Отправим сообщением в мессенджер',
      icon: <WhatsApp />,
    },
    {
      label: 'Telegram',
      subTitle: 'Отправим сообщением в мессенджер',
      icon: <Telegram />,
    },
  ]

  return (
    <>
      <Grid $gap={16}>
        <Grid $gap={4}>
          <Heading level={4}>Куда отправить код</Heading>
          <Text size={14} weight={'regular'} color={raw.colors.neutral['700']}>
            На номер +7 771 819 66 81
          </Text>
        </Grid>
        <div>
          {list.map((f) => (
            <NavigationLink
              icon={f.icon}
              title={f.label}
              actionBg={0}
              caption={f.subTitle}
              action={
                <ArrowRight
                  onClick={() => {
                    onPick()
                  }}
                />
              }
            />
          ))}
        </div>
      </Grid>
    </>
  )
}
