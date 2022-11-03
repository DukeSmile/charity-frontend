import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 0,
  charities: [],
  fundRaisers: [],
  adminUsers: []
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
    setAdminUsers: (state, { payload }) => {
      state.adminUsers = payload;
    },
  }
});

export const { setCharities, setFundRaisers, setAdminUsers } = bridgeSlice.actions;
export default bridgeSlice.reducer;
