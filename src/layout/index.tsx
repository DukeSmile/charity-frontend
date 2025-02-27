import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FooterTab } from '../components/footer';
import LoadingBar from '../components/loadingBar';
import { Nav } from '../components/Nav';
import { baseServerUrl, getContract, handleSignMessage, roleList } from '../core/constants/base';
import { adminUserProp, charityProp } from '../core/interfaces/base';
import { demoLoginUser, setAdminUsers, setAllCharities, setCategories, setCharities, setCharityType, setFundRaisers, setLoginUser, setOwnerFlag, setSignHash } from '../core/store/slices/bridgeSlice';
import { useWeb3Context } from '../hooks/web3Context';
import { FromNetwork } from '../networks';

export const Layout = ({children}: any) => {
  const dispatch = useDispatch();
  const {address, switchEthereumChain, provider, connected} = useWeb3Context();
  const [count, setCount] = useState(0);
  const [footerHeight, setFooterHeight] = useState(0);
  const loading = useSelector((state:any) => state.app.loading);

  useEffect(() => {
  });

  const getDDAInfo = async() => {
    const ddaContract = getContract('DDAContract');
    //get charities information from contract
    const charitiesFromContract = await ddaContract.methods.getCharities().call();
    // console.log('[contract] : ', charitiesFromContract);
    let charities:charityProp[] = [],
      fundRaisers:charityProp[] = [],
      allCharities:charityProp[] = [];
    let initialCategories:{[key:string]: {count:number}} = {};
    let charitiesFromDatabase:any[] = [];
    try {
      let response = await axios.get(`${baseServerUrl}/users/all`);
      if(response.data)
        charitiesFromDatabase = response.data;
    }
    catch(e:any) {
      console.log(e.message);
      return;
    }
    // console.log(charitiesFromDatabase);
    charitiesFromContract.forEach((charity: any, index:number) => {
      let newOne:any = {};
      let dbInfo = charitiesFromDatabase.find((record:any) => record.wallet_address.toLowerCase() === charity.walletAddress.toLowerCase());
      if (dbInfo) {
        Object.keys(dbInfo).forEach((key:any) => {
          newOne[key] = dbInfo[key];
        })
      }
      newOne['index'] = index;
      newOne['contract'] = charity.catalog;
      if (initialCategories[newOne.fund_type] != undefined) {
        initialCategories[newOne.fund_type]['count'] = initialCategories[newOne.fund_type]['count'] + 1;
      }
      else {
        initialCategories[newOne.fund_type] = {count: 1};
      }
      if (newOne.charity_type === 1 || newOne.charity_type === '1') {
          fundRaisers.push(newOne);
      }
      else {
          charities.push(newOne);
      }
      allCharities.push(newOne);
    });
    dispatch(setFundRaisers(fundRaisers));
    dispatch(setCharities(charities));
    dispatch(setAllCharities(allCharities));
    // get AdminUsers from contract
    const adminsFromContract = await ddaContract.methods.getAdminUsers().call();
    
    let admins:adminUserProp[] = [];
    adminsFromContract.forEach((admin: any, index:number) => {
      const newOne:adminUserProp = {
          index: index,
          address: admin
      };
      admins.push(newOne);
    })
    dispatch(setAdminUsers(admins));
    dispatch(setCategories(initialCategories));
    setCount(count+1);
  }

  const SiginWalletAddress = async() => {
    if (provider != null){
      const signHash = await handleSignMessage(address, provider);
      if (signHash === '')
        return;
      dispatch(setSignHash(signHash));
      let response;
      try {
        response = await axios.post(`${baseServerUrl}/auth/login`, {
          wallet_address: address
        },
        {
          headers: {
            Authorization: `Bearer ${signHash}`
          },
        });
        console.log("[logined user]", response.data);
        if (response.data.id) {
          dispatch(setLoginUser(response.data));
          dispatch(setCharityType(response.data.charity_type === 0 ? 'charity' : 'fundraiser'));
        }
      }
      catch (e: any) {
        console.log(e);
      }
      // console.log(signHash);
    }
  }
  
  useEffect(() => {
    const checkFromNetwork = async () => {
      await switchEthereumChain(FromNetwork, true);
    };
    checkFromNetwork();
    getDDAInfo();
    const intervalId = setInterval(getDDAInfo, 5000);
    return ()=>{
      clearInterval(intervalId);
    }
  }, [])
  
  useEffect(() => {
    const isOwnerCheck = async (cAddress:string) => {
      let ddaContract = getContract('DDAContract');
      let roleValue = 0;
      let ownerAddress = await ddaContract.methods.owner().call();
      if(ownerAddress.toLowerCase() == cAddress.toLowerCase())
        roleValue = 4; // owner
      else if(await ddaContract.methods.hasRole(roleList['admin'], cAddress).call())
        roleValue = 3; // admin
      else if(await ddaContract.methods.hasRole(roleList['charity'], cAddress).call())
        roleValue = 2; // charity
      else if(await ddaContract.methods.hasRole(roleList['black'], cAddress).call())
        roleValue = 1; // black
      dispatch(setOwnerFlag(roleValue));
    };
    dispatch(setSignHash(''));
    dispatch(setLoginUser(demoLoginUser));
    if (address === '') {
      dispatch(setOwnerFlag(0));
    }
    else
      isOwnerCheck(address);
  }, [address]);

  useEffect(() => {
    SiginWalletAddress();
  }, [connected]);
  return (
    <div className="w-full min-h-screen flex flex-col justify-between bg-cover font-poppins">
      <div className="w-full z-10 py-10 bg-white fixed top-0 left-0 border-b-2 z-200">
        <Nav/>
      </div>
      <div className="w-full min-h-[calc(100%-332px)]">
        {children}
      </div>
      <div className="">
        <FooterTab/>
      </div>
      <LoadingBar open={loading}/>
    </div>
  )
}