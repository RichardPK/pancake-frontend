import React from 'react'
import { getBalanceNumber } from 'utils/formatBalance'
import { useSousEarnings } from 'hooks/useEarnings'
import { Td } from 'components/Table'
import Balance from 'components/Balance'
import Label from 'components/Label'
import useI18n from 'hooks/useI18n'

interface EarnedProps {
  sousId: number
  tokenName: string
  tokenDecimals: number
  isFinished: boolean
}

const Earned: React.FC<EarnedProps> = ({ sousId, tokenName, tokenDecimals, isFinished }) => {
  const earnings = useSousEarnings(sousId)
  const TranslateString = useI18n()

  return (
    <Td align="right" width="150px">
      <Balance value={getBalanceNumber(earnings, tokenDecimals)} isDisabled={isFinished} fontSize="16px" />
      <Label isFinished={isFinished && sousId !== 0} text={TranslateString(330, `${tokenName} earned`)} />
    </Td>
  )
}

export default Earned
