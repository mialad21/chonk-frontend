import React, {useState} from 'react'
import styled from 'styled-components'
import { Button, Text } from '@pancakeswap/uikit'
import { ethers } from "ethers";
import { escapeRegExp } from '../../../utils'
import { VStack, HStack } from './Stacks'
import { Input as NumericalInput } from '../../../components/CurrencyInputPanel/NumericalInput'

import { useChonk } from "../../../hooks/useContract";
import useToast from "../../../hooks/useToast";
import { useTranslation } from "../../../contexts/Localization";
import useActiveWeb3React from "../../../hooks/useActiveWeb3React";
import {
  FetchStatus,
  useGetBnbBalance,
  useGetChonkBalance
} from "../../../hooks/useTokenBalance";

const Container = styled.div`
  border-radius: 16px;
  margin: 20px;
  background-color: ${({ theme }) => theme.colors.input};
  box-shadow: ${({ theme }) => theme.shadows.inset};
`

const inputRegex = RegExp(`^\\d*(?:\\\\[.])?\\d*$`) // match escaped "." characters via in a non-capturing group

interface TradeChonkInputPanelProps {
  label: string
  value: string
  onChange: (value: string) => void
  onMax: (value: string) => void
  currency: string
  secondaryValue: string
  secondaryCurrency: string
  valueUSDT: string
  hasGreenButton: boolean
}
export default function TradeChonkInputPanel({
  label,
  value,
  onChange,
  onMax,
  currency,
  secondaryValue,
  secondaryCurrency,
  valueUSDT,
  hasGreenButton,
}: TradeChonkInputPanelProps) {
  const enforcer = (nextUserInput: string) => {
    if (nextUserInput === '' || inputRegex.test(escapeRegExp(nextUserInput))) {
      onChange(nextUserInput)
    }
  }
  const { account } = useActiveWeb3React()
  const { balance, fetchStatus } = useGetBnbBalance()
  const { chonkBalance, chonkFetchStatus } = useGetChonkBalance()
  const [isApproving, setIsApproving] = useState(false)
  const chonkContract = useChonk();
  const { toastError } = useToast()
  const { t } = useTranslation()


  const handleApprove = async () => {
    let tx;
    if (hasGreenButton) {
      const ref = '0x0000000000000000000000000000000000000000';
      tx = await chonkContract.buy(ref, ethers.utils.parseEther(value))
    } else {
      tx = await chonkContract.sell(0)
    }
    setIsApproving(true)
    const receipt = await tx.wait()
    if (!receipt.status) {
      toastError(t('Error'), t('Please try again.'))
      setIsApproving(false)
    }
  }

  const handleMax = async () => {
    if (fetchStatus === FetchStatus.SUCCESS && currency === "BNB") {
      onMax(ethers.utils.formatEther(balance));
    } else if (chonkFetchStatus === FetchStatus.SUCCESS && currency === "CHONK") {
      onMax(ethers.utils.formatEther(chonkBalance));
    }
  }

  return (
    <Container>
      <VStack spacing="10" style={{padding: "20px", height:"200px"}}>
        <Text bold fontSize="20px" style={{paddingBottom:"10px"}}>{label} {currency}</Text>
        <HStack spacing="15">
          <HStack spacing="2">
            <HStack spacing="5" style={{borderWidth: "1px", borderStyle: "solid", borderRadius: "7px", paddingInline: "7px"}}>
              <NumericalInput style={{minWidth:"50px", width: "100%"}} value={value} onUserInput={(input) => {enforcer(input)}}/>
              <Button scale="sm" variant="text" style={{padding: "0px"}} onClick={handleMax}>Max</Button>
            </HStack>
            <Text>{currency}</Text>
          </HStack>
          {!account ?
              <Button
                  disabled
                  scale="sm"
              >{label}</Button>
              :
              <Button
                  disabled={isApproving}
                  scale="sm"
                  variant={hasGreenButton ? "success" : "danger"}
                  onClick={handleApprove}
              >{label}</Button>
          }

        </HStack>
        <VStack spacing="0" style={{paddingLeft: "6px"}}>
          <Text fontSize="14px">~ {secondaryValue} {secondaryCurrency}</Text>
          <Text fontSize="14px">~ {valueUSDT} USDT</Text>
        </VStack>
      </VStack>
    </Container>
  )
}
