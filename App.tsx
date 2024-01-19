import {useEffect} from 'react';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import messaging from '@react-native-firebase/messaging';
import notifee, {EventType} from '@notifee/react-native';
import Routes from './src/Screens/Routes';
import Detect from './src/Utility/utils/Detect';

const App = () => {
  // Detect();
  useEffect(() => {
    // 포그라운드 이벤트
    return notifee.onForegroundEvent(({type, detail}) => {
      switch (type) {
        case EventType.DISMISSED:
          console.log(
            'User dismissed Foreground notification',
            detail.notification,
          );
          break;
        case EventType.PRESS:
          console.log(
            'User pressed Foreground notification',
            detail.notification,
          );
          break;
      }
    });
  }, []);

  useEffect(() => {
    requestUserPermission();
  }, []);

  // 알림 허용 얼럿
  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{flex: 1}} edges={['left', 'right']}>
        <Routes />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;
