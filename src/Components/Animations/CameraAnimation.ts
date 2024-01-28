import {useCallback} from 'react';
import {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import {Color} from '../../Utility/utils/Color';
import {Point} from 'react-native-vision-camera';
import {Gesture} from 'react-native-gesture-handler';

const CameraAnimation = (camera: any) => {
  const isVideoStart = useSharedValue(false);
  const w = useSharedValue(75);
  const h = useSharedValue(75);
  const rad = useSharedValue(75);
  const bottom = useSharedValue(50);
  const focusX = useSharedValue(0);
  const focusY = useSharedValue(0);
  const focusBorder = useSharedValue(0);
  const focusColor = useSharedValue(Color.yellow);
  const focusOpacity = useSharedValue(0);

  // 포커스 인
  const focus = useCallback((point: Point) => {
    const c = camera.current;
    if (c == null) return;
    c.focus(point);
  }, []);

  // 포커스 제스쳐
  const gestureTap = Gesture.Tap()
    .onStart(() => {
      focusX.value = -100;
      focusY.value = -100;
      focusColor.value = Color.yellow;
    })
    .onEnd(({x, y}) => {
      runOnJS(focus)({x, y});
      focusX.value = x - 50;
      focusY.value = y - 50;
      focusBorder.value = 2;
      focusOpacity.value = 1;
      focusColor.value = withRepeat(
        withTiming(Color.yellow2, {duration: 200}),
        10,
        true,
      );
      focusOpacity.value = withDelay(2000, withTiming(0.5));
    });

  // 포커스 제스쳐 애니메이션
  const focusAnimatedProps = useAnimatedStyle(() => {
    return {
      top: focusY.value,
      left: focusX.value,
      borderWidth: focusBorder.value,
      opacity: focusOpacity.value,
      borderColor: focusColor.value,
    };
  });
  const focusLineAnimatedProps = useAnimatedStyle(() => {
    return {
      height: focusBorder.value,
      opacity: focusOpacity.value,
      backgroundColor: focusColor.value,
    };
  });

  // 비디오 제스쳐
  const gestureTapVideo = Gesture.Tap()
    .numberOfTaps(1)
    .onEnd((_event, success) => {
      if (success) {
        if (!isVideoStart.value) {
          w.value = 35;
          h.value = 35;
          rad.value = 8;
          bottom.value = 70;
          isVideoStart.value = true;
        } else {
          w.value = 75;
          h.value = 75;
          rad.value = 75;
          bottom.value = 50;
          isVideoStart.value = false;
        }
      }
    });

  // 비디오 제스쳐 애니메이션
  const videoAnimatedProps = useAnimatedStyle(() => {
    return {
      width: withTiming(w.value),
      height: withTiming(h.value),
      bottom: withTiming(bottom.value),
      borderRadius: withTiming(rad.value),
    };
  });

  return {
    isVideoStart,
    gestureTap,
    focusAnimatedProps,
    focusLineAnimatedProps,
    gestureTapVideo,
    videoAnimatedProps,
  };
};

export default CameraAnimation;
