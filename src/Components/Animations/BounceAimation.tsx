import React from 'react';
import {StyleSheet} from 'react-native';
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
  SharedValue,
} from 'react-native-reanimated';
import {screenWidth} from '../../Utility/utils/UI';

interface Props {
  ballSize: SharedValue<any>;
  xBallPosition: SharedValue<number>;
  yBallPosition: SharedValue<number>;
  ballOpacity: SharedValue<number>;
}

const BounceAimation = ({
  ballSize,
  xBallPosition,
  yBallPosition,
  ballOpacity,
}: Props) => {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: withTiming(ballSize.value.width, {
        duration: 700,
      }),
      height: withTiming(ballSize.value.height, {
        duration: 700,
      }),
      transform: [
        {
          translateX: withSpring(xBallPosition.value, {
            damping: 100,
          }),
        },
        {
          translateY: withSpring(yBallPosition.value, {
            damping: 14,
          }),
        },
      ],
      opacity: withTiming(ballOpacity.value, {
        duration: 1500,
      }),
    };
  });

  return <Animated.View style={[styles.ball, animatedStyle]} />;
};

export default BounceAimation;

const styles = StyleSheet.create({
  ball: {
    position: 'absolute',
    zIndex: 9999,
    left: (screenWidth - 100) / 2,
    borderRadius: 100,
    backgroundColor: 'red',
  },
});
