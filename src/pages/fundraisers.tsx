import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getContract } from "../core/constants/base";
import { FromNetwork } from "../networks";

import { charityProp } from "../core/interfaces/base";
import { setCharities, setFundRaisers } from "../core/store/slices/bridgeSlice";
import { Grid } from "@material-ui/core";
import { Link } from "react-router-dom";

export const FundRaisersPage = () => {
  const dispatch = useDispatch();
  const getCharities = async() => {
      let ddaContract = getContract(FromNetwork, 'DDAContract');
      let allCharities = await ddaContract.methods.getCharities().call();
      let charities:charityProp[] = [], fundRaisers:charityProp[] = [];
      allCharities.forEach((charity: any, index:number) => {
          const newOne:charityProp = {
              index: index,
              charityType: parseInt(charity.charityType),
              fund: charity.fund,
              address: charity.walletAddress,
              catalog: charity.catalog
          };
          if (newOne.charityType === 1) {
              fundRaisers.push(newOne);
          }
          else {
              charities.push(newOne);
          }
      })
      dispatch(setFundRaisers(fundRaisers));
      dispatch(setCharities(charities));
  }

  const fundRaisers = useSelector( (state:any) => state.app.fundRaisers)
  useEffect(() => {
      getCharities();
  }, []);

  const style={
    btn: 'border-1 rounded-10 text-black hover:text-white hover:bg-limedSqruce p-5 m-10'
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
                <div>
                  <Link to="/donation" className={style.btn}>Donate</Link>
                  <button className={style.btn}>Block This</button>
                </div>
              </Grid>
            )
          })
        }
      </Grid>
    </div>
  );
}