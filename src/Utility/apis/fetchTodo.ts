import request from './request';
import {LOCALHOST_ADDRESS} from 'react-native-dotenv';

const fetchTodoList = async () => {
  return await request('get', `${LOCALHOST_ADDRESS}/todos`, {}, {});
};

const fetchTodoPost = async (json: any) => {
  return await request('post', `${LOCALHOST_ADDRESS}/todos`, {}, json);
};

const fetchTodoDelete = async (json: any) => {
  return await request(
    'delete',
    `${LOCALHOST_ADDRESS}/todos/${json.id}`,
    {},
    {},
  );
};

const fetchTodoUpdate = async (json: any) => {
  return await request(
    'put',
    `${LOCALHOST_ADDRESS}/todos/${json.id}`,
    {},
    json,
  );
};

export {fetchTodoList, fetchTodoPost, fetchTodoDelete, fetchTodoUpdate};
