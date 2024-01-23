import React, {useCallback, useState} from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
import FastImage from 'react-native-fast-image';
import {interpolate} from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';
import {hp} from '../../Utility/utils/UI';
import {screenWidth} from '../../Utility/utils/UI';
import {PretendardRegular} from '../../Utility/utils/CustomFont';
import {Color} from '../../Utility/utils/Color';

const AdvancedParallax = ({data}: any) => {
  const [loading, setLoading] = useState(true);
  const animationStyle = useCallback((value: number) => {
    'worklet';
    const zIndex = interpolate(value, [-1, 0, 1], [10, 20, 30]);
    const translateX = interpolate(
      value,
      [-2, 0, 1],
      [-screenWidth, 0, screenWidth],
    );

    return {
      transform: [{translateX}],
      zIndex,
    };
  }, []);

  return (
    <View>
      <PretendardRegular
        size={hp(16)}
        style={{marginBottom: hp(10)}}
        children="- Advanced-Parallax"
      />
      <Carousel
        loop={true}
        style={styles.carousel}
        width={screenWidth}
        data={data}
        renderItem={({item}: any) => {
          return (
            <FastImage
              key={item.id}
              style={styles.image}
              source={item.image}
              onLoadEnd={() => setLoading(false)}
              onProgress={() => (
                <ActivityIndicator
                  size="large"
                  color="yellowgreen"
                  style={styles.indicator}
                  animating={loading}
                />
              )}
            />
          );
        }}
        customAnimation={animationStyle}
        scrollAnimationDuration={1200}
      />
    </View>
  );
};

export default AdvancedParallax;

const styles = StyleSheet.create({
  carousel: {height: hp(200)},
  indicator: {
    width: screenWidth - 25,
    height: hp(200),
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Color.lightGray,
  },
  image: {
    width: screenWidth - 25,
    height: hp(200),
  },
});
