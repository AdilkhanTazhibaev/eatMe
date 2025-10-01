import styled from 'styled-components'

export const HeadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const Grid = styled.div<{ $gap: number }>`
  display: grid;
  gap: ${({ $gap }) => $gap + 'px'};
`
