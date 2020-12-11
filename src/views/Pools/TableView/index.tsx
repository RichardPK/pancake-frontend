import React from 'react'
import BigNumber from 'bignumber.js'
import useSushi from 'hooks/useSushi'
import { getPools } from 'sushi/utils'
import { Table } from 'components/Table'
import { Card, CardBody } from '@pancakeswap-libs/uikit'
import { QuoteToken } from 'sushi/lib/constants/types'
import useAllStakedValue from 'hooks/useAllStakedValue'
import { useBnbPriceUSD } from 'hooks/usePrices'
import Row from './Row'

const TableView = () => {
  const sushi = useSushi()
  const stakedValues = useAllStakedValue()
  const bnbPriceUSD = useBnbPriceUSD()
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

  console.log('pools', pools)
  return (
    <Card>
      <CardBody>
        <Table>
          <thead>
            <tr>
              <th>Pool</th>
              <th>APY</th>
              <th>CAKE Earned</th>
            </tr>
          </thead>
          <tbody>
            {pools.slice(0, 3).map((pool) => (
              <Row key={pool.sousId} pool={pool} cakePriceVsBNB={cakePriceVsBNB} />
            ))}
          </tbody>
        </Table>
      </CardBody>
    </Card>
  )
}

export default TableView
