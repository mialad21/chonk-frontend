import React, { useState, useEffect } from 'react'
import { calculateUSDTFromBNB } from 'utils/currencyCalculations'
import Page from '../../Page'
import PlatformStatistics from './PlatformStatistics'
import { useChonk } from "../../../hooks/useContract";

const Overview: React.FC = () => {
  const [totalUsers, setTotalUsers] = useState("0");
  const [totalValueLocked, setTotalValueLocked] = useState("0");
  const [totalRewards] = useState("0");
  const chonkContract = useChonk();

  useEffect(() => {
      /*
      const getData = async () => {
          const promises = [
              chonkContract.totalBnbBalance(),
              chonkContract.getTokenHolderAmount(),
          ];
          await Promise.all(promises).then((values) => {
              setTotalValueLocked(BigInt(values[0]._hex).toString());
              setTotalUsers(BigInt(values[1]._hex).toString())
          });
      }
      getData();
       */
  }, [chonkContract])

  return (
    <Page>
      <PlatformStatistics
          totalUsers={totalUsers}
          totalValueLockedBNB={totalValueLocked}
          totalValueLockedUSDT={calculateUSDTFromBNB(totalValueLocked)}
          totalRewardsBNB={totalRewards}
          totalRewardsUSDT={calculateUSDTFromBNB(totalRewards)}
      />
    </Page>
  )
}

export default Overview
