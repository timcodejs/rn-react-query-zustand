import React from 'react';
import {View} from 'react-native';
import AdvancedParallax from '../Carousel/AdvancedParallax';

const data = [
  {id: 1, image: require('../../Assets/images/slide1.jpeg')},
  {id: 2, image: require('../../Assets/images/slide2.jpeg')},
  {id: 3, image: require('../../Assets/images/slide3.jpeg')},
  {id: 4, image: require('../../Assets/images/slide4.jpeg')},
];

const SwipeCarouselGesture = () => {
  return (
    <View>
      <AdvancedParallax data={data} />
    </View>
  );
};

export default SwipeCarouselGesture;
