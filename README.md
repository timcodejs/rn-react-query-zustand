## json-server로 가상 서버 만들기

```
// 설치
yarn global add json-server@0.17.4
```

```
// 프로젝트 루트 경로에서 가상 서버 실행
json-server --watch db.json --port 4000
```

## Youtube API 사용하여 Youtube 만들기

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
