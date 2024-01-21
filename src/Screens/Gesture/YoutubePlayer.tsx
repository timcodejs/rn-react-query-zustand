import React from 'react';
import {View, StyleSheet} from 'react-native';
import Header from '../../Components/Header';
import HeadingText from '../../Components/HeadingText';
import {hp, wp} from '../../Utility/utils/UI';
import {Color} from '../../Utility/utils/Color';
import YoutubePlayerList from '../../Components/Gesture/YoutubePlayerList';
import {AllScreenList, SwipeStackProps} from '../../Navigation/NavigationProps';

const YoutubePlayer = ({
  navigation,
}: SwipeStackProps<AllScreenList.YoutubePlayer>) => {
  return (
    <>
      <View style={styles.view}>
        <Header navigation={navigation} bgColor={Color.black} />
        <HeadingText
          navigation={navigation}
          text="Youtube Player"
          color={Color.white}
          style={styles.padding}
        />
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
  padding: {
    paddingHorizontal: wp(10),
  },
});
