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