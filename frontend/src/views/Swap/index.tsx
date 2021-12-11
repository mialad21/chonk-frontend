import React, {useState, useEffect} from 'react'

import { calculateCHONKFromBNB, calculateBNBFromCHONK, calculateUSDTFromBNB, calculateUSDTFromCHONK, calculatePoolSize } from 'utils/currencyCalculations'
import { getTimeRemaining, isCountdownDone } from 'utils/countdownCalculations'

import {Card, Text} from '@pancakeswap/uikit'
import styled, {keyframes} from "styled-components";
import Page from '../Page'

import TradeChonkInputPanel from './components/TradeChonkInputPanel'
import ClaimBnbPanel from './components/ClaimBnbPanel'
import UserStatistics from './components/UserStatistics'
import { VStack, HStack } from './components/Stacks'
import { useTranslation } from "../../contexts/Localization";
import {useChonk} from "../../hooks/useContract";
import {getSrcSet} from "../Home/components/CompositeImage";

const flyingAnim = () => keyframes`
  from {
    transform: translate(0,  0px);
  }
  50% {
    transform: translate(-5px, -5px);
  }
  to {
    transform: translate(0, 0px);
  }  
`
const ChonkWrapper = styled.div`
  width: 25%;
  animation: ${flyingAnim} 3.5s ease-in-out infinite;
`
const imagePath = '/images/home/lunar-bunny/'
const imageSrc = 'chonk'

export default function Swap() {
  const [countdown, setCountdown] = useState(getTimeRemaining());
  const [bnbValue, setBnbValue] = useState("");
  const [chonkValue, setChonkValue] = useState("");
  const [bnbRewards] = useState("2")
  const [chonkHoldings, setChonkHoldings] = useState("0");
  const [reflink] = useState("https://reflink.com");
  const { t } = useTranslation()
  const chonkContract = useChonk();

  useEffect(() => {
    const timer = !isCountdownDone() && setInterval(() => setCountdown(getTimeRemaining()), 1000); 
    return() => clearInterval(timer);
  }, []);

  useEffect(() => {
    /*
    const getData = async () => {
      const promises = [
        chonkContract.myTokens()
      ];
      await Promise.all(promises).then((values) => {
        setChonkHoldings(BigInt(values[0]._hex).toString())
      });
    }
    getData(); */
  }, [chonkContract])

  return (
    <Page>
      {true ? <HStack spacing="20">
        <Card style={{borderRadius: "24px", width: "100%", maxWidth: "436px"}}>
          <VStack spacing="20" style={{margin: "25px"}}>
            <TradeChonkInputPanel
                label={t('Spend')}
                value={bnbValue}
                onChange={setBnbValue}
                onMax={setBnbValue}
                currency="BNB"
                secondaryValue={calculateCHONKFromBNB(bnbValue)}
                secondaryCurrency="CHONK"
                valueUSDT={calculateUSDTFromBNB(bnbValue)}
                hasGreenButton
            />
            <TradeChonkInputPanel
                label={t('Sell')}
                value={chonkValue}
                onChange={setChonkValue}
                onMax={setChonkValue}
                currency="CHONK"
                secondaryValue={calculateBNBFromCHONK(chonkValue)}
                secondaryCurrency="BNB"
                valueUSDT={calculateUSDTFromCHONK(chonkValue)}
                hasGreenButton={false}
            />
          </VStack>
        </Card>
        <Card style={{borderRadius: "24px", width: "100%", maxWidth: "336px"}}>
          <VStack spacing="20" style={{margin: "25px"}}>
            <ClaimBnbPanel value={bnbRewards} usdtValue={calculateUSDTFromBNB(bnbRewards)}/>
            <UserStatistics
                holdingsCHONK={chonkHoldings}
                holdingsUSDT={calculateUSDTFromCHONK(chonkHoldings)}
                percentageOfPoolSize={calculatePoolSize(chonkHoldings)}
                reflink={reflink}
            />
          </VStack>
        </Card>
      </HStack> : 
      <VStack spacing="-20" style={{paddingTop:"50px", alignItems: "center"}}>
        <ChonkWrapper>
          <img src={`${imagePath}${imageSrc}.png`} srcSet={getSrcSet(imagePath, imageSrc)} alt={t('Lazy chonk')} />
        </ChonkWrapper>
        <br/><br/><br/>
        <Text fontSize="75px" >{t('Official launch in')}</Text>
        <Text fontSize="100px">{countdown}</Text>
        <Text fontSize="35px" color="gray">{t('17th Jan 2022 22:00')} UTC</Text>
      </VStack>}
    </Page>
  )
}
