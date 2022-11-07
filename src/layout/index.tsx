import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBar from '../components/loadingBar';
import { Nav } from '../components/Nav';
import { getContract, roleList } from '../core/constants/base';
import { adminUserProp, charityProp } from '../core/interfaces/base';
import { setAdminUsers, setAllCharities, setCharities, setFundRaisers, setOwnerFlag } from '../core/store/slices/bridgeSlice';
import { useWeb3Context } from '../hooks/web3Context';
import { FromNetwork } from '../networks';

export const Layout = ({children}: any) => {
  const dispatch = useDispatch();
  const {address, switchEthereumChain} = useWeb3Context();
  const [count, setCount] = useState(0);
  const loading = useSelector((state:any) => state.app.loading);
  
  const getDDAInfo = async() => {
    const ddaContract = getContract('DDAContract');
    //get charities information from contract
    const charitiesFromContract = await ddaContract.methods.getCharities().call();
    let charities:charityProp[] = [],
      fundRaisers:charityProp[] = [],
      allCharities:charityProp[] = [];
      charitiesFromContract.forEach((charity: any, index:number) => {
        const newOne:charityProp = {
            index: index,
            charityType: parseInt(charity.charityType),
            fund: charity.fund,
            address: charity.walletAddress,
            catalog: charity.catalog
        };
        if (newOne.charityType === 1) {
            fundRaisers.push(newOne);
        }
        else {
            charities.push(newOne);
        }
        allCharities.push(newOne);
      })
      dispatch(setFundRaisers(fundRaisers));
      dispatch(setCharities(charities));
      dispatch(setAllCharities(allCharities));
    
      // get AdminUsers from contract
      const adminsFromContract = await ddaContract.methods.getAdminUsers().call();
      let admins:adminUserProp[] = [];
      adminsFromContract.forEach((admin: any, index:number) => {
        const newOne:adminUserProp = {
            index: index,
            name: admin.name,
            address: admin.walletAddress
        };
        admins.push(newOne);
      })
      dispatch(setAdminUsers(admins));
      setCount(count+1);
  }
  useEffect(() => {
    const checkFromNetwork = async () => {
      await switchEthereumChain(FromNetwork, true);
    };
    checkFromNetwork();

    const intervalId = setInterval(getDDAInfo, 5000);
    return ()=>{
      clearInterval(intervalId);
    }
  }, [])
  
  useEffect(() => {
    const isOwnerCheck = async () => {
      let ddaContract = getContract('DDAContract');
      let isOwner:boolean = await ddaContract.methods.hasRole(roleList['owner'], address).call();
      let isAdmin:boolean = await ddaContract.methods.hasRole(roleList['admin'], address).call();
      let roleValue = isOwner ? 2 : (isAdmin ? 1 : 0);
      dispatch(setOwnerFlag(roleValue));
    };
    if (address === '')
      dispatch(setOwnerFlag(0));
    else
      isOwnerCheck();
  }, [address]);

  return (
    <div className="w-full flex flex-col min-h-screen bg-cover font-poppins">
      <div className="w-full z-10 py-10">
        <Nav/>
      </div>
      <div className="w-[95%] md:w-[80%] mx-auto flex flex-col mt-0 py-20 lg:py-0">
        <div className="w-full">
        {children}
        </div>
      </div>
      <LoadingBar open={loading}/>
    </div>
  )
}