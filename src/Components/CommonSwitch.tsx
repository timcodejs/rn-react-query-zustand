import React from 'react';
import {Animated, Easing} from 'react-native';
import styled from 'styled-components/native';
import {hp, wp} from '../Utility/utils/UI';
import {Color} from '../Utility/utils/Color';

interface Props {
  isOnOff: boolean;
  setIsOnOff: (e: boolean) => void;
  aniValue: any;
  before: string;
}

const CommonSwitch = ({isOnOff, setIsOnOff, aniValue, before}: Props) => {
  const moveSwitchToggle = aniValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 20],
  });

  Animated.timing(aniValue, {
    toValue: isOnOff ? 1 : 0,
    duration: 200,
    easing: Easing.linear,
    useNativeDriver: true,
  }).start();

  return (
    <SwitchBackground isOnOff={isOnOff} onPress={() => setIsOnOff(!isOnOff)}>
      <SwitchButton
        isOnOff={isOnOff}
        style={{transform: [{translateX: moveSwitchToggle}]}}
      />
    </SwitchBackground>
  );
};

export default CommonSwitch;

const SwitchBackground = styled.TouchableOpacity<Pick<Props, 'isOnOff'>>`
  width: ${wp(45.5)}px;
  height: ${hp(27)}px;
  background-color: ${props =>
    props.isOnOff === false ? Color.gray : Color.appleGreen};
  border-radius: ${wp(25)}px;
`;
const SwitchButton = styled(Animated.View)<Pick<Props, 'isOnOff'>>`
  width: ${wp(24)}px;
  height: ${hp(24)}px;
  border-radius: ${wp(50)}px;
  background-color: ${Color.white};
  position: absolute;
  top: ${hp(1.5)}px;
  left: ${wp(1.5)}px;
  aspect-ratio: 1;
`;
