import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {hp, wp} from '../../Utility/utils/UI';
import {Color} from '../../Utility/utils/Color';
import {screenHeight} from '../../Utility/utils/UI';
import {
  PretendardBold,
  PretendardRegular,
} from '../../Utility/utils/CustomFont';

interface Props {
  data: any;
  yPosition: any;
}

const ItemSwipeToCloseGesture = ({data, yPosition}: Props) => {
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

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: yPosition.value > 0 ? 'rgba(0,0,0,0)' : 'rgba(0,0,0,0.4)',
    transform: [{translateY: yPosition.value}],
  }));

  return (
    <GestureDetector gesture={swipeToCloseGestureHandler}>
      <Animated.View style={[styles.box, animatedStyle]}>
        <View style={styles.inner}>
          <View style={styles.handle} />
          <View style={styles.align}>
            <FastImage source={data?.itemImage} style={styles.image} />
            <PretendardBold
              size={hp(19)}
              children={data?.name}
              style={{marginBottom: hp(10), textAlign: 'center'}}
            />
            <PretendardRegular
              size={hp(16)}
              children={`₩ ${data?.price.toLocaleString()}`}
            />
          </View>
        </View>
      </Animated.View>
    </GestureDetector>
  );
};

export default ItemSwipeToCloseGesture;

const styles = StyleSheet.create({
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
  align: {
    marginTop: hp(20),
    alignItems: 'center',
  },
  image: {
    width: wp(250),
    height: hp(250),
    marginBottom: hp(10),
  },
});
