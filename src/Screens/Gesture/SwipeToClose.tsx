import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Header from '../../Components/Header';
import SwipeToCloseGesture from '../../Components/Gesture/SwipeToCloseGesture';
import {hp, wp} from '../../Utility/utils/UI';
import {Color} from '../../Utility/utils/Color';
import {IconArrowIcon} from '../../Utility/utils/SVG';
import {PretendardBold} from '../../Utility/utils/CustomFont';
import {AllScreenList, SwipeStackProps} from '../../Navigation/NavigationProps';

const SwipeToClose = ({
  navigation,
}: SwipeStackProps<AllScreenList.SwipeToClose>) => {
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
          children="Swipe To Close"
        />
      </View>
      <SwipeToCloseGesture />
    </View>
  );
};

export default SwipeToClose;

const styles = StyleSheet.create({
  view: {
    height: hp(740),
    paddingLeft: hp(10),
    paddingRight: hp(10),
    backgroundColor: Color.white,
  },
});
