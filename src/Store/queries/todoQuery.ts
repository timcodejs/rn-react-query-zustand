import {useQuery, useMutation} from '@tanstack/react-query';
import {
  fetchTodoList,
  fetchTodoPost,
  fetchTodoDelete,
  fetchTodoUpdate,
} from '../../Utility/apis/fetchTodo';

export const useGetDataQuery = () => {
  const {
    data: datas,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useQuery({queryKey: ['get-data'], queryFn: () => fetchTodoList()});
  return {datas, isLoading, isFetching, isError, error, refetch};
};

export const usePostDataQuery = (json: any) => {
  const {data, mutate, isError, error, isSuccess} = useMutation({
    mutationKey: ['post-data'],
    mutationFn: () => fetchTodoPost(json),
  });

  return {data, mutate, isError, error, isSuccess};
};

export const useDeleteDataQuery = (json: any) => {
  const {data, mutate, isError, error, isSuccess} = useMutation({
    mutationKey: ['delete-data'],
    mutationFn: () => fetchTodoDelete(json),
  });

  return {data, mutate, isError, error, isSuccess};
};

export const useUpdateDataQuery = (json: any) => {
  const {data, mutate, isError, error, isSuccess} = useMutation({
    mutationKey: ['update-data'],
    mutationFn: () => fetchTodoUpdate(json),
  });

  return {data, mutate, isError, error, isSuccess};
};
