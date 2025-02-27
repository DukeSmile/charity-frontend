
import { Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import { FaGoogle, FaFlag, FaBook, FaMapMarkedAlt, FaUser, FaBtc } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Web3 from "web3";
import { baseStyles } from "../../core/constants/style";
import { useWeb3Context } from "../../hooks/web3Context";
import { setLoading } from "../../core/store/slices/bridgeSlice";
import { getContract } from "../../core/constants/base";

export const FundraiserInfo = (props:any) => {
  const currentFundraiser = props.info;
  const dispatch = useDispatch();
  const isOwner = useSelector((state: any) => state.app.isOwner);
  const { connected, address } = useWeb3Context();
    
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

  const style={
    btn: 'border-2 rounded-10 text-black hover:text-white hover:bg-limedSqruce p-5 m-10'
  };

  const photoUrl = currentFundraiser.photo == '' ? '' : "https://ipfs.io/ipfs/" + currentFundraiser.photo;
  return (
    <div className="shadow-default p-10 rounded-10 h-full w-full text-16">
      <img src={photoUrl} className="w-full h-300"/>
      <div className="font-bold text-center text-22 my-10 h-70 overflow-hidden">{currentFundraiser.summary}</div>
      {/* <div className="flex text-20 items-center capitalize"><FaUser className="mx-5"/>{charity.name}</div>
      <div className="flex text-20 items-center"><FaGoogle className="mx-5"/>{charity.email}</div>
      <div className="flex h-80 overflow-hidden text-20 items-start">
          <FaBook className="m-5"/>
          <div>{charity.summary}</div>
      </div>
      <div className="flex text-20 items-center capitalize"><FaFlag className="mx-5"/>{charity.country}</div>
      <div className="flex text-20 items-center capitalize"><FaMapMarkedAlt className="mx-5"/>{charity.location}</div>
      <div className="flex text-20 items-center mb-10"><FaBtc className="mx-5"/>{Web3.utils.fromWei(charity.fund)}</div> */}
      <div className="h-[1px] my-10 mb-20 bg-lightgrey"></div>
      <div className="py-10 my-10">
        <Link to={`/detail/${currentFundraiser.index}`} className={baseStyles.normalBtn + ' mr-10 hover:bg-brown hover:text-white'}>Read more</Link>
        <label></label>
      </div>
    </div>
  )
}