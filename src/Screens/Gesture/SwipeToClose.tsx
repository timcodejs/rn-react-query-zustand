import React from 'react';
import {View, StyleSheet} from 'react-native';
import Header from '../../Components/Header';
import SwipeToCloseGesture from '../../Components/Gesture/SwipeToCloseGesture';
import {hp} from '../../Utility/utils/UI';
import {Color} from '../../Utility/utils/Color';
import {PretendardBold} from '../../Utility/utils/CustomFont';
import {AllScreenList, SwipeStackProps} from '../../Navigation/NavigationProps';

const SwipeToClose = ({
  navigation,
}: SwipeStackProps<AllScreenList.SwipeToClose>) => {
  return (
    <View style={styles.view}>
      <Header navigation={navigation} />
      <PretendardBold
        size={hp(20)}
        style={{marginTop: hp(20), marginBottom: hp(20)}}
        children="Swipe To Close"
      />
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
