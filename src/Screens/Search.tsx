import React from 'react';
import {Text} from 'react-native';
import Header from '../Components/Header';
import {AllScreenList, SearchStackProps} from '@Navigation/NavigationProps';

const Search = ({navigation}: SearchStackProps<AllScreenList.Search>) => {
  return (
    <>
      <Header navigation={navigation} />
      <Text>Search</Text>
    </>
  );
};

export default Search;
