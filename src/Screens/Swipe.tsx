import React from 'react';
import styled from 'styled-components/native';
import Header from '../Components/Header';
import {hp, wp} from '../Utility/utils/UI';
import {Color} from '../Utility/utils/Color';
import {PretendardBold} from '../Utility/utils/CustomFont';
import {AllScreenList, SwipeStackProps} from '@Navigation/NavigationProps';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {Dimensions, StyleSheet, View} from 'react-native';

const {height} = Dimensions.get('window');

const Swipe = ({navigation}: SwipeStackProps<AllScreenList.Swipe>) => {
  const yPosition = useSharedValue(height);
  const contentHeight = useSharedValue(height);

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
    <SocialView>
      <Header navigation={navigation} />
      <PretendardBold
        size={hp(20)}
        style={{marginTop: hp(20), marginBottom: hp(20)}}
        children="스와이프"
      />
      <LogoutBtn
        onPress={() =>
          (yPosition.value = withSpring(0, {
            damping: 15,
            overshootClamping: true,
          }))
        }>
        <PretendardBold size={wp(17)} color={Color.white} children="Show" />
      </LogoutBtn>
      <GestureDetector gesture={swipeToCloseGestureHandler}>
        <Animated.View style={[Container.box, animatedStyle]}>
          <View style={Container.inner}>
            <View
              style={{
                width: 50,
                height: 6,
                alignSelf: 'center',
                backgroundColor: Color.navy,
                borderRadius: 10,
                marginTop: 13,
              }}
            />
          </View>
        </Animated.View>
      </GestureDetector>
    </SocialView>
  );
};

export default Swipe;

const SocialView = styled.View`
  height: ${hp(740)}px;
  padding-left: ${hp(10)}px;
  padding-right: ${hp(10)}px;
  background-color: ${Color.white};
`;

const LogoutBtn = styled.TouchableOpacity`
  width: ${wp(80)}px;
  height: ${hp(50)}px;
  align-items: center;
  justify-content: center;
  border-radius: ${wp(5)}px;
  background-color: green;
`;

const Container = StyleSheet.create({
  box: {
    position: 'absolute',
    height: height,
    width: wp(360),
    backgroundColor: Color.white,
  },
  inner: {
    height: height,
    width: wp(360),
    marginTop: 120,
    backgroundColor: Color.white,
    borderWidth: 1,
    borderColor: Color.gray,
    borderRadius: 20,
  },
});
