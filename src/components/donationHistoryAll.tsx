import { Grid, CircularProgress } from "@material-ui/core";
import { useSelector } from "react-redux";
import Web3 from "web3";

import { donationProp, charityProp } from "../core/interfaces/base";

export const DonationHistoryAll = (props:any) => {

  const donateHistories = useSelector((state:any) => state.app.donateHistory);
  const charities:charityProp[] = useSelector((state:any) => state.app.allCharities);

  return (
    <div className="my-20">
      <div className="flex items-center">
        {props.loading &&(          
          <div className="p-10 mx-20 flex items-center">
            <CircularProgress size='2vh'/>
          </div>
        )}
      </div>
        {
          donateHistories.map((history:donationProp, index:number) => {
            const charityIndex = charities.findIndex((item) => item.address === history.to);
            const wAddress = charities[charityIndex].address;
            return (
              <Grid container spacing={1} key={index} className="border-b-1 p-5 ">
                <Grid item xs={4} className="overflow-hidden text-center">
                    { charityIndex >= 0 ? (wAddress.slice(0,7) + '.....' + wAddress.slice(wAddress.length-5, wAddress.length)) : 'black charity' }
                </Grid>
                <Grid item xs={4} className="overflow-hidden text-center">
                    { history.currency }
                </Grid>
                <Grid item xs={4} className="overflow-hidden text-center">
                    { Web3.utils.fromWei(history.amount) }
                </Grid>
              </Grid>
            )
          })
        }
    </div>
  )
}