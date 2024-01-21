import React from 'react';
import {View, StyleSheet} from 'react-native';
import Header from '../../Components/Header';
import HeadingText from '../../Components/HeadingText';
import SwipeToCloseGesture from '../../Components/Gesture/SwipeToCloseGesture';
import {hp} from '../../Utility/utils/UI';
import {Color} from '../../Utility/utils/Color';
import {AllScreenList, SwipeStackProps} from '../../Navigation/NavigationProps';

const SwipeToClose = ({
  navigation,
}: SwipeStackProps<AllScreenList.SwipeToClose>) => {
  return (
    <View style={styles.view}>
      <Header navigation={navigation} bgColor={Color.white} />
      <HeadingText
        navigation={navigation}
        text="Swipe To Close"
        color={Color.black}
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
