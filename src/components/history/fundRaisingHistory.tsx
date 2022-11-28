import { Grid, CircularProgress } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Web3 from "web3";
import { birthDDAContractNumber, connectWeb3, getContract, maximumAllDoantion } from "../../core/constants/base";

import { donationProp, charityProp } from "../../core/interfaces/base";
import { useWeb3Context } from "../../hooks/web3Context";
import { FromNetwork, tokenList } from "../../networks";

const blankHistory: donationProp[] = [];

export const FundRaisingHistory = (props:any) => {

  const {address} = useWeb3Context();
  const [loading, setLoading] = useState(false);
  const [histories, setHistories] = useState(blankHistory);
  const charities:charityProp[] = useSelector((state:any) => state.app.allCharities);
  const getLast20History = async () => {
    if(address === '')
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
              '_to': address
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
    getLast20History();
  }, [address])

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
            const charityIndex = charities.findIndex((item) => item.wallet_address === history.from);
            const wAddress = history.from;
            return (
              <Grid container spacing={1} key={index} className="border-b-1 p-5 ">
                <Grid item xs={4} className="overflow-hidden text-center">
                    { wAddress.slice(0,7) + '.....' + wAddress.slice(wAddress.length-5, wAddress.length) }
                </Grid>
                <Grid item xs={4} className="overflow-hidden text-center">
                    { history.currency }
                </Grid>
                <Grid item xs={4} className="overflow-hidden text-center">
                    { Web3.utils.fromWei(history.amount) }
                </Grid>
              </Grid>
            )
          })
        }
    </div>
  )
}