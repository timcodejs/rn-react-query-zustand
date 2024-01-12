import React from 'react';
import {RefreshControl} from 'react-native';
import styled from 'styled-components/native';
import Header from '../Components/Header';
import {hp} from '../Utility/utils/UI';
import {Color} from '../Utility/utils/Color';
import {PretendardBold} from '../Utility/utils/CustomFont';
import useRefresh from '../Business/hooks/useRefresh';
import {AllScreenList, SocialStackProps} from '../Navigation/NavigationProps';

const User = ({navigation, route}: SocialStackProps<AllScreenList.User>) => {
  const [refreshing, onRefresh] = useRefresh();
  const loginInfo = route?.params?.loginInfo;

  console.log(loginInfo);

  return (
    <SocialView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <Header navigation={navigation} />
      <PretendardBold
        size={hp(20)}
        style={{marginTop: hp(20), marginBottom: hp(20)}}
        children="로그인을 환영합니다."
      />
    </SocialView>
  );
};

export default User;

const SocialView = styled.ScrollView`
  height: ${hp(740)}px;
  padding-left: ${hp(10)}px;
  padding-right: ${hp(10)}px;
  background-color: ${Color.white};
`;
