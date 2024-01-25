import {View, StyleSheet, Animated} from 'react-native';
import React, {useState} from 'react';
import Header from '../../Components/Header';
import HeadingText from '../../Components/HeadingText';
import CommonSwitch from '../../Components/CommonSwitch';
import {hp, wp} from '../../Utility/utils/UI';
import {Color} from '../../Utility/utils/Color';
import {PretendardBold} from '../../Utility/utils/CustomFont';
import {AllScreenList, SwipeStackProps} from '../../Navigation/NavigationProps';

const Setting = ({navigation}: SwipeStackProps<AllScreenList.Setting>) => {
  const [isOnOff, setIsOnOff] = useState(false);
  const [aniValue] = useState(new Animated.Value(0));

  return (
    <View style={styles.view}>
      <Header navigation={navigation} bgColor={Color.white} />
      <HeadingText navigation={navigation} text="Setting" color={Color.black} />
      <View style={styles.align}>
        <PretendardBold children="Camera" />
        <CommonSwitch
          isOnOff={isOnOff}
          setIsOnOff={setIsOnOff}
          aniValue={aniValue}
          before={'camera'}
        />
      </View>
    </View>
  );
};

export default Setting;

const styles = StyleSheet.create({
  view: {
    height: hp(740),
    paddingHorizontal: wp(10),
    backgroundColor: Color.white,
  },
  align: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(5),
    paddingVertical: hp(15),
    borderBottomWidth: 1,
    borderBottomColor: Color.lightGray,
  },
});
