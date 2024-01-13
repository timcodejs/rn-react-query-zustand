import {useQuery} from '@tanstack/react-query';
import {fetchYoutube} from '../../Utility/apis/fetchYoutube';

export const useGetYoutubeListQuery = () => {
  const {
    data: datas,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useQuery({queryKey: ['get-youtube-list'], queryFn: () => fetchYoutube()});
  return {datas, isLoading, isFetching, isError, error, refetch};
};
