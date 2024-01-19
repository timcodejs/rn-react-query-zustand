import request from './request';
import {CLOUD_MESSAGING_KEY} from 'react-native-dotenv';

const fetchPushMessage = async (
  fcmToken: string,
  pushTitle: string,
  pushBody: string,
) => {
  return await request(
    'post',
    'https://fcm.googleapis.com/fcm/send',
    {
      Authorization: `key=${CLOUD_MESSAGING_KEY}`,
      'Content-Type': 'application/json',
    },
    {
      data: {
        body: 'This is awesome notification by Mobikul',
        title: 'Mobikul',
        sound: 'default',
      },
      priority: 'high',
      'content-available': 1,
      to: fcmToken,
      notification: {
        title: pushTitle,
        body: pushBody,
        sound: 'default',
      },
    },
  );
};

export {fetchPushMessage};
