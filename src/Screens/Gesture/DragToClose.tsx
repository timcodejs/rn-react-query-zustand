import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Header from '../../Components/Header';
import {hp, wp} from '../../Utility/utils/UI';
import {Color} from '../../Utility/utils/Color';
import {IconArrowIcon} from '../../Utility/utils/SVG';
import {PretendardBold} from '../../Utility/utils/CustomFont';
import {AllScreenList, SwipeStackProps} from '../../Navigation/NavigationProps';
import DragToCloseAnimation from '../../Components/Animations/DragToCloseAnimation';

const DragToClose = ({
  navigation,
}: SwipeStackProps<AllScreenList.DragToClose>) => {
  return (
    <View style={styles.view}>
      <Header navigation={navigation} bgColor={Color.white} />
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
          children="Drag To Close"
        />
      </View>
      <DragToCloseAnimation />
    </View>
  );
};

export default DragToClose;

const styles = StyleSheet.create({
  view: {
    height: hp(740),
    backgroundColor: Color.white,
    paddingHorizontal: wp(10),
  },
  align: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
