import FastImage from 'react-native-fast-image';
import {GestureDetector} from 'react-native-gesture-handler';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Animated, {useSharedValue, withSpring} from 'react-native-reanimated';
import {Color} from '../../Utility/utils/Color';
import {WishListDataProps} from '../../Utility/utils/Types';
import {IconPlusIcon, IconMinusIcon} from '../../Utility/utils/SVG';
import {wp, hp, screenWidth, screenHeight} from '../../Utility/utils/UI';
import {
  PretendardBold,
  PretendardRegular,
} from '../../Utility/utils/CustomFont';
import {useVerticalSwipeToClose} from '../../Business/hooks/useVerticalSwipeToClose';

interface Props {
  yPosition: any;
  itemCount: number;
  detailItem: WishListDataProps;
  setItemCount: (e: number) => void;
  totalItemCount: any;
  increaseItemCount: any;
  decreaseItemCount: any;
}

const VerticalSwipeToCloseGesture = ({
  yPosition,
  itemCount,
  setItemCount,
  detailItem,
  totalItemCount,
  increaseItemCount,
  decreaseItemCount,
}: Props) => {
  const contentHeight = useSharedValue(screenHeight);
  const {swipeToCloseGestureHandler, animatedStyle} = useVerticalSwipeToClose({
    yPosition,
    contentHeight,
    setReset: setItemCount,
  });

  return (
    <GestureDetector gesture={swipeToCloseGestureHandler}>
      <Animated.View style={[styles.box, animatedStyle]}>
        <View style={styles.inner}>
          <View style={styles.handle} />
          <View style={styles.align}>
            <FastImage source={detailItem?.itemImage} style={styles.image} />
            <PretendardBold size={hp(19)} children={detailItem?.name} />
            <PretendardRegular
              size={hp(16)}
              style={{marginTop: hp(10), marginBottom: hp(10)}}
              children={`₩ ${detailItem?.price?.toLocaleString()}`}
            />
            <PretendardRegular
              size={hp(14)}
              color={Color.gray}
              children={`남은 수량 : ${detailItem?.quantityLeft} 개`}
            />
            <View style={styles.count}>
              <TouchableOpacity onPress={() => decreaseItemCount(itemCount)}>
                <IconMinusIcon
                  width={wp(30)}
                  height={hp(30)}
                  color={Color.black}
                  style={styles.border}
                />
              </TouchableOpacity>
              <PretendardBold
                size={hp(19)}
                color={Color.black}
                children={itemCount}
                style={{marginHorizontal: wp(10)}}
              />
              <TouchableOpacity
                onPress={() =>
                  increaseItemCount(itemCount, detailItem?.quantityLeft)
                }>
                <IconPlusIcon
                  width={wp(30)}
                  height={hp(30)}
                  color={Color.black}
                  style={styles.border}
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={[
                styles.addItemBtn,
                {backgroundColor: itemCount > 0 ? 'red' : Color.gray},
              ]}
              onPress={() => {
                if (itemCount > 0) {
                  totalItemCount(detailItem?.id, itemCount, 'choiseCount');
                  yPosition.value = withSpring(screenHeight, {
                    damping: 5,
                    overshootClamping: true,
                  });
                  setItemCount(0);
                }
              }}>
              <PretendardBold
                size={hp(19)}
                color={Color.white}
                children={'장바구니 담기'}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    </GestureDetector>
  );
};

export default VerticalSwipeToCloseGesture;

const styles = StyleSheet.create({
  box: {
    width: wp(360),
    height: screenHeight,
    position: 'absolute',
  },
  inner: {
    width: wp(360),
    height: screenHeight,
    marginTop: 120,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: Color.gray,
    backgroundColor: Color.white,
  },
  handle: {
    width: 50,
    height: 6,
    marginTop: 13,
    borderRadius: 10,
    alignSelf: 'center',
    backgroundColor: Color.navy,
  },
  align: {
    marginTop: hp(20),
    alignItems: 'center',
  },
  image: {
    width: wp(250),
    height: hp(250),
    marginBottom: hp(10),
  },
  count: {
    marginTop: hp(20),
    flexDirection: 'row',
    alignItems: 'center',
  },
  border: {
    borderColor: Color.gray,
    borderWidth: 1,
    borderRadius: 2,
  },
  addItemBtn: {
    position: 'absolute',
    top: screenHeight - 310,
    width: screenWidth,
    height: hp(60),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
