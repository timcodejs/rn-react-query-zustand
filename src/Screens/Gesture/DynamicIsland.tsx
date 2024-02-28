import React from 'react';
import {NativeModules, StyleSheet, Button, View} from 'react-native';
import Header from '../../Components/Header';
import {hp, wp} from '../../Utility/utils/UI';
import {Color} from '../../Utility/utils/Color';
import HeadingText from '../../Components/HeadingText';
import {AllScreenList, SwipeStackProps} from '../../Navigation/NavigationProps';

const {LiveActivity} = NativeModules;

const DynamicIsland = ({
  navigation,
}: SwipeStackProps<AllScreenList.DynamicIsland>) => {
  const onStartActivity = () => {
    if (LiveActivity && typeof LiveActivity.startActivity === 'function') {
      LiveActivity.startActivity();
    } else {
      console.log('LiveActivity not found');
    }
  };

  const onEndActivity = () => {
    if (LiveActivity && typeof LiveActivity.endActivity === 'function') {
      LiveActivity.endActivity();
    } else {
      console.log('LiveActivity not found');
    }
  };

  return (
    <View style={styles.view}>
      <Header navigation={navigation} bgColor={Color.white} />
      <HeadingText
        navigation={navigation}
        text="Dynamic Island"
        color={Color.black}
      />
      <View style={styles.container}>
        <Header navigation={navigation} bgColor={Color.white} />
        <Button title="Start Activity" onPress={onStartActivity} />
        <Button title="Stop Activity" onPress={onEndActivity} />
      </View>
    </View>
  );
};

export default DynamicIsland;

const styles = StyleSheet.create({
  view: {
    height: hp(740),
    paddingHorizontal: wp(10),
    backgroundColor: Color.white,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 200,
  },
});
