import {Gesture} from 'react-native-gesture-handler';
import {
  useAnimatedStyle,
  withSpring,
  SharedValue,
  runOnJS,
} from 'react-native-reanimated';

interface Props {
  yPosition: SharedValue<number>;
  contentHeight: SharedValue<number>;
  setReset?: any;
}

export const useVerticalSwipeToClose = ({
  yPosition,
  contentHeight,
  setReset,
}: Props) => {
  const swipeToCloseGestureHandler = Gesture.Pan()
    .onStart((ctx: any) => {
      ctx.absoluteY = yPosition.value;
    })
    .onUpdate((ctx: any) => {
      if (ctx.translationY < 0) {
        // Drag up
        yPosition.value = ctx.translationY / 5;
      } else {
        // Drag down
        yPosition.value = ctx.translationY;
      }
    })
    .onEnd((ctx: any) => {
      const shouldClose = yPosition.value + 0.5 * ctx.velocityY > 300;
      const animateTo = shouldClose ? contentHeight.value : 0;

      // UI Thread에서 함수 호출할 때 runOnJS 사용
      runOnJS(setReset)(0);
      yPosition.value = withSpring(animateTo, {
        damping: 5,
        overshootClamping: true,
      });
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor:
        yPosition.value > 0 ? 'rgba(0,0,0,0)' : 'rgba(0,0,0,0.4)',
      transform: [{translateY: yPosition.value}],
    };
  });

  return {swipeToCloseGestureHandler, animatedStyle};
};
