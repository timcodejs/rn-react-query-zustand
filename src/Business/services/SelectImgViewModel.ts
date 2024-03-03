import {useEffect, useState} from 'react';
import {
  usePostRemoveBgQuery,
  useGetImageQuery,
} from '../../Store/queries/removeBgQuery';

export const SelectImgViewModel = () => {
  const [img, setImg] = useState<any>();
  const [imgError, setImgError] = useState<any>();
  const [imageId, setImageId] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const onPostImage = usePostRemoveBgQuery(img);
  const {data, status, refetch} = useGetImageQuery(imageId);

  useEffect(() => {
    if (img !== undefined) {
      console.log(img);
      onPostImage.mutate();
      setLoading(true);
    }
  }, [img]);

  useEffect(() => {
    if (onPostImage?.isSuccess) {
      setImageId(onPostImage?.data?.data?.id);
      refetch();
    }
  }, [onPostImage?.isSuccess]);

  useEffect(() => {
    if (img !== undefined && onPostImage?.isSuccess) {
      setLoading(false);
    }
  }, [img, onPostImage?.isSuccess]);

  return {
    data,
    status,
    imgError,
    loading,
    setImg,
    setImgError,
  };
};
