/**
 * @format
 */

import {AppRegistry} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import notifee, {EventType} from '@notifee/react-native';
import {onDisplayNotification} from './src/Utility/utils/Push';
import App from './App';
import {name as appName} from './app.json';

// 포그라운드 푸시
messaging().onMessage(async notification => {
  console.log('Message handled in the forground!', notification);
  onDisplayNotification({
    title: notification?.notification.title,
    body: notification?.notification.body,
  });
});

// 백그라운드 푸시
messaging().setBackgroundMessageHandler(async notification => {
  console.log('Message handled in the background!', notification);
  onDisplayNotification({
    title: notification?.notification.title,
    body: notification?.notification.body,
  });
});

// 백그라운드 이벤트
notifee.onBackgroundEvent(async ({type, detail}) => {
  const {notification, pressAction} = detail;

  // Check if the user pressed the "Mark as read" action
  if (type === EventType.ACTION_PRESS && pressAction.id === 'mark-as-read') {
    console.log('User pressed Background notification', notification);
    // Update external API
    // ...

    // Remove the notification
    await notifee.cancelNotification(notification.id);
  }
});

AppRegistry.registerComponent(appName, () => App);
