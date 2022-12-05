
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { baseStyles } from "../core/constants/style";


import donateImg from "../assets/images/donate.png";

export const DonateToAnimal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="w-[95%] md:w-[80%] mx-auto p-20 px-40 flex justify-between items-center rounded-40 bg-alabaster">
      <div className="z-100 w-[90%] sm:w-[70%] md:max-w-[50%]">
        <p className="text-40 font-bold">
          Ready to get started? Raise Your Helping Hand For Animals
        </p>
        <p className="text-16 my-15">
          Thanks to the help of our generous supporters, ACE has been working to
          improve animal welfare for the last decade—influencing millions of
          donations, conducting rigorous charity evaluations, and funding new.
        </p>
        <div className="flex mt-40">
          <button
            className={
              baseStyles.normalBtn + ' text-green hover:bg-green mr-30'
            }
            onClick={() => navigate('/filter/animal')}
          >
            Donate Now <FontAwesomeIcon icon={faArrowRight} />
          </button>
          <Link
            to="/user/signup"
            className={baseStyles.normalBtn + ' text-green hover:bg-green'}
          >
            Register with Okapi <FontAwesomeIcon icon={faArrowRight} />
          </Link>
        </div>
      </div>
      <img
        src={donateImg}
        className="absolute md:relative right-0 hidden sm:block md:max-w-300 md:max-h-300 z-10 mr-10"
      />
    </div>
  )
}
