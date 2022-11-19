import { Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaLinkedin, FaTwitter, FaGoogle, FaFacebook, FaInstagram, FaPhoneAlt, FaNetworkWired, FaFlag, FaBook, FaRegistered } from "react-icons/fa";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Web3 from "web3";

import { charityProp } from "../core/interfaces/base";
import { useWeb3Context } from "../hooks/web3Context";
import { getContract } from "../core/constants/base";
import { setLoading } from "../core/store/slices/bridgeSlice";
import { baseStyles } from "../core/constants/style";
import { CharityInfo } from "../components/charityInfo";

export const CharitiesPage = () => {
  const dispatch = useDispatch();
  const charities = useSelector((state: any) => state.app.charities);
  const isOwner = useSelector((state: any) => state.app.isOwner);
  const { connected, address } = useWeb3Context();
  const style = {
    btn: 'border-2 rounded-10 text-black hover:text-white hover:bg-limedSqruce p-5 m-10'
  };

  const resumeStyle = 'm-5 hover:text-brown';
  return (
    <div>
      <div className="relative bg-gradient-to-r from-algae to-seagreen w-full h-200 flex items-end justify-between overflow-hidden">
      </div>
      <div className="w-[95%] md:w-[80%] mx-auto border-1 my-70">
        <Grid container spacing={2}>
          <Grid item xs={12} className="text-24 font-bold text-center">Charities</Grid>
          {
            charities.map((charity: charityProp) => {
              return (
                <Grid xs={12} sm={6} md={4} lg={3} item key={charity.index}>
                  <CharityInfo info={charity} />
                </Grid>
              )
            })
          }
        </Grid>
      </div>
    </div>
  );
}