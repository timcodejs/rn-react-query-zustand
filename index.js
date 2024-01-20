/**
 * @format
 */

import {AppRegistry} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import notifee, {EventType} from '@notifee/react-native';
import App from './App';
import {name as appName} from './app.json';

// 백그라운드 푸시
messaging().setBackgroundMessageHandler(async notification => {
  console.log('Message handled in the background!', notification);
});

// 백그라운드 이벤트
notifee.onBackgroundEvent(async ({type, detail}) => {
  const {notification, pressAction} = detail;
  console.log('type', type);
  // Check if the user pressed the "Mark as read" action
  if (type === EventType.ACTION_PRESS && pressAction.id === 'mark-as-read') {
    console.log('User Mark as read Background notification', notification);
    // Update external API
    // Remove the notification
    await notifee.cancelNotification(notification.id);
  }
});

AppRegistry.registerComponent(appName, () => App);
