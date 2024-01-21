import React from 'react';
import {View, StyleSheet} from 'react-native';
import Header from '../../Components/Header';
import HeadingText from '../../Components/HeadingText';
import {hp, wp} from '../../Utility/utils/UI';
import {Color} from '../../Utility/utils/Color';
import {AllScreenList, SwipeStackProps} from '../../Navigation/NavigationProps';
import DragToCloseAnimation from '../../Components/Animations/DragToCloseAnimation';

const DragToClose = ({
  navigation,
}: SwipeStackProps<AllScreenList.DragToClose>) => {
  return (
    <View style={styles.view}>
      <Header navigation={navigation} bgColor={Color.white} />
      <HeadingText
        navigation={navigation}
        text="Drag To Close"
        color={Color.black}
      />
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
});
