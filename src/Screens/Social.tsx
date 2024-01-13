import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import styled from 'styled-components/native';
import Header from '../Components/Header';
import UserForm from '../Components/Social/UserForm';
import NaverLoginBtn from '../Components/Social/NaverLoginBtn';
import KakaoLoginBtn from '../Components/Social/KakaoLoginBtn';
import GoogleLoginBtn from '../Components/Social/GoogleLoginBtn';
import {hp, wp} from '../Utility/utils/UI';
import {Color} from '../Utility/utils/Color';
import {PretendardBold} from '../Utility/utils/CustomFont';
import {PretendardRegular} from '../Utility/utils/CustomFont';
import {SocialViewModel} from '../Business/services/SocialViewModel';
import {AllScreenList, SocialStackProps} from '../Navigation/NavigationProps';

const Social = ({navigation}: SocialStackProps<AllScreenList.Social>) => {
  const model = SocialViewModel();

  return (
    <SocialView>
      <Header navigation={navigation} bgColor={Color.white} />
      <PretendardBold
        size={hp(20)}
        style={{marginTop: hp(20), marginBottom: hp(40)}}
        children="소셜 로그인 (feat.firebase)"
      />
      {model?.isLogin === true && model?.accessToken !== '' ? (
        <View>
          {model?.isLoding ? (
            <View
              style={{
                height: hp(400),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ActivityIndicator size="large" />
            </View>
          ) : (
            <UserForm model={model} />
          )}
        </View>
      ) : (
        <SocialWrap>
          <GoogleLoginBtn loginHandler={model?.onGoogleLoginHandler} />
          <KakaoLoginBtn loginHandler={model?.onKakaoLoginHandler} />
          <NaverLoginBtn loginHandler={model?.onNaverLoginHandler} />
          <Other>
            <Line />
            <PretendardRegular
              size={wp(15)}
              color={Color.gray}
              children="또는"
            />
            <Line />
          </Other>
          <OtherWrap onPress={model?.onNaverLoginHandler}>
            <PretendardBold
              size={wp(17)}
              color={Color.jetBlack}
              style={{marginLeft: wp(10)}}
              children="ID/PW 회원가입"
            />
          </OtherWrap>
        </SocialWrap>
      )}
    </SocialView>
  );
};

export default Social;

const SocialView = styled.View`
  height: ${hp(740)}px;
  padding-left: ${hp(10)}px;
  padding-right: ${hp(10)}px;
  background-color: ${Color.white};
`;

const SocialWrap = styled.View`
  margin-top: ${hp(30)}px;
  padding: ${hp(5)}px 0;
  align-items: center;
  border-radius: ${hp(5)}px;
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
