import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {IconArrowIcon, IconCartIcon} from '@Utility/utils/SVG';
import {hp, wp} from '@Utility/utils/UI';
import {Color} from '@Utility/utils/Color';
import {PretendardBold} from '@Utility/utils/CustomFont';
import {NavigationProps} from '../../Navigation/NavigationProps';

type Props = {
  navigation: NavigationProps['navigation'];
};

const WishListHeader = (props: Props) => {
  return (
    <View
      style={[
        styles.align,
        styles.paddingHorizontal,
        {justifyContent: 'space-between'},
      ]}>
      <View style={[styles.align]}>
        <TouchableOpacity
          onPress={() => props?.navigation.goBack()}
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
      <TouchableOpacity onPress={() => {}}>
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
});
