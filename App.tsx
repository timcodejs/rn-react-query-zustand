import {useEffect} from 'react';
import {Linking} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import messaging from '@react-native-firebase/messaging';
import notifee, {EventType} from '@notifee/react-native';
import {onDisplayNotification} from './src/Utility/utils/Push';
import Routes from './src/Screens/Routes';
import {useAuthStore} from './src/Store/stores/authStore';

const App = () => {
  // store
  const {setFcmToken} = useAuthStore();

  // deep linking
  useEffect(() => {
    // 최초 실행 시에 Universal link 또는 URL scheme요청이 있었을 때 여기서 찾을 수 있음
    Linking.getInitialURL().then(value => {
      console.log('getInitialURL', value);
    });

    const linkingSubscription = Linking.addEventListener('url', e => {
      // 앱이 실행되어있는 상태에서 요청이 왔을 때 처리하는 이벤트 등록
      const route = e.url.replace(/.*?:\/\//g, '');
      console.log('add e.url', e.url);
      console.log('route', route);
    });

    return () => {
      // 이벤트 해제
      linkingSubscription.remove();
      // Linking.removeEventListener('url', e => {
      //   console.log('remove e.url', e.url);
      // });
    };
  }, []);

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

  // 알림 권한 확인
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
