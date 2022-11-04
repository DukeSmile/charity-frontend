import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 0,
  charities: [],
  fundRaisers: [],
  allCharities: [],
  adminUsers: [],
  isOwner: 0,
  loading: false
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
    }
  }
});

export const { setCharities, setFundRaisers, setAllCharities, setAdminUsers, setOwnerFlag, setLoading } = bridgeSlice.actions;
export default bridgeSlice.reducer;
