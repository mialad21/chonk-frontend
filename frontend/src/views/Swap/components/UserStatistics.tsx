import React from 'react'
import styled from 'styled-components'
import { CopyIcon, Text } from '@pancakeswap/uikit'
import { VStack, HStack } from './Stacks'
import { useTranslation } from "../../../contexts/Localization";

const Container = styled.div`
  border-radius: 16px;
  padding-left: 10px;
  padding-right: 10px;
  background-color: ${({ theme }) => theme.colors.input};
  box-shadow: ${({ theme }) => theme.shadows.inset};
`

interface UserStatisticsProps {
  holdingsCHONK: string
  holdingsUSDT: string
  percentageOfPoolSize: string
  reflink: string
}

export default function UserStatistics({
  holdingsCHONK,
  holdingsUSDT,
  percentageOfPoolSize,
  reflink
}: UserStatisticsProps) {
  const { t } = useTranslation()

  return (
    <Container>
      <VStack spacing="0" style={{padding: "20px", height:"200px"}}>
        <Text bold fontSize="20px" style={{paddingBottom:"10px"}}>{t('My Holdings')}</Text>
        <Text>{holdingsCHONK} CHONK ({holdingsUSDT} USDT)</Text>
        <Text>{percentageOfPoolSize}% of pool size</Text>
        <Text style={{marginTop: "20px"}}>{t('Earn 3% with your reflink')}:</Text>
        <HStack spacing="5">
          <Text style={{alignContent: "center", textDecorationLine: "underline"}}>{reflink}</Text>
          <CopyIcon onClick={() => navigator.clipboard.writeText(reflink)}/>
        </HStack>
      </VStack>
    </Container>
  )
}
