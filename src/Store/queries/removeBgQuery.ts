import {useQuery, useMutation} from '@tanstack/react-query';
import {
  fetchPostImage,
  fetchGetImage,
  fetchGetImages,
  fetchDeleteImage,
} from '../../Utility/apis/fetchRemoveBg';

export const usePostRemoveBgQuery = (imageFile: any) => {
  const {data, mutate, isError, error, isSuccess, isPending} = useMutation({
    mutationKey: ['postRemoveBg'],
    mutationFn: () => fetchPostImage(imageFile),
  });

  return {data, mutate, isError, error, isSuccess, isPending};
};

export const useGetImageQuery = (imageId: string) => {
  const {data, status, refetch} = useQuery({
    queryKey: ['GetRemoveBg', imageId],
    queryFn: () => fetchGetImage(imageId),
    enabled: !!imageId,
  });

  return {data, status, refetch};
};

export const useGetAllImagesQuery = () => {
  const {data, status, refetch} = useQuery({
    queryKey: ['GetRemoveBg'],
    queryFn: () => fetchGetImages(),
  });

  return {data, status, refetch};
};

export const useDeleteImageQuery = (imageId: string) => {
  const {data, mutate, isError, error, isSuccess} = useMutation({
    mutationKey: ['deleteRemoveBg', imageId],
    mutationFn: () => fetchDeleteImage(imageId),
  });

  return {data, mutate, isError, error, isSuccess};
};
