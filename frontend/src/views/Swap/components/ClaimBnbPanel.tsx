import React, {useState} from 'react'
import { Button, Text } from '@pancakeswap/uikit'
import styled from 'styled-components'
import { VStack, HStack } from './Stacks'
import { useChonk } from "../../../hooks/useContract";
import useToast from "../../../hooks/useToast";
import { useTranslation } from "../../../contexts/Localization";
import useActiveWeb3React from "../../../hooks/useActiveWeb3React";

const Container = styled.div`
  border-radius: 16px;
  margin: 20px;
  background-color: ${({ theme }) => theme.colors.input};
  box-shadow: ${({ theme }) => theme.shadows.inset};
`

interface ClaimBnbPanelProps {
  value: string
  usdtValue: string
}
export default function ClaimBnbPanel({
  value,
  usdtValue,
}: ClaimBnbPanelProps) {
  const { account } = useActiveWeb3React()
  const [isApproving, setIsApproving] = useState(false)
  const chonkContract = useChonk();
  const { toastError } = useToast()
  const { t } = useTranslation()

  const handleReinvest = async () => {
    const tx = await chonkContract.reinvest();
    setIsApproving(true)
    const receipt = await tx.wait();
    if (!receipt.status) {
      toastError(t('Error'), t('Please try again.'));
      setIsApproving(false);
    }
  }

  const handleClaim = async () => {
    const tx = await chonkContract.withdraw();
    setIsApproving(true)
    const receipt = await tx.wait();
    if (!receipt.status) {
      toastError(t('Error'), t('Please try again.'));
      setIsApproving(false);
    }
  }

  return (
    <Container>
      <VStack spacing="10" style={{padding: "20px", height:"200px"}}>
        <Text bold fontSize="20px" style={{paddingBottom:"10px"}}>Rewards</Text>
        <Text style={{paddingLeft: "6px"}}>{value} BNB (~ {usdtValue} USDT)</Text>
        <HStack spacing="35" style={{paddingTop: "20px"}}>
          {!account ?
              <Button
                  disabled
                  scale="sm"
              >Reinvest</Button>
              :
              <Button
                  disabled={isApproving}
                  scale="sm"
                  variant="success"
                  onClick={handleReinvest}
              >Reinvest</Button>
          }
          {!account ?
              <Button
                  disabled
                  scale="sm"
              >Claim</Button>
              :
              <Button
                  disabled={isApproving}
                  scale="sm"
                  variant="danger"
                  onClick={handleClaim}
              >Claim</Button>
          }
        </HStack>
      </VStack>
    </Container>
  )
}
