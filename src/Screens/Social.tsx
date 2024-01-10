import React from 'react';
import {Text} from 'react-native';
import styled from 'styled-components/native';
import Header from '../Components/Header';
import {hp} from '../Utility/utils/UI';
import {Color} from '../Utility/utils/Color';
import {PretendardBold} from '../Utility/utils/CustomFont';
import {AllScreenList, SocialStackProps} from '../Navigation/NavigationProps';

const Social = ({navigation}: SocialStackProps<AllScreenList.Social>) => {
  return (
    <SocialView>
      <Header navigation={navigation} />
      <PretendardBold
        size={hp(20)}
        style={{marginTop: hp(20), marginBottom: hp(20)}}>
        소셜 로그인
      </PretendardBold>
      <Text>Social</Text>
    </SocialView>
  );
};

export default Social;

const SocialView = styled.ScrollView`
  height: ${hp(740)}px;
  padding-left: ${hp(10)}px;
  padding-right: ${hp(10)}px;
  background-color: ${Color.white};
`;
