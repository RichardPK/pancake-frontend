import React from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import orderBy from 'lodash/orderBy'
import useSushi from 'hooks/useSushi'
import { getPools } from 'sushi/utils'
import { Table, Th } from 'components/Table'
import { Card, CardBody } from '@pancakeswap-libs/uikit'
import { QuoteToken } from 'sushi/lib/constants/types'
import useAllStakedValue from 'hooks/useAllStakedValue'
import { useBnbPriceUSD } from 'hooks/usePrices'
import useUserBnbBalance from 'hooks/rework/useBnbBalance'
import Row from './Row'

const TableCardBody = styled(CardBody)`
  min-width: 375px;
  overflow: auto;
`

const TableView = () => {
  const sushi = useSushi()
  const stakedValues = useAllStakedValue()
  const bnbPriceUSD = useBnbPriceUSD()
  const userBnbBalance = useUserBnbBalance()
  const cakePriceVsBNB = stakedValues.find((s) => s.tokenSymbol === 'CAKE')?.tokenPrice || new BigNumber(0)
  const priceToBnb = (tokenName: string, tokenPrice: BigNumber, quoteToken: QuoteToken) => {
    if (tokenName === 'BNB') {
      return new BigNumber(1)
    }
    if (tokenPrice && quoteToken === QuoteToken.BUSD) {
      return tokenPrice.div(bnbPriceUSD)
    }
    return tokenPrice
  }

  const pools = getPools(sushi).map((pool) => {
    const stakedValue = stakedValues.find((s) => s.tokenSymbol === pool.tokenName)

    return {
      ...pool,
      tokenPrice: priceToBnb(pool.tokenName, stakedValue?.tokenPrice, stakedValue?.quoteToken),
    }
  })
  const openPools = pools.filter((pool) => !pool.isFinished)

  return (
    <Card>
      <TableCardBody>
        <Table>
          <thead>
            <tr>
              <Th>Pool</Th>
              <Th align="right">APY</Th>
              <Th align="right">Earned</Th>
              <Th align="center">Harvest</Th>
              <Th>Stake</Th>
            </tr>
          </thead>
          <tbody>
            {orderBy(openPools, ['sortOrder']).map((pool) => (
              <Row key={pool.sousId} pool={pool} cakePriceVsBNB={cakePriceVsBNB} userBnbBalance={userBnbBalance} />
            ))}
          </tbody>
        </Table>
      </TableCardBody>
    </Card>
  )
}

export default TableView
