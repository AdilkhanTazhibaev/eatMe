import { Container, WrapBetween } from '@/components/snippets'
import { useScreenLayout } from '@/shared/hooks/useScreenLayout.tsx'
import { BackTopBar } from '@/shared/topbar/BackTopBar.tsx'
import { raw } from '@theme/tokens.ts'
import { Button } from '@ui/Button'
import { Input } from '@ui/Input'

export function AddressSearch() {
  useScreenLayout({
    header: <BackTopBar title={'Поиск по адресам'} caption={'Алматы'} />,
    mainStyle: {
      background: raw.colors.neutral[0],
    },
    footerStyle: {
      paddingBottom: 8,
      background: raw.colors.neutral[0],
    },
    footer: (
      <WrapBetween>
        <Button>Сохранить</Button>
      </WrapBetween>
    ),
  })

  return (
    <>
      <Container $bg={0}>
        <WrapBetween>
          <Input label={'Адрес доставки'} value={'Проспект Аль-Фараби, 41/6|'} />
        </WrapBetween>
      </Container>
    </>
  )
}
