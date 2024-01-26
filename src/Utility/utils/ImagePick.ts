import React from 'react';
import {launchImageLibrary} from 'react-native-image-picker';

/**
 *
 * @param setImgError image error - 이미지 에러가 발생하는 경우
 * @param setImg image - 이미지 데이터 array
 * @description 모바일 이미지(갤러리) 실행
 */
export const pickImg = (
  setImgError: React.Dispatch<React.SetStateAction<string | null>>,
  setImg: React.Dispatch<React.SetStateAction<object | null>>,
) => {
  setImgError(null);
  launchImageLibrary(
    {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 200,
      maxWidth: 200,
    },
    response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorCode);
      } else if (response.errorMessage) {
        console.log('errorMessage ', response.errorMessage);
      } else {
        const res = response.assets || [];
        const body = {
          name: res[0].fileName,
          type: res[0].type,
          uri: res[0].uri,
        };
        setImg(body);
      }
    },
  );
};
