import { Grid } from "@material-ui/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Web3 from "web3";

import { getContract } from "../../core/constants/base";
import { FromNetwork } from "../../networks";
import { charityProp } from "../../core/interfaces/base";
import { setCharities, setFundRaisers, setLoading } from "../../core/store/slices/bridgeSlice";
import { useWeb3Context } from "../../hooks/web3Context";
import { FaBook, FaBtc, FaFlag, FaGoogle, FaMapMarkedAlt, FaUser } from "react-icons/fa";
import { FundraiserInfo } from "../../components/info/fundraiserInfo";

export const FundRaisersPage = () => {
  const dispatch = useDispatch();
  const fundRaisers = useSelector( (state:any) => state.app.fundRaisers);
  const isOwner = useSelector( (state:any) => state.app.isOwner);
  const {connected, address} = useWeb3Context();
  const style={
    btn: 'border-2 rounded-10 text-black hover:text-white hover:bg-limedSqruce p-5 m-10'
  };

  return (
    <div>
      <div className="relative bg-gradient-to-r from-algae to-seagreen w-full h-200 flex items-end justify-between overflow-hidden">
      </div>
      <div className="w-[95%] md:w-[80%] mx-auto border-1 my-70 p-20">
        <Grid container spacing={2}>
          <Grid item xs={12} className="text-24 font-bold text-center">FundRaisers</Grid> 
          {
            fundRaisers.map((charity:charityProp) => {
              return (
                <Grid xs={12} sm={6} md={4} lg={3} item key={charity.index}>
                  <FundraiserInfo info={charity} />
                </Grid>
              )
            })
          }
        </Grid>
      </div>
    </div>
  );
}