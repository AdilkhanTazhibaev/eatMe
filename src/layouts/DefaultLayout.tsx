import { Shell } from '@/components/snippets'
import {
  createContext,
  type PropsWithChildren,
  type ReactNode,
  useContext,
  useMemo,
  useState,
} from 'react'
import styled from 'styled-components'

type FooterCtx = { setFooter: (node: ReactNode | null, opts?: { fixed?: boolean }) => void }
type HeaderCtx = { setHeader: (node: ReactNode | null, opts?: { fixed?: boolean }) => void }

const FooterContext = createContext<FooterCtx | null>(null)
const HeaderContext = createContext<HeaderCtx | null>(null)

export const useFooter = () => {
  const ctx = useContext(FooterContext)
  if (!ctx) throw new Error('useFooter must be used within <DefaultLayout>')
  return ctx
}

export const useHeader = () => {
  const ctx = useContext(HeaderContext)
  if (!ctx) throw new Error('useHeader must be used within <DefaultLayout>')
  return ctx
}

type Props = PropsWithChildren

export default function DefaultLayout({ children }: Props) {
  const [footer, setFooterNode] = useState<ReactNode | null>(null)
  const [header, setHeaderNode] = useState<ReactNode | null>(null)
  const [footerFixed, setFooterFixed] = useState(false)
  const [headerFixed, setHeaderFixed] = useState(false)

  const footerApi = useMemo<FooterCtx>(
    () => ({
      setFooter: (node, opts) => {
        setFooterNode(node ?? null)
        setFooterFixed(!!opts?.fixed)
      },
    }),
    [],
  )

  const headerApi = useMemo<HeaderCtx>(
    () => ({
      setHeader: (node, opts) => {
        setHeaderNode(node ?? null)
        setHeaderFixed(!!opts?.fixed)
      },
    }),
    [],
  )

  return (
    <Shell>
      {header && header}
      <HeaderContext.Provider value={headerApi}>
        <FooterContext.Provider value={footerApi}>
          <Main $hasFixed={footerFixed}>{children}</Main>
        </FooterContext.Provider>
      </HeaderContext.Provider>

      {footer && (footerFixed ? <FixedBar>{footer}</FixedBar> : <Footer>{footer}</Footer>)}
    </Shell>
  )
}

const Main = styled.main<{ $hasFixed: boolean }>`
  flex: 1;
  padding: 24px 0 0;
  padding-bottom: ${({ $hasFixed }) => ($hasFixed ? '84px' : '0')};
`

const Footer = styled.footer`
  margin-top: auto;
  position: sticky;
  bottom: 0;
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
