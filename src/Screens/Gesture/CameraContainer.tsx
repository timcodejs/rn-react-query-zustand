import React, {useRef, useState} from 'react';
import {View, Text, StyleSheet, Button, Linking} from 'react-native';
import {
  Camera,
  useCameraPermission,
  useMicrophonePermission,
  TakePhotoOptions,
  CameraDeviceFormat,
  CameraDevice,
} from 'react-native-vision-camera';
import {useIsFocused} from '@react-navigation/native';
import Reanimated from 'react-native-reanimated';
import {GestureDetector} from 'react-native-gesture-handler';
import {Color} from '../../Utility/utils/Color';
import Albums from '../../Components/Camera/Albums';
import CaptureMode from '../../Components/Camera/CaptureMode';
import ZoomMode from '../../Components/Camera/ZoomMode';
import PhotoVideoMode from '../../Components/Camera/PhotoVideoMode';
import DeviceMode from '../../Components/Camera/DeviceMode';
import CameraButton from '../../Components/Camera/CameraButton';
import CameraAnimation from '../../Components/Animations/CameraAnimation';
import {CameraViewModel} from '../../Business/services/CameraViewModel';
import {useBottomNaviDisplay} from '../../Business/hooks/useBottomNaviDisplay';
import {AllScreenList, SwipeStackProps} from '../../Navigation/NavigationProps';

Reanimated.addWhitelistedNativeProps({
  zoom: true,
});
const ReanimatedCamera = Reanimated.createAnimatedComponent(Camera);

const CameraContainer = ({
  navigation,
}: SwipeStackProps<AllScreenList.Camera>) => {
  const camera = useRef<Camera>(null);
  const [cameraMode, setCameraMode] = useState('photo');
  const [albumData, setAlbumData] = useState<any[]>([]);
  const [zoomRatio, setZoomRatio] = useState(1.0);
  const [deviceMode, setDeviceMode] =
    useState<CameraDevice['position']>('back');
  const [photoHDR, setPhotoHDR] =
    useState<CameraDeviceFormat['supportsPhotoHdr']>(false);
  const [isFlash, setIsFlash] = useState<TakePhotoOptions['flash']>('off');
  const [isTriger, setIsTriger] = useState({triger: false, text: ''});

  const isFocused = useIsFocused();
  // bottom navi display
  useBottomNaviDisplay(navigation, isFocused);
  // 카메라 권한
  const {hasPermission: hasCameraPermission} = useCameraPermission();
  // 오디오 권한
  const {hasPermission: hasMicrophonePermission} = useMicrophonePermission();
  // 카메라 애니메이션
  const {
    isVideoStart,
    gestureTap,
    focusAnimatedProps,
    focusLineAnimatedProps,
    gestureTapVideo,
    videoAnimatedProps,
  } = CameraAnimation(camera);
  // 카메라 기능
  const {
    device,
    codeScanner,
    format,
    onError,
    takePicturePress,
    takeVideoPress,
  } = CameraViewModel({
    camera,
    deviceMode,
    isFlash,
    photoHDR,
    isVideoStart,
    setAlbumData,
  });

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
          device={device}
          format={format}
          zoom={zoomRatio}
          style={StyleSheet.absoluteFill}
          photo={hasCameraPermission}
          video={hasCameraPermission}
          audio={hasMicrophonePermission}
          onError={onError}
          isActive={isFocused}
          codeScanner={codeScanner}
          resizeMode="cover"
          enableFpsGraph={true}
          enableZoomGesture={true}
          enableHighQualityPhotos={true}
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
