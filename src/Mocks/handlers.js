import { http, HttpResponse } from 'msw';
import data from './data.json';

export const handlers = [
  // 할일 목록
  http.get("/todos", () => {
    return HttpResponse.json(Array.from(data.todos.values()));
  }),

  // 할일 추가
  http.post("/todos", async ({ request }) => {
    const newPost = await request.json();
    data.todos.push(newPost);
    return HttpResponse.json(newPost, { status: 201 });
  }),

  // 할일 삭제
  http.delete('/todos/:id', ({ params }) => {
    const { id } = params;
    const deletedPost = data.todos.filter((e) => e.id === Number(id));

    if (!deletedPost) {
      return new HttpResponse(null, { status: 404 });
    }

    data.todos = data.todos.filter((e) => e.id !== Number(id));
    return HttpResponse.json(Array.from(deletedPost.values()));
  }),

  // 할일 수정
  http.put('/todos/:id', async ({ request, params }) => {
    const { id } = params;
    const nextPost = await request.json();
    const findIdx = data.todos.findIndex(i => i.id === Number(id));
    data.todos[findIdx] = nextPost;
    return HttpResponse.json(nextPost);
  }),
];
