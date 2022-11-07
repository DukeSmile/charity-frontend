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
        <p className="py-10">Total donated To all causes</p>
        {props.loading &&(          
          <div className="p-10 mx-20 flex items-center">
            <CircularProgress size='2vh'/>
          </div>
        )}
      </div>
        {
          donateHistories.map((history:donationProp, index:number) => {
            const charityIndex = charities.findIndex((item) => item.address === history.to);
            return (
              <Grid container spacing={1} key={index} className="border p-5 ">
                <Grid item xs={4} className="overflow-hidden">
                    { charityIndex >= 0 ? charities[charityIndex].catalog.name : 'black charity' }
                </Grid>
                <Grid item xs={4} className="overflow-hidden">
                    { history.currency }
                </Grid>
                <Grid item xs={4} className="overflow-hidden">
                    { Web3.utils.fromWei(history.amount) }
                </Grid>
              </Grid>
            )
          })
        }
    </div>
  )
}