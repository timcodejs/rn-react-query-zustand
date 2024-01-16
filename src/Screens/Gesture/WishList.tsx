import React from 'react';
import {View, StyleSheet} from 'react-native';
import Header from '../../Components/Header';
import WishListHeader from '../../Components/WishList/WishListHeader';
import WishListContents from '../../Components/WishList/WishListContents';
import VerticalSwipeToCloseGesture from '../../Components/WishList/VerticalSwipeToCloseGesture';
import {hp} from '../../Utility/utils/UI';
import {Color} from '../../Utility/utils/Color';
import {AllScreenList, SwipeStackProps} from '../../Navigation/NavigationProps';
import {WishViewModel} from '../../Business/services/WishViewModel';
import HorizontalSwipeToCloseGesture from '../../Components/WishList/HorizontalSwipeToCloseGesture';

const WishList = ({navigation}: SwipeStackProps<AllScreenList.WishList>) => {
  const model = WishViewModel();

  return (
    <View style={styles.view}>
      <Header navigation={navigation} bgColor={Color.white} />
      <WishListHeader
        navigation={navigation}
        xPosition={model?.xPosition}
        wishListAllCount={model?.wishListAllCount}
      />
      <WishListContents
        yPosition={model?.yPosition}
        data={model?.deepWishListData}
        setDetailItem={model?.setDetailItem}
      />
      <VerticalSwipeToCloseGesture
        yPosition={model?.yPosition}
        itemCount={model?.itemCount}
        detailItem={model?.detailItem}
        setItemCount={model?.setItemCount}
        totalItemCount={model?.totalItemCount}
        increaseItemCount={model?.increaseItemCount}
        decreaseItemCount={model?.decreaseItemCount}
      />
      <HorizontalSwipeToCloseGesture
        xPosition={model?.xPosition}
        data={model?.wishListAllItem}
        wishListEditCount={model?.wishListEditCount}
      />
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
