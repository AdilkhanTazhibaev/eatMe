import { useFooter, useHeader, useLayout } from '@/layouts/DefaultLayout.tsx'
import { type CSSProperties, type DependencyList, type ReactNode, useEffect, useMemo } from 'react'

type MaybeNode = ReactNode | (() => ReactNode) | null | undefined

export type IUseScreenLayoutOptions = {
  header?: MaybeNode
  footer?: MaybeNode
  mainStyle?: CSSProperties | null
  footerStyle?: CSSProperties | null
  deps?: DependencyList
  cleanupToNull?: boolean
}

const resolve = (node: MaybeNode): ReactNode | null =>
  typeof node === 'function' ? (node as () => ReactNode)() : (node ?? null)

export function useScreenLayout({
  header,
  footer,
  mainStyle,
  footerStyle,
  deps = [],
  cleanupToNull = true,
}: IUseScreenLayoutOptions = {}) {
  const { setHeader } = useHeader()
  const { setFooter } = useFooter()
  const { setMainStyle, setFooterStyle } = useLayout()

  const prepared = useMemo(
    () => ({
      headerNode: resolve(header ?? null),
      footerNode: resolve(footer ?? null),
      main: mainStyle ?? null,
      foot: footerStyle ?? null,
    }),
    [header, footer, mainStyle, footerStyle, ...deps],
  )

  useEffect(() => {
    if (prepared.headerNode !== undefined) setHeader(prepared.headerNode)
    return () => {
      if (cleanupToNull) setHeader(null)
    }
  }, [prepared.headerNode])

  useEffect(() => {
    if (prepared.footerNode !== undefined) setFooter(prepared.footerNode)
    return () => {
      if (cleanupToNull) setFooter(null)
    }
  }, [prepared.footerNode])

  useEffect(() => {
    if (prepared.main !== undefined) setMainStyle(prepared.main)
    return () => {
      if (cleanupToNull) setMainStyle(null)
    }
  }, [prepared.main])

  useEffect(() => {
    if (prepared.foot !== undefined) setFooterStyle(prepared.foot)
    return () => {
      if (cleanupToNull) setFooterStyle(null)
    }
  }, [prepared.foot])

  return {
    setHeader,
    setFooter,
    setMainStyle,
    setFooterStyle,
  }
}
