import React from 'react';
import {View, StyleSheet} from 'react-native';
import Header from '../../Components/Header';
import WishListContents from '@Components/WishList/WishListContents';
import WishListHeader from '../../Components/WishList/WishListHeader';
import {hp} from '../../Utility/utils/UI';
import {Color} from '../../Utility/utils/Color';
import {AllScreenList, SwipeStackProps} from '../../Navigation/NavigationProps';

const WishList = ({navigation}: SwipeStackProps<AllScreenList.WishList>) => {
  return (
    <View style={styles.view}>
      <Header navigation={navigation} bgColor={Color.white} />
      <WishListHeader navigation={navigation} />
      <WishListContents />
    </View>
  );
};

export default WishList;

const styles = StyleSheet.create({
  view: {
    height: hp(740),
    backgroundColor: Color.white,
  },
});
