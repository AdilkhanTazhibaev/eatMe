// layouts/DefaultLayout.tsx
import { Shell } from '@/components/snippets'
import React, {
  createContext,
  type PropsWithChildren,
  type ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { Outlet, useInRouterContext } from 'react-router-dom'
import styled from 'styled-components'

/* ---------- типы контекстов ---------- */

type FooterCtx = { setFooter: (node: ReactNode | null, opts?: { fixed?: boolean }) => void }
type HeaderCtx = { setHeader: (node: ReactNode | null, opts?: { fixed?: boolean }) => void }

type LayoutStyleCtx = {
  setShellStyle: (s: React.CSSProperties | null) => void
  setMainStyle: (s: React.CSSProperties | null) => void
  setFooterStyle: (s: React.CSSProperties | null) => void
  setFixedBarStyle: (s: React.CSSProperties | null) => void
  patchShellStyle: (s: React.CSSProperties) => void
  patchMainStyle: (s: React.CSSProperties) => void
  patchFooterStyle: (s: React.CSSProperties) => void
  patchFixedBarStyle: (s: React.CSSProperties) => void
}

const FooterContext = createContext<FooterCtx | null>(null)
const HeaderContext = createContext<HeaderCtx | null>(null)
const LayoutStyleContext = createContext<LayoutStyleCtx | null>(null)

/* ---------- хуки ---------- */

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
export const useLayout = () => {
  const ctx = useContext(LayoutStyleContext)
  if (!ctx) throw new Error('useLayout must be used within <DefaultLayout>')
  return ctx
}

/** удобный хелпер: навесил стили при монтировании — и аккуратно снял при размонтировании */
export const useLayoutEffectOnce = (fn: (api: LayoutStyleCtx) => (() => void) | void) => {
  const api = useLayout()
  useEffect(() => {
    const cleanup = fn(api)
    return () => {
      if (typeof cleanup === 'function') cleanup()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

type Props = PropsWithChildren

export default function DefaultLayout({ children }: Props) {
  const inRouter = useInRouterContext()

  // nodes
  const [footer, setFooterNode] = useState<ReactNode | null>(null)
  const [header, setHeaderNode] = useState<ReactNode | null>(null)
  // flags
  const [footerFixed, setFooterFixed] = useState(false)
  const [headerFixed, setHeaderFixed] = useState(false)
  // styles
  const [shellStyle, setShellStyle] = useState<React.CSSProperties | undefined>()
  const [mainStyle, setMainStyle] = useState<React.CSSProperties | undefined>()
  const [footerStyle, setFooterStyle] = useState<React.CSSProperties | undefined>()
  const [fixedBarStyle, setFixedBarStyle] = useState<React.CSSProperties | undefined>()

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

  const styleApi = useMemo<LayoutStyleCtx>(
    () => ({
      setShellStyle: (s) => setShellStyle(s ?? undefined),
      setMainStyle: (s) => setMainStyle(s ?? undefined),
      setFooterStyle: (s) => setFooterStyle(s ?? undefined),
      setFixedBarStyle: (s) => setFixedBarStyle(s ?? undefined),
      patchShellStyle: (s) => setShellStyle((prev) => ({ ...(prev ?? {}), ...s })),
      patchMainStyle: (s) => setMainStyle((prev) => ({ ...(prev ?? {}), ...s })),
      patchFooterStyle: (s) => setFooterStyle((prev) => ({ ...(prev ?? {}), ...s })),
      patchFixedBarStyle: (s) => setFixedBarStyle((prev) => ({ ...(prev ?? {}), ...s })),
    }),
    [],
  )

  return (
    <Shell style={shellStyle}>
      {/* Header-узел (может быть фиксированным, если так решишь) */}
      {header && header}

      <HeaderContext.Provider value={headerApi}>
        <FooterContext.Provider value={footerApi}>
          <LayoutStyleContext.Provider value={styleApi}>
            <Main $hasFixed={footerFixed} $headerFixed={headerFixed} style={mainStyle}>
              {/* если мы под Router — рендерим страницы через <Outlet />, иначе — через children */}
              {inRouter ? <Outlet /> : children}
            </Main>
          </LayoutStyleContext.Provider>
        </FooterContext.Provider>
      </HeaderContext.Provider>

      {footer &&
        (footerFixed ? (
          <FixedBar style={fixedBarStyle}>{footer}</FixedBar>
        ) : (
          <Footer style={footerStyle}>{footer}</Footer>
        ))}
    </Shell>
  )
}

/* ---------- styled ---------- */

const Main = styled.main<{ $hasFixed: boolean; $headerFixed: boolean }>`
  flex: 1;
  padding: 24px 0 0;
  padding-bottom: ${({ $hasFixed }) => ($hasFixed ? '84px' : '0')};
`

const Footer = styled.footer`
  margin-top: auto;
  position: sticky;
  bottom: 0;
`

const FixedBar = styled.div`
  position: fixed;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  width: min(100%, 360px);
  padding: 12px 16px;
  padding-bottom: calc(12px + env(safe-area-inset-bottom));
  z-index: 50;
`
