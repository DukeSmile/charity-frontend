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

import remoteImg from "../assets/images/components/remote.png";
import currenciesImg from "../assets/images/components/currencies.png";
import { baseStyles } from "../core/constants/style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faUpload } from "@fortawesome/free-solid-svg-icons";

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
    label: 'text-18 my-15',
    tab: 'rounded-full py-12 px-40 text-20 text-brown',
    activeTab: 'rounded-full py-12 px-40 text-20 bg-asphalt text-white font-bold'
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
      location: '',
      goal: '',
      type: ''
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
          await ddaContract.methods.createCharity(numOfCharityType, values.type, values.goal, _catalog).send({from: address});
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
        location: '',
        goal: '',
        type: ''
      }
    });
    setUploadFile(null);
  }, [charityType]);

  return (
    <div>
      <div className="relative bg-gradient-to-r from-algae to-seagreen h-400 flex items-end justify-between overflow-hidden">
        <img src={remoteImg} className="w-150 h-150 ml-20 sm:w-300 sm:h-300 md:ml-[5%]"/>
        <img src={currenciesImg} className="w-250 h-90 mr-20 md:w-500 md:h-180 md:mr-[5%]"/>
        <div className="absolute left-0 top-0 w-full h-full text-white text-center flex items-center justify-center">
          <div className="mt-50 mx-20">
            <p className="text-48 font-bold">Let’s get you started!</p>
            <p className="text-20">Work your way through our easy to follow registration process.</p>
          </div>
        </div>
      </div>
      <div className="w-[95%] md:w-[80%] mx-auto border-1 my-70 px-35 py-50">
        <Grid container className="border-b-2 border-dashed my-10 p-10">
          <Grid item xs={12} sm={6}>
            <p className="text-38 font-bold text-center">Start your fundraising as a {charityType}</p>
          </Grid>
          <Grid item xs={12} sm={6} className="flex items-center flex-row-reverse">
            <div className="bg-lightgrey rounded-full p-3 flex">
              <button className={charityType === 'charity' ? style.activeTab : style.tab} onClick={() => SetCharityType('charity')}>Create Charity</button>
              <button className={charityType === 'fundraiser' ? style.activeTab : style.tab} onClick={() => SetCharityType('fundraiser')}>Create FundRaiser</button>
            </div>
          </Grid>
        </Grid>
        <form className="w-full" onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item container xs={12} sm={6} spacing={1}>
              {charityType === 'charity' && (
                <>
                  <Grid item sm={12}>
                    <p className={style.label}>Charity Name</p>
                    <TextField
                      fullWidth
                      id="name"
                      name="name"
                      type="text"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      error={formik.touched.name && Boolean(formik.errors.name)}
                      inputProps={{style:{ backgroundColor: '#E6EAF0'}}}
                      autoComplete='off'
                      variant="outlined"
                      placeholder="Enter your charity name"
                    />
                  </Grid>
                  <Grid item sm={12}>
                    <p className={style.label}>Charity Registration Number</p>
                    <TextField
                      fullWidth
                      id="vip"
                      name="vip"
                      type="text"
                      value={formik.values.vip}
                      onChange={formik.handleChange}
                      error={formik.touched.vip && Boolean(formik.errors.vip)}
                      inputProps={{style:{ backgroundColor: '#E6EAF0'}}}
                      autoComplete='off'
                      variant="outlined"
                      placeholder="Enter registration number"
                    />
                  </Grid>
                  <Grid item sm={12}>
                    <p className={style.label}>Website</p>
                    <TextField
                      fullWidth
                      id="website"
                      name="website"
                      type="text"
                      value={formik.values.website}
                      onChange={formik.handleChange}
                      error={formik.touched.website && Boolean(formik.errors.website)}
                      inputProps={{style:{ backgroundColor: '#E6EAF0'}}}
                      autoComplete='off'
                      variant="outlined"
                      placeholder="Enter charity website url"
                    />
                  </Grid>
                </>)}
              {charityType === 'fundraiser' && (
                  <>
                    <Grid item sm={12}>
                      <p className={style.label}>Title of fundRaiser</p>
                      <TextField
                        fullWidth
                        id="title"
                        name="title"
                        type="text"
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        error={formik.touched.title && Boolean(formik.errors.title)}
                        inputProps={{style:{ backgroundColor: '#E6EAF0'}}}
                        autoComplete='off'
                        variant="outlined"
                        placeholder="Enter title of your fundraiser"
                      />
                    </Grid>
                  </>)
              }
              <Grid item sm={12}>
                <p className={style.label}>Contact Email</p>
                <TextField
                  fullWidth
                  id="email"
                  name="email"
                  type="text"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                      inputProps={{style:{ backgroundColor: '#E6EAF0'}}}
                  autoComplete='off'
                  variant="outlined"
                  placeholder="Enter email"
                />
              </Grid>
              <Grid item sm={12}>
                <p className={style.label}>Which Country based on:</p>
                <TextField
                  fullWidth
                  id="country"
                  name="country"
                  type="text"
                  value={formik.values.country}
                  onChange={formik.handleChange}
                  error={formik.touched.country && Boolean(formik.errors.country)}
                      inputProps={{style:{ backgroundColor: '#E6EAF0'}}}
                  autoComplete='off'
                  variant="outlined"
                  placeholder="Enter your country"
                />
              </Grid>
              <Grid item sm={12}>
                <p className={style.label}>Wallet address to receive</p>
                <TextField
                  fullWidth
                  type="text"
                  value={wallet}
                  disabled
                  variant="outlined"
                  inputProps={{style:{ backgroundColor: '#E6EAF0'}}}
                  placeholder="Connect to your wallet address"
                />
              </Grid>
              <Grid item sm={12}>
                <p className={style.label}>Short summary of {charityType} (100 characters max)</p>
                <TextareaAutosize
                  minRows={4}
                  maxRows={4}
                  id="summary"
                  name="summary"
                  className={"border-1 p-10 " + (formik.touched.summary && Boolean(formik.errors.summary) ? "border-error" : '' )}
                  style={{ width: '100%' }}
                  value={formik.values.summary}
                  onChange={formik.handleChange}
                  placeholder="Enter your short summary"
                />
              </Grid>
            </Grid>
            <Grid item container xs={12} sm={6} spacing={1}>
              {charityType === 'charity' && (
                <>
                  <Grid item sm={12}>
                    <p className={style.label}>Phone</p>
                    <TextField
                      fullWidth
                      id="phone"
                      name="phone"
                      type="text"
                      value={formik.values.phone}
                      onChange={formik.handleChange}
                      error={formik.touched.phone && Boolean(formik.errors.phone)}
                      inputProps={{style:{ backgroundColor: '#E6EAF0'}}}
                      autoComplete='off'
                      variant="outlined"
                      placeholder="Enter your charity phone"
                    />
                  </Grid>
                  <Grid item sm={12}>
                    <p className={style.label}>Linkedin</p>
                    <TextField
                      fullWidth
                      id="linkedin"
                      name="linkedin"
                      type="text"
                      value={formik.values.linkedin}
                      onChange={formik.handleChange}
                      error={formik.touched.linkedin && Boolean(formik.errors.linkedin)}
                      inputProps={{style:{ backgroundColor: '#E6EAF0'}}}
                      autoComplete='off'
                      variant="outlined"
                      placeholder="Enter your charity linkedin"
                    />
                  </Grid>
                  <Grid item sm={12}>
                    <p className={style.label}>Twitter</p>
                    <TextField
                      fullWidth
                      id="twitter"
                      name="twitter"
                      type="text"
                      value={formik.values.twitter}
                      onChange={formik.handleChange}
                      error={formik.touched.twitter && Boolean(formik.errors.twitter)}
                      inputProps={{style:{ backgroundColor: '#E6EAF0'}}}
                      autoComplete='off'
                      variant="outlined"
                      placeholder="Enter your charity twitter"
                    />
                  </Grid>
                  <Grid item sm={12}>
                    <p className={style.label}>Facebook</p>
                    <TextField
                      fullWidth
                      id="facebook"
                      name="facebook"
                      type="text"
                      value={formik.values.facebook}
                      onChange={formik.handleChange}
                      error={formik.touched.facebook && Boolean(formik.errors.facebook)}
                      inputProps={{style:{ backgroundColor: '#E6EAF0'}}}
                      autoComplete='off'
                      variant="outlined"
                      placeholder="Enter your charity facebook"
                    />
                  </Grid>
                  <Grid item sm={12}>
                    <p className={style.label}>Instagram</p>
                    <TextField
                      fullWidth
                      id="instagram"
                      name="instagram"
                      type="text"
                      value={formik.values.instagram}
                      onChange={formik.handleChange}
                      error={formik.touched.instagram && Boolean(formik.errors.instagram)}
                      inputProps={{style:{ backgroundColor: '#E6EAF0'}}}
                      autoComplete='off'
                      variant="outlined"
                      placeholder="Enter your charity instagram"
                    />
                  </Grid>
                </>)
              }
              {charityType === 'fundraiser' && (
                <>
                  <Grid item sm={12}>
                    <p className={style.label}>Your full name</p>
                    <TextField
                      fullWidth
                      id="name"
                      name="name"
                      type="text"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      error={formik.touched.name && Boolean(formik.errors.name)}
                      inputProps={{style:{ backgroundColor: '#E6EAF0'}}}
                      autoComplete='off'
                      variant="outlined"
                      placeholder="Enter your full name"
                    />
                  </Grid>
                  <Grid item sm={12}>
                    <p className={style.label}>Goal of fundraising ($):</p>
                    <TextField
                      fullWidth
                      id="goal"
                      name="goal"
                      type="number"
                      value={formik.values.goal}
                      onChange={formik.handleChange}
                      error={formik.touched.goal && Boolean(formik.errors.goal)}
                      inputProps={{style:{ backgroundColor: '#E6EAF0'}}}
                      autoComplete='off'
                      variant="outlined"
                      placeholder="Enter your goal of fundraising"
                    />
                  </Grid>
                  <Grid item sm={12}>
                    <p className={style.label}>Which location based on:</p>
                    <TextField
                      fullWidth
                      id="location"
                      name="location"
                      type="text"
                      value={formik.values.location}
                      onChange={formik.handleChange}
                      error={formik.touched.location && Boolean(formik.errors.location)}
                      inputProps={{style:{ backgroundColor: '#E6EAF0'}}}
                      autoComplete='off'
                      variant="outlined"
                      placeholder="Enter your current location"
                    />
                  </Grid>
                </>)
              }
              <Grid item sm={12}>
                <p className={style.label}>Fundraiser type:</p>
                <TextField
                  fullWidth
                  id="type"
                  name="type"
                  type="type"
                  value={formik.values.type}
                  onChange={formik.handleChange}
                  error={formik.touched.type && Boolean(formik.errors.type)}
                  inputProps={{style:{ backgroundColor: '#E6EAF0'}}}
                  autoComplete='off'
                  variant="outlined"
                  placeholder="Enter your fundraising type"
                />
              </Grid>
              <Grid item sm={12}>
                <p className={style.label}>Detailed summary of {charityType}(1000 characters max)</p>
                <TextareaAutosize
                  minRows={4}
                  maxRows={4}
                  id="detail"
                  name="detail"
                  className={"border-1 p-10 " + (formik.touched.detail && Boolean(formik.errors.detail) ? "border-error" : '' )}
                  style={{ width: '100%' }}
                  value={formik.values.detail}
                  onChange={formik.handleChange}
                  placeholder="Enter your detail summary"
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
              <button type="button" className={baseStyles.normalBtn + ' text-blue mr-10'} onClick={() => setUploadShow(true)}>
                <FontAwesomeIcon icon={faUpload} /> Upload photo
              </button>
              <img src={uploadFile ? URL.createObjectURL(uploadFile) : ''} className="w-200"/>
            </Grid>
            <Grid item xs={12} sm={6}>
              <button type="submit" className={baseStyles.greenBtn}>Create <FontAwesomeIcon icon={faArrowRight} /></button>
            </Grid>
          </Grid>
        </form>
      </div>
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
    </div>
  );
}