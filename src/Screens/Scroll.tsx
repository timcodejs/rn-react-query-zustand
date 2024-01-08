import React from 'react';
import {Text} from 'react-native';
import Header from '../Components/Header';
import {AllScreenList, ScrollStackProps} from '@Navigation/NavigationProps';

const Scroll = ({navigation}: ScrollStackProps<AllScreenList.Scroll>) => {
  return (
    <>
      <Header navigation={navigation} />
      <Text>Scroll</Text>
    </>
  );
};

export default Scroll;
