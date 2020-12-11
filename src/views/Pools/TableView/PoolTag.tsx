import React from 'react'
import { PoolCategory } from 'sushi/lib/constants/types'
import { CommunityTag, CoreTag, BinanceTag } from 'components/Tags'
import { Td } from 'components/Table'

interface PoolNameProps {
  poolCategory: PoolCategory
}

const tags = {
  [PoolCategory.BINANCE]: BinanceTag,
  [PoolCategory.CORE]: CoreTag,
  [PoolCategory.COMMUNITY]: CommunityTag,
}

const PoolName: React.FC<PoolNameProps> = ({ poolCategory }) => {
  const Tag = tags[poolCategory]

  return (
    <Td align="center">
      <Tag />
    </Td>
  )
}

export default PoolName
