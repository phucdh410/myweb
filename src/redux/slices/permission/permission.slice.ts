import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { IPermissionState } from './types';

const initialState: IPermissionState = {
  permissions: [],
};

export const permissionSlice = createSlice({
  name: 'permission',
  initialState,
  reducers: {
    setPermissions: (state, action) => {
      state.permissions = action.payload;
    },
    clearPermissions: (state, action) => {
      state.permissions = [];
    },
  },
});

export const { setPermissions, clearPermissions } = permissionSlice.actions;

const persistConfig = {
  key: 'permission',
  version: 1,
  storage,
  whiteList: ['permissions'],
};

export default persistReducer(persistConfig, permissionSlice.reducer);
