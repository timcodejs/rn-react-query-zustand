import React from 'react';
import FastImage from 'react-native-fast-image';
import styled from 'styled-components/native';
import {hp, wp} from '../../Utility/utils/UI';
import {Color} from '../../Utility/utils/Color';
import {PretendardBold} from '../../Utility/utils/CustomFont';

interface Props {
  loginHandler: (e: any) => void;
}

const GoogleLoginBtn = ({loginHandler}: Props) => {
  return (
    <GoogleWrap onPress={loginHandler}>
      <FastImage
        style={{width: wp(29), height: hp(25)}}
        source={require('../../Assets/images/google.png')}
      />
      <PretendardBold
        size={wp(17)}
        color={Color.jetBlack}
        style={{marginLeft: wp(10)}}
        children="구글로 시작하기"
      />
    </GoogleWrap>
  );
};

export default GoogleLoginBtn;

const GoogleWrap = styled.TouchableOpacity`
  width: ${wp(320)}px;
  height: ${hp(60)}px;
  margin: ${hp(5)}px 0;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  border-radius: ${hp(5)}px;
  border: 1px solid #bababa;
`;
