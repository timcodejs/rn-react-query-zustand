import {Gesture} from 'react-native-gesture-handler';
import {
  useAnimatedStyle,
  withSpring,
  SharedValue,
} from 'react-native-reanimated';

interface Props {
  xPosition: SharedValue<number>;
  contentWidth: SharedValue<number>;
  setReset?: any;
}

export const useHorizontalSwipeToClose = ({xPosition, contentWidth}: Props) => {
  const swipeToCloseGestureHandler = Gesture.Pan()
    .onStart((ctx: any) => {
      ctx.absoluteX = xPosition.value;
    })
    .onUpdate((ctx: any) => {
      if (ctx.translationX < 0) {
        // Drag up
        xPosition.value = ctx.translationX / 5;
      } else {
        // Drag down
        xPosition.value = ctx.translationX;
      }
    })
    .onEnd((ctx: any) => {
      const shouldClose = xPosition.value + 0.5 * ctx.velocityX > 300;
      const animateTo = shouldClose ? contentWidth.value : 0;

      xPosition.value = withSpring(animateTo, {
        damping: 5,
        overshootClamping: true,
      });
    });

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: xPosition.value > 0 ? 'rgba(0,0,0,0)' : 'rgba(0,0,0,0.3)',
    transform: [{translateX: xPosition.value}],
  }));

  return {swipeToCloseGestureHandler, animatedStyle};
};
