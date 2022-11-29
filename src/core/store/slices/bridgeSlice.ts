import { createSlice } from '@reduxjs/toolkit';
import { loginUserProp } from '../../interfaces/base';

export const demoLoginUser:loginUserProp = {
  id: '',
  wallet_address: '',
  charity_type: 0,
  goal: 1,
  fund_type: '',
  name: '',
  title: '',
  photo: '',
  country: '',
  location: '',
  email: '', // charity information
  summary: '',
  detail: '',
  vip: '', // charity information
  website: '', // charity information
  phone: '', // charity information
  linkedin: '', // charity information
  twitter: '', // charity information
  facebook: '', // charity information
  instagram: '', // charity information
  created_at: '',
}

const initialState = {
  value: 0,
  loginUser: demoLoginUser,
  charities: [],
  fundRaisers: [],
  allCharities: [],
  adminUsers: [],
  categories: {},
  isOwner: 0,
  loading: false,
  uploadUrl: '',
  caseDonateHistory: [],
  donateHistory: [],
  ipfs:undefined,
  signHash: '',
  charityType: 'fundraiser'
};



export const bridgeSlice = createSlice({
  name: 'app',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setCharities: (state, { payload }) => {
      state.charities = payload;
    },
    setFundRaisers: (state, { payload }) => {
      state.fundRaisers = payload;
    },
    setAllCharities: (state, { payload }) => {
      state.allCharities = payload;
    },
    setAdminUsers: (state, { payload }) => {
      state.adminUsers = payload;
    },
    setOwnerFlag: (state, {payload}) => {
      state.isOwner = payload;
    },
    setLoading: (state, {payload}) => {
      state.loading = payload;
    },
    setUploadUrl: (state, {payload}) => {
      state.uploadUrl = payload;
    },
    setDonateHistory: (state, {payload}) => {
      state.donateHistory = payload;
    },
    setCaseDonateHistory: (state, {payload}) => {
      state.caseDonateHistory = payload;
    },
    setIPFS: (state, {payload}) => {
      state.ipfs = payload;
    },
    setCategories: (state, {payload}) => {
      state.categories = payload;
    },
    setSignHash: (state, {payload}) => {
      state.signHash = payload;
    },
    setLoginUser: (state, {payload}) => {
      state.loginUser = payload;
    },
    setCharityType: (state, {payload}) => {
      state.charityType = payload;
    },
  }
});

export const { 
  setCharities,
  setFundRaisers,
  setAllCharities,
  setAdminUsers,
  setOwnerFlag,
  setLoading,
  setUploadUrl,
  setCaseDonateHistory,
  setDonateHistory,
  setIPFS,
  setCategories,
  setSignHash,
  setLoginUser,
  setCharityType
} = bridgeSlice.actions;
export default bridgeSlice.reducer;
