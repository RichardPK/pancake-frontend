import React, { useState } from 'react'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'
import { getBalanceNumber } from 'utils/formatBalance'
import { useSousEarnings } from 'hooks/useEarnings'
import { useSousReward } from 'hooks/useReward'
import { Td } from 'components/Table'
import Balance from 'components/Balance'
import { Button } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'

interface CakeEarnedProps {
  sousId: number
  tokenDecimals: number
  isFinished: boolean
  isBnbPool: boolean
  isOldSyrup: boolean
  harvest: boolean
}

const Cell = styled.div`
  align-items: center;
  display: flex;
`

const CakeEarned: React.FC<CakeEarnedProps> = ({
  sousId,
  tokenDecimals,
  isFinished,
  isBnbPool,
  isOldSyrup,
  harvest,
}) => {
  const [pendingTx, setPendingTx] = useState(false)
  const { account } = useWallet()
  const earnings = useSousEarnings(sousId)
  const { onReward } = useSousReward(sousId, isBnbPool)
  const TranslateString = useI18n()

  return (
    <Td align="center">
      <Cell>
        <Balance value={getBalanceNumber(earnings, tokenDecimals)} isDisabled={isFinished} fontSize="16px" />
        {account && harvest && !isOldSyrup && (
          <Button
            variant="secondary"
            size="sm"
            disabled={!earnings.toNumber() || pendingTx}
            onClick={async () => {
              try {
                setPendingTx(true)
                await onReward()
              } catch (error) {
                console.error(error)
              } finally {
                setPendingTx(false)
              }
            }}
            ml="16px"
          >
            {pendingTx ? TranslateString(999, 'Collecting') : TranslateString(999, 'Harvest')}
          </Button>
        )}
      </Cell>
    </Td>
  )
}

export default CakeEarned
