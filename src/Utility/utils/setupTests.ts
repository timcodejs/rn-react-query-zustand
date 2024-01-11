import {server} from '../../Mocks/server';

// beforeEach: 테스트 하나하나 실행할 때마다 먼저 실행한다.
// beforeAll: Jest가 실행할 때마다 먼저 실행한다.
// afterEach: 각각 테스트 끝날 때마다 실행한다.
// afterAll: Jest 테스트 전부 끝날 때가 끝날 때 실행한다.
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
