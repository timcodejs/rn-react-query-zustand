import request from './request';
import {
  REACT_APP_NAVER_CLIENT_ID,
  REACT_APP_NAVER_CLIENT_SECRET,
} from 'react-native-dotenv';

const fetchSearchList = async (keyword: string) => {
  return await request(
    'get',
    'https://openapi.naver.com/v1/search/book.json',
    {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'X-Naver-Client-Id': REACT_APP_NAVER_CLIENT_ID,
      'X-Naver-Client-Secret': REACT_APP_NAVER_CLIENT_SECRET,
    },
    {query: keyword},
  );
};

export {fetchSearchList};
