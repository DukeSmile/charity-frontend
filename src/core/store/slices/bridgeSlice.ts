import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 0,
  charities: [],
  fundRaisers: [],
  allCharities: [],
  adminUsers: [],
  isOwner: 0,
  loading: false,
  uploadUrl: '',
  caseDonateHistory: [],
  donateHistory: []
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
  setDonateHistory
} = bridgeSlice.actions;
export default bridgeSlice.reducer;
