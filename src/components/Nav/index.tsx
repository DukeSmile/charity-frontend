import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Drawer, useMediaQuery } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useState } from 'react';

import { ConnectWalletButton } from './ConnectWalletButton';
import { menuItems } from '../../core/constants/menu';
import { MenuuItemProp } from '../../core/interfaces/base';

const useStyles = makeStyles(theme => ({
  drawer: {
    [theme.breakpoints.up("md")]: {
      width: 280,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: 280,
    borderRight: 0,
  },
}));

export const Nav = () => {
  // const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  console.log(isMobile);
  
  const [toggleMenu, setToggleMenu] = useState(false);
  const linkStyle = 'mx-10 border-1 rounded-full p-10 hover:text-white hover:bg-limedSqruce';
  const menuStyle = 'mx-10 border-y-1 p-10 px-20 text-24';
  const handleDrawerToggle = () => {
    setToggleMenu(!toggleMenu);
  };
  const ownerFlag = useSelector((state:any) => state.app.isOwner);
  
  return (
    <div className="w-[95%] md:w-[80%] mx-auto flex flex-between justify-between items-center">
      <div className="flex hidden md:block">
        {
          menuItems.filter((item:MenuuItemProp) => item.owner <= ownerFlag).map((menu: MenuuItemProp, index: number) => {
            return (
              <Link to={menu.url} key={index} className={linkStyle}>{menu.name}</Link>
            )
          })
        }
      </div>
      <div
        className={(toggleMenu ? 'block' : 'hidden') + " md:hidden"}
        onClick={() => setToggleMenu(false)}
      >
        <div className="flex flex-col fixed top-20 left-20 bg-white p-20 border-2">
          {
            menuItems.map((menu: MenuuItemProp, index: number) => {
              return (
                <Link to={menu.url} key={index} className={menuStyle}>{menu.name}</Link>
              )
            })
          }
        </div>
      </div>
      <button className={"p-5 px-10 border md:hidden " + (!toggleMenu ? 'block' : 'hidden')} onClick={() => setToggleMenu(!toggleMenu)}><FontAwesomeIcon icon={faBars} /></button>
      <ConnectWalletButton />
    </div>
  )
}
