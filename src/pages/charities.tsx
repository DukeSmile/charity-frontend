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
export const CharitiesPage = () => {
  const dispatch = useDispatch();
  const charities = useSelector((state: any) => state.app.charities);
  const isOwner = useSelector((state: any) => state.app.isOwner);
  const { connected, address } = useWeb3Context();
  const style = {
    btn: 'border-2 rounded-10 text-black hover:text-white hover:bg-limedSqruce p-5 m-10'
  };
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
                  <div className="shadow-default p-10 rounded-10 h-full w-full text-16">
                    <img src={"https://ipfs.io/ipfs/" + charity.catalog.photo} className="w-full h-300" />
                    <div className="font-bold text-center text-20 my-10">{charity.catalog.name}</div>
                    <div className="flex text-20 items-center capitalize"><FaRegistered className="mx-5" />{charity.catalog.vip}</div>
                    <div className="flex text-20 items-center"><FaGoogle className="mx-5" />{charity.catalog.email}</div>
                    <div className="flex h-80 overflow-hidden text-20 items-start">
                      <FaBook className="m-5" />
                      <div>{charity.catalog.summary}</div>
                    </div>
                    <div className="flex text-20 items-center capitalize"><FaFlag className="mx-5" />{charity.catalog.country}</div>
                    <div className="text-24 flex text-asphalt cursor-pointer my-10">
                      <FaNetworkWired className={resumeStyle} />
                      <FaPhoneAlt className={resumeStyle} />
                      <FaLinkedin className={resumeStyle} />
                      <FaTwitter className={resumeStyle} />
                      <FaFacebook className={resumeStyle} />
                      <FaInstagram className={resumeStyle} />
                    </div>
                    <div className="my-10">
                      <Link to={`/donate/${charity.index}`} className={baseStyles.normalBtn + ' mr-10'}>Donate</Link>
                      {/* {isOwner > 2 && (*/}
                      <button className={baseStyles.normalBtn} onClick={() => blockCharity(charity.index)}>Block This</button>
                      {/* )} */}
                    </div>
                  </div>
                </Grid>
              )
            })
          }
        </Grid>
      </div>
    </div>
  );
}