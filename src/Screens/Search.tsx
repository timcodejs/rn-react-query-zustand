import React from 'react';
import styled from 'styled-components/native';
import Header from '../Components/Header';
import CommonInput from '../Components/CommonInput';
import SearchPopup from '../Components/SearchPopup';
import SearchList from '../Components/SearchList';
import {hp, wp} from '../Utility/utils/UI';
import {Color} from '../Utility/utils/Color';
import {SearchViewModel} from '../Business/services/SearchViewModel';
import {AllScreenList, SearchStackProps} from '../Navigation/NavigationProps';

const Search = ({navigation}: SearchStackProps<AllScreenList.Search>) => {
  const {data, status, isEnter, handleChange, handleSubmit} = SearchViewModel();

  return (
    <SearchView>
      <Header navigation={navigation} />
      <CommonInput
        text="검색"
        placeholderText="네이버 책 검색"
        onChange={handleChange}
        onPress={handleSubmit}
      />
      <SearchPopup data={data?.data} status={status} isEnter={isEnter} />
      <SearchList data={data?.data?.items} />
    </SearchView>
  );
};

export default Search;

const SearchView = styled.ScrollView`
  height: ${hp(740)}px;
  padding-top: ${wp(20)}px;
  padding-left: ${hp(10)}px;
  padding-right: ${hp(10)}px;
  background-color: ${Color.white};
`;
