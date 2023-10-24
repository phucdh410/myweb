//#region IMPORT
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { QueryClientProvider } from '@tanstack/react-query';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { PersistGate } from 'redux-persist/integration/react';

import { persistor, store } from '@/redux/';

import 'dayjs/locale/vi';

import { queryClient } from './utils/react-query';
import App from './App';
import theme from './themes';

dayjs.extend(isBetween);
dayjs.extend(utc);
dayjs.extend(timezone);

//#endregion

createRoot(document.getElementById('__app') as HTMLElement).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <QueryClientProvider client={queryClient}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </LocalizationProvider>
      </QueryClientProvider>
    </PersistGate>
  </Provider>,
);
