declare module '*.svg' {
  import React from 'react';
  import {SvgProps} from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}

declare module 'react-native-push-notification' {
  export interface PushNotification {
    [x: string]: any;
    configure(options: any): void;
    localNotificationSchedule(options: any): void;
    cancelAllLocalNotifications(): void;
    localNotification(options: any): void;
  }

  const pushNotification: PushNotification;
  export default pushNotification;
}

declare module 'react-native-dotenv' {
  export const API_URL: string;
  export const HOMEPAGE_URL: string;
}
