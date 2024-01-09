import {useInfiniteQuery} from '@tanstack/react-query';
import {fetchScroll} from '../../Utility/apis/fetchScroll';

export const useScrollInfiniteQuery = () => {
  const {
    data: scrollData,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['infinity'],
    queryFn: ({pageParam = 1}) => fetchScroll(pageParam),
    getNextPageParam: (lastPage: any, allPage: any) => {
      const maxPage = lastPage.data.total_count / 15;
      const nextPage = allPage.length + 1;

      return nextPage <= maxPage ? nextPage : undefined;
    },
    select: (data: any) => ({
      pages: data.pages,
      pageParams: data.pageParams,
    }),
    initialPageParam: 1,
  });

  return {
    scrollData,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  };
};
