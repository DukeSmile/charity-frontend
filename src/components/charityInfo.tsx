import { Link } from "react-router-dom";
import { FaLinkedin, FaTwitter, FaGoogle, FaFacebook, FaInstagram, FaPhoneAlt, FaNetworkWired, FaFlag, FaBook, FaRegistered } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useWeb3Context } from "../hooks/web3Context";
import { getContract } from "../core/constants/base";
import { setLoading } from "../core/store/slices/bridgeSlice";
import { baseStyles } from "../core/constants/style";

export const CharityInfo = (props:any) => {
  const charity = props.info;
  const dispatch = useDispatch();
  const isOwner = useSelector((state: any) => state.app.isOwner);
  const { connected, address } = useWeb3Context();

  const resumeStyle = 'm-5 hover:text-brown';
    
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

  return (
    <div className="shadow-default p-10 rounded-10 h-full w-full text-16">
      <img src={"https://ipfs.io/ipfs/" + charity.catalog.photo} className="w-full h-300" />
      <div className="font-bold text-center text-24 my-10">{charity.catalog.name}</div>
      <p className="text-16 h-50 overflow-hidden">{charity.catalog.summary}</p>
      {/* <div className="flex text-20 items-center capitalize"><FaRegistered className="mx-5" />{charity.catalog.vip}</div>
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
      </div> */}
      <div className="py-10 my-10">
        {/* <Link to={`/detail/${charity.index}`} className={baseStyles.normalBtn + ' mr-10 hover:bg-brown hover:text-white'}>Read more</Link> */}
        <Link to={`/donate/${charity.index}`} className={baseStyles.normalBtn + ' mr-10 hover:bg-brown hover:text-white'}>Donate Now</Link>
        {/* {isOwner > 2 && (
          <button className={baseStyles.normalBtn} onClick={() => blockCharity(charity.index)}>Block This</button>
        )} */}
      </div>
    </div>
  )
}