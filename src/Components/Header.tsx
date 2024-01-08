import React from 'react';
import {View, StatusBar, TouchableOpacity, Text} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Color} from '../Utility/utils/Color';
import {AllScreenList, NavigationProps} from '../Navigation/NavigationProps';

type HeaderProps = {
  navigation: NavigationProps['navigation'];
  before?: string;
  headerText?: string;
  backButton?: boolean;
  screen?: string;
  isId?: boolean;
  setIsId?: any;
  disable?: boolean;
  closeButton?: boolean;
};

const Header = ({navigation}: HeaderProps) => {
  const {top} = useSafeAreaInsets();

  return (
    <>
      <View
        style={{
          backgroundColor: Color.navy,
          height: top,
        }}
      />
      <StatusBar barStyle="light-content" />
      <TouchableOpacity
        style={{flexDirection: 'row', alignItems: 'center'}}
        onPress={() => {
          navigation.reset({
            routes: [
              {
                name: AllScreenList.Todo,
                screen: AllScreenList.Todo,
              },
            ],
          });
        }}>
        <Text>A-Mess</Text>
      </TouchableOpacity>
    </>
  );
};

export default Header;
