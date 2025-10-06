import Text from '@ui/typography/Text.tsx'
import React from 'react'
import styled from 'styled-components'

type Props = {
  title: string
  caption?: string
  icon: React.ReactNode
}

export function BottomBar({ title, caption, icon }: Props) {
  return (
    <Wrap>
      <WrapperContent>
        <WrapperText>
          <Text size={16} weight={'medium'}>
            {title}
          </Text>
          {caption && (
            <Text size={12} weight={'medium'}>
              {caption}
            </Text>
          )}
        </WrapperText>
        {icon}
      </WrapperContent>
    </Wrap>
  )
}

const Wrap = styled.div`
  height: 109px;
  width: 100%;
  position: absolute;
  bottom: 0;
  backdrop-filter: blur(20px);
  box-shadow: 0.5px 0.5px 0.5px 0px rgba(255, 255, 255, 0.6) inset;
`
const WrapperText = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
`
const WrapperContent = styled.div`
  display: flex;
`
