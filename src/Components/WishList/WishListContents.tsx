import React from 'react';
import {View, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {wishListData} from '../../Utility/utils/constant';
import {hp, wp} from '../../Utility/utils/UI';
import {Color} from '../../Utility/utils/Color';
import {
  PretendardBold,
  PretendardRegular,
} from '../../Utility/utils/CustomFont';
import {screenWidth} from '../../Utility/utils/UI';

type Props = {};

const WishListContents = (props: Props) => {
  return (
    <View style={styles.wrap}>
      <FlatList
        data={wishListData}
        numColumns={2}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        keyExtractor={(item: any) => item.id}
        renderItem={({item}: any) => {
          const price = '₩ ' + item.price.toLocaleString();
          return (
            <TouchableOpacity style={styles.items} onPress={() => {}}>
              <FastImage source={item.itemImage} style={styles.image} />
              <PretendardBold
                size={hp(14)}
                children={item.name}
                style={{marginBottom: hp(6), textAlign: 'center'}}
              />
              <PretendardRegular size={hp(12)} children={price} />
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
