import { BrowserRouter, Routes ,Route } from 'react-router-dom';

import './App.css';
import { Layout } from './layout';
import { routeItems } from './core/constants/menu';
import { RouteItemProp } from './core/interfaces/base';
import { RegistrationPage } from './pages/registration';

export const App = (): JSX.Element => {
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