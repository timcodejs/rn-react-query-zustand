import {useEffect, useState} from 'react';

export const SelectImgViewModel = () => {
  const [img, setImg] = useState<any>();
  const [imgError, setImgError] = useState<any>();

  useEffect(() => {
    if (img !== undefined) {
      console.log(img);
    }
  }, [img]);

  return {
    imgError,
    setImg,
    setImgError,
  };
};
