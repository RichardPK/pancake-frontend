import React, { useMemo } from 'react'
import { Text } from '@pancakeswap-libs/uikit'
import BigNumber from 'bignumber.js'
import { BLOCKS_PER_YEAR } from 'config'
import { getBalanceNumber } from 'utils/formatBalance'
import Balance from 'components/Balance'
import { Td } from 'components/Table'

interface ApyProps {
  cakePriceVsBNB: BigNumber
  tokenPrice: BigNumber
  isBnbPool: boolean
  totalStaked: BigNumber
  tokenPerBlock: string
  isFinished: boolean
  isOldSyrup: boolean
}

const Apy: React.FC<ApyProps> = ({
  cakePriceVsBNB,
  tokenPrice,
  isBnbPool,
  totalStaked,
  tokenPerBlock,
  isFinished,
  isOldSyrup,
}) => {
  const apy: BigNumber = useMemo(() => {
    if (cakePriceVsBNB?.isEqualTo(0) || tokenPrice?.isEqualTo(0)) return null
    const stakedTokenPrice: BigNumber = isBnbPool ? new BigNumber(1) : cakePriceVsBNB

    const a = tokenPrice.times(BLOCKS_PER_YEAR).times(tokenPerBlock)
    const b = stakedTokenPrice.times(getBalanceNumber(totalStaked))

    return a.div(b).times(100)
  }, [cakePriceVsBNB, isBnbPool, tokenPerBlock, tokenPrice, totalStaked])

  return (
    <Td width="100px" align="center">
      <Text>
        {isFinished || isOldSyrup || !apy || apy?.isNaN() ? (
          '-'
        ) : (
          <Balance fontSize="14px" isDisabled={isFinished} value={apy?.toNumber()} decimals={2} unit="%" />
        )}
      </Text>
    </Td>
  )
}

export default Apy
