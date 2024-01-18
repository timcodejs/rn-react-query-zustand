import React from 'react';
import {View, StatusBar} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {NavigationProps} from '../Navigation/NavigationProps';

type HeaderProps = {
  bgColor: string;
  navigation: NavigationProps['navigation'];
};

const Header = ({navigation, bgColor}: HeaderProps) => {
  const {top} = useSafeAreaInsets();

  return (
    <>
      <View style={{height: top, backgroundColor: bgColor}} />
      <StatusBar
        barStyle={bgColor === '#000000' ? 'light-content' : 'dark-content'}
      />
    </>
  );
};

export default Header;
