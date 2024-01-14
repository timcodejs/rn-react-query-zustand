import {useState} from 'react';
import {useSearchStore} from '../../Store/stores/searchStore';
import {useGetSearchQuery} from '../../Store/queries/searchQuery';

export const SearchViewModel = () => {
  const [keyword, setKeyword] = useState<string>('');

  // store
  const {setResult, setIsEnter} = useSearchStore();

  // query
  const {data, status} = useGetSearchQuery(keyword);

  const handleChange = (text: string) => {
    setIsEnter(true);
    setKeyword(text);
  };

  const handleChoise = (text: string) => {
    setKeyword(text);
  };

  const handleReset = () => {
    setResult(null);
    setKeyword('');
  };

  const handleSubmit = () => {
    setIsEnter(false);
    setResult(data?.data?.items);
  };

  return {
    data,
    status,
    keyword,
    handleChange,
    handleChoise,
    handleReset,
    handleSubmit,
  };
};
