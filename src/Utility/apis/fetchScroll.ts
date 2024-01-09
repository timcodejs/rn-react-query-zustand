import request from './request';

const fetchScroll = async (pageParam: number) => {
  return await request(
    'get',
    `https://api.github.com/search/repositories?q=topic:reactjs&per_page=15&page=${pageParam}`,
    {},
    {},
  );
};

export {fetchScroll};
