import { useEffect } from 'react';
import { BrowserRouter, Routes ,Route } from 'react-router-dom';
import { Layout } from './layout';
import { menuItems } from './core/constants/menu';
import { useWeb3Context } from './hooks/web3Context';
import Messages from './components/Messages/Messages';
import { error } from './core/store/slices/MessagesSlice';

import './App.css';
import { charityProp, MenuuItemProp } from './core/interfaces/base';
import { RegistrationPage } from './pages/registration';
import { useDispatch, useSelector } from 'react-redux';
import { getContract } from './core/constants/base';
import { FromNetwork } from './networks';
import { setCharities, setFundRaisers } from './core/store/slices/bridgeSlice';

export const App = (): JSX.Element => {
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
      console.log('[charities]:', allCharities);
      dispatch(setFundRaisers(fundRaisers));
      dispatch(setCharities(charities));
  }

  const fundRaisers = useSelector( (state:any) => state.app.fundRaisers)
  useEffect(() => {
      getCharities();
  }, []);
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path='/' element={<RegistrationPage />} />
          {
            menuItems.map((item:MenuuItemProp, index:number) => {
              return (
                <Route path={item.url} element={item.element} key={index}/>
              )
            })
          }
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}