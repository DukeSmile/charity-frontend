import { useEffect } from 'react';
import { BrowserRouter, Routes ,Route } from 'react-router-dom';
import { Layout } from './layout';
import { routeItems } from './core/constants/menu';

import './App.css';
import { RouteItemProp } from './core/interfaces/base';
import { RegistrationPage } from './pages/registration';
import { useDispatch } from 'react-redux';

export const App = (): JSX.Element => {
  const dispatch = useDispatch();
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path='/' element={<RegistrationPage />} />
          {
            routeItems.map((item:RouteItemProp, index:number) => {
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