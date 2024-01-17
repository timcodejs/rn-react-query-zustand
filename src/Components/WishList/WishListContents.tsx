import React from 'react';
import {View, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {SharedValue, withSpring} from 'react-native-reanimated';
import FastImage from 'react-native-fast-image';
import {hp, screenHeight, wp} from '../../Utility/utils/UI';
import {Color} from '../../Utility/utils/Color';
import {
  PretendardBold,
  PretendardRegular,
} from '../../Utility/utils/CustomFont';
import {screenWidth} from '../../Utility/utils/UI';
import {WishListDataProps} from '../../Utility/utils/Types';

interface Props {
  ballSize: SharedValue<any>;
  xBallPosition: SharedValue<number>;
  yBallPosition: SharedValue<number>;
  ballOpacity: SharedValue<number>;
  yPosition: any;
  data: WishListDataProps[];
  setDetailItem: (e: any) => void;
}

const WishListContents = ({
  ballSize,
  xBallPosition,
  yBallPosition,
  ballOpacity,
  yPosition,
  data,
  setDetailItem,
}: Props) => {
  return (
    <View style={styles.wrap}>
      <FlatList
        data={data}
        numColumns={2}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        keyExtractor={(item: any) => item.id}
        renderItem={({item}: any) => {
          const price = '₩ ' + item.price.toLocaleString();
          return (
            <TouchableOpacity
              style={styles.items}
              onPress={() => {
                setDetailItem(item);
                yPosition.value = withSpring(0, {
                  damping: 15,
                  overshootClamping: true,
                });
                ballOpacity.value = 1;
                yBallPosition.value = screenHeight;
                xBallPosition.value = 0;
                ballSize.value = {width: 100, height: 100};
              }}>
              <FastImage source={item.itemImage} style={styles.image} />
              <PretendardBold
                size={hp(14)}
                children={item.name}
                style={{textAlign: 'center'}}
              />
              <PretendardRegular
                size={hp(12)}
                children={price}
                style={{marginTop: hp(6), marginBottom: hp(6)}}
              />
              <PretendardRegular
                size={hp(12)}
                color={Color.gray}
                children={`남은 수량 : ${item?.quantityLeft} 개`}
              />
            </TouchableOpacity>
          );
        }}
        ListFooterComponent={() => <View style={styles.bottom} />}
      />
    </View>
  );
};

export default WishListContents;

const styles = StyleSheet.create({
  wrap: {paddingHorizontal: wp(10)},
  items: {
    width: (screenWidth - wp(30)) / 2,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: Color.paleGrey,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp(10),
    paddingBottom: hp(15),
    paddingHorizontal: wp(10),
  },
  image: {
    width: wp(150),
    height: hp(150),
  },
  bottom: {
    paddingBottom: hp(200),
  },
});
