import ArrowRight from '@/assets/icons/arrow-right.svg?react'
import Search from '@/assets/icons/search-icon.svg?react'
import { CardWrapper, Grid } from '@/components/snippets'
import { raw } from '@theme/tokens.ts'
import Divider from '@ui/Divider'
import { SearchInput } from '@ui/SearchInput'
import TitleSubtitle from '@ui/TitleSubtitle'
import Text from '@ui/typography/Text.tsx'
import styled from 'styled-components'

export function Programs() {
  return (
    <>
      <CardWrapper $color={0}>
        <Grid $gap={12}>
          <TitleSubtitle
            level={'h6'}
            title={'Программы'}
            caption={'Выберите или подберите подходящую'}
          ></TitleSubtitle>
          <SearchInput placeholder={'Подобрать подходящую программу'} icon={<Search />} />
          <Divider />
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              justifyContent: 'center',
              gap: 10,
            }}
          >
            {Array.from({ length: 7 }).map(() => (
              <Grid $gap={3} style={{ textAlign: 'center' }}>
                <ImageWrapper />
                <Text size={12}>Стандарт</Text>
              </Grid>
            ))}
            <Grid $gap={3} style={{ textAlign: 'center' }}>
              <ImageWrapper
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  background: raw.colors.brand['50'],
                }}
              >
                <ArrowRight />
              </ImageWrapper>
              <Text size={12} color={raw.colors.brand['500']}>
                Все
              </Text>
            </Grid>
          </div>
        </Grid>
      </CardWrapper>
    </>
  )
}

const ImageWrapper = styled.div`
  width: 100%;
  height: 74px;
  border-radius: 16px;
  background: antiquewhite;
  opacity: 1;
  top: 8px;
  left: 8px;
`
