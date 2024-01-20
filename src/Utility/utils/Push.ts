import {Platform} from 'react-native';
import notifee, {TimestampTrigger, TriggerType} from '@notifee/react-native';
import {NotiProps, ScheduleNotiProps} from './Types';

// 채널 생성 및 알림 생성
export const onDisplayNotification = async ({title, body, data}: NotiProps) => {
  const channelId = await notifee.createChannel({
    id: 'com.mass.project',
    name: 'Mass Notifications',
  });

  if (Platform.OS !== 'ios') {
    await notifee.displayNotification({
      title,
      body,
      data,
      android: {
        channelId,
        sound: 'sound',
        timestamp: Date.now(),
        smallIcon: 'small-icon',
      },
    });
  } else {
    await notifee.displayNotification({
      title,
      body,
      data,
      ios: {
        sound: 'default',
      },
    });
  }
};

export const onCreateTriggerNotification = async ({
  title,
  body,
  data,
  month,
  day,
  hour,
  minute,
}: ScheduleNotiProps) => {
  const channelId = await notifee.createChannel({
    id: 'com.mass.project',
    name: 'Mass Notifications',
  });

  const date = new Date(Date.now());
  date.setMonth(month);
  date.setDate(day);
  date.setHours(hour);
  date.setMinutes(minute);

  const trigger: TimestampTrigger = {
    type: TriggerType.TIMESTAMP,
    timestamp: date.getTime(),
    // repeatFrequency: RepeatFrequency.WEEKLY, // 매주 반복
  };

  const result = await notifee.createTriggerNotification(
    {
      title,
      body,
      data,
      android: {
        channelId,
      },
    },
    trigger,
  );

  return result;
};
