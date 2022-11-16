import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp, faBars } from "@fortawesome/free-solid-svg-icons";
import { Drawer, useMediaQuery } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from 'react';

import { ConnectWalletButton } from './ConnectWalletButton';
import logoImg from '../../assets/images/logo-white.png';
import { allFundTypes, menuFundTypes } from "../../core/constants/base";
import { fundTypeProp } from "../../core/interfaces/base";
import { baseIcons } from "../../core/constants/icons";

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
  const ref = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const [toggleMenu, setToggleMenu] = useState(false);
  const [categoryShow, setCategoryShow] = useState(false);
  const [registryShow, setRegistryShow] = useState(false);
  const linkStyle = 'mx-10 uppercase text-16 text-black p-10 hover:text-brown hover:bg-limedSqruce';
  const menuStyle = 'mx-10 border-y-1 p-10 px-20 text-24';
  const handleDrawerToggle = () => {
    setToggleMenu(!toggleMenu);
  };
  const isOwner = useSelector((state:any) => state.app.isOwner);
  
  const showMenubar = (type:string, flag:boolean) => {
    setCategoryShow(false);
    setRegistryShow(false);
    if (type === 'category')
      setCategoryShow(flag);
    if (type === 'registry')
      setRegistryShow(flag);
  };
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (
        ref.current &&
        event.target &&
        ref.current.contains(event.target as Node)
      ) {
        return;
      }
      setCategoryShow(false);
      setRegistryShow(false);
    };
    document.addEventListener("click", listener, { capture: true });
    return () => {
      document.removeEventListener("click", listener, { capture: true });
    };
  }, []);

  return (
    <div className="w-[95%] md:w-[80%] mx-auto h-80 flex flex-between justify-between items-center">
      <div className="hidden md:block">
        <div className="flex">
          <div className="relative mr-20 cursor-pointer" ref={ref}>
            <button onClick={() => showMenubar('category', !categoryShow)} className="cursor-pointer">
              <label className="mx-5 cursor-pointer font-bold">CATEGORIES</label> 
              { !categoryShow ? <FontAwesomeIcon icon={faAngleDown} /> : <FontAwesomeIcon icon={faAngleUp} /> }
            </button>
            <div className={'w-200 absolute bg-white border-1 ' + (categoryShow ? '' : 'hidden')}>
              {
                menuFundTypes.map((typeName, index) => {
                  const fundType = allFundTypes[typeName];
                  return (
                    <div key={index}>
                      <button className="w-full border-t-1 border-b-1 p-5 hover:bg-iron capitalize flex justify-between items-center" onClick={() => {
                        showMenubar('category', false);
                      }}>
                        <img src={baseIcons[fundType.img]} className="w-30 h-30 mx-10" alt={baseIcons[fundType.img]}/>
                        <div className="text-center w-full">{fundType.title}</div>
                      </button>
                    </div>
                  )
                })
              }
            </div>
          </div>
          <div className="relative cursor-pointer">
            <button onClick={() => showMenubar('registry', !registryShow)} className="cursor-pointer">
              <label className="mx-5 cursor-pointer font-bold">REGISTER</label>
              { !registryShow ? <FontAwesomeIcon icon={faAngleDown} /> : <FontAwesomeIcon icon={faAngleUp} /> }
            </button>
            <div className={'w-200 absolute bg-white border-1 ' + (registryShow ? '' : 'hidden')}>
              <div>
                <button className="text-center w-full border-t-1 border-b-1 p-5 hover:bg-iron capitalize" onClick={() => {
                  showMenubar('registry', false);
                  navigate('/registration/0');
                }}>Create Charity</button>
              </div>
              <div>
                <button className="text-center w-full border-t-1 border-b-1 p-5 hover:bg-iron capitalize" onClick={() => {
                  showMenubar('registry', false);
                  navigate('/registration/1');
                }}>Create Fundraiser</button>
              </div>
              {isOwner >= 3 && (<div>
                  <button className="text-center w-full border-t-1 border-b-1 p-5 hover:bg-iron capitalize" onClick={() => {
                    showMenubar('registry', false);
                    navigate('/admins');
                  }}>Admin users</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* <div
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
      <button className={"p-5 px-10 border md:hidden " + (!toggleMenu ? 'block' : 'hidden')} onClick={() => setToggleMenu(!toggleMenu)}><FontAwesomeIcon icon={faBars} /></button> */}
      <div className="cursor-pointer" onClick={() => navigate('/')}>
        <img src={logoImg} className="mt-30"/>
      </div>
      <ConnectWalletButton />
    </div>
  )
}
