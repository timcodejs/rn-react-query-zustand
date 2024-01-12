import React from 'react';
import FastImage from 'react-native-fast-image';
import styled from 'styled-components/native';
import {hp, wp} from '../Utility/utils/UI';
import {Color} from '../Utility/utils/Color';
import {PretendardBold} from '../Utility/utils/CustomFont';

interface Props {
  loginHandler: (e: any) => void;
}

const NaverLoginBtn = ({loginHandler}: Props) => {
  return (
    <NaverWrap onPress={loginHandler}>
      <FastImage
        style={{width: wp(50), height: hp(50)}}
        source={require('../Assets/images/naver.png')}
      />
      <PretendardBold
        size={wp(17)}
        color={Color.white}
        children="네이버로 시작하기"
      />
    </NaverWrap>
  );
};

export default NaverLoginBtn;

const NaverWrap = styled.TouchableOpacity`
  width: ${wp(320)}px;
  height: ${hp(60)}px;
  margin: ${hp(5)}px 0;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: ${hp(5)}px;
  background-color: rgb(0, 191, 24);
`;
