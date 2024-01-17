import {useEffect} from 'react';
import {Platform, Linking} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import Routes from './src/Screens/Routes';

const App = () => {
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
    };
  }, []);

  useEffect(() => {
    requestUserPermission();
    if (Platform.OS === 'ios') {
      // ios 뱃지 초기화 후 기존의 등록된 알림 제거
      PushNotificationIOS.setApplicationIconBadgeNumber(0);
    }
  }, []);

  // PushNotification.localNotificationSchedule({
  //   channelId: 'org.reactjs.native.example.a-mess-rn',
  //   title: '스케쥴테스트',
  //   message: '스케쥴테스트 메세지',
  //   date: new Date(Date.now() + 10 * 1000), // in 60
  //   allowWhileIdle: false, // (optional) set notification to work while on doze, default: false
  //   repeatType: 'day', // (optional) Repeating interval. Check 'Repeating Notifications' section for more info.
  // });

  // 안드로이드 알림 허용 얼럿
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
