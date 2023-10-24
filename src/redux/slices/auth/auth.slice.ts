import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { IAuthState } from './types';

const initialState: IAuthState = {
  isLogined: false,
  access_token: null,
  refresh_token: null,
  profile: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload;
      state.isLogined = !!action.payload;
    },
    setToken: (state, action) => {
      state.access_token = action.payload?.access_token;
      state.refresh_token = action.payload?.refresh_token;
    },
  },
});

export const { setProfile, setToken } = authSlice.actions;

const persistConfig = {
  key: 'auth',
  version: 1,
  storage,
  whitelist: ['access_token', 'refresh_token', 'isLogined'],
};

export default persistReducer(persistConfig, authSlice.reducer);
