//#region IMPORT
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { getProfile, tryLogout } from '@/axios/index';
import { CPageLoader } from '@/others/';
import { RootState } from '@/redux/';
import { IAuthState } from '@/slices/auth';
//#endregion

const CAuthProvider = ({ children }: any) => {
  //#region Data
  const { access_token, refresh_token, isLogined } = useSelector<
    RootState,
    IAuthState
  >((state) => state.auth);

  const [isLoading, setLoading] = useState<boolean>(true);
  //#endregion

  useEffect(() => {
    const init = async () => {
      setLoading(true);

      try {
        if (access_token && isLogined) {
          await getProfile(access_token, refresh_token as string);
        } else {
          if (
            typeof window !== 'undefined' &&
            !window.location.pathname.includes('login')
          ) {
            await tryLogout();
          }
        }
      } catch (error: any) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  if (isLoading) return <CPageLoader />;

  //#region Render
  return children;
  //#endregion
};

export default CAuthProvider;
