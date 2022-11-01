import { ConnectWalletButton } from './ConnectWalletButton';
import { menuItems } from '../../core/constants/menu';
import { MenuuItemProp } from '../../core/interfaces/base';
import { Link } from 'react-router-dom';
export const Nav = () => {
  const linkStyle = 'mx-10 border-1 rounded-full p-10 hover:text-white hover:bg-limedSqruce';
  return (
    <div className="flex flex-between justify-between items-center w-full">
      <div>
        {
          menuItems.map((menu:MenuuItemProp, index: number) => {
            return (
              <Link to={menu.url} key={index} className={linkStyle}>{menu.name}</Link>
            )
          })
        }
      </div>
      <ConnectWalletButton/>
    </div>
  )
}
