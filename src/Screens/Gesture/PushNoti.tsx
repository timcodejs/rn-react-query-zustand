import moment from 'moment';
import React, {useEffect, useState} from 'react';
import notifee from '@notifee/react-native';
import {View, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Header from '../../Components/Header';
import {hp, wp} from '../../Utility/utils/UI';
import {Color} from '../../Utility/utils/Color';
import {IconArrowIcon} from '../../Utility/utils/SVG';
import {useAuthStore} from '../../Store/stores/authStore';
import {
  PretendardBold,
  PretendardRegular,
} from '../../Utility/utils/CustomFont';
import {onCreateTriggerNotification} from '../../Utility/utils/Push';
import {fetchPushMessage} from '../../Utility/apis/fetchPushMessage';
import {AllScreenList, SwipeStackProps} from '../../Navigation/NavigationProps';

const PushNoti = ({navigation}: SwipeStackProps<AllScreenList.PushNoti>) => {
  const [isUpdate, setIsUpdate] = useState(false);
  const [visibleDate, setVisibleDate] = useState(false);
  const [date, setDate] = useState(new Date());

  // store
  const {fcmToken} = useAuthStore();

  useEffect(() => {
    if (isUpdate) {
      notifee
        .getTriggerNotifications()
        .then(res => console.log('All trigger notifications: ', res));

      setIsUpdate(false);
    }
  }, [isUpdate]);

  const onConfirmDate = (selectedDate: any) => {
    const now = moment(new Date(Date.now())).format('MM.DD HH:mm');
    const select = moment(selectedDate).format('MM.DD HH:mm');

    if (now > select) {
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

    if (now > select) {
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

  return (
    <View style={styles.view}>
      <Header navigation={navigation} bgColor={Color.white} />
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{marginRight: hp(10)}}>
          <IconArrowIcon
            color={Color.black}
            width={wp(20)}
            height={hp(20)}
            style={{transform: [{rotate: '180deg'}]}}
          />
        </TouchableOpacity>
        <PretendardBold
          size={hp(20)}
          style={{marginTop: hp(20), marginBottom: hp(20)}}
          children="Push Notification"
        />
      </View>
      <View style={styles.inner}>
        <TouchableOpacity
          style={styles.box}
          onPress={() => {
            fetchPushMessage(
              fcmToken,
              '테스트 타이틀',
              'Forground 테스트 메세지',
            );
          }}>
          <PretendardBold
            size={hp(16)}
            color={Color.white}
            children="forground push noti"
          />
        </TouchableOpacity>
        <View style={styles.line} />
        <TouchableOpacity
          style={styles.box}
          onPress={() => {
            setTimeout(() => {
              fetchPushMessage(
                fcmToken,
                '테스트 타이틀',
                'Background 테스트 메세지',
              );
            }, 5000);
          }}>
          <PretendardBold
            size={hp(16)}
            color={Color.white}
            children="background push noti"
          />
        </TouchableOpacity>
        <View style={styles.line} />
        <TouchableOpacity
          style={styles.date}
          onPress={() => setVisibleDate(true)}>
          <PretendardRegular
            size={hp(20)}
            color={Color.black}
            children="선택한 스케쥴 : "
          />
          <PretendardBold
            size={hp(20)}
            color={Color.black}
            children={moment(new Date(date)).format('MM월 DD일 ')}
          />
          <PretendardBold
            size={hp(20)}
            color={Color.black}
            children={moment(new Date(date)).format('HH시 mm분')}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.box} onPress={onSchedulePushNoti}>
          <PretendardBold
            size={hp(16)}
            color={Color.white}
            children="Schedule push noti"
          />
        </TouchableOpacity>
        <View style={styles.line} />
      </View>
      <DateTimePickerModal
        isVisible={visibleDate}
        mode={'datetime'}
        onConfirm={onConfirmDate}
        onCancel={() => setVisibleDate(false)}
        date={date ? date : new Date()}
      />
    </View>
  );
};

export default PushNoti;

const styles = StyleSheet.create({
  view: {
    height: hp(740),
    paddingHorizontal: wp(10),
    backgroundColor: Color.white,
  },
  inner: {
    alignItems: 'center',
  },
  box: {
    width: 220,
    height: 60,
    marginBottom: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#720455',
  },
  date: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: wp(20),
    marginHorizontal: wp(5),
  },
  line: {
    width: '100%',
    height: 1,
    marginBottom: 20,
    backgroundColor: Color.gray,
  },
});
