import React from 'react';
import {View, StatusBar} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Color} from '../Utility/utils/Color';
import {NavigationProps} from '../Navigation/NavigationProps';

type HeaderProps = {
  navigation: NavigationProps['navigation'];
};

const Header = ({navigation}: HeaderProps) => {
  const {top} = useSafeAreaInsets();

  return (
    <>
      <View
        style={{
          backgroundColor: Color.white,
          height: top,
        }}
      />
      <StatusBar barStyle="dark-content" />
    </>
  );
};

export default Header;
