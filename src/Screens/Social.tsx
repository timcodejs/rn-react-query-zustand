import React from 'react';
import styled from 'styled-components/native';
import Header from '../Components/Header';
import KakaoLogin from '../Components/KakaoLogin';
import NaverLogin from '@Components/NaverLogin';
import GoogleLogin from '../Components/GoogleLogin';
import {hp, wp} from '../Utility/utils/UI';
import {Color} from '../Utility/utils/Color';
import {PretendardBold} from '../Utility/utils/CustomFont';
import {PretendardRegular} from '../Utility/utils/CustomFont';
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
      <SocialWrap>
        <GoogleLogin />
        <KakaoLogin />
        <NaverLogin />
        <Other>
          <Line />
          <PretendardRegular size={wp(15)} color={Color.gray}>
            또는
          </PretendardRegular>
          <Line />
        </Other>
        <OtherWrap>
          <PretendardBold
            size={wp(17)}
            color={Color.jetBlack}
            style={{marginLeft: wp(10)}}>
            ID/PW 회원가입
          </PretendardBold>
        </OtherWrap>
      </SocialWrap>
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

const SocialWrap = styled.View`
  padding: ${hp(5)}px 0;
  align-items: center;
  border: 1px solid ${Color.gray};
`;
const Other = styled.View`
  margin: ${hp(10)}px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const Line = styled.View`
  width: ${hp(130)}px;
  margin: 0 ${wp(8)}px;
  border: 1px solid ${Color.gray};
  border-top-width: 0;
  border-right-width: 0;
  border-left-width: 0;
`;

const OtherWrap = styled.TouchableOpacity`
  width: ${wp(320)}px;
  height: ${hp(60)}px;
  margin: ${hp(5)}px 0;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  border-radius: ${hp(5)}px;
  border: 1px solid #bababa;
`;
