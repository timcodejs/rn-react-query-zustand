import {useQuery} from '@tanstack/react-query';
import {fetchSearchList} from '@Utility/apis/fetchSearch';

export const useGetSearchQuery = (keyword: string) => {
  const {data, status, refetch} = useQuery({
    queryKey: ['search', keyword],
    queryFn: () => fetchSearchList(keyword),
    enabled: !!keyword,
  });

  return {data, status, refetch};
};
