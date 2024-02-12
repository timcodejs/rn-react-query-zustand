## json-server로 가상 서버 만들기

```
// 설치
yarn global add json-server@0.17.4
```

```
// 프로젝트 루트 경로에서 가상 서버 실행
json-server --watch db.json --port 4000
```

![2024-01-1418 20 08-ezgif com-video-to-gif-converter](https://github.com/timcodejs/rn-react-query-zustand/assets/46413981/46ccc2ba-f446-4208-8fb1-0c019fb6e45a)

## Youtube API 사용하여 Youtube 만들기

- YouTube Data API v3 사용. (GCP 콘솔)

```
// 설치
yarn add react-native-webview react-native-reanimated react-native-gesture-handler
yarn add react-native-youtube-iframe
```

```
// 사용법
import YoutubePlayer from 'react-native-youtube-iframe';

<YoutubePlayer
  height={200} // 비디오 높이 number
  play={true} // 재생 상태 boolean
  videoId={videoId} // 비디오 id string
  initialPlayerParams={{}} // 비디오 속성 obj
  onChangeState={() => {}} // 비디오 상태 fn
/>
```

- initialPlayerParams
  https://lonelycpp.github.io/react-native-youtube-iframecomponent-props#initialplayerparams

![SimulatorScreenRecording-iPhone15Pro-2024-01-14at16 38 30-ezgif com-video-to-gif-converter](https://github.com/timcodejs/rn-react-query-zustand/assets/46413981/954842d8-0109-49a7-84eb-599162ae7d51)

## Camera 만들기

#### 사용한 라이브러리

- react-native-vision-camera (camera function)
- @react-native-camera-roll/camera-roll (get album, save photo...)
- react-native-sound (비디오 촬영 사운드를 위한 mp3 파일 재생용 라이브러리)
- react-native-permissions (다양한 권한 허용을 위한 라이브러리)

#### 적용 방법

1. 카메라 화면에 접근 시 useCameraPermission, useMicrophonePermission 함수를 사용하여 권한 허용 알림 생성 및 허용 시 스택 이동이 되도록 설정.
2. 갤러리 접근은 react-native-permissions 라이브러리를 사용하여 권한 허용 알림 요청 -> 권한을 허용 안함으로 선택하더라도 카메라 스택으로 이동. 카메라 화면 우측 하단의 갤러리 View 화면 클릭 시 접근 허용 알림이 다시 뜨도록 설정.
3. 플래시, HDR, FPS, Zoom Ratio, Device Mode 등 카메라 기본 기능은 react-native-vision-camera 라이브러리를 사용하여 설정. (https://react-native-vision-camera.com/docs/guides)
4. 촬영 시 사진 데이터를 불러올 수 있도록 useRef를 사용하여 카메라를 참조하도록 설정.
   const photo: any = await camera.current?.takePhoto({...option});
5. 응답받은 사진 데이터를 갤러리에 저장할 수 있도록 @react-native-camera-roll/camera-roll 라이브러리의 CameraRoll.saveAsset() 함수를 사용하여 저장하면 실제 디바이스 갤러리에 이미지가 저장 됨.
   (같은 방식으로 비디오 또한 CameraRoll.saveAsset()함수에 옵션으로 type: 'video'로 설정하여 저장)

```
const camera = useRef<Camera>(null);
// device setting
const device = useCameraDevice('back', {
  ...option
});
// format
const format = useCameraFormat(device, [
  ...option
]);

<Camera
  ref={camera}
  device={device}
  format={format}
  photo={true}
  video={true}
  audio={true}
  isActive={true}
  onError={onError}
  style={StyleSheet.absoluteFill}
/>
```

## iOS Dynamic Island 적용 테스트

1. Setup
   - Xcode를 사용하여 info.plist 리스트에 "Supports Live Activities" 항목을 추가하고 "YES" 로 설정.
2. widget extension 생성
   - Xcode > File > New > Target... > Search "Widget Extension" > Name is "OOOLiveActivity"
3. Native Swift Module 생성
   - Project folder Right click > New File > Select Swift > Name is "LiveActivityModule"
4. Native Objective-C Module 생성
   - Project folder Right click > New File > Select Objective-C File > Name is "LiveActivityModule"
5. RN에서 Native Module 사용하기
   ```
   import {NativeModules} from 'react-native'; // import NativeModules
   const {LiveActivity} = NativeModules; // get LiveActivity
   // start Dynamic Island Function
   const onStartActivity = () => {
   if (LiveActivity && typeof LiveActivity.startActivity === 'function') {
   LiveActivity.startActivity();
   } else {
   console.log('LiveActivity not found');
   }
   };
   // end Dynamic Island Function
   const onEndActivity = () => {
   if (LiveActivity && typeof LiveActivity.endActivity === 'function') {
   LiveActivity.endActivity();
   } else {
   console.log('LiveActivity not found');
   }
   };
   ```

## iOS Widget 적용 테스트

1. AppGroup 추가
   - Xcode > TARGETS > Project > Signing & Capabilities > + Capability > App Groups 추가
   - group. name 적기 (ex. group.com.project.widget)
   - Xcode > TARGETS > LiveActivityExtension > Signing & Capabilities > + Capability > App Groups 추가
   - group. name 적기 (ex. group.com.project.widget)
2. LiveActivityModule.h 생성
   - Project folder Right click > New File > Select Header File > Name is "LiveActivityModule"
   ```
   #import <React/RCTBridgeModule.h>
   @interface SharedDefaults : NSObject<RCTBridgeModule>
   @end
   ```
3. LiveActivityModule.m 파일에 코드 추가
   ```
   #import "LiveActivityModule.h"
   @implementation SharedDefaults
   -(dispatch_queue_t)methodQueue {
      return dispatch_get_main_queue();
   }
   RCT_EXPORT_MODULE(SharedDefaults);
   RCT_EXPORT_METHOD(set: (NSString *)data
                     resolver:(RCTPromiseResolveBlock)resolve
                     rejceter:(RCTPromiseRejectBlock)reject)
   {
      @try{
         NSUserDefaults *shared = [[NSUserDefaults alloc]initWithSuiteName:@"App Group명"];
         [shared setObject:data forKey:@"data"]; // data를 저장할 key 값
         [shared synchronize];
         resolve(@"true");
      }@catch(NSException *exception){
         reject(@"get_error",exception.reason, nil);
      }
   }
   @end
   ```
4. LiveActivity.swift timeline 코드 추가
   ```
   let userDefaults = UserDefaults(suiteName: "App Group명")
   let jsonText = userDefaults?.string(forKey: "data")
   var todos : [TodoModel] = []
   do {
      if jsonText != nil {
      let jsonData = Data(jsonText?.utf8 ?? "".utf8)
      let valueData = try JSONDecoder().decode([TodoModel].self, from: jsonData)
      todos = valueData
      }
   } catch {
      print(error)
   }
   ```
5. React Native에서 UserDefaults Write하기
   ```
   import {NativeModules} from 'react-native';
   const NativeSharedDefaults = NativeModules.SharedDefaults;
   class SharedDefaults {
   public async set(obj: Record<string, any>) {
      try {
         const res: boolean = await NativeSharedDefaults.set(JSON.stringify(obj));
         return res;
      } catch (e) {
         console.warn('[SHARED DEFAULTS]', e);
         return false;
      }
   }
   }
   export default new SharedDefaults();
   ```
6. useEffect를 통해 todos 상태가 변할 때마다 SharedDefaults.set(data)를 호출
   ```
   useEffect(() => {
      SharedDefaults.set(data);
   }, [data]);
   ```
