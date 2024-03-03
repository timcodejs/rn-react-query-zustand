import React, {useEffect} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Header from '../../Components/Header';
import HeadingText from '../../Components/HeadingText';
import {hp, screenHeight, screenWidth, wp} from '../../Utility/utils/UI';
import {Color} from '../../Utility/utils/Color';
import {pickImg} from '../../Utility/utils/ImagePick';
import {SelectImgViewModel} from '../../Business/services/SelectImgViewModel';
import {AllScreenList, SwipeStackProps} from '../../Navigation/NavigationProps';
import FastImage from 'react-native-fast-image';
import {FASTAPI_LOCALHOST_ADDRESS} from 'react-native-dotenv';
import {PretendardBold} from '@Utility/utils/CustomFont';

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
      {model?.loading && (
        <View style={styles.indicatorWrap}>
          <ActivityIndicator
            size="large"
            color="yellowgreen"
            style={styles.indicator}
            animating={model?.loading}
          />
        </View>
      )}
      <Header navigation={navigation} bgColor={Color.white} />
      <HeadingText
        navigation={navigation}
        text="Select Image"
        color={Color.black}
      />
      {model?.status === 'success' ? (
        <View>
          <FastImage
            style={styles.image}
            source={{
              uri: `${FASTAPI_LOCALHOST_ADDRESS}/show_image/${
                model?.data?.data?.result?.path.split('/')[2]
              }`,
            }}
          />
        </View>
      ) : (
        <View style={styles.image} />
      )}
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          navigation.goBack();
        }}>
        <PretendardBold color={Color.white} children={'Confirm'} />
      </TouchableOpacity>
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
  image: {
    width: screenWidth - wp(20),
    height: screenWidth - wp(20),
    borderRadius: 10,
    borderColor: Color.lightGray,
    borderWidth: 1,
    marginBottom: hp(10),
  },
  btn: {
    height: 60,
    borderRadius: 10,
    backgroundColor: 'skyblue',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  indicatorWrap: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 999999,
    width: screenWidth,
    height: screenHeight,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  indicator: {
    width: screenWidth,
    height: screenHeight,
  },
});
