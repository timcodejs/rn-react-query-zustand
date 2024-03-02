import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Header from '../../Components/Header';
import HeadingText from '../../Components/HeadingText';
import {hp, wp} from '../../Utility/utils/UI';
import {Color} from '../../Utility/utils/Color';
import {PretendardBold} from '../../Utility/utils/CustomFont';
import {RemoveBgViewModel} from '../../Business/services/RemoveBgViewModel';
import {AllScreenList, SwipeStackProps} from '../../Navigation/NavigationProps';

const RemoveBackGround = ({
  navigation,
}: SwipeStackProps<AllScreenList.RemoveBackGround>) => {
  const model = RemoveBgViewModel();

  return (
    <View style={styles.view}>
      <Header navigation={navigation} bgColor={Color.white} />
      <HeadingText
        navigation={navigation}
        text="Remove BackGround"
        color={Color.black}
      />
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          navigation.navigate(AllScreenList.SelectImage);
        }}>
        <PretendardBold color={'skyblue'} children={'Select Image'} />
      </TouchableOpacity>
      <View style={styles.line} />
    </View>
  );
};

export default RemoveBackGround;

const styles = StyleSheet.create({
  view: {
    height: hp(740),
    paddingHorizontal: wp(10),
    backgroundColor: Color.white,
  },
  btn: {
    height: 60,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'skyblue',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  line: {
    height: 1,
    backgroundColor: Color.lightGray,
  },
});
