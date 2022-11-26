import { faPowerOff, faSignOut, faUser, faWallet } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Menu, MenuItem, Button } from '@material-ui/core';
import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaLinkedin, FaTwitter, FaGoogle, FaFacebook, FaInstagram } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';

import { baseStyles } from '../../core/constants/style';
import { useWeb3Context } from '../../hooks/web3Context';
import { handleSignMessage, baseServerUrl } from '../../core/constants/base';
import { setCharityType, setLoginUser, setSignHash } from '../../core/store/slices/bridgeSlice';
import axios from 'axios';

export const ConnectWalletButton = () => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const resumeStyle = 'm-5 hover:text-black';
  const ref = useRef<HTMLDivElement | null>(null);
  const { connect, disconnect, address, provider } = useWeb3Context();
  const [showMenu, setShowMenu] = useState(false);
  const loginUser = useSelector((state:any) => state.app.loginUser);

  const SiginWalletAddress = async () => {
    setShowMenu(false);
    if (provider === null) 
      return;
    const signHash = await handleSignMessage(address, provider);
    if (signHash === '')
      return;
    dispatch(setSignHash(signHash));
    let response;
    try {
      response = await axios.post(`${baseServerUrl}/auth/login`, {
        sign_hash: signHash
      });
      console.log("[logined user]", response.data);
      dispatch(setLoginUser(response.data));
      dispatch(setCharityType(response.data.charity_type === 0 ? 'charity' : 'fundraiser'));
    }
    catch (e: any) {
      console.log(e);
    }
  }
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (
        ref.current &&
        event.target &&
        ref.current.contains(event.target as Node)
      ) {
        return;
      }
      setShowMenu(false);
    };
    document.addEventListener("click", listener, { capture: true });
    return () => {
      document.removeEventListener("click", listener, { capture: true });
    };
  }, []);

  return (
    <div className="z-100 flex">
      <div className="text-24 text-iron cursor-pointer m-10 hidden sm:flex">
        <FaLinkedin className={resumeStyle} />
        <FaTwitter className={resumeStyle} />
        <FaFacebook className={resumeStyle} />
        <FaInstagram className={resumeStyle} />
        <FaGoogle className={resumeStyle}/>
      </div>
      {
        address === '' ? (
          <button className={baseStyles.greenBtn} onClick={connect}>
            <div className="h-20 overflow-hidden"><FontAwesomeIcon icon={faWallet} className="mr-10"/>Connect wallet</div>
          </button> ) :
          (
            <div className="relative" ref={ref}>
              <button 
                className={baseStyles.greenBtn + ' z-100'}
                onClick={() => setShowMenu(!showMenu)}
              >
                <div className="lowercase overflow-hidden h-20">
                  <FontAwesomeIcon icon={faWallet} className="mr-10"/>
                  {address.slice(0,7)} ..... {address.slice(address.length-5, address.length)}
                </div>
              </button>
              <div className={'w-200 absolute bg-white border-1 ' + (showMenu ? '' : 'hidden')}>
                {loginUser.id === '' && (
                  <div>
                    <Button className="text-center w-full" onClick={SiginWalletAddress}>Sign in</Button>
                  </div>
                )}
                <div>
                  <Button className="text-center w-full" onClick={() => {
                    setShowMenu(false);
                    navigate('/user/signup');
                  }}>Start fundraising</Button>
                </div>
                {loginUser.id != '' && (
                  <div>
                    <Button className="text-center w-full" onClick={() => {
                      setShowMenu(false);
                      navigate('/user/profile');
                    }}>User Profile</Button>
                  </div>
                )}
                <div>
                  <Button className="text-center w-full" onClick={() => {
                    setShowMenu(false);
                    navigate('/user/donations');
                  }}>My Donations</Button>
                </div>
                <div>
                  <Button className="text-center w-full" onClick={() => {
                    setShowMenu(false);
                    navigate('/user/fundraising');
                  }}>My fundraising</Button>
                </div>
                <div>
                  <Button className="text-center w-full" onClick={() => {
                    setShowMenu(false);
                    disconnect();
                  }}>Disconnect</Button>
                </div>
              </div>
              {/* <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={showMenu}
                onClose={() => setAnchorEl(null)}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
                PaperProps={{
                  style: {
                    width: "200px",
                    marginTop: "40px",
                    position: "relative",
                    top: "0px"
                  }
                }}
              >
                <MenuItem onClick={() => {
                  setAnchorEl(null);
                  disconnect();
                }}>
                  <Button className="text-center w-full">Disconnect</Button>
                </MenuItem>
              </Menu> */}
            </div>
          )
      }
    </div>
  );
}
