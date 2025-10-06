import { useHeader } from '@/layouts/DefaultLayout.tsx'
import { type ReactNode, useEffect, useMemo } from 'react'
import styled, { css } from 'styled-components'

type Props = {
  title?: ReactNode
  subtitle?: ReactNode
  /** Слот слева: back/close/любая иконка */
  left?: ReactNode
  /** Слот справа: иконки/кнопки действий */
  right?: ReactNode
  /** Зафиксировать шапку поверх контента */
  fixed?: boolean
  /** Выравнивание заголовка */
  align?: 'left' | 'center'
  /** Прозрачный фон (поверх контента) */
  transparent?: boolean
}

export default function Header({
  title,
  subtitle,
  left,
  right,
  fixed = false,
  align = 'left',
  transparent = false,
}: Props) {
  const { setHeader } = useHeader()

  const node = useMemo(
    () => (
      <Bar $transparent={transparent}>
        <Row>
          <Side>{left}</Side>
          <Title $align={align}>
            {typeof title === 'string' ? <H1>{title}</H1> : title}
            {subtitle && (typeof subtitle === 'string' ? <Sub>{subtitle}</Sub> : subtitle)}
          </Title>
          <Side $right>{right}</Side>
        </Row>
      </Bar>
    ),
    [title, subtitle, left, right, align, transparent],
  )

  useEffect(() => {
    setHeader(node, { fixed })
    return () => setHeader(null)
  }, [node, fixed, setHeader])

  return null
}

/* ===== styled ===== */

const Bar = styled.div<{ $transparent: boolean }>`
  padding: 12px 16px;
  ${({ $transparent }) =>
    $transparent
      ? css`
          background: transparent;
        `
      : css`
          background: linear-gradient(180deg, #f3f4f6 70%, rgba(243, 244, 246, 0));
        `}
`

const Row = styled.div`
  width: min(100%, 360px);
  margin: 0 auto;
  display: grid;
  grid-template-columns: 40px 1fr 40px;
  align-items: center;
  gap: 8px;
`

const Side = styled.div<{ $right?: boolean }>`
  display: flex;
  align-items: center;
  ${({ $right }) =>
    $right
      ? css`
          justify-content: flex-end;
        `
      : css`
          justify-content: flex-start;
        `}
`

const Title = styled.div<{ $align: 'left' | 'center' }>`
  display: flex;
  flex-direction: column;
  align-items: ${({ $align }) => ($align === 'center' ? 'center' : 'flex-start')};
  justify-content: center;
`

const H1 = styled.div`
  font-weight: 700;
  font-size: 18px;
  line-height: 24px;
  color: #1d1d1e;
`

const Sub = styled.div`
  margin-top: 2px;
  font-size: 12px;
  line-height: 16px;
  color: rgba(29, 29, 30, 0.6);
`

/* Вспомогательная кнопка-иконка — по желанию */
export const IconButton = styled.button`
  width: 32px;
  height: 32px;
  border: 0;
  background: transparent;
  border-radius: 10px;
  display: grid;
  place-items: center;
  cursor: pointer;

  &:active {
    transform: translateY(1px);
  }
`
