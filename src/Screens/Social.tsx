import React from 'react';
import {RefreshControl, View, ActivityIndicator} from 'react-native';
import styled from 'styled-components/native';
import Header from '../Components/Header';
import KakaoLoginBtn from '../Components/KakaoLoginBtn';
import NaverLoginBtn from '@Components/NaverLoginBtn';
import GoogleLoginBtn from '../Components/GoogleLoginBtn';
import useRefresh from '../Business/hooks/useRefresh';
import {hp, wp} from '../Utility/utils/UI';
import {Color} from '../Utility/utils/Color';
import {PretendardBold} from '../Utility/utils/CustomFont';
import {PretendardRegular} from '../Utility/utils/CustomFont';
import {SocialViewModel} from '../Business/services/SocialViewModel';
import {AllScreenList, SocialStackProps} from '../Navigation/NavigationProps';

const Social = ({navigation}: SocialStackProps<AllScreenList.Social>) => {
  const [refreshing, onRefresh] = useRefresh();
  const model = SocialViewModel();

  return (
    <SocialView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <Header navigation={navigation} />
      <SocialHeadding>
        <PretendardBold
          size={hp(20)}
          style={{marginTop: hp(20), marginBottom: hp(20)}}
          children="소셜 로그인 (feat.firebase)"
        />
      </SocialHeadding>
      {model?.isLogin === true && model?.accessToken !== '' ? (
        <>
          {model?.isLoding ? (
            <ActivityIndicator size="large" />
          ) : (
            <View>
              <PretendardBold
                size={wp(25)}
                color={Color.black}
                style={{marginBottom: hp(15)}}
                children={`로그인을 환영합니다. ${model?.userNickname}님.`}
              />
              <LogoutBtn onPress={model?.logout}>
                <PretendardBold
                  size={wp(17)}
                  color={Color.white}
                  children="로그아웃"
                />
              </LogoutBtn>
            </View>
          )}
        </>
      ) : (
        <SocialWrap>
          <GoogleLoginBtn loginHandler={model?.onGoogleLoginHandler} />
          <KakaoLoginBtn loginHandler={model?.onKakaoLoginHandler} />
          <NaverLoginBtn />
          <Other>
            <Line />
            <PretendardRegular
              size={wp(15)}
              color={Color.gray}
              children="또는"
            />
            <Line />
          </Other>
          <OtherWrap>
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

const SocialView = styled.ScrollView`
  height: ${hp(740)}px;
  padding-left: ${hp(10)}px;
  padding-right: ${hp(10)}px;
  background-color: ${Color.white};
`;

const SocialHeadding = styled.View`
  margin-bottom: ${hp(20)}px;
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

const LogoutBtn = styled.TouchableOpacity`
  width: ${wp(80)}px;
  height: ${hp(50)}px;
  align-items: center;
  justify-content: center;
  border-radius: ${wp(5)}px;
  background-color: red;
`;
