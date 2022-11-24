import { Grid, TextField } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Web3 from "web3";

import { adminUserProp } from "../../core/interfaces/base";
import { useWeb3Context } from "../../hooks/web3Context";
import { getContract, roleList } from "../../core/constants/base";
import { setLoading } from "../../core/store/slices/bridgeSlice";
import { FeaturedCategories, FeaturedCharities, FeaturedFundRaisers } from "./featuredCharities";
import { FundRaiseForPage } from "./fundraiseFor";
import bgImg from "../../assets/images/home.png";
import { BecomeMemberPage } from "./becomeMember";
import { baseStyles } from "../../core/constants/style";
import donateImg from "../../assets/images/donate.png";
import { LatestNews } from "./lastedNews";
import { DonateToAnimal } from "../../components/donateToAnimal";

export const HomePage = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isOwner = useSelector( (state:any) => state.app.isOwner);
  const adminUsers = useSelector( (state:any) => state.app.adminUsers);
  const {connected, address} = useWeb3Context();
  const [newUserAddr, setNewUserAddr] = useState('');
  const [newUserName, setNewUserName] = useState('AdminUser');
  const style={
    btn: 'border-2 rounded-10 text-black hover:text-white hover:bg-limedSqruce p-5 m-10'
  };
  const registryNewAdmin = async () => {
    if(newUserAddr != '') {
      let ddaContract = getContract('DDAContract');
      if(await ddaContract.methods.hasRole(roleList['owner'], newUserAddr).call()) {
        alert("This wallet address is owner address.");
        return;
      }
      else if(await ddaContract.methods.hasRole(roleList['admin'], newUserAddr).call()) {
        alert("This wallet address is admin address.");
        return;
      }
      else if(await ddaContract.methods.hasRole(roleList['charity'], newUserAddr).call()) {
        alert("This wallet address is charity/fundraiser address.");
        return;
      }
      else if(await ddaContract.methods.hasRole(roleList['black'], newUserAddr).call()) {
        alert("This wallet address is blacklist address.");
        return;
      }
      dispatch(setLoading(true));
      try{
        
        await ddaContract.methods.addAdmin(newUserAddr, newUserName).send({from: address});
        setNewUserAddr('');
        setNewUserName('AdminUser');
      }
      catch (e) {
        console.log(e);
      }
      dispatch(setLoading(false));
    }
  };
  const removeAdmin = async(index: number) => {
    if(connected && address != '') {
      dispatch(setLoading(true));
      let ddaContract = getContract('DDAContract');
      try{
        await ddaContract.methods.removeAdmin(index).send({from: address});
      }
      catch (e) {
        console.log(e);
      }
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="pb-20">
      <div className="w-full h-screen bg-home bg-cover bg-center bg-no-repeat flex items-center justify-center">
        <div className="text-center max-w-900 mx-auto px-20">
          <p className="capitalize text-70 text-white font-bold">every donation makes a difference</p>
          <p className="text-20 text-white">Nullam eu nibh vitae est tempor molestie id sed ex. Quisque dignissim maximus ipsum, sed rutrum metus tincidunt et. Sed eget tincidunt ipsum.</p>
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
        <FundRaiseForPage />
        <BecomeMemberPage />
        <FeaturedFundRaisers />
        <LatestNews />
      </div>
      <DonateToAnimal />
    </div>
  );
}