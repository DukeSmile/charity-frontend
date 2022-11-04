import { Grid } from "@material-ui/core";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Web3 from "web3";

import { CurrencySelect } from "../components/currencySelect";
import { getContract, getTokenContract } from "../core/constants/base";
import { charityProp } from "../core/interfaces/base";
import { setLoading } from "../core/store/slices/bridgeSlice";
import { useWeb3Context } from "../hooks/web3Context";
import { FromNetwork, networks, tokenList } from "../networks";

export const DonationPage = () => {

  let { index } = useParams();
  const {connected, address} = useWeb3Context();
  const dispatch = useDispatch();
  const [currency, setCurrency] = useState(0);
  const [amount, setAmount] = useState(0);
  const charities:charityProp[] = useSelector((state:any) => state.app.allCharities);
  let targetIndex:number = index === undefined ? -1 : parseInt(index);
  const targetCharity = charities[targetIndex];

  if (!targetCharity) {
    return (
      <div className="p-20">Please select one charity or fundraiser</div>
    );
  }

  const style = {
    btn: 'border-1 py-5 px-10 text-black hover:text-white bg-artySkyBlue rounded-10'
  }
  const donate = async() => {
    if (amount <= 0) {
      alert("Amount can not be zero");
      return;
    }
    if(connected && address != ''){      
      dispatch(setLoading(true));
      let currencyContract = getTokenContract(currency);
      // console.log(Web3.utils.toWei(amount.toString()), currency);
      const ddaAddress = networks[FromNetwork].addresses['DDAContract'];
      const currencyAddress = tokenList[currency].address[FromNetwork];
      const weiOfAmount = Web3.utils.toWei(amount.toString());
      try{
        await currencyContract.methods.approve(ddaAddress, weiOfAmount).send({from: address});
      }
      catch (e) {
        console.log(e);
      }
      let ddaContract = getContract('DDAContract');
      await ddaContract.methods.donate(targetIndex, currencyAddress, weiOfAmount).send({from: address});
      
      dispatch(setLoading(false));
    }
    else
      alert('connect wallet');
  };

  return (
    <div className="p-20">
      <button className="border-1 p-5 my-10">Return</button>
      <Grid container spacing={3}>
        <Grid item lg={8} md={7} sm={12}>
          <div className="flex items-center">
            <img src={targetCharity.catalog.photo} alt={targetCharity.catalog.name} className="w-100 h-100 border-1 mr-10"/>
            <p>You are donating to <span className="font-bold">{targetCharity.catalog.name}</span></p>
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
          <button className={style.btn} onClick={() => donate()}>Donate</button>
        </Grid>
        <Grid item lg={4} md={5} sm={12}>
          <div className="border-1 shadow-default p-10">
            <p className="font-bold text-center my-20">Your Donation</p>
            <div className="my-20">
              <div>
                <label>Total donated To this cause</label>
              </div>
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