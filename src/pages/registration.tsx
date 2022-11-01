import { Grid, TextareaAutosize, TextField } from "@material-ui/core";
import { useState } from "react";
import { useWeb3Context } from "../hooks/web3Context";

export const RegistrationPage = () => {

  const {connect, address} = useWeb3Context();
  const [charityType, SetCharityType] = useState('charity');
  const style = {
    createBtn : 'border-1 w-200 m-10 p-10',
    label: 'mr-20'
  }

  return (
    <Grid container>
      <Grid item md={3}>
        <p>Let's get you started!</p>
        <button className={style.createBtn} onClick={() => SetCharityType('charity')}>Create Charity</button>
        <button className={style.createBtn} onClick={() => SetCharityType('fundraiser')}>Create FundRaiser</button>
      </Grid>
      <Grid item container spacing={1} md={9}>
        <Grid item sm={12} className="flex items-center">
          <label className="mr-20">Title of fundRaiser</label>
          <TextField
            hiddenLabel
            id="filled-hidden-label-small"
            defaultValue="FundRaiser"
            variant="filled"
            size="small"
            autoFocus = {true}
          />
        </Grid>
        <Grid item sm={12} className="flex items-center">
          <label className="mr-20">Your Full Name</label>
          <TextField
            hiddenLabel
            id="filled-hidden-label-small"
            defaultValue="Your Full Name"
            variant="filled"
            size="small"
          />
        </Grid>
        <Grid item sm={12} className="flex items-center">
          <label className="mr-20">Contact Email</label>
          <TextField
            hiddenLabel
            id="filled-hidden-label-small"
            defaultValue="Contact Email"
            variant="filled"
            size="small"
          />
        </Grid>
        <Grid item sm={12}>
          <p>Short summary of fundraise (100 characters max)</p>
          <TextareaAutosize
            minRows={4}
            maxRows={4}
            aria-label="maximum height"
            placeholder="Input summarize"
            defaultValue=""
            className="border-1 p-10"
            style={{ width: '100%' }}
          />
        </Grid>
        <Grid item sm={12}>
          <p className="mr-20">Which country are you based?</p>
          <TextField
            hiddenLabel
            id="filled-hidden-label-small"
            defaultValue=""
            variant="filled"
            size="small"
            style={{ width: '100%'}}
          />
        </Grid>
        <Grid item sm={12}>
          <p>Detailed summary of your fundraise(1000 characters max)</p>
          <TextareaAutosize
            minRows={4}
            maxRows={4}
            aria-label="maximum height"
            placeholder="Input summarize"
            defaultValue=""
            className="border-1 p-10"
            style={{ width: '100%' }}
          />
        </Grid>
        <Grid item sm={12}>
          <p className="mr-20">ETH Wallet address to receive donations</p>
          <TextField
            hiddenLabel
            id="filled-hidden-label-small"
            defaultValue=""
            variant="filled"
            size="small"
            style={{ width: '100%'}}
          />
        </Grid>
        <Grid item sm={12}>
          <button className={style.createBtn}>Upload Photo</button>
        </Grid>
      </Grid>
    </Grid>
  );
}