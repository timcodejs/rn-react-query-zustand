import {useEffect} from 'react';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import messaging from '@react-native-firebase/messaging';
import notifee, {EventType} from '@notifee/react-native';
import {onDisplayNotification} from './src/Utility/utils/Push';
import Routes from './src/Screens/Routes';
import {useAuthStore} from './src/Store/stores/authStore';

const App = () => {
  // store
  const {setFcmToken} = useAuthStore();

  useEffect(() => {
    // 포그라운드 푸시
    messaging().onMessage(async (notification: any) => {
      console.log('Message handled in the forground!', notification);
      onDisplayNotification({
        title: notification?.notification.title,
        body: notification?.notification.body,
        data: notification?.notification.data,
      });
    });
    // 포그라운드 이벤트
    notifee.onForegroundEvent(({type, detail}) => {
      switch (type) {
        case EventType.DISMISSED:
          console.log(
            'User dismissed Foreground notification - 1',
            detail.notification,
          );
          break;
        case EventType.PRESS:
          console.log(
            'User pressed Foreground notification - 2',
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
      const fcmToken = await messaging().getToken();
      console.log('디바이스 토큰값', fcmToken);
      setFcmToken(fcmToken);
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
