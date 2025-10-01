// src/layouts/AuthLayout.tsx
import {
  createContext,
  type PropsWithChildren,
  type ReactNode,
  useContext,
  useMemo,
  useState,
} from 'react'
import styled from 'styled-components'

type Ctx = {
  setFooter: (node: ReactNode | null, opts?: { fixed?: boolean }) => void
}

const FooterCtx = createContext<Ctx | null>(null)
export const useFooter = () => {
  const ctx = useContext(FooterCtx)
  if (!ctx) throw new Error('useFooter must be used within <AuthLayout>')
  return ctx
}

type Props = PropsWithChildren

export default function AuthLayout({ children }: Props) {
  const [footer, setFooterNode] = useState<ReactNode | null>(null)
  const [fixed, setFixed] = useState(false)

  const api = useMemo<Ctx>(
    () => ({
      setFooter: (node, opts) => {
        setFooterNode(node ?? null)
        setFixed(!!opts?.fixed)
      },
    }),
    [],
  )

  return (
    <Shell>
      {/*<Header />*/}
      <FooterCtx.Provider value={api}>
        <Main $hasFixed={fixed}>{children}</Main>
      </FooterCtx.Provider>

      {footer && (fixed ? <FixedBar>{footer}</FixedBar> : <Footer>{footer}</Footer>)}
    </Shell>
  )
}

const Shell = styled.div`
  min-height: 100dvh;
  display: flex;
  width: 100%;
  flex-direction: column;
  background: #f3f4f6;
  color: #1d1d1e;
`

const Header = styled.header`
  height: 48px;
  max-width: 360px;
  width: 100%;
  padding: 0 16px;
  display: flex;
  align-items: center;
`

const Main = styled.main<{ $hasFixed: boolean }>`
  flex: 1;
  padding: 24px 16px 0;
  padding-bottom: ${({ $hasFixed }) => ($hasFixed ? '84px' : '0')};
`

const Footer = styled.footer`
  margin-top: auto;
  position: sticky;
  bottom: 0;
  padding: 12px 16px;
  padding-bottom: calc(12px + env(safe-area-inset-bottom));
  background: linear-gradient(180deg, rgba(243, 244, 246, 0) 0%, #f3f4f6 40%);
`

const FixedBar = styled.div`
  position: fixed;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  width: min(100%, 360px);
  padding: 12px 16px;
  padding-bottom: calc(12px + env(safe-area-inset-bottom));
  background: linear-gradient(180deg, rgba(243, 244, 246, 0) 0%, #f3f4f6 60%);
  z-index: 50;
`
