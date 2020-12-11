import React, { useState } from 'react'
import BigNumber from 'bignumber.js'
import { useSousTotalStaked } from 'hooks/useStakedBalance'
import { QuoteToken, PoolCategory, Pool } from 'sushi/lib/constants/types'
import PoolName from './PoolName'
import Apy from './Apy'
import Earned from './Earned'
import Harvest from './Harvest'
import Action from './Action'
import PoolTag from './PoolTag'

type PoolWithTokenPrice = {
  tokenPrice: BigNumber
} & Pool

interface RowProps {
  pool: PoolWithTokenPrice
  cakePriceVsBNB: BigNumber
  userBnbBalance: BigNumber
}

const Row: React.FC<RowProps> = ({ pool, cakePriceVsBNB, userBnbBalance }) => {
  const {
    sousId,
    tokenName,
    isFinished,
    stakingTokenName,
    poolCategory,
    tokenPrice,
    tokenPerBlock,
    tokenDecimals,
    stakingTokenAddress,
    harvest,
  } = pool
  const [pendingTx, setPendingTx] = useState(false)
  const isOldSyrup = stakingTokenName === QuoteToken.SYRUP
  const isBnbPool = poolCategory === PoolCategory.BINANCE
  const totalStaked = useSousTotalStaked(sousId, isBnbPool)

  return (
    <tr key={sousId}>
      <PoolName tokenName={tokenName} />
      <PoolTag poolCategory={poolCategory} />
      <Apy
        cakePriceVsBNB={cakePriceVsBNB}
        tokenPrice={tokenPrice}
        isBnbPool={isBnbPool}
        isOldSyrup={isOldSyrup}
        tokenPerBlock={tokenPerBlock}
        isFinished={isFinished}
        totalStaked={totalStaked}
      />
      <Earned sousId={sousId} tokenName={tokenName} tokenDecimals={tokenDecimals} isFinished={isFinished} />
      <Harvest
        sousId={sousId}
        isBnbPool={isBnbPool}
        isOldSyrup={isOldSyrup}
        harvest={harvest}
        pendingTx={pendingTx}
        setPendingTx={setPendingTx}
      />
      <Action
        sousId={sousId}
        stakingTokenName={stakingTokenName}
        stakingTokenAddress={stakingTokenAddress}
        isFinished={isFinished}
        isBnbPool={isBnbPool}
        isOldSyrup={isOldSyrup}
        userBnbBalance={userBnbBalance}
        pendingTx={pendingTx}
        setPendingTx={setPendingTx}
      />
    </tr>
  )
}

export default Row
