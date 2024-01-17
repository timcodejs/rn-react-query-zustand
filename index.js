/**
 * @format
 */

import {AppRegistry, Linking, Platform} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import App from './App';
import {name as appName} from './app.json';

// 알림 설정 형성
PushNotification.configure({
  // 앱이 켜질 때 fcm 토큰값 리턴
  onRegister: function (token) {
    console.log('fcm', token);
  },

  // 앱으로 푸시 메세지가 올때 동작
  onNotification: function (notification) {
    console.log(
      'NOTIFICATION:',
      JSON.stringify(notification) + '++' + Platform.OS,
    );

    if (notification?.userInteraction) {
      console.log(notification?.data);
      if (notification?.data.data === 'BUSINESS_WORK_EVENT_REGISTRATION') {
        Linking.openURL('mess://eventApplication');
      }
    }
    if (Platform.OS === 'ios') {
      PushNotification.finish(PushNotificationIOS.FetchResult.NoData);
    }
  },

  // 푸시 메세지를 눌렀을 때 액션
  onAction: function (notification) {
    console.log('ACTION:', notification.action);
    console.log('NOTIFICATION22:', notification);
  },

  // 에러
  onRegistrationError: function (err) {
    console.error(err.message, err);
  },

  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },

  popInitialNotification: true,

  requestPermissions: true,
});

AppRegistry.registerComponent(appName, () => App);
