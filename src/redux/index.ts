import { configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';

import authReducer from './slices/auth/auth.slice';
import permissionReducer from './slices/permission/permission.slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    permission: permissionReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: true,
});
export type RootState = ReturnType<typeof store.getState>;

export let persistor = persistStore(store);
