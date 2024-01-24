import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import Header from '../../Components/Header';
import HeadingText from '../../Components/HeadingText';
import NormalParallax from '../../Components/Carousel/NormalParallax';
import AdvancedParallax from '../../Components/Carousel/AdvancedParallax';
import {hp, wp} from '../../Utility/utils/UI';
import {Color} from '../../Utility/utils/Color';
import {carouselListData} from '../../Utility/utils/constant';
import {AllScreenList, SwipeStackProps} from '../../Navigation/NavigationProps';

const SwipeCarousel = ({
  navigation,
}: SwipeStackProps<AllScreenList.SwipeCarousel>) => {
  return (
    <View style={styles.view}>
      <Header navigation={navigation} bgColor={Color.white} />
      <View style={{paddingHorizontal: wp(10)}}>
        <HeadingText
          navigation={navigation}
          text="Swipe Carousel"
          color={Color.black}
        />
      </View>
      <ScrollView>
        <View style={styles.scrollView}>
          <NormalParallax data={carouselListData} />
          <AdvancedParallax data={carouselListData} />
        </View>
      </ScrollView>
    </View>
  );
};

export default SwipeCarousel;

const styles = StyleSheet.create({
  view: {
    height: hp(740),
    backgroundColor: Color.white,
  },
  scrollView: {
    height: hp(740),
    paddingBottom: hp(20),
    paddingHorizontal: wp(10),
    backgroundColor: Color.lightGray,
  },
});
