import {Platform} from 'react-native';
import {
  useCameraPermission,
  useMicrophonePermission,
} from 'react-native-vision-camera';
import {request, PERMISSIONS} from 'react-native-permissions';
import Gallery from '../../Components/Camera/Gallery';

export const useCamPermissions = () => {
  // 안드로이드 앨범 권한
  const {hasAndroidPermission} = Gallery();

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

  const checkPermission = async () => {
    let cameraFlag = false;
    let audioFlag = false;

    // 카메라 권한 요청
    if (!hasCameraPermission) {
      await requestCameraPermission().then(res => {
        cameraFlag = res;
      });
    } else {
      cameraFlag = hasCameraPermission;
    }

    // 오디오 권한 요청
    if (!hasMicrophonePermission) {
      await requestMicrophonePermission().then(res => {
        audioFlag = res;
      });
    } else {
      audioFlag = hasMicrophonePermission;
    }

    // 앨범 권한 요청
    if (Platform.OS === 'ios') {
      await request(PERMISSIONS.IOS.PHOTO_LIBRARY).then(result => {
        if (result === 'granted' || result === 'limited') {
          //...
        }
      });
    } else if (Platform.OS === 'android') {
      await hasAndroidPermission().then(result => {
        if (result) {
          //...
        }
      });
    }

    return cameraFlag && audioFlag;
  };

  return {checkPermission};
};
