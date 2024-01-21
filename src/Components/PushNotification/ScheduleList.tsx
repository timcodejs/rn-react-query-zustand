import React from 'react';
import moment from 'moment';
import {FlatList, StyleSheet, View} from 'react-native';
import {hp} from '../../Utility/utils/UI';
import {Color} from '../../Utility/utils/Color';
import {
  PretendardBold,
  PretendardRegular,
} from '../../Utility/utils/CustomFont';

interface Props {
  scheduleData: [];
}

const ScheduleList = ({scheduleData}: Props) => {
  return (
    <View>
      <PretendardBold
        size={hp(20)}
        color={Color.black}
        children="예정된 스케쥴"
      />
      {scheduleData?.length <= 0 && (
        <PretendardRegular
          size={hp(18)}
          color={Color.black}
          style={{marginVertical: hp(10)}}
          children={'예정된 스케쥴이 없습니다.'}
        />
      )}
      <FlatList
        data={scheduleData}
        scrollEnabled={false}
        contentContainerStyle={{paddingBottom: 70}}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}: any) => {
          return (
            <View>
              <PretendardRegular
                size={hp(16)}
                color={Color.black}
                style={{marginVertical: hp(10)}}
                children={`· ${moment(item.trigger.timestamp).format('lll')}`}
              />
            </View>
          );
        }}
        ItemSeparatorComponent={() => <View style={styles.line} />}
        ListFooterComponent={() => <View style={styles.line} />}
      />
    </View>
  );
};

export default ScheduleList;

const styles = StyleSheet.create({
  line: {
    height: 1,
    backgroundColor: Color.gray,
  },
});
