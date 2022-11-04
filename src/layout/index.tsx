import { useDispatch, useSelector } from 'react-redux';
import { Nav } from '../components/Nav';
import { getContract } from '../core/constants/base';
import { charityProp } from '../core/interfaces/base';
import { setCharities, setFundRaisers } from '../core/store/slices/bridgeSlice';
import { FromNetwork } from '../networks';

export const Layout = ({children}: any) => {
  const dispatch = useDispatch();
  const getCharities = async() => {
    let ddaContract = getContract(FromNetwork, 'DDAContract');
    let allCharities = await ddaContract.methods.getCharities().call();
    let charities:charityProp[] = [], fundRaisers:charityProp[] = [];
    allCharities.forEach((charity: any, index:number) => {
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
    })
    dispatch(setFundRaisers(fundRaisers));
    dispatch(setCharities(charities));
  }
  // useEffect(() => {
  getCharities();
  // }, []);
  
  return (
    <div className="w-full flex flex-col min-h-screen bg-cover font-poppins">
      <div className="lg:fixed z-10 py-10">
        <Nav/>
      </div>
      <div className="w-[80%] mx-auto flex flex-col mt-100 lg:overflow-hidden py-40 lg:py-0">
        <div className="w-full">
        {children}
        </div>
      </div>
    </div>
  )
}
function dispatch(arg0: any) {
  throw new Error('Function not implemented.');
}

