import { Grid, TextareaAutosize, TextField } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { create } from 'ipfs-http-client';
import * as Yup from "yup";

import { useWeb3Context } from "../hooks/web3Context";
import { getContract, projectId, projectSecret } from "../core/constants/base";
import { setLoading } from "../core/store/slices/bridgeSlice";
import { PhotoUpload } from "../components/photoUpload";

export const RegistrationPage = () => {
  
  const dispatch = useDispatch();
  const {connected, address} = useWeb3Context();
  const [charityType, SetCharityType] = useState('charity');
  const [wallet, setWallet] = useState('');
  const [uploadShow, setUploadShow] = useState(false);
  const [uploadFile, setUploadFile] = useState(null);
  const ipfsInfo = useSelector((state:any) => state.app.ipfs);
  const ownerFlag = useSelector((state:any) => state.app.isOwner);
  const style = {
    createBtn : 'border-1 w-200 m-10 p-10 bg-artySkyBlue rounded-10 hover:text-white',
    formInput: 'px-10 py-10 h-50 w-full outline-none rounded-8 border border-solid border-darkblue focus:text-gray-700 focus:bg-white focus:border-orange focus:outline-none',
    label: 'mr-20',
    tab: 'border-1 p-10 bg-white',
    activeTab: 'border-1 p-10 bg-stormDust'
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
    enableReinitialize: true,
    initialValues: {
      name: '',
      vip: '', // charity information
      website: '', // charity information
      phone: '', // charity information
      linkedin: '', // charity information
      twitter: '', // charity information
      facebook: '', // charity information
      instagram: '', // charity information
      email: '', // charity information
      country: '',
      summary: '',
      detail: '',
      title: '',
      location: ''
    },
    onSubmit:async (values:any) => {
      if(!connected){
        return;
      }
      if(ownerFlag > 0)
      {
        alert("You can not create charity/fundraiser with this wallet address");
        return;
      }
      // check ipfs is enabled
      let ipfs;
      try {
        const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');
        ipfs = create({
            host: 'ipfs.infura.io',
            port: 5001,
            protocol: 'https',
            headers: {
                authorization: auth,
            },
        });
      } catch (error) {
        console.error("IPFS error ", error);
        ipfs = undefined;
      }
      // signup charity
      if (address !== '') {
        console.log(values);
        dispatch(setLoading(true));
        try{
          let uploadUrl = '';
          if (ipfsInfo && uploadFile) {
            console.log(uploadFile);
            const result = await (ipfsInfo).add(uploadFile);
            uploadUrl = result.path;
          }
          let ddaContract = getContract('DDAContract');
          const _catalog = {
            vip: values.vip,
            website: values.website,
            phone: values.phone,
            linkedin: values.linkedin,
            twitter: values.twitter,
            facebook: values.facebook,
            instagram: values.instagram,
            name: values.name,
            email: values.email,
            country: values.country,
            summary: values.summary,
            detail: values.detail,
            photo: uploadUrl,
            title: values.title,
            location: values.location
          }
          console.log(_catalog);
          const numOfCharityType = charityType === 'charity' ? 0 : 1;
          await ddaContract.methods.createCharity(numOfCharityType, _catalog).send({from: address});
        }
        catch(error){
          console.log(error);
        }
        dispatch(setLoading(false));
      }
    },
    validationSchema: charityType === 'charity' ? validationCharity : validationFundRaiser
  });

  useEffect(() => {
    setWallet(address);
  }, [address]);

  useEffect(() => {
    formik.resetForm({
      values: {
        name: '',
        vip: '', // charity information
        website: '', // charity information
        phone: '', // charity information
        linkedin: '', // charity information
        twitter: '', // charity information
        facebook: '', // charity information
        instagram: '', // charity information
        email: '', // charity information
        country: '',
        summary: '',
        detail: '',
        title: '',
        location: ''
      }
    });
    setUploadFile(null);
  }, [charityType]);

  return (
    <Grid container spacing={1}>
      <Grid item md={12} className="border-b-2">
        <button className={charityType === 'charity' ? style.activeTab : style.tab} onClick={() => SetCharityType('charity')}>Create Charity</button>
        <button className={charityType === 'fundraiser' ? style.activeTab : style.tab} onClick={() => SetCharityType('fundraiser')}>Create FundRaiser</button>
      </Grid>
      <Grid item md={4} className="text-center">
        <label className="mr-20 text-30">Let's begin your fundraising journey as a {charityType}</label>
      </Grid>
      <Grid item md={8}>
        <form className="w-full" onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
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
                    // helperText={formik.touched.name && formik.errors.name}
                    autoComplete='off'
                    variant="outlined"
                    size="small"
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
                    // helperText={formik.touched.vip && formik.errors.vip}
                    autoComplete='off'
                    variant="outlined"
                    size="small"
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
                    // helperText={formik.touched.website && formik.errors.website}
                    autoComplete='off'
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item sm={12} className="flex items-center">
                  <label className="w-300 mr-20">Phone</label>
                  <TextField
                    fullWidth
                    id="phone"
                    name="phone"
                    type="text"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    error={formik.touched.phone && Boolean(formik.errors.phone)}
                    autoComplete='off'
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item sm={12} className="flex items-center">
                  <label className="w-300 mr-20">Linkedin</label>
                  <TextField
                    fullWidth
                    id="linkedin"
                    name="linkedin"
                    type="text"
                    value={formik.values.linkedin}
                    onChange={formik.handleChange}
                    error={formik.touched.linkedin && Boolean(formik.errors.linkedin)}
                    autoComplete='off'
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item sm={12} className="flex items-center">
                  <label className="w-300 mr-20">Twitter</label>
                  <TextField
                    fullWidth
                    id="twitter"
                    name="twitter"
                    type="text"
                    value={formik.values.twitter}
                    onChange={formik.handleChange}
                    error={formik.touched.twitter && Boolean(formik.errors.twitter)}
                    autoComplete='off'
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item sm={12} className="flex items-center">
                  <label className="w-300 mr-20">Facebook</label>
                  <TextField
                    fullWidth
                    id="facebook"
                    name="facebook"
                    type="text"
                    value={formik.values.facebook}
                    onChange={formik.handleChange}
                    error={formik.touched.facebook && Boolean(formik.errors.facebook)}
                    // helperText={formik.touched.facebook && formik.errors.facebook}
                    autoComplete='off'
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item sm={12} className="flex items-center">
                  <label className="w-300 mr-20">Instagram</label>
                  <TextField
                    fullWidth
                    id="instagram"
                    name="instagram"
                    type="text"
                    value={formik.values.instagram}
                    onChange={formik.handleChange}
                    error={formik.touched.instagram && Boolean(formik.errors.instagram)}
                    autoComplete='off'
                    variant="outlined"
                    size="small"
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
                      // helperText={formik.touched.title && formik.errors.title}
                      autoComplete='off'
                      variant="outlined"
                      size="small"
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
                      // helperText={formik.touched.name && formik.errors.name}
                      autoComplete='off'
                      variant="outlined"
                      size="small"
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
                // helperText={formik.touched.email && formik.errors.email}
                autoComplete='off'
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item sm={12}>
              <p>Short summary of {charityType} (100 characters max)</p>
              <TextareaAutosize
                minRows={2}
                maxRows={2}
                id="summary"
                name="summary"
                className={"border-1 p-10 " + (formik.touched.summary && Boolean(formik.errors.summary) ? "border-error" : '' )}
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
                // helperText={formik.touched.country && formik.errors.country}
                autoComplete='off'
                variant="outlined"
                size="small"
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
                  // helperText={formik.touched.location && formik.errors.location}
                  autoComplete='off'
                  variant="outlined"
                  size="small"
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
                className={"border-1 p-10 " + (formik.touched.detail && Boolean(formik.errors.detail) ? "border-error" : '' )}
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
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item sm={12} className="flex">
              <p className="w-230 mr-20">
                <button type="button" className={style.createBtn} onClick={() => setUploadShow(true)}>Upload photo</button>
              </p>
              <div>
                <img src={uploadFile ? URL.createObjectURL(uploadFile) : ''} className="w-200"/>
              </div>
            </Grid>
            <Grid item sm={12} className="flex flex-row-reverse">
              <button type="submit" className={style.createBtn}>Create</button>
            </Grid>
          </Grid>
        </form>
      </Grid>
      <PhotoUpload open={uploadShow} 
          handleClose={() => setUploadShow(false)} 
          onChange = {(event:any) => {
            event.preventDefault();
            const files = event.target.files;
            if (!files || files.length === 0) {
              return alert("No files selected");
            }
            const file = files[0];
            setUploadFile(file);
          }}/>
    </Grid>
  );
}