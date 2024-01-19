import React, {useEffect, useState} from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import messaging from '@react-native-firebase/messaging';
import Splash from '../Utility/utils/Splash';
import {useAuthStore} from '../Store/stores/authStore';
import BottomNavigation from '../Navigation/BottomNavigation';

const queryClient = new QueryClient();

const Routes = () => {
  const [isSplash, setIsSplash] = useState(true);

  // store
  const {setFcmToken} = useAuthStore();

  // 스플래시
  setTimeout(() => {
    setIsSplash(false);
  }, 1500);

  useEffect(() => {
    getToken();
  }, []);

  const getToken = async () => {
    const fcmToken = await messaging().getToken();
    console.log('디바이스 토큰값', fcmToken);
    setFcmToken(fcmToken);
  };

  return isSplash ? (
    <Splash />
  ) : (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{flex: 1}}>
        <BottomNavigation />
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
};

export default Routes;
