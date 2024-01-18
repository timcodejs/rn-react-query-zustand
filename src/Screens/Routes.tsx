import React, {useState} from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import Splash from '../Utility/utils/Splash';
import BottomNavigation from '../Navigation/BottomNavigation';

const queryClient = new QueryClient();

const Routes = () => {
  const [isSplash, setIsSplash] = useState(true);

  // 스플래시
  setTimeout(() => {
    setIsSplash(false);
  }, 1500);

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
