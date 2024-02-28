import moment from 'moment';
import {Alert} from 'react-native';
import {useEffect, useState} from 'react';
import notifee from '@notifee/react-native';
import {useIsFocused} from '@react-navigation/native';
import {useAuthStore} from '../../Store/stores/authStore';
import {onCreateTriggerNotification} from '../../Utility/utils/Push';

export const PushViewModel = () => {
  const isFocused = useIsFocused();
  const [date, setDate] = useState(new Date());
  const [isUpdate, setIsUpdate] = useState(false);
  const [visibleDate, setVisibleDate] = useState(false);
  const [scheduleData, setScheduleData] = useState<any>();

  // store
  const {fcmToken} = useAuthStore();

  useEffect(() => {
    if (isUpdate || isFocused) {
      notifee.getTriggerNotifications().then(res => setScheduleData(res));

      setIsUpdate(false);
    }
  }, [isUpdate, isFocused]);

  const onConfirmDate = (selectedDate: any) => {
    const now = moment(new Date(Date.now())).format('MM.DD HH:mm');
    const select = moment(selectedDate).format('MM.DD HH:mm');

    if (now >= select) {
      setVisibleDate(false);
      setDate(new Date());
      Alert.alert('지난 날짜 및 시간은 선택할 수 없습니다.');
    } else {
      setVisibleDate(false);
      setDate(selectedDate);
    }
  };

  const onSchedulePushNoti = () => {
    const isDate = new Date(date);
    const now = moment(new Date(Date.now())).format('MM.DD HH:mm');
    const select = moment(isDate).format('MM.DD HH:mm');

    if (now >= select) {
      setVisibleDate(false);
      setDate(new Date());
      Alert.alert('지난 날짜 및 시간엔 스케쥴을 등록할 수 없습니다.');
    } else {
      onCreateTriggerNotification({
        title: '스케쥴 테스트',
        body: '스케쥴 내용',
        data: {},
        month: isDate.getMonth(),
        day: isDate.getDate(),
        hour: isDate.getHours(),
        minute: isDate.getMinutes(),
      }).then(() => {
        setIsUpdate(true);
        Alert.alert(
          `${moment(isDate).format(
            'MM월 DD일 HH시 mm분',
          )}으로 스케쥴을 등록했습니다.`,
        );
      });
    }
  };

  return {
    date,
    fcmToken,
    visibleDate,
    scheduleData,
    setDate,
    setIsUpdate,
    onConfirmDate,
    setVisibleDate,
    onSchedulePushNoti,
  };
};
