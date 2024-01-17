import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useSharedValue} from 'react-native-reanimated';
import Header from '../../Components/Header';
import WishListHeader from '../../Components/WishList/WishListHeader';
import BounceAimation from '../../Components/Animations/BounceAimation';
import WishListContents from '../../Components/WishList/WishListContents';
import VerticalSwipeToCloseGesture from '../../Components/WishList/VerticalSwipeToCloseGesture';
import {hp, screenHeight} from '../../Utility/utils/UI';
import {Color} from '../../Utility/utils/Color';
import {AllScreenList, SwipeStackProps} from '../../Navigation/NavigationProps';
import {WishViewModel} from '../../Business/services/WishViewModel';
import HorizontalSwipeToCloseGesture from '../../Components/WishList/HorizontalSwipeToCloseGesture';

const WishList = ({navigation}: SwipeStackProps<AllScreenList.WishList>) => {
  const ballSize = useSharedValue({width: 100, height: 100});
  const xBallPosition = useSharedValue(0);
  const yBallPosition = useSharedValue(screenHeight);
  const ballOpacity = useSharedValue(1);

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
        ballSize={ballSize}
        xBallPosition={xBallPosition}
        yBallPosition={yBallPosition}
        ballOpacity={ballOpacity}
        yPosition={model?.yPosition}
        data={model?.deepWishListData}
        setDetailItem={model?.setDetailItem}
      />
      <VerticalSwipeToCloseGesture
        ballSize={ballSize}
        xBallPosition={xBallPosition}
        yBallPosition={yBallPosition}
        ballOpacity={ballOpacity}
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
      <BounceAimation
        ballSize={ballSize}
        xBallPosition={xBallPosition}
        yBallPosition={yBallPosition}
        ballOpacity={ballOpacity}
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
