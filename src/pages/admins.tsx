import { Grid, TextField } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Web3 from "web3";

import { adminUserProp } from "../core/interfaces/base";
import { useWeb3Context } from "../hooks/web3Context";
import { getContract, roleList } from "../core/constants/base";
import { setLoading } from "../core/store/slices/bridgeSlice";

export const AdminsPage = () => {
  const dispatch = useDispatch();
  const isOwner = useSelector( (state:any) => state.app.isOwner);
  console.log(isOwner);
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
        
        await ddaContract.methods.addAdmin(newUserAddr, newUserName).send({from: address});
        setNewUserAddr('');
        setNewUserName('AdminUser');
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
    <div className="p-20">
      <Grid container spacing={2}>
        <Grid item xs={12} className="text-24 font-bold text-center">Admin Users</Grid> 
        {
          isOwner === 4 && (  <Grid item xs={12}>
            <div className="text-20 flex flex-wrap justify-center shadow-default p-10 rounded-10 text-center">
              <div className="mx-20">
                <p>User name </p>
                <TextField id="outlined-basic" 
                  variant="outlined" 
                  size="small"
                  value={newUserName} 
                  onChange={(e) => setNewUserName(e.target.value)}
                  autoComplete='off'
                />
              </div>
              <div className="mx-20">
                <p>Wallet Address</p>
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
            return (
              <Grid xs={12} sm={12} md={6} lg={4} item key={user.index}>
                <div className="shadow-default p-10 rounded-10 h-full w-full">
                  <div className="font-bold text-center">{user.name}</div>
                  <p className="break-all">{user.address}</p>
                  {
                    isOwner === 4 && (
                      <button className={style.btn} onClick={() => removeAdmin(user.index)}>Remove This</button>
                    )
                  }
                </div>
              </Grid>
            )
          })
        }
      </Grid>
    </div>
  );
}