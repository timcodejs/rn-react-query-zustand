import {useState} from 'react';
import {useGetSearchQuery} from '../../Store/queries/searchQuery';

export const SearchViewModel = () => {
  const [keyword, setKeyword] = useState<string>('');
  const [isEnter, setIsEnter] = useState<boolean>(false);
  const {data, status} = useGetSearchQuery(keyword);

  const handleChange = (e: any) => {
    setIsEnter(true);
    setKeyword(e);
  };

  const handleSubmit = () => {
    setIsEnter(false);
  };

  return {data, status, isEnter, handleChange, handleSubmit};
};
