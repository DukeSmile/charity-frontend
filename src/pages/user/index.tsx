import { Grid } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import { useWeb3Context } from "../../hooks/web3Context";
import { loginUserProp } from "../../core/interfaces/base";

import logoImg from "../../assets/images/logo.png";
import remoteImg from "../../assets/images/components/remote.png";
import currenciesImg from "../../assets/images/components/currencies.png";
import { useEffect } from "react";
import { baseStyles } from "../../core/constants/style";
import { RegistrationPage } from "./registration";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff, faUser } from "@fortawesome/free-solid-svg-icons";
import { DonationHistoryAll } from "../../components/history/donationHistoryAll";
import { FundRaisingHistory } from "../../components/history/fundRaisingHistory";

export const UserPage = () => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { action } = useParams();
  const {connected, address, provider, disconnect} = useWeb3Context();
  const loginUser:loginUserProp = useSelector((state:any) => state.app.loginUser);

  const sidebarStyle = "p-10 cursor-pointer border border-white hover:border-lightgrey rounded-5";
  const sidebarActive = "p-10 cursor-pointer border border-white rounded-5 bg-brown text-white";
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      {action != 'signup' && (
        <div className="relative bg-gradient-to-r from-algae to-seagreen h-400 flex items-end justify-between overflow-hidden">
          <div></div>
          <img src={remoteImg} className="w-150 h-150 mr-20 sm:w-300 sm:h-300 md:mr-[10%]"/>
          <div className="absolute left-[10%] top-0 w-full h-full text-white flex items-center">
            <div className="mt-100 mx-20">
              <p className="text-48 font-bold">Profile Settings</p>
              <p className="text-20 my-10">Complete tasks by easily following the profile process.</p>
            </div>
          </div>
        </div>
      )}
      {action === 'signup' && (
        <div className="relative bg-gradient-to-r from-algae to-seagreen h-400 flex items-end justify-between overflow-hidden">
          <img src={remoteImg} className="w-150 h-150 ml-20 sm:w-300 sm:h-300 md:ml-[5%]"/>
          <img src={currenciesImg} className="w-250 h-90 mr-20 md:w-500 md:h-180 md:mr-[5%]"/>
          <div className="absolute left-0 top-0 w-full h-full text-white text-center flex items-center justify-center">
            <div className="mt-50 mx-20">
              <p className="text-48 font-bold">Let’s get you started!</p>
              <p className="text-20">Work your way through our easy to follow registration process.</p>
            </div>
          </div>
        </div>
      )}
      <div className="w-[95%] md:w-[80%] mx-auto border-1 my-70 px-35 py-50">
        <Grid container spacing={2}>
          <Grid item container xs={12} sm={4} md={3}>
            <div className="p-20 rounded-10 border-1 w-full">
              <div className="bg-logo py-10 w-full flex justify-center">
                <img src={logoImg} className="w-120 h-120"/>
              </div>
              <div className={action === 'signup' ? sidebarActive : sidebarStyle} onClick={() => navigate('/user/signup')}>
                Start Fundraise
              </div>
              {loginUser.id != '' && (
                <div className={action === 'profile' ? sidebarActive : sidebarStyle} onClick={() => navigate('/user/profile')}>
                  <FontAwesomeIcon icon={faUser} className="mr-10"/>User Profile
                </div>
              )}
              <div className={action === 'donations' ? sidebarActive : sidebarStyle} onClick={() => navigate('/user/donations')}>
                My donations
              </div>
              <div className={action === 'fundraising' ? sidebarActive : sidebarStyle} onClick={() => navigate('/user/fundraising')}>
                My fundraising
              </div>
              { connected && (
                <div className={sidebarStyle} onClick={() => disconnect()}>
                  <FontAwesomeIcon icon={faPowerOff} className="mr-10" />Disconnect
                </div>
              )}
            </div>
          </Grid>
          <Grid item xs={12} sm={8} md={9}>
            <div className="p-20 rounded-10 border-1 w-full">
              {action === "signup" && (
                <RegistrationPage edit={false}/>
              )}
              {action === "profile" && (
                <RegistrationPage edit={true} />
              )}
              {action === "donations" && (
                <DonationHistoryAll />
              )}
              {action === "fundraising" && (
                <FundRaisingHistory />
              )}
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}