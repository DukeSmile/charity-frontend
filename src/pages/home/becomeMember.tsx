import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Grid } from "@material-ui/core";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { baseIconProp, baseIcons } from "../../core/constants/icons";
import { baseStyles } from "../../core/constants/style";
import { charityProp } from "../../core/interfaces/base";

export const BecomeMemberPage = () => {
  const donateTypes = ['health','education','environmental','animal'];
  return (
    <div className="bg-gradient-to-r from-algae to-seagreen">
        <div className="max-w-800 mx-auto px-20 py-100">
            <p className="text-center text-48 font-bold text-white">Become a Member:</p>
            <p className="text-center text-48 font-bold text-white">Your monthly gifts save lives</p>
            <p className="text-center text-16 text-white p-30">Thanks to the help of our generous supporters, ACE has been working to improve animal welfare for the last decade—influencing millions of donations, conducting rigorous charity evaluations, and funding new.</p>
            <div className="flex justify-center mt-40">
                <button className={baseStyles.normalBtn + ' text-white hover:bg-white mr-30'}>
                    Donate Now <FontAwesomeIcon icon={faArrowRight} />
                </button>
                <button className={baseStyles.normalBtn + ' text-white hover:bg-white'}>
                    Register with Okapi <FontAwesomeIcon icon={faArrowRight} />
                </button>
            </div>
        </div>
    </div>
  );
}