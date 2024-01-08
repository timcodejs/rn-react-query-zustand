import React from 'react';
import {Text} from 'react-native';
import Header from '../Components/Header';
import {AllScreenList, SocialStackProps} from '@Navigation/NavigationProps';

const Social = ({navigation}: SocialStackProps<AllScreenList.Social>) => {
  return (
    <>
      <Header navigation={navigation} />
      <Text>Social</Text>
    </>
  );
};

export default Social;
