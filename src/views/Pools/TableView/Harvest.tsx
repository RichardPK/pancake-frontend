import React, { useState } from 'react'
import { useWallet } from 'use-wallet'
import { useSousEarnings } from 'hooks/useEarnings'
import { useSousReward } from 'hooks/useReward'
import { Td } from 'components/Table'
import { Button } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'

interface CakeEarnedProps {
  sousId: number
  isBnbPool: boolean
  isOldSyrup: boolean
  harvest: boolean
  pendingTx: boolean
  setPendingTx: (state: boolean) => void
}

const CakeEarned: React.FC<CakeEarnedProps> = ({ sousId, isBnbPool, isOldSyrup, harvest, pendingTx, setPendingTx }) => {
  const { account } = useWallet()
  const earnings = useSousEarnings(sousId)
  const { onReward } = useSousReward(sousId, isBnbPool)
  const TranslateString = useI18n()
  const isDisabled = !account || !harvest || isOldSyrup || !earnings.toNumber() || pendingTx

  const handleClick = async () => {
    try {
      setPendingTx(true)
      await onReward()
    } catch (error) {
      console.error(error)
    } finally {
      setPendingTx(false)
    }
  }

  return (
    <Td align="center" width="150px">
      <Button variant="secondary" size="sm" disabled={isDisabled} onClick={handleClick}>
        {pendingTx ? TranslateString(999, 'Collecting') : TranslateString(999, 'Harvest')}
      </Button>
    </Td>
  )
}

export default CakeEarned
