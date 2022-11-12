import { Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Web3 from "web3";

import { charityProp } from "../core/interfaces/base";
import { useWeb3Context } from "../hooks/web3Context";
import { getContract } from "../core/constants/base";
import { setLoading } from "../core/store/slices/bridgeSlice";

export const CharitiesPage = () => {
  const dispatch = useDispatch();
  const charities = useSelector( (state:any) => state.app.charities);
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
        <Grid item xs={12} className="text-24 font-bold text-center">Charities</Grid> 
        {
          charities.map((charity:charityProp) => {
            return (
              <Grid sm={6} md={4} lg={3} item key={charity.index}>
                <div className="shadow-default p-10 rounded-10 h-full w-full">
                  <div className="font-bold text-center">{charity.catalog.name}</div>
                  <div><label className="font-bold">Registration ID</label> : {charity.catalog.vip}</div>
                  <div><label className="font-bold">Website</label> : <a href={charity.catalog.website} target="_blank"> visit site</a></div>
                  <div><label className="font-bold">Contact Email</label> : {charity.catalog.email}</div>
                  <div className="flex h-60 overflow-hidden">
                    <div className="font-bold">Summary:</div>
                    <div>{charity.catalog.summary}</div>
                  </div>
                  <div><label className="font-bold">Country</label> : {charity.catalog.country}</div>
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