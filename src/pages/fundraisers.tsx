import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getContract } from "../core/constants/base";
import { FromNetwork } from "../networks";

import { charityProp } from "../core/interfaces/base";
import { setCharities, setFundRaisers } from "../core/store/slices/bridgeSlice";
import { Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import Web3 from "web3";
import { useWeb3Context } from "../hooks/web3Context";

export const FundRaisersPage = () => {
  const fundRaisers = useSelector( (state:any) => state.app.fundRaisers);
  const {connected, address} = useWeb3Context();
  const style={
    btn: 'border-1 rounded-10 text-black hover:text-white hover:bg-limedSqruce p-5 m-10'
  };
  const blockCharity = async(index: number) => {
    if(connected && address != '') {
      let ddaContract = getContract('DDAContract');
      try{
        await ddaContract.methods.blackCharity(index).send({from: address});
      }
      catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <div className="p-20">
      <Grid container spacing={2}>
        <Grid item xs={12} className="text-24 font-bold text-center">FundRaisers</Grid> 
        {
          fundRaisers.map((charity:charityProp) => {
            return (
              <Grid sm={6} md={4} lg={3} item className="border rounded-10 shadow-default p-10" key={charity.index}>
                <div className="font-bold text-center">{charity.catalog.title}</div>
                <div>Full Name : {charity.catalog.name}</div>
                <div>Contact Email : {charity.catalog.email}</div>
                <div className="flex">
                  <div>Summary:</div>
                  <div>{charity.catalog.summary}</div>
                </div>
                <div>Country : {charity.catalog.country}</div>
                <div>Location : {charity.catalog.country}</div>
                <div>Fund : {Web3.utils.fromWei(charity.fund)}</div>
                <div>
                  <Link to={`/donate/${charity.index}`} className={style.btn}>Donate</Link>
                  <button className={style.btn} onClick={() => blockCharity(charity.index)}>Block This</button>
                </div>
              </Grid>
            )
          })
        }
      </Grid>
    </div>
  );
}