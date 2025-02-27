import { Grid, TextField } from "@material-ui/core";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { adminUserProp } from "../../core/interfaces/base";
import { useWeb3Context } from "../../hooks/web3Context";
import { getContract, roleList } from "../../core/constants/base";
import { setLoading } from "../../core/store/slices/bridgeSlice";

export const AdminsPage = () => {
  const dispatch = useDispatch();
  const isOwner = useSelector( (state:any) => state.app.isOwner);
  const adminUsers = useSelector( (state:any) => state.app.adminUsers);
  const {connected, address} = useWeb3Context();
  const [newUserAddr, setNewUserAddr] = useState('');
  const [newUserName, setNewUserName] = useState('AdminUser');
  const style={
    btn: 'border-2 rounded-10 text-black hover:text-white hover:bg-limedSqruce p-5 m-10'
  };
  if (isOwner < 3) {
    return (
        <div className="p-20">
            You can not access this pages
        </div>
    )
  }
  const registryNewAdmin = async () => {
    if(newUserAddr != '') {
      let ddaContract = getContract('DDAContract');
      if(await ddaContract.methods.hasRole(roleList['owner'], newUserAddr).call()) {
        alert("This wallet address is owner address.");
        return;
      }
      else if(await ddaContract.methods.hasRole(roleList['admin'], newUserAddr).call()) {
        alert("This wallet address is admin address.");
        return;
      }
      else if(await ddaContract.methods.hasRole(roleList['charity'], newUserAddr).call()) {
        alert("This wallet address is charity/fundraiser address.");
        return;
      }
      else if(await ddaContract.methods.hasRole(roleList['black'], newUserAddr).call()) {
        alert("This wallet address is blacklist address.");
        return;
      }
      dispatch(setLoading(true));
      try{
        
        await ddaContract.methods.addAdmin(newUserAddr).send({from: address});
        setNewUserAddr('');
        // setNewUserName('AdminUser');
      }
      catch (e) {
        console.log(e);
      }
      dispatch(setLoading(false));
    }
  };
  const removeAdmin = async(index: number) => {
    if(connected && address != '') {
      dispatch(setLoading(true));
      let ddaContract = getContract('DDAContract');
      try{
        await ddaContract.methods.removeAdmin(index).send({from: address});
      }
      catch (e) {
        console.log(e);
      }
      dispatch(setLoading(false));
    }
  };

  return (
    <div>
      <div className="relative bg-gradient-to-r from-algae to-seagreen w-full h-200 flex items-end justify-between overflow-hidden">
      </div>
      <div className="w-[95%] md:w-[80%] mx-auto border-1 my-70 p-20">
        <Grid container spacing={2}>
          <Grid item xs={12} className="text-24 font-bold text-center">Admin Users</Grid> 
          {
            isOwner === 4 && (  <Grid item xs={12}>
              <div className="text-20 flex flex-wrap items-center justify-center shadow-default p-10 rounded-10 text-center">
                {/* <div className="mx-20">
                  <p>User name </p>
                  <TextField id="outlined-basic" 
                    variant="outlined" 
                    size="small"
                    value={newUserName} 
                    onChange={(e) => setNewUserName(e.target.value)}
                    autoComplete='off'
                  />
                </div> */}
                <div className="mx-20 flex items-center">
                  <label className="mr-20">Wallet Address</label>
                  <TextField id="outlined-basic" 
                    variant="outlined" 
                    size="small"
                    value={newUserAddr} 
                    onChange={(e) => setNewUserAddr(e.target.value)}
                    autoComplete='off'
                  />
                </div>
                <button className="mx-10 border-2 p-5 px-10 mx-20 my-5 rounded-10" onClick={() => registryNewAdmin()}>Add Admin User</button>
              </div>
            </Grid>
            )
          }
          {
            adminUsers.map((user:adminUserProp) => {
              console.log(user);
              return (
                <Grid xs={12} sm={12} md={6} lg={4} item key={user.index}>
                  <div className="shadow-default p-10 rounded-10 h-full w-full">
                    <div className="font-bold text-center">{user.address}</div>
                    {
                      isOwner === 4 && (
                        <div className="flex flex-row-reverse">
                          <button className={style.btn} onClick={() => removeAdmin(user.index)}>Remove This</button>
                        </div>
                      )
                    }
                  </div>
                </Grid>
              )
            })
          }
        </Grid>
      </div>
    </div>
  );
}