import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Grid } from "@material-ui/core";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { baseIconProp, baseIcons } from "../../core/constants/icons";
import { baseStyles } from "../../core/constants/style";
import { charityProp } from "../../core/interfaces/base";
import leaveImg from "../../assets/images/components/leave.png";
import currenciesImg from "../../assets/images/components/currency.png";

export const BecomeMemberPage = () => {
  const donateTypes = ['health','education','environmental','animal'];
  return (
    <div className="relative bg-gradient-to-r from-algae to-seagreen h-500 flex items-center">
        <div className="max-w-800 mx-auto z-20">
            <p className="text-center text-48 font-bold text-white">Become a Member:</p>
            <p className="text-center text-48 font-bold text-white">Your monthly gifts save lives</p>
            <p className="text-center text-16 text-white p-20">Thanks to the help of our generous supporters, ACE has been working to improve animal welfare for the last decade—influencing millions of donations, conducting rigorous charity evaluations, and funding new.</p>
            <div className="flex justify-center mt-20">
                <button className={baseStyles.normalBtn + ' text-white hover:bg-white mr-30'}>
                    Donate Now <FontAwesomeIcon icon={faArrowRight} />
                </button>
                <Link to="/registration/0" className={baseStyles.normalBtn + ' text-white hover:bg-white'}>
                    Register with Okapi <FontAwesomeIcon icon={faArrowRight} />
                </Link>
            </div>
        </div>
        <div className="absolute bottom-0 w-full h-full flex items-end justify-between z-0 overflow-hidden">
            <img src={currenciesImg} className="w-300 h-100 ml-20 md:w-600 sm:h-200 md:ml-[5%]"/>
            <img src={leaveImg} className="w-200 h-180 mr-20 md:w-400 md:h-360 md:mr-[5%]"/>
        </div>
    </div>
  );
}