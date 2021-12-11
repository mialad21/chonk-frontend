import React from 'react'
import styled from 'styled-components'
import { Text } from '@pancakeswap/uikit'
import { VStack } from '../../Swap/components/Stacks'

const Container = styled.div`
  border-radius: 16px;
  margin: 20px;
  background-color: ${({ theme }) => theme.colors.input};
  box-shadow: ${({ theme }) => theme.shadows.inset};
`

const EntryWrapper = styled.div`
`

interface EntryProps {
  label: string
  value: string
  isBnbAndHasUsdtValue: boolean
  usdtValue?: string
}
function Entry({
  label,
  value,
  isBnbAndHasUsdtValue = false,
  usdtValue
}: EntryProps) {
  return (
    <EntryWrapper>
      <Text bold>{label}:</Text>
      <Text>{value}{isBnbAndHasUsdtValue ? ` BNB (~ ${usdtValue} USDT)` : ""}</Text>
    </EntryWrapper>
  )
}

interface PlatfromStatisticsProps {
  totalUsers: string
  totalValueLockedBNB: string
  totalValueLockedUSDT: string
  totalRewardsBNB: string
  totalRewardsUSDT: string
}

export default function PlatformStatistics({
  totalUsers,
  totalValueLockedBNB,
  totalValueLockedUSDT,
  totalRewardsBNB,
  totalRewardsUSDT
}: PlatfromStatisticsProps) {
  return (
    <Container>
      <VStack spacing="20" style={{margin: "20px"}}>
        <Text bold fontSize="20px">Statistics</Text>
        <Entry label="Total Users" value={totalUsers} isBnbAndHasUsdtValue={false}/>
        <Entry label="Total Value Locked" value={totalValueLockedBNB} isBnbAndHasUsdtValue usdtValue={totalValueLockedUSDT}/>
        <Entry label="Total Rewards" value={totalRewardsBNB} isBnbAndHasUsdtValue usdtValue={totalRewardsUSDT}/>
      </VStack>
    </Container>
  )
}
