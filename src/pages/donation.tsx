import { Grid } from "@material-ui/core";
import { useState } from "react";
import { useSelector } from "react-redux";
import { CurrencySelect } from "../components/currencySelect";
import { charityProp } from "../core/interfaces/base";

export const DonationPage = () => {
  let charities:charityProp[] = useSelector((state:any) => state.app.fundRaisers);
  let charity = charities[0];
  const [currency, setCurrency] = useState(0);
  return (
    <div>
      <button className="border-1 p-5 my-10">Return</button>
      <Grid container spacing={3}>
        <Grid item lg={8} md={7} sm={12}>
          <div className="flex items-center">
            <img src={charity.catalog.photo} alt={charity.catalog.name} className="w-100 h-100 border-1 mr-10"/>
            <p>You are donating to <span className="font-bold">{charity.catalog.name}</span></p>
          </div>
          <div>
            <CurrencySelect currency={currency} onChange={(event:any) => setCurrency(event.target.value)}/>
          </div>
          <div>
            <p className="font-bold my-15">The Okapi DDA</p>
            <p className="my-15">
              The Okapi DDA is the worlds first decentralised donation application.
              Please see how "how it works" page to view our donation term.
            </p>
            <button className="border-1 p-5">How it works</button>
            <p className="my-15">
              Okapi donation protection
              Okapi donation anonymity is guaranteed.
              Your data is secure and fully protected.
            </p>
          </div>
          
        </Grid>
        <Grid item lg={4} md={5} sm={12}>
          <div className="border-1 shadow-default p-10">
            <p className="font-bold text-center my-20">Your Donation</p>
            <div className="my-20">
              <label>Total donated To this cause</label>
              <button className="border1 p-5">Donate</button>
            </div>
            <div className="my-20">
              <label>Total donated To all causes</label>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}