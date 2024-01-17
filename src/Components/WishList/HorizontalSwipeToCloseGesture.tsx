import React from 'react';
import {View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {GestureDetector} from 'react-native-gesture-handler';
import Animated, {useSharedValue} from 'react-native-reanimated';
import {Color} from '../../Utility/utils/Color';
import {WishListDataProps} from '../../Utility/utils/Types';
import {IconMinusIcon, IconPlusIcon} from '../../Utility/utils/SVG';
import {wp, hp, screenWidth, screenHeight} from '../../Utility/utils/UI';
import {
  PretendardBold,
  PretendardRegular,
} from '../../Utility/utils/CustomFont';
import {useHorizontalSwipeToClose} from '../../Business/hooks/useHorizontalSwipeToClose';

interface Props {
  xPosition: any;
  data: WishListDataProps[];
  wishListEditCount: any;
}

const HorizontalSwipeToCloseGesture = ({
  xPosition,
  data,
  wishListEditCount,
}: Props) => {
  const contentWidth = useSharedValue(screenWidth);
  const {swipeToCloseGestureHandler, animatedStyle} = useHorizontalSwipeToClose(
    {
      xPosition,
      contentWidth,
    },
  );
  const totalPrice = data
    ?.map((v: any) => v.price * v.choiseCount)
    ?.reduce((a: number, b: number) => a + b, 0);

  return (
    <GestureDetector gesture={swipeToCloseGestureHandler}>
      <Animated.View style={[styles.box, animatedStyle]}>
        <View style={styles.inner}>
          <PretendardBold size={hp(19)} children={'장바구니 목록'} />
          {data?.length > 0 ? (
            <FlatList
              data={data}
              keyExtractor={(item: any) => item.id}
              renderItem={({item}: any) => {
                const total = item.price * item.choiseCount;
                const price = '₩ ' + total.toLocaleString();
                return (
                  <View style={styles.item}>
                    <FastImage source={item.itemImage} style={styles.image} />
                    <View>
                      <PretendardBold
                        size={hp(14)}
                        numberOfLines={1}
                        children={item.name}
                      />
                      <PretendardRegular
                        size={hp(12)}
                        children={price}
                        style={{marginTop: hp(6), marginBottom: hp(6)}}
                      />
                      <PretendardRegular
                        size={hp(12)}
                        color={Color.gray}
                        children={`담은 수량 : ${item.choiseCount} 개`}
                      />
                    </View>
                    <View style={styles.count}>
                      <TouchableOpacity
                        onPress={() =>
                          wishListEditCount({
                            id: item.id,
                            quantity: item.quantityLeft,
                            count: item.choiseCount,
                            key: 'choiseCount',
                            state: 'minus',
                          })
                        }>
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
                        children={item.choiseCount}
                        style={{marginHorizontal: wp(10)}}
                      />
                      <TouchableOpacity
                        onPress={() =>
                          wishListEditCount({
                            id: item.id,
                            quantity: item.quantityLeft,
                            count: item.choiseCount,
                            key: 'choiseCount',
                            state: 'plus',
                          })
                        }>
                        <IconPlusIcon
                          width={wp(30)}
                          height={hp(30)}
                          color={Color.black}
                          style={styles.border}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              }}
              ItemSeparatorComponent={() => <View style={styles.line} />}
              ListFooterComponent={() => <View style={styles.bottom} />}
            />
          ) : (
            <PretendardRegular
              size={hp(13)}
              style={{marginTop: hp(20), marginBottom: hp(6)}}
              children={'장바구니에 담긴 상품이 없습니다.'}
            />
          )}
          <View style={styles.footer}>
            <PretendardBold
              size={hp(19)}
              color={Color.black}
              style={{margin: hp(10)}}
              children={`total: ₩ ${totalPrice.toLocaleString()}`}
            />
            <TouchableOpacity
              style={[
                styles.addItemBtn,
                {backgroundColor: data?.length === 0 ? Color.gray : 'red'},
              ]}
              onPress={() => {}}>
              <PretendardBold
                size={hp(19)}
                color={Color.white}
                children={'주문하기'}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    </GestureDetector>
  );
};

export default HorizontalSwipeToCloseGesture;

const styles = StyleSheet.create({
  box: {
    width: wp(360),
    height: screenHeight,
    position: 'absolute',
    alignItems: 'flex-end',
  },
  inner: {
    width: wp(230),
    height: screenHeight,
    paddingTop: hp(70),
    paddingHorizontal: hp(10),
    borderWidth: 1,
    borderColor: Color.lightGray,
    backgroundColor: Color.white,
  },
  item: {
    paddingVertical: hp(10),
  },
  image: {
    width: wp(70),
    height: hp(70),
    marginBottom: hp(10),
  },
  count: {
    marginTop: hp(10),
    flexDirection: 'row',
    alignItems: 'center',
  },
  border: {
    borderColor: Color.gray,
    borderWidth: 1,
    borderRadius: 2,
  },
  line: {
    height: 1,
    backgroundColor: Color.gray,
  },
  bottom: {
    paddingBottom: hp(200),
  },
  footer: {
    position: 'absolute',
    top: screenHeight - 195,
    backgroundColor: Color.white,
  },
  addItemBtn: {
    width: wp(230),
    height: hp(60),
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
