
import { Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import { FaGoogle, FaFlag, FaBook, FaMapMarkedAlt, FaUser, FaBtc } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Web3 from "web3";
import { baseStyles } from "../core/constants/style";
import { useWeb3Context } from "../hooks/web3Context";
import { setLoading } from "../core/store/slices/bridgeSlice";
import { getContract } from "../core/constants/base";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export const FilterCharity = (props:any) => {
  const charity:any = props.info;
  const dispatch = useDispatch();
  const isOwner = useSelector((state: any) => state.app.isOwner);
  const { connected, address } = useWeb3Context();
  const fundPrice = parseFloat(Web3.utils.fromWei(charity.fund));
  const fundLabel = Intl.NumberFormat().format(fundPrice);

  let fundGoal = parseFloat(Web3.utils.fromWei(charity.goal));
  fundGoal = fundGoal > 1 ? fundGoal : 1;
  let fundPercent = fundPrice / fundGoal * 100;
  fundPercent = fundPercent > 100 ? 100 : fundPercent;
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
  return (
    <div className="relative shadow-default p-10 rounded-10 h-full w-full text-16">
      <img src={"https://ipfs.io/ipfs/" + charity.photo} className="w-full h-300"/>
      <div className="font-bold text-22 mt-20 capitalize">{charity.charityType == '0' ? charity.name : charity.title}</div>
      <div className="text-16">
      {
        charity.charityType == '0' ? 'This is charity'
        : (<>by <label className="capitalize">{charity.name}</label></>)
      }        
      </div>
      <div className="h-5 bg-greenwhite my-10">
        <div className={`h-5 bg-algae`} style={{width: fundPercent+'%'}}></div>
      </div>
      <div className="my-10 py-10 flex justify-between">
        <Link to={`/detail/${charity.index}`} className={baseStyles.normalLink}>Read more <FontAwesomeIcon icon={faArrowRight} /></Link>
        <label>$ {fundLabel} <span className="text-gunsmoke">{charity.charityType == '0' ? '' : 'Raised'}</span></label>
      </div>
      <div className="absolute top-270 right-20">
        <Link to={`/donate/${charity.index}`} className={baseStyles.normalBtn}>Donate</Link>
        {isOwner > 2 && 
        (<button className={baseStyles.normalBtn} onClick={() => blockCharity(charity.index)}>Block This</button>)
        }
      </div>
    </div>
  )
}