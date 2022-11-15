import { faSignOut, faWallet } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Menu, MenuItem, Button } from '@material-ui/core';
import { useState } from 'react';
import { baseStyles } from '../../core/constants/style';
import { useWeb3Context } from '../../hooks/web3Context';

export const ConnectWalletButton = () => {
  const { connect, disconnect, address } = useWeb3Context();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const showMenu = Boolean(anchorEl);
  
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <div>
      {
        address === '' ? (
          <button className={baseStyles.greenBtn} onClick={connect}>
            <FontAwesomeIcon icon={faWallet} className="mr-10"/>Connect wallet
          </button> ) :
          (
            <div className="relative">
              <button 
                className={baseStyles.greenBtn}
                onClick={handleClick}
                aria-controls={showMenu ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={showMenu ? 'true' : undefined}
              >
                <div className="lowercase overflow-hidden">
                  <FontAwesomeIcon icon={faWallet} className="mr-10"/>
                  {address.slice(0,7)} ..... {address.slice(address.length-5, address.length)}
                </div>
              </button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={showMenu}
                onClose={() => setAnchorEl(null)}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
                PaperProps={{
                  style: {
                    width: "250px",
                    marginTop: "40px",
                    position: "absolute",
                    top: "0px"
                  }
                }}
              >
                <MenuItem onClick={() => {
                  setAnchorEl(null);
                  disconnect();
                }}>
                  <Button className="text-center w-full">Disconnect</Button>
                </MenuItem>
              </Menu>
            </div>
          )
      }
    </div>
  );
}
