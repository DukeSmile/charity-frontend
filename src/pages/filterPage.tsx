import { Grid } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faSearch, faSliders } from "@fortawesome/free-solid-svg-icons";
import { FaLinkedin, FaTwitter, FaGoogle, FaFacebook, FaInstagram, FaPhoneAlt, FaNetworkWired, FaFlag, FaBook, FaRegistered, FaMapMarkedAlt, FaUser, FaBtc } from "react-icons/fa";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { charityProp } from "../core/interfaces/base";
import { useWeb3Context } from "../hooks/web3Context";
import { FilterCharity } from "../components/info/filteredCharityInfo";
import donateImg from "../assets/images/components/filter.png";
import leaveImg from "../assets/images/components/leave.png";

export const FilterCharitiesPage = () => {

  let { category } = useParams();
  const dispatch = useDispatch();
  let charities = useSelector((state: any) => state.app.allCharities);
  const isOwner = useSelector((state: any) => state.app.isOwner);
  const { connected, address } = useWeb3Context();
  const style = {
    btn: 'border-2 rounded-10 text-black hover:text-white hover:bg-limedSqruce p-5 m-10'
  };

  if (category !== 'all') {
    // charities = charities.filter((charity:any)  => charity.fundType === category);
  }

  useEffect(() => {
    window.scrollTo(0,0);
  }, []);
  const resumeStyle = 'm-5 hover:text-brown';
  return (
    <div>
      <div className="relative bg-gradient-to-r from-algae to-seagreen w-full h-600 sm:h-450 flex items-end justify-between overflow-hidden">
        <img src={donateImg} className="w-175 h-110 ml-20 sm:w-350 sm:h-220"/>
        <img src={leaveImg} className="w-200 h-180 mr-20 md:w-400 md:h-360"/>
        <div className="absolute left-0 top-0 w-full h-full text-white text-center flex items-center justify-center">
          <div className="mt-170 mx-20">
            <p className="text-48 font-bold">Find your resource</p>
            <p className="text-20">Quisque dignissim maximus ipsum, sed rutrum metus tincidunt et.</p>
            <p className="text-20">Sed eget tincidunt ipsum. Quisque dignissim maximus ipsum</p>
            <div className="h-70 bg-white rounded-full my-40 flex items-center justify-between">
              <div className="flex">
                <div className="text-black ml-35 flex items-center border-r-1 pr-10">
                  <FontAwesomeIcon icon={faSliders} className="mr-10"/>
                  <button className="w-60 flex justify-between items-center">
                    <label>Filter</label>
                    <FontAwesomeIcon icon={faCaretDown}/>
                  </button>
                </div>
                <div className="w-full ml-20">
                  <input type="text" placeholder="Search for Fundraise" className="w-full text-16 text-black outline-none"/>
                </div>
              </div>
              <div className="w-55 min-w-55 h-55 flex items-center justify-center bg-algae text-white rounded-full mr-10">
                <FontAwesomeIcon icon={faSearch} className="text-16"/>
              </div>
            </div>
          </div>
        </div>
      </div>
      {charities.length > 0 && (
        <div className="w-[95%] md:w-[80%] mx-auto border-1 my-70">
          <Grid container spacing={2}>
            {
              charities.map((charity: charityProp, index:number) => {
                return (
                  <Grid xs={12} sm={6} md={4} lg={3} item key={charity.index}>
                    <FilterCharity info={charity}/>
                  </Grid>
                )
              })
            }
          </Grid>
        </div>
      )}
      {charities.length === 0 &&
        <div className="w-[95%] md:w-[80%] mx-auto border-1 my-70 p-20">
          <div className="text-24">There is no charity & fundraiser on this <label className="font-bold text-black">{category}</label> category</div>
        </div>
      }
    </div>
  );
}