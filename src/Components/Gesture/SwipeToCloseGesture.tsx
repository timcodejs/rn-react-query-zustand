import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {wp, hp} from '../../Utility/utils/UI';
import {Color} from '../../Utility/utils/Color';
import {screenHeight} from '../../Utility/utils/UI';
import {PretendardBold} from '../../Utility/utils/CustomFont';

const SwipeToCloseGesture = () => {
  const yPosition = useSharedValue(screenHeight);
  const contentHeight = useSharedValue(screenHeight);

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

  return (
    <>
      <TouchableOpacity
        style={styles.btn}
        onPress={() =>
          (yPosition.value = withSpring(0, {
            damping: 15,
            overshootClamping: true,
          }))
        }>
        <PretendardBold size={wp(17)} color={Color.white} children="Show" />
      </TouchableOpacity>
      <GestureDetector gesture={swipeToCloseGestureHandler}>
        <Animated.View style={[styles.box, animatedStyle]}>
          <View style={styles.inner}>
            <View style={styles.handle} />
          </View>
        </Animated.View>
      </GestureDetector>
    </>
  );
};

export default SwipeToCloseGesture;

const styles = StyleSheet.create({
  btn: {
    width: wp(80),
    height: hp(50),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: wp(5),
    backgroundColor: 'green',
  },
  box: {
    width: wp(360),
    height: screenHeight,
    position: 'absolute',
    backgroundColor: Color.white,
  },
  inner: {
    width: wp(360),
    height: screenHeight,
    marginTop: 120,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: Color.gray,
    backgroundColor: Color.white,
  },
  handle: {
    width: 50,
    height: 6,
    marginTop: 13,
    borderRadius: 10,
    alignSelf: 'center',
    backgroundColor: Color.navy,
  },
});
