import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'
import BigNumber from 'bignumber.js'
import { Button, IconButton, useModal, AddIcon } from '@pancakeswap-libs/uikit'
import { useSousApprove } from 'hooks/useApprove'
import { useERC20 } from 'hooks/rework/useContract'
import { useSousStakedBalance } from 'hooks/useStakedBalance'
import { useSousAllowance } from 'hooks/useAllowance'
import { useSousStake } from 'hooks/useStake'
import useTokenBalance from 'hooks/useTokenBalance'
import { useSousUnstake } from 'hooks/useUnstake'
import { Td } from 'components/Table'
import UnlockButton from 'components/UnlockButton'
import DepositModal from '../components/DepositModal'
import WithdrawModal from '../components/WithdrawModal'

interface ActionProps {
  sousId: number
  stakingTokenName: string
  stakingTokenAddress: string
  isFinished: boolean
  isBnbPool: boolean
  isOldSyrup: boolean
  userBnbBalance: BigNumber
  pendingTx: boolean
  setPendingTx: (state: boolean) => void
}

const Cell = styled.div`
  align-items: center;
  display: flex;
`

const Action: React.FC<ActionProps> = ({
  sousId,
  stakingTokenName,
  stakingTokenAddress,
  isFinished,
  isBnbPool,
  isOldSyrup,
  userBnbBalance,
  pendingTx,
  setPendingTx,
}) => {
  const [requestedApproval, setRequestedApproval] = useState(false)
  const { account } = useWallet()
  const stakingTokenContract = useERC20(stakingTokenAddress)
  const allowance = useSousAllowance(stakingTokenContract, sousId)
  const { onApprove } = useSousApprove(stakingTokenContract, sousId)
  const stakedBalance = useSousStakedBalance(sousId)
  const { onStake } = useSousStake(sousId, isBnbPool)
  const tokenBalance = useTokenBalance(stakingTokenContract.options.address)
  const { onUnstake } = useSousUnstake(sousId)
  const accountHasStakedBalance = account && stakedBalance.toNumber() > 0
  const needsApproval = !accountHasStakedBalance && !allowance.toNumber() && !isBnbPool && !isOldSyrup
  const userBalance = isBnbPool ? userBnbBalance : tokenBalance

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      const txHash = await onApprove()
      // user rejected tx or didn't go thru
      if (!txHash) {
        setRequestedApproval(false)
      }
    } catch (e) {
      console.error(e)
    }
  }, [onApprove, setRequestedApproval])

  const [onPresentDeposit] = useModal(
    <DepositModal
      max={
        isBnbPool && userBalance.isGreaterThan(10)
          ? new BigNumber(10).multipliedBy(new BigNumber(10).pow(18))
          : userBalance
      }
      onConfirm={onStake}
      tokenName={isBnbPool ? `${stakingTokenName} (10 bnb max)` : stakingTokenName}
    />,
  )
  const [onPresentWithdraw] = useModal(
    <WithdrawModal max={stakedBalance} onConfirm={onUnstake} tokenName={stakingTokenName} />,
  )

  if (!account) {
    return (
      <Td>
        <UnlockButton size="sm" />
      </Td>
    )
  }

  return (
    <Td>
      {account && needsApproval ? (
        <Button disabled={isFinished || requestedApproval} onClick={handleApprove} size="sm">
          {`Approve ${stakingTokenName}`}
        </Button>
      ) : (
        <Cell>
          <Button
            disabled={stakedBalance.eq(new BigNumber(0)) || pendingTx}
            onClick={
              isOldSyrup
                ? async () => {
                    setPendingTx(true)
                    await onUnstake('0')
                    setPendingTx(false)
                  }
                : onPresentWithdraw
            }
            size="sm"
          >
            {`Unstake ${stakingTokenName}`}
          </Button>
          {!isOldSyrup && (
            <IconButton
              disabled={(isFinished && sousId !== 0) || pendingTx}
              onClick={onPresentDeposit}
              size="sm"
              ml="8px"
            >
              <AddIcon color="background" />
            </IconButton>
          )}
        </Cell>
      )}
    </Td>
  )
}

export default Action
