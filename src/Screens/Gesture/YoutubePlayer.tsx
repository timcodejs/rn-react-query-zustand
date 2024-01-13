import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Header from '../../Components/Header';
import {hp, wp} from '../../Utility/utils/UI';
import {Color} from '../../Utility/utils/Color';
import {IconArrowIcon} from '../../Utility/utils/SVG';
import {PretendardBold} from '../../Utility/utils/CustomFont';
import YoutubePlayerList from '../../Components/Gesture/YoutubePlayerList';
import {AllScreenList, SwipeStackProps} from '../../Navigation/NavigationProps';

const YoutubePlayer = ({
  navigation,
}: SwipeStackProps<AllScreenList.YoutubePlayer>) => {
  return (
    <>
      <View style={styles.view}>
        <Header navigation={navigation} bgColor={Color.black} />
        <View style={styles.head}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{marginRight: hp(10)}}>
            <IconArrowIcon
              width={wp(20)}
              height={hp(20)}
              color={Color.white}
              style={{transform: [{rotate: '180deg'}]}}
            />
          </TouchableOpacity>
          <PretendardBold
            size={hp(20)}
            color={Color.white}
            style={{marginTop: hp(20), marginBottom: hp(20)}}
            children="Youtube Player"
          />
        </View>
        <YoutubePlayerList />
      </View>
    </>
  );
};

export default YoutubePlayer;

const styles = StyleSheet.create({
  view: {
    height: hp(740),
    backgroundColor: Color.black,
  },
  head: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: hp(10),
    paddingRight: hp(10),
  },
});
