import { Grid } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FaLinkedin, FaTwitter, FaGoogle, FaFacebook, FaInstagram, FaPhoneAlt, FaNetworkWired, FaFlag, FaBook, FaRegistered } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Web3 from "web3";

import { birthDDAContractNumber, connectWeb3, getContract, getTokenContract, maximumAllDoantion, ethTokenAddr } from "../core/constants/base";
import { charityProp, donationProp } from "../core/interfaces/base";
import { setDonateHistory, setCaseDonateHistory, setLoading } from "../core/store/slices/bridgeSlice";
import { useWeb3Context } from "../hooks/web3Context";
import { FromNetwork, networks, tokenList } from "../networks";
import { DonationHistoryAll } from "../components/history/donationHistoryAll";
import { baseStyles } from "../core/constants/style";
import { DonateToAnimal } from "../components/donateToAnimal";
import { BlogCategories } from "../components/blogCategories";

export const DetailPage = () => {

  let { index } = useParams();
  const { connected, address } = useWeb3Context();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [allHLoading, setAllHLoading] = useState(false);
  const charities: charityProp[] = useSelector((state: any) => state.app.allCharities);
  const ownerFlag = useSelector((state:any) => state.app.isOwner);
  let targetIndex: number = index === undefined ? -1 : parseInt(index);
  const targetCharity = charities[targetIndex];

  const fundPrice = parseFloat(Web3.utils.fromWei(targetCharity.fund));
  const fundLabel = Intl.NumberFormat().format(fundPrice);
  let fundGoal = parseFloat(Web3.utils.fromWei(targetCharity.goal));
  fundGoal = fundGoal > 1 ? fundGoal : 1;
  let fundPercent = fundPrice / fundGoal * 100;
  fundPercent = fundPercent > 100 ? 100 : fundPercent;

  const blockCharity = async (index: number) => {
    if (connected && address != '') {
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
    if(targetCharity.address === '')
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
              '_to': targetCharity ? targetCharity.address.toLowerCase() : ''
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
  
  return (
    <div>
      <div className="relative bg-gradient-to-r from-algae to-seagreen w-full h-180">
      </div>
      {!targetCharity && (
        <div className="p-20">Please select one charity or fundraiser</div>
      )}
      {targetCharity && (
        <div className="w-[95%] md:w-[80%] mx-auto py-50">
          <Grid container spacing={6}>
            <Grid item xs={12} sm={6} md={8}>
              <div className="mx-20">
                <div>
                  <p className="text-42 font-bold">
                    {targetCharity.charityType == '0' ? targetCharity.catalog.name : targetCharity.catalog.title}
                  </p>
                  <p className="text-18">
                    {targetCharity.catalog.summary}
                  </p>
                  <p className="text-18 my-10">
                    {targetCharity.charityType == '0' ? 'This is charity' : (<>by <label className="capitalize">{targetCharity.catalog.name}</label></>)}
                  </p>
                </div>
                <img src={"https://ipfs.io/ipfs/" + targetCharity.catalog.photo} alt={targetCharity.catalog.name} className="w-full  rounded-10 my-10" />
                <p className="capitalize">{targetCharity.catalog.detail}</p>
                <div className="flex justify-between items-center my-20">
                  <div>
                    <p className="font-bold">Tags</p>
                    <div className="p-5 px-10 border-1 rounded-full m-5">{targetCharity.fundType}</div>
                  </div>
                  <div>
                    <p className="font-bold">Share</p>
                    <div className="flex">
                      <FaPhoneAlt className={resumeStyle} />
                      <FaLinkedin className={resumeStyle} />
                      <FaTwitter className={resumeStyle} />
                      <FaFacebook className={resumeStyle} />
                      <FaInstagram className={resumeStyle} />
                    </div>
                  </div>
                </div>
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <div className="w-full bg-white border-1 border-lightgrey rounded-10 p-30">
                <p className="text-16 text-iron"><span className="text-24 text-black mr-10">$ {fundLabel}</span> raised of $ {fundGoal}</p>
                <div className="h-5 bg-greenwhite my-10">
                  <div className={`h-5 bg-algae`} style={{width: fundPercent+'%'}}></div>
                </div>
                <div>
                  <DonationHistoryAll loading={allHLoading} />
                </div>
                <div className="flex justify-center">
                  <button className={baseStyles.normalBtn}>Show more</button>
                </div>
              </div>
              <button
                className={
                  baseStyles.normalBtn + ' text-green hover:bg-green my-10 w-full'
                }
                onClick={() => navigate('/filter/animal')}
              >
                Donate Now <FontAwesomeIcon icon={faArrowRight} />
              </button>
              <button
                onClick={() => navigate('/registration/charity')}
                className={baseStyles.normalBtn + ' text-green hover:bg-green mb-10 w-full'}
              >
                Register with Okapi <FontAwesomeIcon icon={faArrowRight} />
              </button>
              <BlogCategories />
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