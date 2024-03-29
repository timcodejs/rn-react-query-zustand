import React from 'react';
import FastImage from 'react-native-fast-image';
import styled from 'styled-components/native';
import {hp, wp} from '../../Utility/utils/UI';
import {Color} from '../../Utility/utils/Color';
import {PretendardBold} from '../../Utility/utils/CustomFont';

interface Props {
  loginHandler: (e: any) => void;
}

const KakaoLoginBtn = ({loginHandler}: Props) => {
  return (
    <KakaoWrap onPress={loginHandler}>
      <FastImage
        style={{width: wp(29), height: hp(25)}}
        source={require('../../Assets/images/kakao.png')}
      />
      <PretendardBold
        size={wp(17)}
        color={Color.jetBlack}
        style={{marginLeft: wp(10)}}
        children="카카오로 시작하기"
      />
    </KakaoWrap>
  );
};

export default KakaoLoginBtn;

const KakaoWrap = styled.TouchableOpacity`
  width: ${wp(320)}px;
  height: ${hp(60)}px;
  margin: ${hp(5)}px 0;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: ${hp(5)}px;
  background-color: rgb(252, 236, 79);
`;
