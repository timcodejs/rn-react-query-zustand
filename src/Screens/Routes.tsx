import React, {useState} from 'react';
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
      <BottomNavigation />
    </QueryClientProvider>
  );
};

export default Routes;
