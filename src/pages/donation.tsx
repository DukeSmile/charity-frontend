import { Grid } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
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
import { FundRaisingHistory } from "../components/history/fundRaisingHistory";

import donateImg from "../assets/images/components/donate.png";
import currenciesImg from "../assets/images/components/currencies.png";
import { baseStyles } from "../core/constants/style";

export const DonationPage = () => {

  let { index } = useParams();
  const { connected, address } = useWeb3Context();
  const dispatch = useDispatch();
  const [currency, setCurrency] = useState(0);
  const [amount, setAmount] = useState(0);
  const [availableAmount, setAvailableAmount] = useState('0');
  const [donateComment, setDonatecomment] = useState('');
  const [allHLoading, setAllHLoading] = useState(false);
  const [caseHLoading, setCaseHLoading] = useState(false);
  const [approveFlag, setApproveFlag] = useState(false);
  const charities: charityProp[] = useSelector((state: any) => state.app.allCharities);
  const ownerFlag = useSelector((state:any) => state.app.isOwner);
  let targetIndex: number = index === undefined ? -1 : parseInt(index);
  const targetCharity = charities[targetIndex];
  const preSetValues: number[] = [1, 5, 10, 20, 50, 100, 200, 500,];
  const preSetPercent: {name:string; percent:number}[] = [
    {
      name: '10 %',
      percent: 10
    },
    {
      name: '20 %',
      percent: 20
    },
    {
      name: '50 %',
      percent: 50
    },
    {
      name: '100 %',
      percent: 100
    },
  ];

  const style = {
    btn: 'border-1 py-5 px-10 text-black hover:text-white bg-artySkyBlue rounded-10',
    aboutlink: 'text-green font-bold underline'
  }

  const approve = async () => {
    if (connected && address !== '') {
      if (ownerFlag == 1) {
        alert("This address is in black list");
        return;
      }
      let currencyContract = getTokenContract(currency);
      const ddaAddress = networks[FromNetwork].addresses['DDAContract'];
      const weiOfAmount = Web3.utils.toWei('1000000000000');
      dispatch(setLoading(true));
      try {
        await currencyContract.methods.approve(ddaAddress, weiOfAmount).send({ from: address });
      }
      catch (e) {
        console.log(e);
        dispatch(setLoading(false));
        return;
      }
      setApproveFlag(true);
      dispatch(setLoading(false));
    }
    else
      alert('connect wallet');
  };

  const donate = async () => {
    if (connected && address !== '') {
      if (ownerFlag == 1) {
        alert("This address is in black list");
        return;
      }
      if (amount <= 0) {
        alert("Amount can not be zero");
        return;
      }
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
          await ddaContract.methods.donate(targetIndex, currencyAddress, weiOfAmount, donateComment).send({ from: address, value: weiOfAmount });
        }
        else {
          await ddaContract.methods.donate(targetIndex, currencyAddress, weiOfAmount, donateComment).send({ from: address });
        }
      }
      catch (e) {
        console.log(e);
        dispatch(setLoading(false));
        return;
      }
      dispatch(setLoading(false));
      getCurrentAmount();
      setDonatecomment('');
      setAmount(0);
    }
    else
      alert('connect wallet');
  };

  const getApproveStatus = async () => {
    setApproveFlag(true);
    if (connected && address !== '') {
      let currencyContract = getTokenContract(currency);
      const ddaAddress = networks[FromNetwork].addresses['DDAContract'];
      const allowance = await currencyContract.methods.allowance(address, ddaAddress).call();
      const ethAmount = Web3.utils.fromWei(allowance);
      if (parseFloat(ethAmount) < amount) {
        setApproveFlag(false);
      }
    }
  }

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
    setAmount(0);
  }, [address]);

  useEffect(() => {
    getCurrentAmount();
    getApproveStatus();
  }, [currency, address, amount]);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  // if (!targetCharity) {
  //   return (
  //     <div className="p-20">Please select one charity or fundraiser</div>
  //   );
  // }

  return (
    <div>
      <div className="relative bg-gradient-to-r from-algae to-seagreen w-full h-400 flex items-end justify-between overflow-hidden">
        <img src={donateImg} className="w-175 h-215 ml-20 sm:w-350 sm:h-430 md:ml-[5%]"/>
        <img src={currenciesImg} className="w-250 h-90 mr-20 md:w-500 md:h-180 md:mr-[5%]"/>
        <div className="absolute left-0 top-0 w-full h-full text-white text-center flex items-center justify-center">
          <div className="mt-50 mx-20">
            <p className="text-48 font-bold">Let’s get you started!</p>
            <p className="text-20">Work your way through our easy to follow registration process.</p>
          </div>
        </div>
      </div>
      {!targetCharity && (
        <div className="p-20">Please select one charity or fundraiser</div>
      )}
      {targetCharity && (
        <div className="w-[95%] md:w-[80%] mx-auto border-1 my-70 px-35 py-50">
          <p className="text-38 ">You're donating to <span className="font-bold">{targetCharity.name}</span></p>
          <Grid container spacing={6}>
            <Grid item sm={12} md={6}>
              <div className="my-20">
                <img src={"https://ipfs.io/ipfs/" + targetCharity.photo} alt={targetCharity.name} className="w-full  rounded-10" />
                <div className="text-18 py-10 border-b-2 border-dashed">
                  <p className="text-28 font-bold">{targetCharity.summary}</p>
                  <p className="my-15">
                    The Okapi DDA is the worlds first decentralised donation application.<br />
                    Please see how "how it works" page to view our donation term.
                  </p>
                  <Link to="/about" className={style.aboutlink}>How it works</Link>
                  <p className="my-15">
                    Okapi donation protection
                    Okapi donation anonymity is guaranteed.
                    Your data is secure and fully protected.
                  </p>
                </div>
                <div>
                  <FundRaisingHistory address={targetCharity.wallet_address} />
                </div>
              </div>
            </Grid>
            <Grid item sm={12} md={6}>
              <p className="text-24 font-bold">Your donation</p>
              <div className="my-20">
                <Grid container spacing={2}>
                  {
                    preSetValues.map((value, index) => {
                      const preValue = value * (tokenList[currency].address[FromNetwork] == ethTokenAddr ? 0.1 : 100);
                      return (
                        <Grid item xs={6} sm={3} key={index}>
                          <div 
                            className="border-1 rounded-5 p-5 cursor-pointer text-center"
                            onClick={() => setAmount(preValue)}
                          >
                            {preValue} {tokenList[currency].name}
                          </div>
                        </Grid>
                      )
                    })
                  }
                  {
                    preSetPercent.map((setCase, index) => {
                      const preValue = parseFloat(availableAmount) * setCase.percent / 100;
                      return (
                        <Grid item xs={6} sm={3} key={index}>
                          <div 
                            className="border-1 rounded-5 p-5 cursor-pointer text-center"  
                            onClick={() => setAmount(Math.floor(preValue*100000) / 100000)}
                          >
                            {setCase.name}
                          </div>
                        </Grid>
                      )
                    })
                  }
                </Grid>
              </div>
              <div className="my-20">
                <CurrencySelect currency={currency}
                  onChange={(event: any) => setCurrency(event.target.value)}
                  updateAmount={(event: any) => setAmount(event.target.value >= 0 ? event.target.value : 0)}
                  amount={amount}
                  cAmount={availableAmount}
                />
              </div>
              <div className="my-20">
                <p className="text-20 font-medium my-10">Designate to Animal Charity Evaluators</p>
                <p className="text-20 font-medium my-10">Leave comments</p>
                <textarea 
                  className="w-full my-10 border-1 p-20 text-20" 
                  rows={4} 
                  value={donateComment} 
                  onChange={(event) => setDonatecomment(event.target.value)}
                >

                </textarea>
              </div>
              {!approveFlag && (
                <button className={baseStyles.greenBtn + ' w-full'} onClick={() => approve()}>
                  Approve Now <FontAwesomeIcon icon={faArrowRight} />
                </button>
              )}
              {approveFlag && (
                <button className={baseStyles.greenBtn + ' w-full'} onClick={() => donate()}>
                  Donate Now <FontAwesomeIcon icon={faArrowRight} />
                </button>
              )}
            </Grid>
          </Grid>
        </div>
      )}
      
    </div>
  );
}