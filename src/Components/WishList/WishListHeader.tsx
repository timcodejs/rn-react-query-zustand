import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {hp, wp} from '../../Utility/utils/UI';
import {Color} from '../../Utility/utils/Color';
import {PretendardBold} from '../../Utility/utils/CustomFont';
import {IconArrowIcon, IconCartIcon} from '../../Utility/utils/SVG';
import {NavigationProps} from '../../Navigation/NavigationProps';
import {withSpring} from 'react-native-reanimated';

type Props = {
  navigation: NavigationProps['navigation'];
  xPosition: any;
  wishListAllCount: number;
};

const WishListHeader = ({navigation, xPosition, wishListAllCount}: Props) => {
  return (
    <View
      style={[
        styles.align,
        styles.paddingHorizontal,
        {justifyContent: 'space-between'},
      ]}>
      <View style={[styles.align]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{marginRight: hp(10)}}>
          <IconArrowIcon
            width={wp(20)}
            height={hp(20)}
            color={Color.black}
            style={{transform: [{rotate: '180deg'}]}}
          />
        </TouchableOpacity>
        <PretendardBold
          size={hp(20)}
          color={Color.black}
          style={{marginTop: hp(20), marginBottom: hp(20)}}
          children="Wish List"
        />
      </View>
      <TouchableOpacity
        onPress={() =>
          (xPosition.value = withSpring(0, {
            damping: 15,
            overshootClamping: true,
          }))
        }>
        <View style={styles.count}>
          <PretendardBold
            size={hp(12)}
            color={Color.white}
            children={wishListAllCount}
          />
        </View>
        <IconCartIcon
          width={wp(30)}
          height={hp(30)}
          color={Color.black}
          style={{marginRight: wp(10)}}
        />
      </TouchableOpacity>
    </View>
  );
};

export default WishListHeader;

const styles = StyleSheet.create({
  align: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paddingHorizontal: {
    paddingLeft: hp(10),
    paddingRight: hp(10),
  },
  count: {
    width: wp(15),
    height: hp(17),
    position: 'absolute',
    right: 5,
    top: -5,
    zIndex: 999,
    borderRadius: 100,
    backgroundColor: 'red',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
