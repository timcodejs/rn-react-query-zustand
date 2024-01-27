import React, {useCallback, useEffect, useRef, useState} from 'react';
import {View, Text, StyleSheet, Button, Linking} from 'react-native';
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
  CameraDeviceFormat,
  CameraDevice,
} from 'react-native-vision-camera';
import {useIsFocused} from '@react-navigation/native';
import Reanimated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';

import {Color} from '../../Utility/utils/Color';
import Gallery from '../../Components/Camera/Gallery';
import Albums from '../../Components/Camera/Albums';
import CaptureMode from '../../Components/Camera/CaptureMode';
import ZoomMode from '../../Components/Camera/ZoomMode';
import PhotoVideoMode from '../../Components/Camera/PhotoVideoMode';
import DeviceMode from '../../Components/Camera/DeviceMode';
import CameraButton from '../../Components/Camera/CameraButton';
import {AllScreenList, SwipeStackProps} from '../../Navigation/NavigationProps';

Reanimated.addWhitelistedNativeProps({
  zoom: true,
});
const ReanimatedCamera = Reanimated.createAnimatedComponent(Camera);

const CameraContainer = ({
  navigation,
}: SwipeStackProps<AllScreenList.Camera>) => {
  const isFocused = useIsFocused();
  const isVideoStart = useSharedValue(false);
  const {getAlbums, savePicture} = Gallery();
  const {hasPermission: hasCameraPermission} = useCameraPermission();
  const {hasPermission: hasMicrophonePermission} = useMicrophonePermission();
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
  const [albumData, setAlbumData] = useState<any[]>([]);
  const [zoomRatio, setZoomRatio] = useState(1.0);
  const [deviceMode, setDeviceMode] =
    useState<CameraDevice['position']>('back');
  const [photoHDR, setPhotoHDR] =
    useState<CameraDeviceFormat['supportsPhotoHdr']>(false);
  const [isFlash, setIsFlash] = useState<TakePhotoOptions['flash']>('auto');
  const [isTriger, setIsTriger] = useState({triger: false, text: ''});

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

  // 앨범 데이터 get
  useEffect(() => {
    getAlbums().then(res => {
      setAlbumData(res);
    });
  }, []);

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
    {
      fps: 60,
      photoHdr: photoHDR,
      photoResolution: 'max',
      videoResolution: 'max',
      videoStabilizationMode: 'cinematic-extended',
    },
  ]);

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

      // 사진 저장
      savePicture({tag: photo.path, type: 'photo', album: ''});
      // 앨범 업데이트
      getAlbums().then(res => {
        setAlbumData(res);
      });
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

  if (!hasCameraPermission) {
    return (
      <View style={{flex: 1, backgroundColor: Color.black}}>
        <Text
          style={{
            color: Color.white,
            alignSelf: 'center',
            marginTop: 100,
            marginBottom: 20,
          }}>
          Please allow camera permission
        </Text>
        <Button
          title="설정으로 이동"
          onPress={() => {
            Linking.openSettings();
          }}
        />
      </View>
    );
  }
  if (device == null) {
    return (
      <View style={{flex: 1, backgroundColor: Color.black}}>
        <Text style={{color: Color.white, alignSelf: 'center', marginTop: 100}}>
          Camera device not found
        </Text>
      </View>
    );
  }
  return (
    <View style={{flex: 1, backgroundColor: Color.black}}>
      {/* camera area */}
      <GestureDetector gesture={gestureTap}>
        <ReanimatedCamera
          ref={camera}
          photo={hasCameraPermission}
          video={hasCameraPermission}
          audio={hasMicrophonePermission}
          device={device}
          format={format}
          onError={onError}
          isActive={isFocused}
          codeScanner={codeScanner}
          style={StyleSheet.absoluteFill}
          photoHdr={format.supportsPhotoHdr}
          enableZoomGesture={true}
          zoom={zoomRatio}
        />
      </GestureDetector>
      {/* capture mode */}
      <CaptureMode
        isTriger={isTriger}
        setIsTriger={setIsTriger}
        isFlash={isFlash}
        setIsFlash={setIsFlash}
        photoHDR={photoHDR}
        setPhotoHDR={setPhotoHDR}
        focusAnimatedProps={focusAnimatedProps}
        focusLineAnimatedProps={focusLineAnimatedProps}
      />
      {/* zoom mode */}
      <ZoomMode zoomRatio={zoomRatio} setZoomRatio={setZoomRatio} />
      {/* photo/video mode */}
      <PhotoVideoMode cameraMode={cameraMode} setCameraMode={setCameraMode} />
      {/* device mode */}
      <DeviceMode deviceMode={deviceMode} setDeviceMode={setDeviceMode} />
      {/* camera button */}
      <CameraButton
        cameraMode={cameraMode}
        takePicturePress={takePicturePress}
        takeVideoPress={takeVideoPress}
        videoAnimatedProps={videoAnimatedProps}
        gestureTapVideo={gestureTapVideo}
      />
      {/* Albums */}
      <Albums albumData={albumData} />
    </View>
  );
};

export default CameraContainer;
