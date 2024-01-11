/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {server} from './src/Mocks/server';

if (__DEV__) {
  console.log('dev 실행');
  require('react-native-url-polyfill/auto');
  /**
   * @param onUnhandledRequest (default: “warn”)
   *        요청 핸들러에 추가되지 않는 요청을 처리하는 방법 지정
   *        “bypass” | “warn” | “error” | (req: MockedRequest) => void
   */
  server.listen({onUnhandledRequest: 'bypass'});
}

AppRegistry.registerComponent(appName, () => App);
