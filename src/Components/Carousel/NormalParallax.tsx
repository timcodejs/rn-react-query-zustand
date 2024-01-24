import React, {useState} from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
import FastImage from 'react-native-fast-image';
import Carousel from 'react-native-reanimated-carousel';
import {hp} from '../../Utility/utils/UI';
import {screenWidth} from '../../Utility/utils/UI';
import {PretendardRegular} from '../../Utility/utils/CustomFont';
import {Color} from '../../Utility/utils/Color';

const NormalParallax = ({data}: any) => {
  const [loading, setLoading] = useState(true);

  return (
    <View>
      <PretendardRegular
        size={hp(16)}
        style={{marginVertical: hp(10)}}
        children="- Normal-Parallax (Auto Play)"
      />
      <Carousel
        loop={true}
        autoPlay={true}
        autoPlayInterval={3000}
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
        scrollAnimationDuration={500}
      />
    </View>
  );
};

export default NormalParallax;

const styles = StyleSheet.create({
  carousel: {
    width: screenWidth - 25,
    height: hp(200),
    justifyContent: 'center',
    borderRadius: 10,
  },
  indicator: {
    width: screenWidth - 25,
    height: hp(200),
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Color.lightGray,
  },
  image: {
    height: hp(200),
  },
});
