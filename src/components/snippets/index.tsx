import styled from 'styled-components'

export const HeadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`
export const Container = styled.div<{ $bg?: number }>`
  background: ${({ $bg, theme }) => theme.raw.colors.neutral[$bg]};
`

export const FlexWrap = styled.div<{ $gap?: number }>`
  display: flex;
  align-items: center;
  gap: ${({ $gap }) => $gap + 'px'};
`

export const WrapBetween = styled.div`
  padding-right: 16px;
  padding-left: 16px;
`
export const Wrap = styled.div`
  padding: 16px;
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

export const IconContent = styled.div<{ $width?: number; $height?: number }>`
  background: ${({ theme }) => theme.raw.colors.neutral[100]};
  width: ${({ $width }) => $width || 44}px;
  height: ${({ $height }) => $height || 44}px;
  border-radius: 16px;
`

export const CardWrapper = styled.div<{ $color?: number; $padding?: number }>`
  background: ${({ theme, $color }) => theme.raw.colors.neutral[$color]};
  padding: ${({ $padding }) => ($padding ? $padding + 'px' : 16 + 'px')};
  border-radius: 24px;
`
export const Carousel = styled.div`
  min-width: 0; /* <-- критично */
  overflow: hidden; /* чтобы не было горизонтального скролла */

  .swiper {
    width: 100%; /* свайпер равен контейнеру */
  }

  .swiper-slide {
    /* чтобы карточка не распирала слайд */
  }
`

export const Rail = styled.div`
  min-width: 0;

  border-radius: 16px;
  overflow: hidden;

  .swiper {
    width: 100%;
  }

  .swiper-wrapper {
    align-items: stretch;
  }

  .swiper-slide {
    width: 300px;
    display: flex;
  }
`
