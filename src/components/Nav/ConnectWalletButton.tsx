import { Menu, MenuItem, Button } from '@material-ui/core';
import { useState } from 'react';
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
          <Button className="uppercase w-250 text-black text-1em rounded-7 border-2 shadow-default px-24 py-10 font-medium hover:font-bold" onClick={connect}>
            Connect wallet
          </Button> ) :
          (
            <div className="relative">
              <Button 
                className="uppercase w-250 text-black text-1em rounded-7 border-2 shadow-default px-24 py-10 font-medium hover:font-bold"
                onClick={handleClick}
                aria-controls={showMenu ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={showMenu ? 'true' : undefined}
              >
                <div className="lowercase overflow-hidden">{address.slice(0,10)} ..... {address.slice(address.length-8, address.length)}</div>
              </Button>
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
