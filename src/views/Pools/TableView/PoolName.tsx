import React from 'react'
import { Text } from '@pancakeswap-libs/uikit'
import styled from 'styled-components'
import { PoolCategory } from 'sushi/lib/constants/types'
import { Td } from 'components/Table'
import { CommunityTag, CoreTag, BinanceTag } from 'components/Tags'

interface PoolNameProps {
  tokenName: string
  poolCategory: PoolCategory
}

const tags = {
  [PoolCategory.BINANCE]: BinanceTag,
  [PoolCategory.CORE]: CoreTag,
  [PoolCategory.COMMUNITY]: CommunityTag,
}

const PoolWrap = styled.div`
  display: inline-flex;
  flex-direction: column;

  ${({ theme }) => theme.mediaQueries.lg} {
    flex-direction: row;
  }
`

const StyledPoolName = styled.div`
  align-items: center;
  display: flex;
  margin-bottom: 8px;

  ${({ theme }) => theme.mediaQueries.lg} {
    margin-bottom: 0;
    margin-right: 8px;
  }
`

const Image = styled.img`
  height: auto;
  width: 24px;
`

const PoolName: React.FC<PoolNameProps> = ({ tokenName, poolCategory }) => {
  const Tag = tags[poolCategory]

  return (
    <Td>
      <PoolWrap>
        <StyledPoolName>
          <Image src={`/images/tokens/${tokenName}.png`} alt={`${tokenName} logo`} />
          <Text ml="8px">{tokenName}</Text>
        </StyledPoolName>
        <Tag />
      </PoolWrap>
    </Td>
  )
}

export default PoolName
