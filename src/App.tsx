import { BrowserRouter, Routes ,Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './App.css';
import { Layout } from './layout';
import { routeItems } from './core/constants/menu';
import { RouteItemProp } from './core/interfaces/base';
import { HomePage } from './pages/home';

export const App = (): JSX.Element => {
  const ownerFlag = useSelector((state:any) => state.app.isOwner);
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path='/' element={<HomePage />} />
          {
            routeItems.filter((item:RouteItemProp) => item.owner <= ownerFlag).map((item:RouteItemProp, index:number) => {
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