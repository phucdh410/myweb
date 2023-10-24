//#region IMPORT
import { useMemo } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Slide, ToastContainer } from 'react-toastify';

import CAuthProvider from '@/layouts/CAuthProvider';

import routes from './routes';

import './styles/index.scss';
import 'react-toastify/dist/ReactToastify.css';
//#endregion

const App = () => {
  //#region data
  const router = useMemo(() => createBrowserRouter(routes), []);
  //#endregion

  //#region Event
  //#endregion

  //#region Render
  return (
    <div className="App">
      <CAuthProvider>
        <RouterProvider router={router} />
      </CAuthProvider>

      <ToastContainer
        position="bottom-left"
        autoClose={4000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        limit={5}
        transition={Slide}
      />
    </div>
  );
  //#endregion
};

export default App;
