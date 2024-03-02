import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import Header from '../../Components/Header';
import HeadingText from '../../Components/HeadingText';
import {hp, wp} from '../../Utility/utils/UI';
import {Color} from '../../Utility/utils/Color';
import {pickImg} from '../../Utility/utils/ImagePick';
import {SelectImgViewModel} from '../../Business/services/SelectImgViewModel';
import {AllScreenList, SwipeStackProps} from '../../Navigation/NavigationProps';

const SelectImage = ({
  navigation,
}: SwipeStackProps<AllScreenList.SelectImage>) => {
  const model = SelectImgViewModel();

  useEffect(() => {
    pickImg(model?.setImgError, model?.setImg);
  }, []);

  useEffect(() => {
    if (model?.imgError === 'Error') {
      navigation.goBack();
    }
  }, [model?.imgError]);

  return (
    <View style={styles.view}>
      <Header navigation={navigation} bgColor={Color.white} />
      <HeadingText
        navigation={navigation}
        text="Select Image"
        color={Color.black}
      />
    </View>
  );
};

export default SelectImage;

const styles = StyleSheet.create({
  view: {
    height: hp(740),
    paddingHorizontal: wp(10),
    backgroundColor: Color.white,
  },
});
