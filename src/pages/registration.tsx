import { Grid, TextareaAutosize, TextField } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useWeb3Context } from "../hooks/web3Context";
import { useFormik } from "formik";
import * as Yup from "yup";

import { FromNetwork } from "../networks";
import { getContract } from "../core/constants/base";
import { callbackify } from "util";

export const RegistrationPage = () => {
  
  const dispatch = useDispatch();
  const {connected, address} = useWeb3Context();
  const [charityType, SetCharityType] = useState('charity');
  const [wallet, setWallet] = useState('');
  const style = {
    createBtn : 'border-1 w-200 m-10 p-10 bg-artySkyBlue rounded-10 hover:text-white',
    formInput: 'px-10 py-10 h-50 w-full outline-none rounded-8 border border-solid border-darkblue focus:text-gray-700 focus:bg-white focus:border-orange focus:outline-none',
    label: 'mr-20'
  }
  const validationCharity = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Must be 2 characters at least')
      .required("Required"),
    vip: Yup.string().required("Required"),
    website: Yup.string().required("Required"),
    email: Yup.string().email('Invalid email address')
      .required("Required"),
    country: Yup.string().required("Required"),
    summary: Yup.string()
      .max(100, 'Can not exceed 12 characters')
      .required("Required"),
    detail: Yup.string()
      .max(1000, 'Can not exceed 12 characters')
      .required("Required"),
    // photo: Yup.string().required("Required"),
    // wallet: Yup.string().required("Required")
  });
  const validationFundRaiser = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Must be 2 characters at least')
      .required("Required"),
    email: Yup.string().email('Invalid email address')
      .required("Required"),
    country: Yup.string().required("Required"),
    summary: Yup.string()
      .max(100, 'Can not exceed 12 characters')
      .required("Required"),
    detail: Yup.string()
      .max(1000, 'Can not exceed 12 characters')
      .required("Required"),
    // photo: Yup.string().required("Required"),
    title: Yup.string().required("Required"),
    location: Yup.string().required("Required"),
    // wallet: Yup.string().required("Required")
  });
  const formik = useFormik({
    // enableReinitialize: true,
    initialValues: {
      name: '',
      vip: '',
      website: '',
      email: '',
      country: '',
      summary: '',
      detail: '',
      photo: '',
      title: '',
      location: ''
    },
    onSubmit:async (values:any) => {
      if(!connected){
        return;
      }
      // values.wallet = address;
      if (address !== '') {
        console.log(values);
        try{
          let ddaContract = getContract('DDAContract');
          let okapi_address = await ddaContract.methods.OKAPI_ADDRESS().call();
          console.log(okapi_address);

          const _catalog = {
            vip: values.vip,
            website: values.website,
            name: values.name,
            email: values.email,
            country: values.country,
            summary: values.summary,
            detail: values.detail,
            photo: 'saer',
            title: values.title,
            location: values.location
          }
          const numOfCharityType = charityType === 'charity' ? 0 : 1;
          await ddaContract.methods.createCharity(numOfCharityType, _catalog).send({from: address});
        }
        catch(error){
          console.log(error);
        }
      }
    },
    validationSchema: charityType === 'charity' ? validationCharity : validationFundRaiser
  });

  useEffect(() => {
    setWallet(address);
  }, [address])
  return (
    <Grid container spacing={1}>
      <Grid item md={3}>
        <p className="text-40">Let's get you started!</p>
        <button className={style.createBtn} onClick={() => SetCharityType('charity')}>Create Charity</button>
        <button className={style.createBtn} onClick={() => SetCharityType('fundraiser')}>Create FundRaiser</button>
      </Grid>
      <Grid item md={9}>
        <form className="w-full" onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item sm={12}>
              <label className="mr-20 text-30">Sign up {charityType}</label>
            </Grid>
            {
              charityType === 'charity' && (
              <>
                <Grid item sm={12} className="flex items-center">
                  <p className="w-300 mr-20">Charity Name</p>
                  <TextField
                    fullWidth
                    id="name"
                    name="name"
                    type="text"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                  />
                </Grid>
                <Grid item sm={12} className="flex items-center">
                  <p className="w-300 mr-20">Charity Registration Number</p>
                  <TextField
                    fullWidth
                    id="vip"
                    name="vip"
                    type="text"
                    value={formik.values.vip}
                    onChange={formik.handleChange}
                    error={formik.touched.vip && Boolean(formik.errors.vip)}
                    helperText={formik.touched.vip && formik.errors.vip}
                  />
                </Grid>
                <Grid item sm={12} className="flex items-center">
                  <label className="w-300 mr-20">Website</label>
                  <TextField
                    fullWidth
                    id="website"
                    name="website"
                    type="text"
                    value={formik.values.website}
                    onChange={formik.handleChange}
                    error={formik.touched.website && Boolean(formik.errors.website)}
                    helperText={formik.touched.website && formik.errors.website}
                  />
                </Grid>
              </>)
            }
            {
              charityType === 'fundraiser' && (
                <>
                  <Grid item sm={12} className="flex items-center">
                    <label className="w-300 mr-20">Title of fundRaiser</label>
                    <TextField
                      fullWidth
                      id="title"
                      name="title"
                      type="text"
                      value={formik.values.title}
                      onChange={formik.handleChange}
                      error={formik.touched.title && Boolean(formik.errors.title)}
                      helperText={formik.touched.title && formik.errors.title}
                    />
                  </Grid>
                  <Grid item sm={12} className="flex items-center">
                    <label className="w-300 mr-20">Your full name</label>
                    <TextField
                      fullWidth
                      id="name"
                      name="name"
                      type="text"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      error={formik.touched.name && Boolean(formik.errors.name)}
                      helperText={formik.touched.name && formik.errors.name}
                    />
                  </Grid>
                </>)
            }
            <Grid item sm={12} className="flex items-center">
              <label className="w-300 mr-20">Contact Email</label>
              <TextField
                fullWidth
                id="email"
                name="email"
                type="text"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid item sm={12}>
              <p>Short summary of {charityType} (100 characters max)</p>
              <TextareaAutosize
                minRows={4}
                maxRows={4}
                id="summary"
                name="summary"
                className="border-1 p-10"
                style={{ width: '100%' }}
                value={formik.values.summary}
                onChange={formik.handleChange}
                // error={formik.touched.summary && Boolean(formik.errors.summary)}
                // helperText={formik.touched.summary && formik.errors.summary}
              />
            </Grid>
            <Grid item sm={12} className="flex items-center">
              <p className="w-300 mr-20">Which Country based on:</p>
              <TextField
                fullWidth
                id="country"
                name="country"
                type="text"
                value={formik.values.country}
                onChange={formik.handleChange}
                error={formik.touched.country && Boolean(formik.errors.country)}
                helperText={formik.touched.country && formik.errors.country}
              />
            </Grid>
            {
              charityType === 'fundraiser' && (
              <Grid item sm={12} className="flex items-center">
                <p className="w-300 mr-20">Which location based on:</p>
                <TextField
                  fullWidth
                  id="location"
                  name="location"
                  type="text"
                  value={formik.values.location}
                  onChange={formik.handleChange}
                  error={formik.touched.location && Boolean(formik.errors.location)}
                  helperText={formik.touched.location && formik.errors.location}
                />
              </Grid>)
            }
            <Grid item sm={12}>
              <p>Detailed summary of {charityType}(1000 characters max)</p>
              <TextareaAutosize
                minRows={4}
                maxRows={4}
                id="detail"
                name="detail"
                className="border-1 p-10"
                style={{ width: '100%' }}
                value={formik.values.detail}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item sm={12} className="flex items-center">
              <p className="w-300 mr-20">Wallet address to receive</p>
              <TextField
                fullWidth
                type="text"
                value={wallet}
                disabled
              />
            </Grid>
            <Grid item sm={12}>
              <button type="button" className={style.createBtn}>Upload Photo</button>
              <button type="submit" className={style.createBtn}>Sign up</button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
}