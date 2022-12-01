import { Grid, CircularProgress } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Web3 from "web3";
import { birthDDAContractNumber, connectWeb3, getContract, maximumAllDoantion, monthLabels } from "../../core/constants/base";

import { donationProp, charityProp } from "../../core/interfaces/base";
import { useWeb3Context } from "../../hooks/web3Context";
import { FromNetwork, tokenList } from "../../networks";
import defaultImg from "../../assets/images/components/man.png";
const blankHistory: donationProp[] = [];

export const FundRaisingHistory = (props:any) => {

  const [loading, setLoading] = useState(false);
  const [histories, setHistories] = useState(blankHistory);
  const charities:charityProp[] = useSelector((state:any) => state.app.allCharities);
  const getLast20History = async () => {
    if(props.address === '')
      return;
      setLoading(true);
    let ddaContract = getContract('DDAContract');
    const lastBlock = await connectWeb3.eth.getBlockNumber();
    const blockCountIteration = 5000;
    let totalEvents: donationProp[] = [];
    try{
      for (let i = lastBlock; i >= birthDDAContractNumber - blockCountIteration; i -= blockCountIteration) {
        //get all events related with selected charity
        if (totalEvents.length < 20) {
          const allEvents = await ddaContract.getPastEvents('Donate', {
            'filter': {
              '_to': props.address
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
      setLoading(false);
    }
    setLoading(false);
    setHistories(totalEvents);
  };

  useEffect(() => {
    if (props.address != '' || props.address)
      getLast20History();
  }, [props.address])

  return (
    <div className="my-20">
      <div className="flex items-center">
        {props.loading &&(          
          <div className="p-10 mx-20 flex items-center">
            <CircularProgress size='2vh'/>
          </div>
        )}
      </div>
      {
        histories.map((history:donationProp, index:number) => {
          const charityIndex = charities.findIndex((item) => item.wallet_address.toLowerCase() === history.from.toLowerCase());
          const wAddress = history.from;
          const wAddressEllipse = wAddress.slice(0,7) + '.....' + wAddress.slice(wAddress.length-5, wAddress.length);
          const myDate = new Date(history.timeStamp * 1000);
          return (
            <Grid container spacing={1} key={index} className="border-b-1 p-5 flex flex-wrap">
              <Grid item xs={6} className="flex items-center overflow-hidden">
                <img src={defaultImg} className="w-40 h-40 mr-10"/>
                <div>
                  <p className="text-16 text-brown font-bold">{wAddressEllipse}</p>
                  <p className="text-14 text-romance">{Web3.utils.fromWei(history.amount)} {history.currency}</p>
                </div>
              </Grid>
              <Grid item xs={6} className="overflow-hidden">
                <div className="flex justify-center items-center h-full">
                  {monthLabels[myDate.getMonth()]} {myDate.getDate()}, {myDate.getFullYear()}
                </div>
              </Grid>
            </Grid>
          )
        })
      }
      {histories.length === 0 && (
        <div>
          There are no fundraising.
        </div>
      )}
    </div>
  )
}