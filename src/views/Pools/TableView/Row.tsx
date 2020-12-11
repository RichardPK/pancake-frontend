import React from 'react'
import BigNumber from 'bignumber.js'
import { useSousTotalStaked } from 'hooks/useStakedBalance'
import { QuoteToken, PoolCategory, Pool } from 'sushi/lib/constants/types'
import PoolName from './PoolName'
import Apy from './Apy'
import CakeEarned from './CakeEarned'

interface RowProps {
  pool: Pool
  cakePriceVsBNB: BigNumber
}

const Row: React.FC<RowProps> = ({ pool, cakePriceVsBNB }) => {
  const {
    sousId,
    tokenName,
    isFinished,
    stakingTokenName,
    poolCategory,
    tokenPrice,
    tokenPerBlock,
    tokenDecimals,
    harvest,
  } = pool
  const isOldSyrup = stakingTokenName === QuoteToken.SYRUP
  const isBnbPool = poolCategory === PoolCategory.BINANCE
  const totalStaked = useSousTotalStaked(sousId, isBnbPool)

  console.log('pool', pool)
  return (
    <tr key={sousId}>
      <PoolName tokenName={tokenName} />
      <Apy
        cakePriceVsBNB={cakePriceVsBNB}
        tokenPrice={tokenPrice}
        isBnbPool={isBnbPool}
        isOldSyrup={isOldSyrup}
        tokenPerBlock={tokenPerBlock}
        isFinished={isFinished}
        totalStaked={totalStaked}
      />
      <CakeEarned
        sousId={sousId}
        tokenDecimals={tokenDecimals}
        isFinished={isFinished}
        isOldSyrup={isOldSyrup}
        isBnbPool={isBnbPool}
        harvest={harvest}
      />
    </tr>
  )
}

export default Row
