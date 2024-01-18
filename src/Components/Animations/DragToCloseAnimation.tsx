import React from 'react';
import {Platform, StyleSheet} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  withDelay,
  withRepeat,
  useDerivedValue,
} from 'react-native-reanimated';
import {
  Gesture,
  Directions,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import {screenHeight, screenWidth} from '../../Utility/utils/UI';
import {IconArrowIcon, IconCrossIcon} from '../../Utility/utils/SVG';
import {Color} from '../../Utility/utils/Color';
import {PretendardRegular} from '../../Utility/utils/CustomFont';

const closeIconCenter = {x: 50 - screenWidth / 2, y: 15};

const DragToCloseAnimation = () => {
  const w = useSharedValue(100);
  const h = useSharedValue(100);
  const rad = useSharedValue(100);
  const offsetX = useSharedValue(0);
  const offsetY = useSharedValue(0);
  const arrowY = useSharedValue(0);
  const savedBall = useSharedValue({x: 0, y: 0});
  const scaleBall = useSharedValue(1);
  const isBallPressed = useSharedValue(false);
  const isFullScreen = useSharedValue(false);
  const isDirections = useSharedValue(false);

  const ballOpacity = useDerivedValue(() => {
    if (
      offsetY.value > closeIconCenter.y - 35 &&
      offsetX.value < closeIconCenter.x + 35 &&
      offsetX.value > closeIconCenter.x - 35
    ) {
      return withTiming(0.5);
    }
    return withTiming(1);
  });

  const doubleTabGesture = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd((_event, success) => {
      if (success) {
        savedBall.value = {x: 0, y: 0};
        if (!isFullScreen.value) {
          w.value = screenWidth;
          h.value = screenHeight;
          rad.value = 0;
          isFullScreen.value = true;
          offsetX.value = withTiming(0);
          offsetY.value = withTiming(0);
        } else {
          w.value = 100;
          h.value = 100;
          rad.value = 100 / 2;
          isFullScreen.value = false;
          offsetX.value = withSpring(0);
          offsetX.value = withSpring(0);
        }
      }
    });

  const GestureHandler = Gesture.Pan()
    .onUpdate((ctx: any) => {
      isBallPressed.value = true;
      offsetX.value = ctx.translationX + savedBall.value.x;
      offsetY.value = ctx.translationY + savedBall.value.y;
      if (!isFullScreen.value) {
        if (
          offsetY.value > closeIconCenter.y - 55 &&
          offsetX.value < closeIconCenter.x + 55 &&
          offsetX.value > closeIconCenter.x - 55
        ) {
          scaleBall.value = withSpring(0.5);
        } else {
          scaleBall.value = withSpring(1);
        }
      }
    })
    .onEnd(() => {
      savedBall.value = {
        x: offsetX.value,
        y: offsetY.value,
      };
    })
    .onFinalize(() => {
      isBallPressed.value = false;
      if (!isFullScreen.value) {
        if (
          offsetY.value > closeIconCenter.y - 55 &&
          offsetX.value < closeIconCenter.x + 55 &&
          offsetX.value > closeIconCenter.x - 55
        ) {
          isDirections.value = true;
          arrowY.value = withRepeat(withSpring(15), -2);
          offsetX.value = withTiming(closeIconCenter.x);
          offsetY.value = withTiming(closeIconCenter.y);
          offsetX.value = withDelay(500, withSpring(0));
          offsetY.value = withDelay(300, withSpring(closeIconCenter.y + 65));
          savedBall.value = {x: 0, y: 0};
        }
      } else {
        offsetX.value = withTiming(0);
        offsetY.value = withTiming(0);
        savedBall.value = {x: 0, y: 0};
      }
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: withTiming(w.value),
      height: withTiming(h.value),
      borderRadius: withTiming(rad.value),
      transform: [
        {translateX: offsetX.value},
        {translateY: offsetY.value},
        {scale: scaleBall.value},
      ],
      opacity: ballOpacity.value,
    };
  });

  const animatedCloseStyle = useAnimatedStyle(() => {
    return {
      opacity: isBallPressed.value
        ? withTiming(1)
        : withDelay(300, withTiming(0)),
      transform: [
        {scale: withSpring(isBallPressed.value ? 1.2 : 1)},
        {
          translateY: isBallPressed.value
            ? withSpring(0)
            : withDelay(300, withSpring(65)),
        },
      ],
    };
  });

  const directionsArrowStyle = useAnimatedStyle(() => {
    return {
      opacity: isDirections.value ? 1 : 0,
      transform: [{translateY: arrowY.value}],
    };
  });

  const flingGesture = Gesture.Fling()
    .direction(Directions.UP)
    .hitSlop({
      right: -11,
      bottom: Platform.OS === 'ios' ? 70 : 60,
      width: 100,
    })
    .onEnd(() => {
      isDirections.value = false;
      arrowY.value = withSpring(0);
      offsetX.value = withSpring(0);
      offsetY.value = withSpring(0);
      scaleBall.value = 1;
    });

  const composeGesture = Gesture.Exclusive(GestureHandler, doubleTabGesture);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <GestureDetector gesture={flingGesture}>
        <Animated.View style={{flex: 1}}>
          <GestureDetector gesture={composeGesture}>
            <Animated.View style={[styles.ball, animatedStyle]} />
          </GestureDetector>
          <Animated.View style={[styles.close, animatedCloseStyle]}>
            <IconCrossIcon color={Color.black} width={25} height={25} />
          </Animated.View>
          <Animated.View style={[styles.arrow, directionsArrowStyle]}>
            <IconArrowIcon
              width={25}
              height={25}
              color={Color.black}
              style={{transform: [{rotate: '270deg'}]}}
            />
            <PretendardRegular children="UP" />
          </Animated.View>
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

export default DragToCloseAnimation;

const styles = StyleSheet.create({
  ball: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 78 : 72,
    right: -11,
    width: 100,
    height: 100,
    zIndex: 1,
    borderRadius: 50,
    backgroundColor: 'red',
  },
  close: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderRadius: 25,
    borderColor: Color.black,
    position: 'absolute',
    bottom: 100,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrow: {
    position: 'absolute',
    zIndex: 2,
    bottom: 110,
    right: 10,
  },
});
