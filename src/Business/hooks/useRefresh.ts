import {useCallback, useState} from 'react';

/**
 * @description Refresh Function
 */
const useRefresh = () => {
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const wait = (timeout: number) => {
    return new Promise((resolve: any) => setTimeout(resolve, timeout));
  };

  const onRefresh: any = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return [refreshing, onRefresh];
};

export default useRefresh;
