import React from 'react';
import {View} from 'react-native';
import styled from 'styled-components/native';
import {hp} from './UI';
import {Color} from './Color';

const Splash = () => {
  return (
    <SplashStyled>
      <View>
        <SplashText>A Mess App</SplashText>
      </View>
    </SplashStyled>
  );
};

export default Splash;

const SplashStyled = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${Color.navy};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SplashText = styled.Text`
  font-size: ${hp(35)}px;
  font-weight: bold;
  color: ${Color.white};
`;
