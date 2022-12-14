import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import {  useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { FeaturedCategories, FeaturedCharities, FeaturedFundRaisers } from "./featuredCharities";
import { BecomeMemberPage } from "./becomeMember";
import { baseStyles } from "../../core/constants/style";
import { LatestNews } from "./lastedNews";
import { DonateToAnimal } from "../../components/donateToAnimal";

export const HomePage = () => {

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="pb-20">
      <div className="w-full h-screen bg-home bg-cover bg-center bg-no-repeat flex items-center justify-center">
        <div className="text-center max-w-900 mx-auto px-20">
          <p className="capitalize text-70 text-white font-bold">every donation makes a difference</p>
          <p className="text-20 text-white">Okapi DDA providing a revolutionary alternative way to donate to charity using the blockchain than through traditional methods.</p>
          <div className="flex justify-center mt-40">
            <button className={baseStyles.greenBtn + ' mr-30'} onClick={() => navigate('/filter/all')}>
              Donate Now <FontAwesomeIcon icon={faArrowRight} />
            </button>
            <button className="flex items-center text-white hover:text-brown" onClick={() => navigate('/about')}>
              <div className="w-50 h-50 border-1 border-white rounded-full mr-20 flex items-center justify-center">
                <div className="w-35 h-35 border-1 border-white rounded-full bg-white text-black flex items-center justify-center">
                  <FontAwesomeIcon icon={faCaretRight} />
                </div>
              </div>
              How it works
            </button>
          </div>
        </div>
      </div>
      <div>
        <FeaturedCategories />
        <FeaturedCharities />
        {/* <FundRaiseForPage /> */}
        <BecomeMemberPage />
        <FeaturedFundRaisers />
        <LatestNews />
      </div>
      <DonateToAnimal />
    </div>
  );
}