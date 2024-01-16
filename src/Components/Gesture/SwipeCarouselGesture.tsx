import React from 'react';
import {View} from 'react-native';
import AdvancedParallax from '../Carousel/AdvancedParallax';
import {carouselListData} from '../../Utility/utils/constant';

const SwipeCarouselGesture = () => {
  return (
    <View>
      <AdvancedParallax data={carouselListData} />
    </View>
  );
};

export default SwipeCarouselGesture;
