import request from './request';
import {FASTAPI_LOCALHOST_ADDRESS} from 'react-native-dotenv';

export const fetchPostImage = (imageFile: any) => {
  return request(
    'post',
    `${FASTAPI_LOCALHOST_ADDRESS}/photo`,
    {'Content-Type': 'multipart/form-data'},
    imageFile,
  );
};

export const fetchGetImage = (imageId: string) => {
  return request(
    'get',
    `${FASTAPI_LOCALHOST_ADDRESS}/photo/${imageId}`,
    {},
    {id: imageId},
  );
};

export const fetchGetImages = () => {
  return request('get', `${FASTAPI_LOCALHOST_ADDRESS}/photos`, {}, {});
};

export const fetchDeleteImage = (imageId: string) => {
  return request(
    'delete',
    `${FASTAPI_LOCALHOST_ADDRESS}/photo/${imageId}`,
    {},
    {id: imageId},
  );
};
