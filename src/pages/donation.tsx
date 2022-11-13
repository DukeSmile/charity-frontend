import { Grid } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Web3 from "web3";

import { CurrencySelect } from "../components/currencySelect";
import { birthDDAContractNumber, connectWeb3, getContract, getTokenContract, maximumAllDoantion, ethTokenAddr } from "../core/constants/base";
import { charityProp, donationProp } from "../core/interfaces/base";
import { setDonateHistory, setCaseDonateHistory, setLoading } from "../core/store/slices/bridgeSlice";
import { useWeb3Context } from "../hooks/web3Context";
import { FromNetwork, networks, tokenList } from "../networks";
import { DonationHistoryAll } from "../components/donationHistoryAll";
import { DonationHistoryCase } from "../components/donationHistoryCase";

export const DonationPage = () => {

  let { index } = useParams();
  const { connected, address } = useWeb3Context();
  const dispatch = useDispatch();
  const [currency, setCurrency] = useState(0);
  const [amount, setAmount] = useState(0);
  const [availableAmount, setAvailableAmount] = useState('0');
  const [allHLoading, setAllHLoading] = useState(false);
  const [caseHLoading, setCaseHLoading] = useState(false);
  const charities: charityProp[] = useSelector((state: any) => state.app.allCharities);
  const ownerFlag = useSelector((state:any) => state.app.isOwner);
  let targetIndex: number = index === undefined ? -1 : parseInt(index);
  const targetCharity = charities[targetIndex];

  const style = {
    btn: 'border-1 py-5 px-10 text-black hover:text-white bg-artySkyBlue rounded-10'
  }

  const getLast20History = async () => {
    setAllHLoading(true);
    let ddaContract = getContract('DDAContract');
    const lastBlock = await connectWeb3.eth.getBlockNumber();
    const blockCountIteration = 5000;
    let totalEvents: donationProp[] = [];
    try{
      for (let i = lastBlock; i >= birthDDAContractNumber - blockCountIteration; i -= blockCountIteration) {
        //get all events related with selected charity
        if (totalEvents.length < maximumAllDoantion) {
          const allEvents = await ddaContract.getPastEvents('Donate', {
            // 'filter': {
            //   '_from': address.toLowerCase()
            // },
            'fromBlock': i - blockCountIteration + 1,
            'toBlock': i,
          });
          allEvents.reverse().forEach(event => {
            const currency = tokenList.find((token) => token.address[FromNetwork] === event.returnValues._currency);
            let history: donationProp = {
              transaction: event.transactionHash,
              from: event.returnValues._from,
              to: event.returnValues._to,
              currency: currency ? currency.name : 'event.returnValues._to',
              amount: event.returnValues.amount,
              timeStamp: event.returnValues.timestamp
            };
            if (totalEvents.length < maximumAllDoantion)
              totalEvents.push(history);
          });
          let res = totalEvents;
        }
        else
          break;
      }
    }
    catch(e) {
      setAllHLoading(false);
    }
    dispatch(setDonateHistory(totalEvents));
    setAllHLoading(false);
  };

  const getCaseHistory = async () => {
    setCaseHLoading(true);
    let ddaContract = getContract('DDAContract');
    const lastBlock = await connectWeb3.eth.getBlockNumber();
    const blockCountIteration = 5000;
    let caseEvents: donationProp[] = []
    for (let i = lastBlock; i >= birthDDAContractNumber - blockCountIteration; i -= blockCountIteration) {
      //get all events between current wallet address and selected charity
      if (address !== '') {
        const pastEvents = await ddaContract.getPastEvents('Donate', {
          'filter': {
            '_from': address.toLowerCase(),
            '_to': targetCharity ? targetCharity.address : ''
          },
          'fromBlock': i - blockCountIteration + 1,
          'toBlock': i,
        });
        pastEvents.reverse().forEach(event => {
          const currency = tokenList.find((token) => token.address[FromNetwork] === event.returnValues._currency);
          let history: donationProp = {
            transaction: event.transactionHash,
            from: event.returnValues._from,
            to: event.returnValues._to,
            currency: currency ? currency.name : 'event.returnValues._to',
            amount: event.returnValues.amount,
            timeStamp: event.returnValues.timestamp
          };
          caseEvents.push(history);
        });
      }
    }
    // console.log(totalEvents);
    dispatch(setCaseDonateHistory(caseEvents));
    setCaseHLoading(false);
  };

  const donate = async () => {
    if (amount <= 0) {
      alert("Amount can not be zero");
      return;
    }
    if (connected && address !== '') {
      if (ownerFlag == 1) {
        alert("This address is in black list");
        return;
      }
      let currencyContract = getTokenContract(currency);
      // console.log(Web3.utils.toWei(amount.toString()), currency);
      const ddaAddress = networks[FromNetwork].addresses['DDAContract'];
      const currencyAddress = tokenList[currency].address[FromNetwork];
      const weiOfAmount = Web3.utils.toWei(amount.toString());
      let ddaContract = getContract('DDAContract');
      const fundRaiserAddr = await ddaContract.methods.charities(targetIndex).call();
      if (fundRaiserAddr.walletAddress === address) {
        alert('You can not donate to yourself');
        return;
      }
      dispatch(setLoading(true));
      try {
        if(currencyAddress === ethTokenAddr){
          await ddaContract.methods.donate(targetIndex, currencyAddress, weiOfAmount).send({ from: address, value: weiOfAmount });
        }
        else {
          try {
            await currencyContract.methods.approve(ddaAddress, weiOfAmount).send({ from: address });
          }
          catch (e) {
            console.log(e);
            dispatch(setLoading(false));
            return;
          }
          await ddaContract.methods.donate(targetIndex, currencyAddress, weiOfAmount).send({ from: address });
        }
      }
      catch (e) {
        console.log(e);
        dispatch(setLoading(false));
        return;
      }
      dispatch(setLoading(false));
      getLast20History();
      getCaseHistory();
      getCurrentAmount();
    }
    else
      alert('connect wallet');
  };

  const getCurrentAmount = async () => {
    if ( !connected || address === '')
      return;
    if (tokenList[currency].address[FromNetwork] === '') {
      setAvailableAmount('0');
      return;
    }
    if (tokenList[currency].address[FromNetwork] === ethTokenAddr) {
      let cAmount = await connectWeb3.eth.getBalance(address);
      setAvailableAmount(Web3.utils.fromWei(cAmount));
      return;
    }
    let currencyContract = getTokenContract(currency);
    let cAmount = await currencyContract.methods.balanceOf(address).call();
    setAvailableAmount(Web3.utils.fromWei(cAmount));
  };

  useEffect(() => {
    getLast20History();
    getCaseHistory();
    getCurrentAmount();
  }, [address]);

  useEffect(() => {
    getCurrentAmount();
  }, [currency]);

  if (!targetCharity) {
    return (
      <div className="p-20">Please select one charity or fundraiser</div>
    );
  }

  return (
    <div className="p-20">
      <div className="my-10"><Link to="/registration" className="border-1 p-5 my-10">Return</Link></div>
      <Grid container spacing={3}>
        <Grid item lg={8} md={7} sm={12}>
          <div className="flex items-center">
            <img src={"https://ipfs.io/ipfs/" + targetCharity.catalog.photo} alt={targetCharity.catalog.name} className="w-100 h-100 border-1 mr-10" />
            <p>You are donating to <span className="font-bold">{targetCharity.catalog.name}</span></p>
          </div>
          <div>
            <CurrencySelect currency={currency}
              onChange={(event: any) => setCurrency(event.target.value)}
              updateAmount={(event: any) => setAmount(event.target.value >= 0 ? event.target.value : 0)}
              amount={amount}
              cAmount={availableAmount}
            />
          </div>
          <div>
            <p className="font-bold my-15">The Okapi DDA</p>
            <p className="my-15">
              The Okapi DDA is the worlds first decentralised donation application.
              Please see how "how it works" page to view our donation term.
            </p>
            <Link to="/about" className={style.btn}>How it works</Link>
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
            <DonationHistoryCase loading={caseHLoading} />
            <DonationHistoryAll loading={allHLoading} />
          </div>
        </Grid>
      </Grid>
    </div>
  );
}