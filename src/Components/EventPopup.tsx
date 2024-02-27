import React, {useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {Color} from '../Utility/utils/Color';
import {IconCrossIcon} from '../Utility/utils/SVG';
import {PretendardBold} from '../Utility/utils/CustomFont';
import {hp, screenHeight, screenWidth} from '../Utility/utils/UI';

interface Props {
  setIsPopup: (e: boolean) => void;
}

const EventPopup = ({setIsPopup}: Props) => {
  const yPosition = useSharedValue(screenHeight);

  useEffect(() => {
    const time = setTimeout(() => {
      yPosition.value = withSpring(0, {
        damping: 20,
        overshootClamping: true,
      });
    }, 300);
    return () => clearTimeout(time);
  }, []);

  const aninatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: yPosition.value}],
    };
  });

  const handleClose = () => {
    yPosition.value = withSpring(screenHeight, {
      damping: 5,
      overshootClamping: true,
    });
    const time = setTimeout(() => {
      setIsPopup(false);
    }, 100);

    return () => clearTimeout(time);
  };

  return (
    <View style={styles.wrap}>
      <TouchableOpacity style={styles.void} onPress={handleClose} />
      <Animated.View style={[styles.view, aninatedStyle]}>
        <TouchableOpacity style={styles.btn} onPress={handleClose}>
          <IconCrossIcon
            color={Color.black}
            width={30}
            height={30}
            style={styles.icon}
          />
        </TouchableOpacity>
        <View style={styles.inner}>
          <PretendardBold children={'Test Popup'} />
        </View>
      </Animated.View>
    </View>
  );
};

export default EventPopup;

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    zIndex: 9999999,
    width: screenWidth,
    height: screenHeight,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  void: {
    width: screenWidth,
    height: screenHeight,
  },
  view: {
    position: 'absolute',
    bottom: 0,
    width: screenWidth,
    height: hp(250),
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: Color.white,
  },
  inner: {
    alignItems: 'center',
  },
  btn: {width: 30, height: 30},
  icon: {margin: 10},
});
