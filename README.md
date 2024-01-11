# React Native에서 msw 설정하기

### 설치

```
npm install --save msw@^1.1.0 && yarn add -D msw@^1.1.0
```

! ^1.x 버전을 설치하는 이유 !

- 2.0 버전을 설치 시
  ReferenceError: Property 'TextEncoder' doesn't exist, js engine: hermes 에러 발생.
  해당 문제는 msw 버전이 1.x --> 2.0로 올라감에 따라서 충돌이 일어난 문제.
  현재 msw 버전이 2로 올라가면서 여러 다양한 충돌이 발생하고 있으므로,
  추후 안정화되기까지 1버전을 사용하는 것이 좋다.
  (이유는 https://mswjs.io/docs/migrations/1.x-to-2.x/)

### 추가 라이브러리 설치

https://mswjs.io/docs/integrations/react-native/

```
> npm install --save react-native-url-polyfill && yarn add -D react-native-url-polyfill
```

### msw 설정

```
// src/Mocks/handlers.js
import {rest, HttpResponse} from 'msw';

export const handlers = [
  rest.get(url, () => {
    return HttpResponse.json(Array.from(data.todos.values()));
  }),
  ...
]
```

```
// src/Mocks/server.js
import { setupServer } from 'msw/native'
import { handlers } from './handlers'

export const server = setupServer(...handlers)
```

```
// index.js
import {server} from './src/Mocks/server';
import 'react-native-url-polyfill/auto';

if (__DEV__) {
  server.listen();
}
```

### msw 에러 대처

- Class private methods are not enabled. Please add `@babel/plugin-transform-private-methods` to your configuration.

@babel/plugin-transform-private-methods 설치 후 babel.config.js에 작성.

```
plugins: [
    'react-native-reanimated/plugin',
    ['@babel/plugin-transform-private-methods', {loose: true}],
    ...
],
```

- TypeError: Cannot read property 'getItem' of undefined

@babel/plugin-transform-flow-strip-types, @babel/plugin-proposal-class-properties, @babel/plugin-proposal-private-methods 설치 후 babel.config.js에 작성.

```
plugins: [
    ...
    ['@babel/plugin-transform-flow-strip-types'],
    ['@babel/plugin-proposal-class-properties'],
    ['@babel/plugin-proposal-private-methods'],
],
```

- [MSW] Warning: captured a request without a matching request handler:

onUnhandledRequest (default: “warn”) 요청 핸들러에 추가되지 않는 요청을 처리하는 방법 지정
“bypass” | “warn” | “error” | (req: MockedRequest) => void

```
server.listen({onUnhandledRequest: 'bypass'});
```
