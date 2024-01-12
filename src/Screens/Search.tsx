import React from 'react';
import styled from 'styled-components/native';
import Header from '../Components/Header';
import CommonInput from '../Components/CommonInput';
import SearchPopup from '../Components/SearchPopup';
import SearchList from '../Components/SearchList';
import {hp} from '../Utility/utils/UI';
import {Color} from '../Utility/utils/Color';
import {PretendardBold} from '../Utility/utils/CustomFont';
import {SearchViewModel} from '../Business/services/SearchViewModel';
import {AllScreenList, SearchStackProps} from '../Navigation/NavigationProps';

const Search = ({navigation}: SearchStackProps<AllScreenList.Search>) => {
  const {
    data,
    result,
    status,
    isEnter,
    keyword,
    handleChange,
    handleChoise,
    handleReset,
    handleSubmit,
  } = SearchViewModel();

  return (
    <SearchView>
      <Header navigation={navigation} />
      <PretendardBold
        size={hp(20)}
        style={{marginTop: hp(20), marginBottom: hp(20)}}
        children="검색"
      />
      <CommonInput
        text="검색"
        placeholderText="네이버 책 검색"
        values={keyword}
        btnStatus={false}
        onChange={handleChange}
        onPress={handleSubmit}
      />
      <SearchPopup
        data={data?.data}
        status={status}
        isEnter={isEnter}
        onPress={handleChoise}
      />
      <SearchList data={result} handleReset={handleReset} />
    </SearchView>
  );
};

export default Search;

const SearchView = styled.View`
  height: ${hp(740)}px;
  padding-left: ${hp(10)}px;
  padding-right: ${hp(10)}px;
  background-color: ${Color.white};
`;
