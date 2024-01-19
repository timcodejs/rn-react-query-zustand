import {useEffect, useRef} from 'react';
import {AppState} from 'react-native';

const Detect = () => {
  const appState = useRef(AppState.currentState);

  const handleAppStateChange = (nextAppState: any) => {
    console.log('⚽️ appState nextAppState', appState.current, nextAppState);
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      console.log('⚽️⚽️ App has come to the foreground!');
    }
    if (
      appState.current.match(/inactive|active/) &&
      nextAppState === 'background'
    ) {
      console.log('⚽️⚽️ App has come to the background!');
    }
    appState.current = nextAppState;
  };

  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange);
    return () => {
      AppState.addEventListener('change', handleAppStateChange).remove();
    };
  }, []);
};

export default Detect;
