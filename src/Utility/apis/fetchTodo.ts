import request from './request';

const fetchTodoList = async () => {
  return await request('get', 'http://localhost:4000/todos', {}, {});
};

const fetchTodoPost = async (json: any) => {
  return await request('post', 'http://localhost:4000/todos', {}, json);
};

const fetchTodoDelete = async (json: any) => {
  return await request(
    'delete',
    `http://localhost:4000/todos/${json.id}`,
    {},
    {},
  );
};

const fetchTodoUpdate = async (json: any) => {
  return await request(
    'put',
    `http://localhost:4000/todos/${json.id}`,
    {},
    json,
  );
};

export {fetchTodoList, fetchTodoPost, fetchTodoDelete, fetchTodoUpdate};
