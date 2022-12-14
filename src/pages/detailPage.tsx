import { Grid } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FaLinkedin, FaTwitter, FaFacebook, FaInstagram, FaPhoneAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Web3 from "web3";

import { birthDDAContractNumber, connectWeb3, getContract, maximumAllDoantion } from "../core/constants/base";
import { charityProp, demoCharity, donationProp } from "../core/interfaces/base";
import { setDonateHistory, setLoading } from "../core/store/slices/bridgeSlice";
import { useWeb3Context } from "../hooks/web3Context";
import { FromNetwork, tokenList } from "../networks";
import { baseStyles } from "../core/constants/style";
import { DonateToAnimal } from "../components/donateToAnimal";
import { FundRaisingHistory } from "../components/history/fundRaisingHistory";

export const DetailPage = () => {

  let { index } = useParams();
  const { connected, address } = useWeb3Context();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [allHLoading, setAllHLoading] = useState(false);
  const charities: charityProp[] = useSelector((state: any) => state.app.allCharities);
  let targetIndex: number = index === undefined ? -1 : parseInt(index);
  const targetCharity = charities[targetIndex] ? charities[targetIndex] : demoCharity;
  
  const fundPrice = parseFloat(Web3.utils.fromWei(targetCharity.contract.fund));
  const fundLabel = Intl.NumberFormat().format(fundPrice);
  let fundGoal = targetCharity.goal;
  fundGoal = fundGoal > 1 ? fundGoal : 1;
  let fundPercent = fundPrice / fundGoal * 100;
  fundPercent = fundPercent > 100 ? 100 : fundPercent;

  const blockCharity = async (index: number) => {
    if (connected && address !== '') {
      dispatch(setLoading(true));
      let ddaContract = getContract('DDAContract');
      try {
        await ddaContract.methods.blackCharity(index).send({ from: address });
      }
      catch (e) {
        console.log(e);
      }
      dispatch(setLoading(false));
    }
  };

  const getLast20History = async () => {
    if(targetCharity.wallet_address === '')
      return;
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
            'filter': {
              '_to': targetCharity ? targetCharity.wallet_address.toLowerCase() : ''
            },
            'fromBlock': i - blockCountIteration + 1,
            'toBlock': i,
          });
          allEvents.reverse().forEach(event => {
            const currency = tokenList.find((token) => token.address[FromNetwork] === event.returnValues._currency);
            let history: donationProp = {
              transaction: event.transactionHash,
              from: event.returnValues._from,
              to: event.returnValues._to,
              currency: currency ? currency.name : '',
              amount: event.returnValues.amount,
              timeStamp: event.returnValues.timestamp
            };
            if (totalEvents.length < maximumAllDoantion)
              totalEvents.push(history);
          });
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

  useEffect(() => {
    getLast20History();
  }, [address]);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  // if (!targetCharity) {
  //   return (
  //     <div className="p-20">Please select one charity or fundraiser</div>
  //   );
  // }

  const resumeStyle = 'm-5 hover:text-brown p-5 border-1 rounded-full text-16 w-30 h-30 cursor-pointer';
  const photoUrl = targetCharity.photo === '' ? '' : "https://ipfs.io/ipfs/" + targetCharity.photo;
  return (
    <div>
      <div className="relative bg-gradient-to-r from-algae to-seagreen w-full h-180">
      </div>
      {targetCharity.index < 0 && (
        <div className="p-20">Please select one charity or fundraiser</div>
      )}
      {targetCharity.index >= 0 && (
        <div className="w-[95%] md:w-[80%] mx-auto py-50">
          <Grid container spacing={6}>
            <Grid item xs={12} sm={6} md={8}>
              <div className="mx-20">
                <div>
                  <p className="text-42 font-bold">
                    {targetCharity.charity_type === '0' ? targetCharity.name : targetCharity.title}
                  </p>
                  <p className="text-18">
                    {targetCharity.summary}
                  </p>
                  <p className="text-18 my-10">
                    {targetCharity.charity_type === '0' ? 'This is charity' : (<>by <label className="capitalize">{targetCharity.name}</label></>)}
                  </p>
                </div>
                {photoUrl !== '' && (
                  <img src={photoUrl} alt={targetCharity.name} className="w-full min-h-100 rounded-10 my-10 border" />
                )}
                <p className="capitalize">{targetCharity.detail}</p>
                <Grid container spacing={1}>
                  <Grid item sm={12} md={6}>
                    <p className="font-bold">Tags</p>
                    <div className="flex">
                      <div className="p-5 px-10 border-1 rounded-full m-5 flex">{targetCharity.fund_type}</div>
                    </div>
                  </Grid>
                  <Grid item sm={12} md={6}>
                    <p className="font-bold">Share</p>
                    <div className="flex">
                      <FaPhoneAlt className={resumeStyle} />
                      <FaLinkedin className={resumeStyle} />
                      <FaTwitter className={resumeStyle} />
                      <FaFacebook className={resumeStyle} />
                      <FaInstagram className={resumeStyle} />
                    </div>
                  </Grid>
                </Grid>
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <div className="w-full bg-white border-1 border-lightgrey rounded-10 p-30">
                <p className="text-16 text-gunsmoke">
                  <span className="text-24 text-black mr-10">$ {fundLabel}</span>raised 
                  {targetCharity.charity_type === 1 && (
                    <>of {Intl.NumberFormat().format(fundGoal)}</>
                  )}
                </p>
                <div className="h-5 bg-greenwhite my-10">
                  <div className={`h-5 bg-algae`} style={{width: fundPercent+'%'}}></div>
                </div>
                <div>
                  <FundRaisingHistory address={targetCharity.wallet_address} />
                </div>
                <div className="flex justify-center">
                  <button className={baseStyles.normalBtn}>Show more</button>
                </div>
              </div>
              <button
                className={
                  baseStyles.normalBtn + ' text-green hover:bg-green my-10 w-full'
                }
                onClick={() => navigate('/donate/'+targetCharity.index)}
              >
                Donate Now <FontAwesomeIcon icon={faArrowRight} />
              </button>
              <button
                onClick={() => navigate('/user/signup')}
                className={baseStyles.normalBtn + ' text-green hover:bg-green mb-10 w-full'}
              >
                Register with Okapi <FontAwesomeIcon icon={faArrowRight} />
              </button>
              {/* <BlogCategories /> */}
            </Grid>
          </Grid>
        </div>
      )}
      <div className="my-10">
        <DonateToAnimal />
      </div>
    </div>
  );
}