import {useCallback, useEffect} from 'react';
import {
  CameraCaptureError,
  CameraDevice,
  CameraDeviceFormat,
  CameraRuntimeError,
  FormatFilter,
  TakePhotoOptions,
  useCameraDevice,
  useCameraFormat,
  useCodeScanner,
} from 'react-native-vision-camera';
import Sound from 'react-native-sound';
import Gallery from '../../Components/Camera/Gallery';
import {screenHeight, screenWidth} from '../../Utility/utils/UI';

interface Props {
  camera: any;
  deviceMode: CameraDevice['position'];
  isFPS: FormatFilter['fps'];
  isFlash: TakePhotoOptions['flash'];
  photoHDR: CameraDeviceFormat['supportsPhotoHdr'];
  isVideoStart: any;
  isFocused: any;
  setAlbumData: (e: any[]) => void;
}

Sound.setCategory('Playback');
const start_recording = new Sound(
  'Start_Recording_Sound_Effect.mp3',
  Sound.MAIN_BUNDLE,
);
const stop_recording = new Sound(
  'Stop_Recording_Sound_Effect.mp3',
  Sound.MAIN_BUNDLE,
);

export const CameraViewModel = ({
  camera,
  deviceMode,
  isFPS,
  isFlash,
  photoHDR,
  isVideoStart,
  isFocused,
  setAlbumData,
}: Props) => {
  const {getAlbums, savePicture} = Gallery();
  const screenAspectRatio = screenWidth / screenHeight;

  // 앨범 데이터 get
  useEffect(() => {
    if (isFocused) {
      getAlbumsHandler();
    }
  }, [isFocused]);

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
    {fps: isFPS},
    {photoHdr: photoHDR},
    {videoHdr: photoHDR},
    {photoResolution: 'max'},
    {videoResolution: 'max'},
    {photoAspectRatio: screenAspectRatio},
    {videoAspectRatio: screenAspectRatio},
    {videoStabilizationMode: 'cinematic-extended'},
    {pixelFormat: 'native'},
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
        enableAutoStabilization: true, // 사진 캡쳐 스테빌라이져
      });

      // 사진 저장
      await savePicture({tag: photo.path, type: 'photo', album: ''});
      // 앨범 업데이트
      getAlbumsHandler();
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
        start_recording.play();
        await camera.current?.startRecording({
          flash: isFlash,
          videoCodec: 'h265',
          fileType: 'mp4',
          onRecordingFinished: async (video: any) => {
            console.log('video recode', video);
            // 비디오 저장
            await savePicture({tag: video.path, type: 'video', album: ''});
          },
          onRecordingError: (error: Error) => console.error(error),
        });
      } else {
        stop_recording.play();
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

  const getAlbumsHandler = () => {
    getAlbums().then(res => {
      setAlbumData(res);
    });
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
