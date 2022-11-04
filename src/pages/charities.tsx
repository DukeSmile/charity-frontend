import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getContract } from "../core/constants/base";
import { FromNetwork } from "../networks";

import { charityProp } from "../core/interfaces/base";
import { setCharities, setFundRaisers } from "../core/store/slices/bridgeSlice";
import { Grid } from "@material-ui/core";

export const CharitiesPage = () => {
  const dispatch = useDispatch();
  // const getCharities = async() => {
  //     let ddaContract = getContract(FromNetwork, 'DDAContract');
  //     let allCharities = await ddaContract.methods.getCharities().call();
  //     let charities:charityProp[] = [], fundRaisers:charityProp[] = [];
  //     allCharities.forEach((charity: any, index:number) => {
  //         const newOne:charityProp = {
  //             index: index,
  //             charityType: parseInt(charity.charityType),
  //             fund: charity.fund,
  //             address: charity.walletAddress,
  //             catalog: charity.catalog
  //         };
  //         if (newOne.charityType === 1) {
  //             fundRaisers.push(newOne);
  //         }
  //         else {
  //             charities.push(newOne);
  //         }
  //     })
  //     dispatch(setFundRaisers(fundRaisers));
  //     dispatch(setCharities(charities));
  // }

  const charities = useSelector( (state:any) => state.app.charities)
  // useEffect(() => {
  //     getCharities();
  // }, []);
  return (
    <div className="p-20">
      <Grid container spacing={2}>
        <Grid item xs={12} className="text-24 font-bold text-center">Charities</Grid> 
        {
          charities.map((charity:charityProp) => {
            return (
              <Grid sm={6} md={4} lg={3} item className="border rounded-10 p-5" key={charity.index}>
                <div className="font-bold text-center">{charity.catalog.name}</div>
                <div>Registration Number : {charity.catalog.vip}</div>
                <div>Website : {charity.catalog.website}</div>
                <div>Contact Email : {charity.catalog.email}</div>
                <div>Summary : {charity.catalog.summary}</div>
                <div>Country : {charity.catalog.country}</div>
              </Grid>
            )
          })
        }
      </Grid>
    </div>
  );
}