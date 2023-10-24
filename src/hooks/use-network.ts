import { useEffect, useState } from 'react';

export const useNetwork = () => {
  const [isConnect, setIsConnect] = useState<boolean>(navigator.onLine);

  useEffect(() => {
    const onlineHandler = () => setIsConnect(true);

    const offlineHandler = () => setIsConnect(false);

    window.addEventListener('online', onlineHandler);
    window.addEventListener('offline', offlineHandler);

    return () => {
      window.removeEventListener('online', onlineHandler);
      window.removeEventListener('offline', offlineHandler);
    };
  }, []);

  return isConnect;
};
