import { Grid } from "@material-ui/core";
import { useSelector } from "react-redux";
import { charityProp } from "../core/interfaces/base";

export const DonationPage = () => {
  let charity:charityProp;
  return (
    <div>
      <button className="border-1 p-5">Return</button>
      <Grid container spacing={1}>
        <Grid item md={8} sm={6} xs={12}>
          <div className="flex">
            <img src={charity.catalog.photo} alt={charity.catalog.name} className="w-150 h-150 mr-10"/>
            <p>You are donating to {charity.catalog.name}</p>
          </div>
        </Grid>
        <Grid item md={4} sm={6} xs={12}>

        </Grid>
      </Grid>
    </div>
  );
}