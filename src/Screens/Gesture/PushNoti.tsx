import moment from 'moment';
import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Header from '../../Components/Header';
import HeadingText from '../../Components/HeadingText';
import CommonButton from '../../Components/CommonButton';
import ScheduleList from '../../Components/PushNotification/ScheduleList';
import {hp, wp} from '../../Utility/utils/UI';
import {Color} from '../../Utility/utils/Color';
import {PretendardBold} from '../../Utility/utils/CustomFont';
import {fetchPushMessage} from '../../Utility/apis/fetchPushMessage';
import {PushViewModel} from '../../Business/services/PushViewModel';
import {AllScreenList, SwipeStackProps} from '../../Navigation/NavigationProps';
import CommonSelect from '../../Components/CommonSelect';
import {LINKING_OPTIONS} from '../../Utility/utils/constant';

const PushNoti = ({navigation}: SwipeStackProps<AllScreenList.PushNoti>) => {
  const model = PushViewModel();
  const [gubun, setGubun] = useState<any>();

  return (
    <View style={styles.view}>
      <Header navigation={navigation} bgColor={Color.white} />
      <HeadingText
        navigation={navigation}
        text="Push Notification"
        color={Color.black}
      />
      <ScrollView>
        <CommonButton
          text="forground push noti"
          pressHandler={() =>
            fetchPushMessage(
              model?.fcmToken,
              '테스트 타이틀',
              'Forground 테스트 메세지',
            )
          }
        />
        <View style={styles.line} />
        <CommonSelect
          optionData={LINKING_OPTIONS}
          placeholderText="구분"
          values={gubun}
          setValues={setGubun}
          disabled={true}
        />
        <CommonButton
          text="deeplink push noti"
          pressHandler={() => {
            if (gubun?.value === undefined) {
              Alert.alert('딥링크 구분을 선택해 주세요.');
            } else {
              setTimeout(() => {
                fetchPushMessage(
                  model?.fcmToken,
                  'deeplink 테스트 타이틀',
                  'Deeplink 테스트 메세지',
                  gubun?.value,
                );
              }, 5000);
            }
          }}
        />
        <View style={styles.line} />
        <TouchableOpacity
          style={styles.date}
          onPress={() => model?.setVisibleDate(true)}>
          <PretendardBold
            size={hp(18)}
            color={Color.black}
            children={moment(new Date(model?.date)).format('lll')}
          />
        </TouchableOpacity>
        <CommonButton
          text="Schedule push noti"
          pressHandler={model?.onSchedulePushNoti}
        />
        <View style={styles.line} />
        <ScheduleList scheduleData={model?.scheduleData} />
      </ScrollView>
      <DateTimePickerModal
        isVisible={model?.visibleDate}
        mode={'datetime'}
        onConfirm={model?.onConfirmDate}
        onCancel={() => model?.setVisibleDate(false)}
        date={model?.date ? model?.date : new Date()}
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
  date: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: wp(5),
    marginBottom: hp(15),
    borderRadius: 10,
    backgroundColor: Color.lightGray,
  },
  line: {
    height: 1,
    marginBottom: 20,
    backgroundColor: Color.gray,
  },
});
