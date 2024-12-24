import { useEffect, useState } from 'react';
import NetInfo from '@react-native-community/netinfo';

const useOnlineStatus = (flag?: boolean) => {
  const [online, setOnline] = useState<OnlineStatus>({
    isConnected: false,
    showNoConnectionScreenMessage: false,
  });

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      const isConnected = !!state.isConnected;
      setOnline({
        isConnected,
        showNoConnectionScreenMessage: !isConnected && !!flag,
      });
    });

    return () => {
      unsubscribe();
    };
  }, [flag]);

  return online;
};

export default useOnlineStatus;
