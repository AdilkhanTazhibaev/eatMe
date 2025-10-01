import React from 'react'
import styled from 'styled-components'
import TitleSubtitle, { type TitleLevel } from '../TitleSubtitle'

export interface NavigationLinkProps {
  title: string
  caption?: string
  icon?: React.ReactNode
  action?: React.ReactNode
  actionBg?: number
  level?: TitleLevel
}

const Wrapper = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  padding-bottom: 16px;
  padding-top: 16px;
`

const Caption = styled.div`
  flex: 1;
`

const WrapperAction = styled.div<{ $bg: number }>`
  padding: 12px;
  background: ${({ theme, $bg }) => theme.raw.colors.neutral[$bg]};
  border-radius: 16px;
  display: flex;
`
const NavigationLink: React.FC<NavigationLinkProps> = ({
  title,
  caption,
  icon,
  action,
  level = 'h6',
  actionBg = 50,
}: NavigationLinkProps) => {
  return (
    <>
      <Wrapper>
        {icon}
        <Caption>
          <TitleSubtitle level={level} title={title} caption={caption} />
        </Caption>

        {action && <WrapperAction $bg={actionBg}>{action}</WrapperAction>}
      </Wrapper>
    </>
  )
}

export default NavigationLink
