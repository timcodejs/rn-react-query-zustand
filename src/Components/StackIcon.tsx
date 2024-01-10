import React from 'react';
import {View} from 'react-native';
import {Color} from '../Utility/utils/Color';

interface StackIconProps {
  focused: boolean;
  Icon: any;
}

const StackIcon = ({focused, Icon}: StackIconProps) => {
  return (
    <View>
      {focused ? (
        <Icon height={20} width={20} style={{color: Color.white}} />
      ) : (
        <Icon height={20} width={20} style={{color: Color.gray}} />
      )}
    </View>
  );
};

export default StackIcon;
