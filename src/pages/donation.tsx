import { Grid } from "@material-ui/core";
import { useState } from "react";
import { useSelector } from "react-redux";
import Web3 from "web3";

import { CurrencySelect } from "../components/currencySelect";
import { getContract, getTokenContract } from "../core/constants/base";
import { charityProp } from "../core/interfaces/base";
import { useWeb3Context } from "../hooks/web3Context";
import { FromNetwork, networks } from "../networks";

export const DonationPage = () => {
  const {connected, address} = useWeb3Context();
  let charities:charityProp[] = useSelector((state:any) => state.app.fundRaisers);
  const [currency, setCurrency] = useState(0);
  const [amount, setAmount] = useState(0);
  if (charities.length === 0)
    return (<>Please select one charity or fundraiser</>);
  let charity = charities[0];
  const style = {
    btn: 'border-1 p-5 text-black hover:text-white bg-artySkyBlue rounded-10'
  }

  const donate = async() => {
    if(connected && address != ''){
      let ddaContract = getContract('DDAContract');
      let currencyContract = getTokenContract(currency);
      // console.log(Web3.utils.toWei(amount.toString()), currency);
      const ddaAddress = networks[FromNetwork].addresses['DDAContract'];
      const weiOfAmount = Web3.utils.toWei(amount.toString());
      await currencyContract.methods.approve(ddaAddress, weiOfAmount).send({from: address});

      // await ddaContract.methods.createCharity(charityType === 'charity' ? 0 : 1, _catalog).send({from: address});
    }
    else
      alert('connect wallet');
  };

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
            <CurrencySelect currency={currency}
              onChange={(event:any) => setCurrency(event.target.value)}
              updateAmount={(event:any) => setAmount(event.target.value >= 0 ? event.target.value : 0 )}
              amount={amount}
            />
          </div>
          <div>
            <p className="font-bold my-15">The Okapi DDA</p>
            <p className="my-15">
              The Okapi DDA is the worlds first decentralised donation application.
              Please see how "how it works" page to view our donation term.
            </p>
            <button className={style.btn}>How it works</button>
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
              <div>
                <label>Total donated To this cause</label>
              </div>
              <button className={style.btn} onClick={() => donate()}>Donate</button>
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