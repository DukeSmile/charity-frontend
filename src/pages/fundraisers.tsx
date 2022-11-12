import { Grid } from "@material-ui/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Web3 from "web3";

import { getContract } from "../core/constants/base";
import { FromNetwork } from "../networks";
import { charityProp } from "../core/interfaces/base";
import { setCharities, setFundRaisers, setLoading } from "../core/store/slices/bridgeSlice";
import { useWeb3Context } from "../hooks/web3Context";

export const FundRaisersPage = () => {
  const dispatch = useDispatch();
  const fundRaisers = useSelector( (state:any) => state.app.fundRaisers);
  const isOwner = useSelector( (state:any) => state.app.isOwner);
  const {connected, address} = useWeb3Context();
  const style={
    btn: 'border-2 rounded-10 text-black hover:text-white hover:bg-limedSqruce p-5 m-10'
  };
  const blockCharity = async(index: number) => {
    if(connected && address != '') {
      dispatch(setLoading(true));
      let ddaContract = getContract('DDAContract');
      try{
        await ddaContract.methods.blackCharity(index).send({from: address});
      }
      catch (e) {
        console.log(e);
      }
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="p-20">
      <Grid container spacing={2}>
        <Grid item xs={12} className="text-24 font-bold text-center">FundRaisers</Grid> 
        {
          fundRaisers.map((charity:charityProp) => {
            return (
              <Grid sm={6} md={4} lg={3} item key={charity.index}>
                <div className="shadow-default p-10 rounded-10 h-full w-full">
                  <div className="font-bold text-center">{charity.catalog.title}</div>
                  <div><label className="font-bold">Full Name</label> : {charity.catalog.name}</div>
                  <div><label className="font-bold">Contact Email</label> : {charity.catalog.email}</div>
                  <div className="flex h-60 overflow-hidden">
                    <div className="font-bold">Summary:</div>
                    <div>{charity.catalog.summary}</div>
                  </div>
                  <div><label className="font-bold">Country</label> : {charity.catalog.country}</div>
                  <div><label className="font-bold">Location</label> : {charity.catalog.location}</div>
                  <div><label className="font-bold">Fund</label> : {Web3.utils.fromWei(charity.fund)}</div>
                  <div className="my-10">
                    <Link to={`/donate/${charity.index}`} className={style.btn}>Donate</Link>
                    {isOwner > 2 && 
                      (<button className={style.btn} onClick={() => blockCharity(charity.index)}>Block This</button>)
                    }
                  </div>
                </div>
              </Grid>
            )
          })
        }
      </Grid>
    </div>
  );
}