import { Grid, CircularProgress } from "@material-ui/core";
import { useSelector } from "react-redux";
import Web3 from "web3";

import defaultImg from "../../assets/images/components/man.png";
import { monthLabels } from "../../core/constants/base";
import { donationProp } from "../../core/interfaces/base";

export const DonationHistoryCase = (props:any) => {

  const donateHistories = useSelector((state:any) => state.app.caseDonateHistory);
  const charities:any[] = useSelector((state:any) => state.app.allCharities);

  return (
    <div className="my-20">
      <div className="flex items-center">
        <p className="py-10 font-bold text-28">Your donations on this channel</p>
        {props.loading &&(
          <div className="p-10 mx-20 flex items-center">
            <CircularProgress size='2vh'/>
          </div>
        )}
      </div>
      {donateHistories.length == 0 && (
        <p>There is no donation on this case</p>
      )}
      {
        donateHistories.map((history:donationProp, index:number) => {
          const charityIndex = charities.findIndex((item) => item.address === history.to);
          const myDate = new Date(history.timeStamp * 1000);
          const wAddress = history.from;
          const donaterAddress = wAddress.slice(0,7) + '.....' + wAddress.slice(wAddress.length-5, wAddress.length);
          const donaterName = charityIndex >= 0 ? charities[charityIndex].name : donaterAddress;
          return (
            <Grid container spacing={1} key={index} className="border p-5 ">
              <Grid item xs={6} className="flex items-center">
                <img src={defaultImg} className="w-40 h-40 mr-10"/>
                <div>
                  <p className="text-16 text-brown font-bold">{donaterName}</p>
                  <p className="text-14 text-romance">{Web3.utils.fromWei(history.amount)} {history.currency}</p>
                </div>
              </Grid>
              <Grid item xs={6}>
                <div className="flex justify-center items-center h-full">
                  {monthLabels[myDate.getMonth()]} {myDate.getDate()}, {myDate.getFullYear()}
                </div>
              </Grid>
            </Grid>
          )
        })
      }
    </div>
  )
}