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
export const Shell = styled.div`
  min-height: 100dvh;
  display: flex;
  width: 100%;
  flex-direction: column;
  background: #f3f4f6;
  color: #1d1d1e;
`

export const IconWrap = styled.div<{ $color: number }>`
  background: ${({ theme, $color }) => theme.raw.colors.neutral[$color]};
  padding: 13px;
  border-radius: 16px;
  display: flex;
`

export const CardWrapper = styled.div<{ $color?: number; $padding?: number }>`
  background: ${({ theme, $color }) => theme.raw.colors.neutral[$color]};
  padding: ${({ $padding }) => ($padding ? $padding + 'px' : 16 + 'px')};
  border-radius: 24px;
`
export const Carousel = styled.div`
  min-width: 0;

  .swiper {
    //width: fit-content;
  }

  .swiper-slide {
    //width: fit-content;.
  }
`
