
import { Grid } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faUpload } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import checkedImg from "../assets/images/components/checked.png";

import { baseStyles } from "../core/constants/style";

export const CelebratePage = () => {

  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <div className="relative bg-gradient-to-r from-algae to-seagreen w-full h-200 flex items-end justify-between overflow-hidden">
      </div>
      <div className="w-[95%] md:w-[80%] mx-auto border-1 my-70">
        <div className="bg-gradient-to-r from-algae to-seagreen w-full flex justify-center">
          <div className="relative -top-50">
            <div className="flex justify-center"><img src={checkedImg} className="w-100 h-100" /></div>
            <p className="text-80 text-white font-bold">Thank you</p>
            <p className="text-28 text-white">For registering with the Okapi DDA</p>
          </div>
        </div>
        <div className="py-100 px-20 sm:px-100 w-full flex flex-col justify-center items-center">
          <p className="text-24 text-gunsmoke my-20">We will be in touch via email once the information you have provided has been reviewed by our team</p>
          <button onClick={() => navigate('/')} className={baseStyles.normalBtn + " bg-brown text-white m-10 w-200"}>Click to Continue <FontAwesomeIcon icon={faArrowRight} /></button>
        </div>
      </div>
    </div>
  );
};