import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useSharedValue} from 'react-native-reanimated';
import Header from '../../Components/Header';
import WishListHeader from '../../Components/WishList/WishListHeader';
import WishListContents from '../../Components/WishList/WishListContents';
import ItemSwipeToCloseGesture from '../../Components/WishList/ItemSwipeToCloseGesture';
import {Color} from '../../Utility/utils/Color';
import {hp, screenHeight} from '../../Utility/utils/UI';
import {useWishListStore} from '../../Store/stores/wishListStore';
import {AllScreenList, SwipeStackProps} from '../../Navigation/NavigationProps';

const WishList = ({navigation}: SwipeStackProps<AllScreenList.WishList>) => {
  const yPosition = useSharedValue(screenHeight);
  const {data} = useWishListStore();

  return (
    <View style={styles.view}>
      <Header navigation={navigation} bgColor={Color.white} />
      <WishListHeader navigation={navigation} />
      <WishListContents yPosition={yPosition} />
      <ItemSwipeToCloseGesture data={data} yPosition={yPosition} />
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
