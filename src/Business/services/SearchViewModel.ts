import {useState} from 'react';
import {useGetSearchQuery} from '../../Store/queries/searchQuery';

export const SearchViewModel = () => {
  const [result, setResult] = useState<any>();
  const [keyword, setKeyword] = useState<string>('');
  const [isEnter, setIsEnter] = useState<boolean>(false);
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
    result,
    status,
    isEnter,
    keyword,
    handleChange,
    handleChoise,
    handleReset,
    handleSubmit,
  };
};
