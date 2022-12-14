import { Grid, TextareaAutosize, TextField, NativeSelect, MenuItem } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faUpload } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { create } from 'ipfs-http-client';
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";

import { useWeb3Context } from "../../hooks/web3Context";
import { allFundTypes, baseServerUrl, getContract, projectId, projectSecret } from "../../core/constants/base";
import { demoLoginUser, setCharityType, setLoading, setLoginUser } from "../../core/store/slices/bridgeSlice";
import { PhotoUpload } from "../../components/photoUpload";

import remoteImg from "../../assets/images/components/remote.png";
import currenciesImg from "../../assets/images/components/currencies.png";
import manImg from "../../assets/images/components/man.png";
import { baseStyles } from "../../core/constants/style";
import { loginUserProp } from "../../core/interfaces/base";

export const RegistrationPage = (props: any) => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginUser:loginUserProp = useSelector((state:any) => state.app.loginUser);
  const {connected, address, provider} = useWeb3Context();
  const [wallet, setWallet] = useState('');
  const [uploadShow, setUploadShow] = useState(false);
  const [uploadFile, setUploadFile] = useState(null);
  const ipfsInfo = useSelector((state:any) => state.app.ipfs);
  const ownerFlag = useSelector((state:any) => state.app.isOwner);
  const charityType = useSelector((state:any) => state.app.charityType);
  const sign_hash = useSelector((state:any) => state.app.signHash);
  const style = {
    label: 'text-18 my-15',
    tab: 'rounded-full py-6 px-20 text-20 text-brown',
    activeTab: 'rounded-full py-6 px-20 text-20 bg-asphalt text-white font-bold'
  }
  let currentUser = demoLoginUser;

  if (props.edit) {
    currentUser = loginUser;
  }
  const loadCurrentData = async() =>{
    let response;
    try {
      response = await axios.post(`${baseServerUrl}/auth/login`, {
        wallet_address: address
      },
      {
        headers: {
          Authorization: `Bearer ${sign_hash}`
        },
      });
      if (response.data.id) {
        dispatch(setLoginUser(response.data));
        dispatch(setCharityType(response.data.charity_type === 0 ? 'charity' : 'fundraiser'));
      }
    }
    catch(e:any){
      console.log(e.message);
    }
  };
  // console.log(props.currentUser, currentUser);
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
    goal: Yup.string()
      .min(1, 'Goal can\'t be zero')
      .required("Required"),
    title: Yup.string().required("Required"),
    location: Yup.string().required("Required"),
    // wallet: Yup.string().required("Required")
  });
  const createNewCharity = async (values:any) => {
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
    if (address !== '' && provider != null) {
      dispatch(setLoading(true));
      try{
        //upload image to IPFS
        let uploadUrl = '';
        if (ipfsInfo && uploadFile) {
          console.log(uploadFile);
          const result = await (ipfsInfo).add(uploadFile);
          uploadUrl = result.path;
        }

        // Make transaction for creating
        let ddaContract = getContract('DDAContract');
        const _catalog = {
          charityType: charityType === 'charity' ? 0 : 1,
          fund: 0,
          goal: values.goal,
          donateType: values.type,
          photo:uploadUrl
        }
        const numOfCharityType = charityType === 'charity' ? 0 : 1;
        // console.log(_catalog);
        await ddaContract.methods.createCharity(_catalog).send({from: address});

        //send signup to backend
        const ajax_info = {
          "wallet_address": address.toLowerCase(),
          "charity_type": numOfCharityType,
          "goal": values.goal,
          "fund_type": values.type,
          "name": values.name,
          "title": values.title,
          "photo": uploadUrl,
          "country": values.country,
          "location": values.location,
          "email": values.email,
          "summary": values.summary,
          "detail": values.detail,
          "vip": values.vip,
          "website": values.website,
          "phone": values.phone,
          "linkedin": values.linkedin,
          "twitter": values.twitter,
          "facebook": values.facebook,
          "instagram": values.instagram
        };
        let response;
        try {
          response = await axios.post(`${baseServerUrl}/users/create`,
            ajax_info,
            {
              headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods":
                  "GET, POST, PATCH, PUT, DELETE, OPTIONS",
                "Access-Control-Allow-Headers":
                  "Origin, Content-Type, X-Auth-Token",
                "Authorization": `Bearer ${sign_hash}`
              },
            }
          );
          dispatch(setLoginUser(response));
        }
        catch(e:any){
          console.log(e.response.data.message);
        }
        // loadCurrentData();
        navigate('/celebrate');
      }
      catch(error){
        console.log(error);
      }
      dispatch(setLoading(false));
    }
  };

  const updateCharity = async (values:any) => {
    if(!connected){
      return;
    }
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
    if (address !== '' && provider != null) {
      dispatch(setLoading(true));
      try{
        //upload image to IPFS
        let uploadUrl = '';
        if (ipfsInfo && uploadFile) {
          console.log(uploadFile);
          const result = await (ipfsInfo).add(uploadFile);
          uploadUrl = result.path;
        }

        const numOfCharityType = charityType === 'charity' ? 0 : 1;
        //send update to backend
        const ajax_info = {
          "wallet_address": address.toLowerCase(),
          "charity_type": numOfCharityType,
          "goal": values.goal,
          "fund_type": values.type,
          "name": values.name,
          "title": values.title,
          "photo": uploadUrl,
          "country": values.country,
          "location": values.location,
          "email": values.email,
          "summary": values.summary,
          "detail": values.detail,
          "vip": values.vip,
          "website": values.website,
          "phone": values.phone,
          "linkedin": values.linkedin,
          "twitter": values.twitter,
          "facebook": values.facebook,
          "instagram": values.instagram
        };
        let response;
        try {
          response = await axios.patch(`${baseServerUrl}/users`,
            ajax_info,
            {
              headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods":
                  "GET, POST, PATCH, PUT, DELETE, OPTIONS",
                "Access-Control-Allow-Headers":
                  "Origin, Content-Type, X-Auth-Token",
                "Authorization": `Bearer ${sign_hash}`
              },
            }
          );
          console.log(response);
          dispatch(setLoginUser(response.data));
          // loadCurrentData();
        }
        catch(e:any){
          console.log(e.response.data.message);
        }
      }
      catch(error){
        console.log(error);
      }
      dispatch(setLoading(false));
    }
  };
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: currentUser.name,
      vip: currentUser.vip, // charity information
      website: currentUser.website, // charity information
      phone: currentUser.phone, // charity information
      linkedin: currentUser.linkedin, // charity information
      twitter: currentUser.twitter, // charity information
      facebook: currentUser.facebook, // charity information
      instagram: currentUser.instagram, // charity information
      email: currentUser.email, // charity information
      country: currentUser.country,
      summary: currentUser.summary,
      detail: currentUser.detail,
      title: currentUser.title,
      location: currentUser.location,
      goal: currentUser.goal,
      type: currentUser.fund_type
    },
    onSubmit: props.edit ? updateCharity : createNewCharity,
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
        goal: 1,
        type: ''
      }
    });
    setUploadFile(null);
  }, [charityType]);

  return (
    <div>
      <div>
        {!props.edit && (
          <Grid container className="border-b-2 border-dashed my-10 p-10">
            <Grid item sm={12} md={6}>
              <p className="text-38 font-bold text-center">Start your fundraising</p>
            </Grid>
            <Grid item sm={12} md={6} className="flex items-center flex-row-reverse">
              <div className="bg-lightgrey rounded-full p-3 flex">
                <button className={charityType === 'charity' ? style.activeTab : style.tab} onClick={() => dispatch(setCharityType('charity'))}>Charity</button>
                <button className={charityType === 'fundraiser' ? style.activeTab : style.tab} onClick={() => dispatch(setCharityType('fundraiser'))}>FundRaiser</button>
              </div>
            </Grid>
          </Grid>
        )}
        {props.edit && (
          <div className="flex items-center">

            <img src={loginUser.photo != '' ? ("https://ipfs.io/ipfs/" + loginUser.photo) : manImg} className="mr-20 w-120 h-120 rounded-full border"/>
            <div>
              <p className="text-24">{loginUser.name === '' ? 'User name' : loginUser.name}</p>
              <p className="text-16">Update your photo and personal details</p>
            </div>
          </div>
        )}
        <form className="w-full" onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item container xs={12} md={6} spacing={1}>
              {charityType === 'charity' && (
                <>
                  <Grid item xs={12}>
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
                  <Grid item xs={12}>
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
                  <Grid item xs={12}>
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
                  <Grid item xs={12}>
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
                      className="w-full"
                    />
                  </Grid>
                </>)
              }
              <Grid item xs={12}>
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
              <Grid item xs={12}>
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
              <Grid item xs={12}>
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
              <Grid item xs={12}>
                <p className={style.label}>Short summary (100 characters max)</p>
                <TextareaAutosize
                  minRows={4}
                  maxRows={4}
                  id="summary"
                  name="summary"
                  className={"border-1 p-10 " + (formik.touched.summary || Boolean(formik.errors.summary) ? "border-error" : '' )}
                  style={{ width: '100%' }}
                  value={formik.values.summary}
                  onChange={formik.handleChange}
                  placeholder="Please give a short summary of the charity to catch the attention of readers and to give a general overview of the charity and its fundraising aims"
                />
              </Grid>
            </Grid>
            <Grid item container sm={12} md={6} spacing={1}>
              {charityType === 'charity' && (
                <>
                  <Grid item xs={12}>
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
                  <Grid item xs={12}>
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
                  <Grid item xs={12}>
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
                  <Grid item xs={12}>
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
                  <Grid item xs={12}>
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
                  <Grid item xs={12}>
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
                  <Grid item xs={12}>
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
                  <Grid item xs={12}>
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
              <Grid item xs={12}>
                <p className={style.label}>Fundraiser type:</p>
                <select
                  id="type"
                  name="type"
                  value={formik.values.type}
                  onChange={formik.handleChange}
                  className="w-full h-55 border-1 p-5 pl-10 capitalize bg-[#E6EAF0] w-full"
                >
                  <option aria-label="None" value="" >Default</option>
                  {
                    Object.keys(allFundTypes).map((typeName, index) => {
                      const fundType = allFundTypes[typeName];
                      return (
                        <option key={typeName} className="capitalize">{fundType.title}</option>
                      )
                    })
                  }
                </select>
              </Grid>
              <Grid item xs={12}>
                <p className={style.label}>Detailed summary (1000 characters max)</p>
                <TextareaAutosize
                  minRows={4}
                  maxRows={4}
                  id="detail"
                  name="detail"
                  className={"border-1 p-10 " + (formik.touched.detail && Boolean(formik.errors.detail) ? "border-error" : '' )}
                  style={{ width: '100%' }}
                  value={formik.values.detail}
                  onChange={formik.handleChange}
                  placeholder="Please give a full description of the charity, Its aims and objectives and detailed information about its operations and structure"
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
              <button type="submit" className={baseStyles.greenBtn}>{props.edit ? 'Update' : 'Create'} <FontAwesomeIcon icon={faArrowRight} /></button>
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