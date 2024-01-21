import React from 'react';
import {View, StyleSheet} from 'react-native';
import Header from '../../Components/Header';
import HeadingText from '../../Components/HeadingText';
import {hp} from '../../Utility/utils/UI';
import {Color} from '../../Utility/utils/Color';
import {AllScreenList, SwipeStackProps} from '../../Navigation/NavigationProps';
import SwipeCarouselGesture from '../../Components/Gesture/SwipeCarouselGesture';

const SwipeCarousel = ({
  navigation,
}: SwipeStackProps<AllScreenList.SwipeCarousel>) => {
  return (
    <View style={styles.view}>
      <Header navigation={navigation} bgColor={Color.white} />
      <HeadingText
        navigation={navigation}
        text="Swipe Carousel"
        color={Color.black}
      />
      <SwipeCarouselGesture />
    </View>
  );
};

export default SwipeCarousel;

const styles = StyleSheet.create({
  view: {
    height: hp(740),
    paddingLeft: hp(10),
    paddingRight: hp(10),
    backgroundColor: Color.white,
  },
});
