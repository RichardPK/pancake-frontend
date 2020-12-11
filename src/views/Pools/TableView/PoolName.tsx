import React from 'react'
import { Text } from '@pancakeswap-libs/uikit'
import styled from 'styled-components'
import { Td } from 'components/Table'

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

const PoolName: React.FC<PoolNameProps> = ({ tokenName }) => {
  return (
    <Td>
      <StyledPoolName>
        <Image src={`/images/tokens/${tokenName}.png`} alt={`${tokenName} logo`} />
        <Text ml="8px">{tokenName}</Text>
      </StyledPoolName>
    </Td>
  )
}

export default PoolName
