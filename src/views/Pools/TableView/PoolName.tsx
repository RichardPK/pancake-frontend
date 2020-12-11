import { Text } from '@pancakeswap-libs/uikit'
import React from 'react'
import styled from 'styled-components'

interface PoolNameProps {
  tokenName: string
}

const StyledPoolName = styled.div`
  align-items: center;
  display: flex;
`

const Image = styled.img`
  height: auto;
  width: 24px;
`

const PoolName: React.FC<PoolNameProps> = ({ tokenName }) => (
  <td>
    <StyledPoolName>
      <Image src={`/images/tokens/${tokenName}.png`} alt={`${tokenName} logo`} />
      <Text ml="8px">{tokenName}</Text>
    </StyledPoolName>
  </td>
)

export default PoolName
