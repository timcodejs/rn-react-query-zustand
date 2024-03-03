import React, {useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useIsFocused} from '@react-navigation/native';
import Header from '../../Components/Header';
import HeadingText from '../../Components/HeadingText';
import {Color} from '../../Utility/utils/Color';
import {hp, screenWidth, wp} from '../../Utility/utils/UI';
import {PretendardBold} from '../../Utility/utils/CustomFont';
import {useGetAllImagesQuery} from '../../Store/queries/removeBgQuery';
import {AllScreenList, SwipeStackProps} from '../../Navigation/NavigationProps';
import {FASTAPI_LOCALHOST_ADDRESS} from 'react-native-dotenv';

const RemoveBackGround = ({
  navigation,
}: SwipeStackProps<AllScreenList.RemoveBackGround>) => {
  const isFocused = useIsFocused();
  const {data, refetch} = useGetAllImagesQuery();

  useEffect(() => {
    if (isFocused) {
      refetch();
    }
  }, [isFocused]);

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
      <View>
        <FlatList
          style={styles.list}
          data={data?.data?.result}
          numColumns={2}
          columnWrapperStyle={{justifyContent: 'space-between'}}
          contentContainerStyle={{paddingBottom: 350}}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}: any) => {
            const image_name = item.image.path.split('/')[2];
            return (
              <FastImage
                style={styles.image}
                source={{
                  uri: `${FASTAPI_LOCALHOST_ADDRESS}/show_image/${image_name}`,
                }}
              />
            );
          }}
        />
      </View>
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
  list: {
    marginTop: 30,
  },
  image: {
    width: (screenWidth - wp(30)) / 2,
    height: (screenWidth - wp(30)) / 2,
    borderRadius: 10,
    borderColor: Color.lightGray,
    borderWidth: 1,
    marginBottom: hp(10),
  },
});
