import React, {useCallback, useEffect, useRef, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {
  Point,
  Camera,
  useCameraDevice,
  useCameraPermission,
  useMicrophonePermission,
  useCameraFormat,
  useCodeScanner,
  CameraRuntimeError,
  CameraCaptureError,
  TakePhotoOptions,
  PhotoFile,
  VideoFile,
  CameraDeviceFormat,
  CameraDevice,
} from 'react-native-vision-camera';
import {useIsFocused} from '@react-navigation/native';
import Reanimated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import Animated from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {hp, wp} from '../../Utility/utils/UI';
import {Color} from '../../Utility/utils/Color';
import {
  IconFlashOnIcon,
  IconFlashOffIcon,
  IconHDROnIcon,
  IconHDROffIcon,
  IconReuseIcon,
} from '../../Utility/utils/SVG';
import {PretendardBold} from '../../Utility/utils/CustomFont';
import ToastTopMessage from '../../Components/Animations/ToastTopMessage';
import {AllScreenList, SwipeStackProps} from '../../Navigation/NavigationProps';
import hasPermission from '../../Components/Camera/hasAndroidPermission';

Reanimated.addWhitelistedNativeProps({
  zoom: true,
});
const ReanimatedCamera = Reanimated.createAnimatedComponent(Camera);

const CameraContainer = ({
  navigation,
}: SwipeStackProps<AllScreenList.Camera>) => {
  const isFocused = useIsFocused();
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
  const camera = useRef<Camera>(null);
  const [cameraMode, setCameraMode] = useState('photo');
  const [photoFile, setPhotoFile] = useState<PhotoFile>();
  const [videoFile, setVideoFile] = useState<VideoFile>();
  const [deviceMode, setDeviceMode] =
    useState<CameraDevice['position']>('back');
  const [photoHDR, setPhotoHDR] =
    useState<CameraDeviceFormat['supportsPhotoHdr']>(false);
  const [isFlash, setIsFlash] = useState<TakePhotoOptions['flash']>('auto');
  const [isTriger, setIsTriger] = useState({triger: false, text: ''});

  const {savePicture} = hasPermission();

  // 카메라 권한
  const {
    hasPermission: hasCameraPermission,
    requestPermission: requestCameraPermission,
  } = useCameraPermission();
  // 오디오 권한
  const {
    hasPermission: hasMicrophonePermission,
    requestPermission: requestMicrophonePermission,
  } = useMicrophonePermission();

  useEffect(() => {
    if (!hasCameraPermission) {
      requestCameraPermission().then(res => {
        console.log('camera permission', res);
        if (res === false) {
          // navigation.goBack();
        }
      });
    }

    if (!hasMicrophonePermission) {
      requestMicrophonePermission().then(res => {
        console.log('microphone permission', res);
        if (res === false) {
          // navigation.goBack();
        }
      });
    }
  }, [hasCameraPermission, hasMicrophonePermission]);

  // device setting
  const device: any = useCameraDevice(deviceMode, {
    physicalDevices: [
      'wide-angle-camera',
      'ultra-wide-angle-camera',
      'telephoto-camera',
    ],
  });

  // qr Code 스캐너
  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: codes => {
      console.log(`Scanned ${codes.length} codes!`);
    },
  });

  // format
  const format: any = useCameraFormat(device, [
    {photoHdr: photoHDR},
    {videoStabilizationMode: 'cinematic-extended'},
  ]);

  // 비디오 스테빌라이저
  const supportsVideoStabilization =
    format?.videoStabilizationModes?.includes('cinematic-extended');

  // 포커스 인
  const focus = useCallback((point: Point) => {
    const c = camera.current;
    if (c == null) return;
    c.focus(point);
  }, []);

  // 포커스 아웃
  const timeout = useCallback(() => {
    const time = setTimeout(() => {
      focusOpacity.value = 0;
    }, 1800);

    return () => clearTimeout(time);
  }, []);

  // 포커스 제스쳐
  const gestureTap = Gesture.Tap()
    .onStart(() => {
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
        -1,
        true,
      );
      runOnJS(timeout)();
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

  // 바텀 네비 display
  useEffect(() => {
    if (isFocused) {
      navigation.getParent().setOptions({tabBarStyle: {display: 'none'}});
    } else {
      navigation.getParent().setOptions({
        tabBarStyle: {display: 'flex', backgroundColor: Color.black},
      });
    }
  }, [isFocused]);

  // error
  const onError = useCallback((error: CameraRuntimeError) => {
    console.error(error);
  }, []);

  // 사진 찍기
  const takePicturePress = async () => {
    try {
      const photo: any = await camera.current?.takePhoto({
        qualityPrioritization: 'balanced', // 이미지 품질 'quality' | 'balanced' | 'speed'
        flash: isFlash, // 플래시 'on' | 'off' | 'auto'
        enableShutterSound: true, // 셔터음
        enableAutoRedEyeReduction: true, // 적목감소
        enableAutoStabilization: false, // 사진 캡쳐 스테빌라이져
      });
      console.log('photo', photo);
      // const result = await fetch(`file://${photo.path}`);
      // const data = await result.blob();
    } catch (e) {
      if (e instanceof CameraCaptureError) {
        switch (e.code) {
          case 'capture/file-io-error':
            console.error('Failed to write photo to disk!');
            break;
          default:
            console.error(e);
            break;
        }
      }
    }
  };

  // 비디오 촬영
  const takeVideoPress = async () => {
    try {
      if (isVideoStart.value) {
        await camera.current?.startRecording({
          videoCodec: 'h265',
          fileType: 'mp4',
          onRecordingFinished: video => console.log('video recode', video),
          onRecordingError: error => console.error(error),
        });
      } else {
        await camera.current?.stopRecording();
      }
    } catch (e) {
      if (e instanceof CameraCaptureError) {
        switch (e.code) {
          case 'capture/file-io-error':
            console.error('Failed to write video to disk!');
            break;
          default:
            console.error(e);
            break;
        }
      }
    }
  };

  if (device == null) {
    return <Text>Camera device not found</Text>;
  }
  return (
    <View style={{flex: 1, backgroundColor: Color.black}}>
      <GestureDetector gesture={gestureTap}>
        <ReanimatedCamera
          ref={camera}
          photo={true}
          video={true}
          audio={true}
          device={device}
          format={format}
          onError={onError}
          isActive={isFocused}
          codeScanner={codeScanner}
          style={StyleSheet.absoluteFill}
          photoHdr={format.supportsPhotoHdr}
          enableZoomGesture={true}
          // videoStabilizationMode={supportsVideoStabilization}
        />
      </GestureDetector>
      <Animated.View style={[styles.focus, focusAnimatedProps]} />
      <ToastTopMessage
        text={isTriger.text}
        triger={isTriger.triger}
        onClose={setIsTriger}
      />
      <TouchableOpacity
        style={[styles.icon, styles.flash]}
        onPress={() => {
          setIsFlash(isFlash === 'on' ? 'off' : 'on');
          setIsTriger({
            triger: true,
            text: isFlash === 'on' ? 'Flash OFF' : 'Flash ON',
          });
        }}>
        {isFlash === 'on' ? (
          <IconFlashOnIcon color={Color.white} width={wp(20)} height={hp(20)} />
        ) : (
          <IconFlashOffIcon
            color={Color.white}
            width={wp(20)}
            height={hp(20)}
          />
        )}
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.icon, styles.hdr]}
        onPress={() => {
          setPhotoHDR(photoHDR ? false : true);
          setIsTriger({
            triger: true,
            text: photoHDR ? 'HDR OFF' : 'HDR ON',
          });
        }}>
        {photoHDR ? (
          <IconHDROnIcon color={Color.white} width={wp(30)} height={hp(30)} />
        ) : (
          <IconHDROffIcon color={Color.white} width={wp(30)} height={hp(30)} />
        )}
      </TouchableOpacity>
      <View style={styles.mode}>
        <TouchableOpacity onPress={() => setCameraMode('photo')}>
          <PretendardBold
            color={cameraMode === 'photo' ? Color.yellow : Color.white}
            style={{paddingHorizontal: wp(10)}}
            children="사진"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setCameraMode('video')}>
          <PretendardBold
            color={cameraMode === 'video' ? Color.yellow : Color.white}
            style={{paddingHorizontal: wp(10)}}
            children="비디오"
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={[styles.reuse]}
        onPress={() => {
          if (deviceMode === 'back') {
            setDeviceMode('front');
          } else {
            setDeviceMode('back');
          }
        }}>
        <IconReuseIcon color={Color.white} width={wp(30)} height={hp(30)} />
      </TouchableOpacity>
      {cameraMode === 'photo' ? (
        <TouchableOpacity style={styles.picture} onPress={takePicturePress}>
          <View style={styles.circle} />
        </TouchableOpacity>
      ) : (
        <GestureDetector gesture={gestureTapVideo}>
          <Animated.View style={[styles.video, videoAnimatedProps]}>
            <TouchableOpacity onPress={takeVideoPress}>
              <View style={styles.circle2} />
            </TouchableOpacity>
          </Animated.View>
        </GestureDetector>
      )}
    </View>
  );
};

export default CameraContainer;

const styles = StyleSheet.create({
  mode: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    position: 'absolute',
    bottom: 150,
  },
  picture: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    position: 'absolute',
    bottom: 50,
    width: 75,
    height: 75,
    borderRadius: 75,
    backgroundColor: Color.white,
  },
  video: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    position: 'absolute',
    bottom: 50,
    width: 75,
    height: 75,
    borderRadius: 75,
    backgroundColor: 'red',
  },
  circle: {
    width: 65,
    height: 65,
    borderWidth: 2,
    borderColor: Color.gray,
    borderRadius: 65,
  },
  circle2: {
    width: 75,
    height: 75,
    borderWidth: 4,
    borderColor: Color.white,
    borderRadius: 75,
  },
  icon: {
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 20,
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: Color.white,
    borderRadius: 65,
  },
  flash: {
    top: 70,
  },
  hdr: {
    top: 120,
  },
  reuse: {
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 60,
    right: 30,
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  focus: {
    position: 'absolute',
    width: 100,
    height: 100,
    opacity: 0,
  },
});
