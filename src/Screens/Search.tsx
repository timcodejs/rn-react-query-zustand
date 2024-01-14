import React, {useEffect} from 'react';
import {useIsFocused} from '@react-navigation/native';
import styled from 'styled-components/native';
import Header from '../Components/Header';
import CommonInput from '../Components/CommonInput';
import SearchPopup from '../Components/Search/SearchPopup';
import SearchList from '../Components/Search/SearchList';
import {hp} from '../Utility/utils/UI';
import {Color} from '../Utility/utils/Color';
import {PretendardBold} from '../Utility/utils/CustomFont';
import {SearchViewModel} from '../Business/services/SearchViewModel';
import {AllScreenList, SearchStackProps} from '../Navigation/NavigationProps';

const Search = ({navigation}: SearchStackProps<AllScreenList.Search>) => {
  const isFocused = useIsFocused();
  const model = SearchViewModel();

  useEffect(() => {
    if (isFocused) {
      model?.handleReset();
    }
  }, [isFocused]);

  return (
    <SearchView>
      <Header navigation={navigation} bgColor={Color.white} />
      <PretendardBold
        size={hp(20)}
        style={{marginTop: hp(20), marginBottom: hp(20)}}
        children="책 검색"
      />
      <CommonInput
        text="검색"
        placeholderText="네이버 책 검색"
        values={model?.keyword}
        btnStatus={false}
        onChange={model?.handleChange}
        onPress={model?.handleSubmit}
      />
      <SearchPopup
        data={model?.data?.data}
        status={model?.status}
        onPress={model?.handleChoise}
      />
      <SearchList handleReset={model?.handleReset} />
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
