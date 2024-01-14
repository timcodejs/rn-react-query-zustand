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
