import { Grid } from "@material-ui/core";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaLinkedin, FaTwitter, FaGoogle, FaFacebook, FaInstagram, FaPhoneAlt, FaNetworkWired, FaFlag, FaBook, FaRegistered, FaMapMarkedAlt, FaUser, FaBtc } from "react-icons/fa";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { charityProp } from "../core/interfaces/base";
import { useWeb3Context } from "../hooks/web3Context";
import { getContract } from "../core/constants/base";
import { setLoading } from "../core/store/slices/bridgeSlice";
import { baseStyles } from "../core/constants/style";
import { CharityInfo } from "../components/charityInfo";
import { FundraiserInfo } from "../components/fundraiserInfo";
import donateImg from "../assets/images/components/filter.png";
import leaveImg from "../assets/images/components/leave.png";

export const FilterCharitiesPage = () => {

  let { category } = useParams();
  const dispatch = useDispatch();
  let charities = useSelector((state: any) => state.app.charities);
  let fundRaisers = useSelector((state: any) => state.app.fundRaisers);
  const isOwner = useSelector((state: any) => state.app.isOwner);
  const { connected, address } = useWeb3Context();
  const style = {
    btn: 'border-2 rounded-10 text-black hover:text-white hover:bg-limedSqruce p-5 m-10'
  };

  if (category !== 'all') {
    charities = charities.filter((charity:any)  => charity.fundType === category);
    fundRaisers = fundRaisers.filter((charity:any)  => charity.fundType === category);
  }

  useEffect(() => {
    window.scrollTo(0,0);
  }, []);
  const resumeStyle = 'm-5 hover:text-brown';
  return (
    <div>
      <div className="relative bg-gradient-to-r from-algae to-seagreen w-full h-500 flex items-end justify-between overflow-hidden">
        <img src={donateImg} className="w-175 h-110 ml-20 sm:w-350 sm:h-220"/>
        <img src={leaveImg} className="w-200 h-180 mr-20 md:w-400 md:h-360"/>
        <div className="absolute left-0 top-0 w-full h-full text-white text-center flex items-center justify-center">
          <div className="mt-50 mx-20">
            <p className="text-48 font-bold">Find your resource</p>
            <p className="text-20">Quisque dignissim maximus ipsum, sed rutrum metus tincidunt et.</p>
            <p className="text-20">Sed eget tincidunt ipsum. Quisque dignissim maximus ipsum</p>
            <div className="h-70 bg-white rounded-full my-40 flex items-center">
              <div className="w-50 h-50 flex items-center justify-center bg-green text-white">
                <fontAwe
              </div>
            </div>
          </div>
        </div>
      </div>
      {charities.length > 0 && (
        <div className="w-[95%] md:w-[80%] mx-auto border-1 my-70">
          <Grid container spacing={2}>
            <Grid item xs={12} className="text-24 font-bold text-center capitalize">{category} Charities</Grid>
            {
              charities.map((charity: charityProp, index:number) => {
                return (
                  <Grid xs={12} sm={6} md={4} lg={3} item key={charity.index}>
                    <CharityInfo info={charity}/>
                  </Grid>
                )
              })
            }
          </Grid>
        </div>
      )}
      {fundRaisers.length > 0 && (
        <div className="w-[95%] md:w-[80%] mx-auto border-1 my-70 p-20">
          <Grid container spacing={2}>
            <Grid item xs={12} className="text-24 font-bold text-center capitalize">{category} FundRaisers</Grid> 
            {
              fundRaisers.map((charity:charityProp, index:number) => {
                return (
                  <Grid xs={12} sm={6} md={4} lg={3} item key={charity.index}>
                    <FundraiserInfo info={charity} key={index}/>
                  </Grid>
                )
              })
            }
          </Grid>
        </div>
      )}
      {charities.length === 0 && fundRaisers.length === 0 &&
        <div className="w-[95%] md:w-[80%] mx-auto border-1 my-70 p-20">
          <div className="text-24">There is no charity & fundraiser on this <label className="font-bold text-black">{category}</label> category</div>
        </div>
      }
    </div>
  );
}