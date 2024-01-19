import notifee from '@notifee/react-native';

// 채널 생성 및 알림 생성
export const onDisplayNotification = async ({title = '', body = ''}) => {
  const channelId = await notifee.createChannel({
    id: 'com.mass.project',
    name: 'Mass Notifications',
  });

  await notifee.displayNotification({
    title,
    body,
    android: {
      channelId,
    },
  });
};
