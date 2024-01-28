import {useCallback, useEffect} from 'react';
import {
  CameraCaptureError,
  CameraDevice,
  CameraDeviceFormat,
  CameraRuntimeError,
  TakePhotoOptions,
  useCameraDevice,
  useCameraFormat,
  useCodeScanner,
} from 'react-native-vision-camera';
import Gallery from '../../Components/Camera/Gallery';

interface Props {
  camera: any;
  deviceMode: CameraDevice['position'];
  isFlash: TakePhotoOptions['flash'];
  photoHDR: CameraDeviceFormat['supportsPhotoHdr'];
  isVideoStart: any;
  setAlbumData: (e: any[]) => void;
}

export const CameraViewModel = ({
  camera,
  deviceMode,
  isFlash,
  photoHDR,
  isVideoStart,
  setAlbumData,
}: Props) => {
  const {getAlbums, savePicture} = Gallery();

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
          onRecordingFinished: (video: any) =>
            console.log('video recode', video),
          onRecordingError: (error: Error) => console.error(error),
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

  return {
    device,
    codeScanner,
    format,
    onError,
    takePicturePress,
    takeVideoPress,
  };
};
